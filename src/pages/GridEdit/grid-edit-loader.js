(function() {
  'use strict';

  if (window.__gridEditLoaded) {
    console.log('[GridEdit] Already loaded');
    return;
  }
  window.__gridEditLoaded = true;

  var BASE_PATH = '/grid-edit';
  var DND_ENDPOINT = '/grid-edit/api';
  var CSS_URL = BASE_PATH + '/styles.css';
  var DND_SCRIPT_URL = BASE_PATH + '/dnd.js';

  var loadCSS = function() {
    return new Promise(function(resolve) {
      if (document.querySelector('link[href="' + CSS_URL + '"]')) {
        resolve();
        return;
      }
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CSS_URL;
      link.onload = resolve;
      link.onerror = resolve;
      document.head.appendChild(link);
    });
  };

  var loadDnDScript = function() {
    return new Promise(function(resolve, reject) {
      if (window.gridDnD) {
        resolve();
        return;
      }
      var script = document.createElement('script');
      script.src = DND_SCRIPT_URL;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  var getDnDMeta = function() {
    var meta = window.hatGridMetaData || {};
    return {
      variant: meta.variant || null,
      nodeId: meta.nodeId || null
    };
  };

  var getContainerNameFromGrid = function(gridContainer) {
    var classList = Array.from(gridContainer.classList);
    if (classList.length >= 2) {
      return classList[1];
    }
    return null;
  };

  var determineConfigNodeIdForContainer = function(containerName) {
    var meta = getDnDMeta();
    var payload = {
      action: 'determineConfigNodeId',
      variant: meta.variant,
      nodeId: meta.nodeId,
      containerName: containerName
    };
    return fetch(DND_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(function(response) { return response.json(); })
    .then(function(data) {
      if (data.nodeId) {
        return data.nodeId;
      }
      return null;
    })
    .catch(function(error) {
      console.error('[GridEdit] Failed to determine config nodeId for container ' + containerName, error);
      return null;
    });
  };

  var fetchContainerSections = function(containerNames) {
    return fetch(DND_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'getContainerSections', containers: containerNames })
    })
    .then(function(response) { return response.json(); })
    .then(function(data) {
      return data.containerToSection || {};
    })
    .catch(function(error) {
      console.error('[GridEdit] Failed to fetch container sections', error);
      return {};
    });
  };

  var determineAllConfigNodeIds = function() {
    var gridContainers = document.querySelectorAll('.gridContainer');
    var containerNames = [];

    Array.from(gridContainers).forEach(function(gridContainer) {
      var containerName = getContainerNameFromGrid(gridContainer);
      if (containerName) {
        containerNames.push(containerName);
      }
    });

    return fetchContainerSections(containerNames).then(function(containerToSection) {
      window.gridDnDContainerSections = containerToSection;
      console.log('[GridEdit] Container sections:', containerToSection);

      var promises = Array.from(gridContainers).map(function(gridContainer) {
        var containerName = getContainerNameFromGrid(gridContainer);
        if (!containerName) return Promise.resolve();

        return determineConfigNodeIdForContainer(containerName).then(function(configNodeId) {
          if (configNodeId) {
            gridContainer.dataset.configNodeId = configNodeId;
            console.log('[GridEdit] Container ' + containerName + ' config nodeId: ' + configNodeId);
          }
          var section = containerToSection[containerName] || 'story';
          gridContainer.dataset.section = section;
        });
      });

      return Promise.all(promises);
    });
  };

  var getConfigNodeIdForWidget = function(widgetId) {
    var parts = widgetId.split('--');
    var containerName = parts[0];
    if (!containerName) return null;

    var gridContainer = document.querySelector('.gridContainer.' + containerName);
    if (!gridContainer) return null;

    return gridContainer.dataset.configNodeId || null;
  };

  var postDnDUpdate = function(detail) {
    detail = detail || {};
    var meta = getDnDMeta();
    var moves = (detail.moves || []).map(function(move) {
      return {
        widgetId: move.widgetId,
        from: move.from,
        to: move.to,
        configNodeId: getConfigNodeIdForWidget(move.widgetId)
      };
    });
    var payload = {
      action: 'updateConfig',
      variant: meta.variant,
      moves: moves
    };
    return fetch(DND_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(function(error) {
      console.error('[GridEdit] Failed to save layout', error);
    });
  };

  var createUI = function() {
    var btn = document.createElement('button');
    btn.id = 'toggleGridEditMode';
    btn.className = 'grid-edit-toggle';
    btn.textContent = 'Enable grid edit mode';
    document.body.appendChild(btn);

    var actionsContainer = document.createElement('div');
    actionsContainer.id = 'gridEditActions';
    actionsContainer.className = 'grid-edit-actions';
    actionsContainer.hidden = true;
    actionsContainer.setAttribute('aria-hidden', 'true');
    actionsContainer.innerHTML =
      '<button type="button" id="gridUndoBtn" class="grid-edit-action" disabled>Undo last change</button>' +
      '<button type="button" id="gridSaveBtn" class="grid-edit-action grid-edit-action--primary" disabled>Save layout</button>';
    document.body.appendChild(actionsContainer);

    return {
      btn: btn,
      container: actionsContainer,
      undoBtn: actionsContainer.querySelector('#gridUndoBtn'),
      saveBtn: actionsContainer.querySelector('#gridSaveBtn')
    };
  };

  var init = function() {
    console.log('[GridEdit] Initializing...');

    Promise.all([loadCSS(), loadDnDScript()]).then(function() {
      console.log('[GridEdit] Resources loaded');

      var ui = createUI();
      var editMode = false;
      var isLoading = false;

      var setActionsVisibility = function(visible) {
        ui.container.hidden = !visible;
        ui.container.setAttribute('aria-hidden', visible ? 'false' : 'true');
      };

      var resetActionsState = function() {
        ui.undoBtn.disabled = true;
        ui.saveBtn.disabled = true;
      };

      var updateLabel = function() {
        if (isLoading) {
          ui.btn.textContent = 'Loading...';
          ui.btn.disabled = true;
        } else {
          ui.btn.textContent = editMode ? 'Disable grid edit mode' : 'Enable grid edit mode';
          ui.btn.disabled = false;
        }
      };

      var historyHandler = function(event) {
        ui.undoBtn.disabled = !(event.detail && event.detail.canUndo);
      };
      var dirtyHandler = function(event) {
        ui.saveBtn.disabled = !(event.detail && event.detail.dirty);
      };
      var savedHandler = function(event) {
        postDnDUpdate(event.detail);
      };

      window.addEventListener('grid:dnd:history', historyHandler);
      window.addEventListener('grid:dnd:dirty', dirtyHandler);
      window.addEventListener('grid:dnd:saved', savedHandler);

      ui.undoBtn.addEventListener('click', function() {
        window.gridDnD && window.gridDnD.undoLast();
      });
      ui.saveBtn.addEventListener('click', function() {
        window.gridDnD && window.gridDnD.save();
      });

      ui.btn.addEventListener('click', function() {
        if (isLoading) return;

        if (!editMode) {
          isLoading = true;
          updateLabel();

          var visibleWidgets = [];
          document.querySelectorAll('.gridWidget').forEach(function(widget) {
            var rect = widget.getBoundingClientRect();
            var style = window.getComputedStyle(widget);
            var isVisible = style.display !== 'none' &&
                            style.visibility !== 'hidden' &&
                            style.opacity !== '0' &&
                            rect.width > 0 &&
                            rect.height > 0;
            if (isVisible) {
              visibleWidgets.push(widget);
            }
          });

          document.body.classList.add('grid-edit-mode');

          determineAllConfigNodeIds().then(function() {
            isLoading = false;
            editMode = true;
            updateLabel();
            setActionsVisibility(true);
            resetActionsState();
            window.gridDnD && window.gridDnD.enable(visibleWidgets);
          });
        } else {
          editMode = false;
          updateLabel();
          document.body.classList.remove('grid-edit-mode');
          window.gridDnD && window.gridDnD.disable();
          setActionsVisibility(false);
          resetActionsState();
        }
      });

      console.log('[GridEdit] Ready! Click the button to enable edit mode.');
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
