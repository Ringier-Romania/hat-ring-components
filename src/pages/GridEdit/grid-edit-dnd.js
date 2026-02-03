(function() {
  'use strict';

  var MAX_HISTORY = 30;

  var state = {
    active: false,
    cleanup: [],
    history: [],
    pendingSnapshot: null,
    baselineSnapshot: null,
    baselineLayout: null,
    lastMoves: [],
    isDirty: false
  };

  var addCleanup = function(fn) {
    state.cleanup.push(fn);
  };

  var dispatch = function(name, detail) {
    detail = detail || {};
    window.dispatchEvent(new CustomEvent('grid:dnd:' + name, { detail: detail }));
  };

  var emitHistory = function() { dispatch('history', { canUndo: state.history.length > 0 }); };
  var emitDirty = function() { dispatch('dirty', { dirty: state.isDirty }); };
  var emitSaved = function(payload) { dispatch('saved', payload); };

  var updateBodyFlags = function() {
    document.body.classList.toggle('grid-edit-has-undo', state.history.length > 0);
    document.body.classList.toggle('grid-edit-dirty', state.isDirty);
  };

  var setDirty = function(value) {
    state.isDirty = Boolean(value);
    emitDirty();
    updateBodyFlags();
  };

  var clearDragHighlights = function() {
    document.querySelectorAll('.gridBox.drag-over').forEach(function(box) {
      box.classList.remove('drag-over');
    });
  };

  var snapshot = function() {
    return Array.from(document.querySelectorAll('.gridBox')).map(function(box) {
      return {
        box: box,
        order: Array.from(box.querySelectorAll('.gridWidget'))
      };
    });
  };

  var cloneSnapshot = function(snap) {
    return snap.map(function(entry) {
      return {
        box: entry.box,
        order: entry.order.slice()
      };
    });
  };

  var snapshotsEqual = function(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    return a.every(function(entry, index) {
      var other = b[index];
      if (entry.box !== other.box) return false;
      if (entry.order.length !== other.order.length) return false;
      return entry.order.every(function(node, nodeIndex) {
        return node === other.order[nodeIndex];
      });
    });
  };

  var restoreSnapshot = function(snap) {
    if (!snap) return;
    snap.forEach(function(entry) {
      if (!entry.box) return;
      entry.order.forEach(function(widget) {
        if (widget) {
          entry.box.appendChild(widget);
        }
      });
    });
    clearDragHighlights();
  };

  var pushHistory = function(snap) {
    if (!snap) return;
    state.history.push(cloneSnapshot(snap));
    if (state.history.length > MAX_HISTORY) {
      state.history.shift();
    }
    emitHistory();
    setDirty(true);
  };

  var hasOrderChanged = function(snap) {
    return !snapshotsEqual(snap, snapshot());
  };

  var getDragAfterElement = function(container, y) {
    var elements = Array.from(container.querySelectorAll('.gridWidget:not(.dragging)'));
    var result = elements.reduce(
      function(closest, child) {
        var box = child.getBoundingClientRect();
        var offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY, element: null }
    );
    return result.element;
  };

  var ensureHandle = function(widget) {
    var handle = widget.querySelector('.drag-handle');
    if (!handle) {
      handle = document.createElement('span');
      handle.className = 'drag-handle';
      handle.setAttribute('aria-hidden', 'true');
      handle.innerHTML = '&#9776;';
      widget.appendChild(handle);
      addCleanup(function() { handle && handle.remove(); });
    }
    return handle;
  };

  var createContextMenu = function() {
    var menu = document.getElementById('grid-context-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'grid-context-menu';
      menu.className = 'grid-context-menu';
      menu.innerHTML =
        '<button type="button" data-action="moveUp">Move up</button>' +
        '<button type="button" data-action="moveDown">Move down</button>' +
        '<button type="button" data-action="moveToTop">Move to top</button>' +
        '<button type="button" data-action="moveToBottom">Move to bottom</button>' +
        '<button type="button" data-action="edit">Edit widget</button>';
      document.body.appendChild(menu);
    }
    return menu;
  };

  var hideContextMenu = function() {
    var menu = document.getElementById('grid-context-menu');
    if (menu) {
      menu.style.display = 'none';
      menu.dataset.widgetId = '';
    }
  };

  var showContextMenu = function(x, y, widget) {
    var menu = createContextMenu();
    menu.style.display = 'block';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    menu.dataset.widgetId = widget.id || '';

    var rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      menu.style.left = (window.innerWidth - rect.width - 10) + 'px';
    }
    if (rect.bottom > window.innerHeight) {
      menu.style.top = (window.innerHeight - rect.height - 10) + 'px';
    }
  };

  var buildEditUrl = function(widgetId) {
    var meta = window.hatGridMetaData || {};
    var variant = meta.variant || '';
    var parts = widgetId.split('--');
    var container = parts[0] || '';
    var box = parts[1] || '';

    var gridContainer = document.querySelector('.gridContainer.' + container);
    var nodeId = (gridContainer && gridContainer.dataset.configNodeId) || meta.nodeId || '';
    var section = (gridContainer && gridContainer.dataset.section) || 'story';

    var websitesMenagerPrefix = window.websitesMenagerPrefix;
    var websitesSpaceNamespace = window.websitesSpaceNamespace;

    if (!websitesMenagerPrefix || !websitesSpaceNamespace) {
      alert('Missing global variables websitesMenagerPrefix or websitesSpaceNamespace');
      return '#';
    }
    return 'https://' + websitesMenagerPrefix + '-websites-manager.ringpublishing.com/' +
           websitesSpaceNamespace + '/' + nodeId + '/' + variant + '/' + section + '/' +
           container + '___' + box;
  };

  var showEditPopup = function(widgetId) {
    var widget = document.getElementById(widgetId);
    if (!widget) return;

    var box = widget.closest('.gridBox');
    var widgets = box ? Array.from(box.querySelectorAll('.gridWidget')) : [];
    var index = widgets.indexOf(widget);

    var editUrl = buildEditUrl(widgetId);

    var popup = document.getElementById('grid-edit-popup');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'grid-edit-popup';
      popup.className = 'grid-edit-popup';
      document.body.appendChild(popup);
    }

    popup.innerHTML =
      '<div class="grid-edit-popup-content">' +
        '<button type="button" class="grid-edit-popup-close">&times;</button>' +
        '<h3>Click on below url and find widget number ' + (index + 1) + '</h3>' +
        '<a href="' + editUrl + '" target="_blank" class="grid-edit-popup-link">' + editUrl + '</a>' +
      '</div>';

    popup.style.display = 'flex';

    var closeBtn = popup.querySelector('.grid-edit-popup-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
      });
    }

    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
  };

  var handleContextMenuAction = function(action, widgetId) {
    var widget = document.getElementById(widgetId);
    if (!widget) return;

    var box = widget.closest('.gridBox');
    if (!box) return;

    var widgets = Array.from(box.querySelectorAll('.gridWidget'));
    var index = widgets.indexOf(widget);

    var beforeSnapshot = snapshot();

    switch (action) {
      case 'moveUp':
        if (index > 0) {
          box.insertBefore(widget, widgets[index - 1]);
        }
        break;
      case 'moveDown':
        if (index < widgets.length - 1) {
          box.insertBefore(widgets[index + 1], widget);
        }
        break;
      case 'moveToTop':
        if (index > 0) {
          box.insertBefore(widget, widgets[0]);
        }
        break;
      case 'moveToBottom':
        if (index < widgets.length - 1) {
          box.appendChild(widget);
        }
        break;
      case 'edit':
        showEditPopup(widgetId);
        break;
    }

    if (hasOrderChanged(beforeSnapshot)) {
      pushHistory(beforeSnapshot);
    }

    hideContextMenu();
  };

  var initContextMenu = function() {
    document.addEventListener('click', function(e) {
      var menu = document.getElementById('grid-context-menu');
      var target = e.target;
      if (menu && !menu.contains(target) && !target.closest('.drag-handle')) {
        hideContextMenu();
      }

      if (target.closest('.grid-context-menu [data-action]')) {
        var btn = target.closest('[data-action]');
        var action = btn.dataset.action;
        var widgetId = menu && menu.dataset.widgetId;
        if (action && widgetId) {
          handleContextMenuAction(action, widgetId);
        }
      }
    });
  };

  initContextMenu();

  var dataValue = function(element, keys) {
    if (!element || !element.dataset) return null;
    for (var i = 0; i < keys.length; i++) {
      var value = element.dataset[keys[i]];
      if (value) return value;
    }
    return null;
  };

  var attrValue = function(element, attributes) {
    if (!element) return null;
    for (var i = 0; i < attributes.length; i++) {
      var value = element.getAttribute(attributes[i]);
      if (value) return value;
    }
    return null;
  };

  var getElementIdentifier = function(element, fallback, prefix) {
    return dataValue(element, ['hatId', 'widgetId', 'widgetid', 'id']) ||
      attrValue(element, ['data-hat-id', 'data-widget-id', 'data-id']) ||
      (element && element.id) ||
      (prefix + '-' + fallback);
  };

  var collectLayout = function() {
    return Array.from(document.querySelectorAll('.gridBox')).map(function(box, boxIndex) {
      return {
        boxId: getElementIdentifier(box, boxIndex, 'box'),
        widgets: Array.from(box.querySelectorAll('.gridWidget')).map(function(widget, widgetIndex) {
          return getElementIdentifier(widget, boxIndex + '-' + widgetIndex, 'widget');
        })
      };
    });
  };

  var buildPositionMap = function(layout) {
    layout = layout || [];
    var map = new Map();
    layout.forEach(function(entry) {
      entry.widgets.forEach(function(widgetId, index) {
        if (!widgetId) return;
        map.set(widgetId, { boxId: entry.boxId, index: index });
      });
    });
    return map;
  };

  var diffLayouts = function(fromLayout, toLayout) {
    fromLayout = fromLayout || [];
    toLayout = toLayout || [];
    var fromMap = buildPositionMap(fromLayout);
    var toMap = buildPositionMap(toLayout);
    var moves = [];
    toMap.forEach(function(toPos, widgetId) {
      var fromPos = fromMap.get(widgetId);
      if (!fromPos) return;
      if (fromPos.boxId !== toPos.boxId || fromPos.index !== toPos.index) {
        moves.push({ widgetId: widgetId, from: fromPos.index, to: toPos.index });
      }
    });
    return moves;
  };

  var enable = function(preFilteredWidgets) {
    if (state.active) {
      emitHistory();
      emitDirty();
      return;
    }
    state.active = true;
    state.cleanup = [];
    state.history = [];
    state.pendingSnapshot = null;
    state.baselineSnapshot = snapshot();
    state.baselineLayout = collectLayout();
    state.lastMoves = [];
    setDirty(false);
    emitHistory();

    var draggedWidget = null;

    var widgets = preFilteredWidgets || Array.from(document.querySelectorAll('.gridWidget'));
    widgets.forEach(function(widget) {
      if (!preFilteredWidgets) {
        var rect = widget.getBoundingClientRect();
        var style = window.getComputedStyle(widget);
        var isVisible = style.display !== 'none' &&
                        style.visibility !== 'hidden' &&
                        style.opacity !== '0' &&
                        rect.width > 0 &&
                        rect.height > 0;

        if (!isVisible) {
          return;
        }
      }

      widget.setAttribute('draggable', 'true');
      widget.classList.add('grid-dnd-active');
      addCleanup(function() {
        widget.removeAttribute('draggable');
        widget.classList.remove('grid-dnd-active', 'dragging');
      });

      ensureHandle(widget);

      var handle = widget.querySelector('.drag-handle');
      if (handle) {
        var handleClick = function(e) {
          e.stopPropagation();
          showContextMenu(e.clientX, e.clientY, widget);
        };
        handle.addEventListener('click', handleClick);
        addCleanup(function() { handle.removeEventListener('click', handleClick); });
      }

      var handleDragStart = function(event) {
        draggedWidget = widget;
        widget.classList.add('dragging');
        state.pendingSnapshot = snapshot();
        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = 'move';
          event.dataTransfer.setData('text/plain', widget.id || 'grid-widget');
          try {
            event.dataTransfer.setDragImage(widget, 20, 20);
          } catch (e) {}
        }
      };

      var handleDragEnd = function() {
        widget.classList.remove('dragging');
        if (state.pendingSnapshot && hasOrderChanged(state.pendingSnapshot)) {
          pushHistory(state.pendingSnapshot);
        }
        state.pendingSnapshot = null;
        draggedWidget = null;
        clearDragHighlights();
      };

      widget.addEventListener('dragstart', handleDragStart);
      widget.addEventListener('dragend', handleDragEnd);

      addCleanup(function() {
        widget.removeEventListener('dragstart', handleDragStart);
        widget.removeEventListener('dragend', handleDragEnd);
      });
    });

    var boxes = document.querySelectorAll('.gridBox');

    var canDropInBox = function(widget, targetBox) {
      if (!widget || !targetBox) return false;
      var widgetId = widget.id || (widget.dataset && widget.dataset.widgetId) || '';
      var parts = widgetId.split('--');
      if (parts.length < 2) return true;
      var boxName = parts[1];
      return targetBox.classList.contains(boxName);
    };

    boxes.forEach(function(box) {
      var handleDragOver = function(event) {
        if (!draggedWidget) return;
        if (!canDropInBox(draggedWidget, box)) return;
        event.preventDefault();
        var afterElement = getDragAfterElement(box, event.clientY);
        if (!afterElement) {
          box.appendChild(draggedWidget);
        } else if (afterElement !== draggedWidget) {
          box.insertBefore(draggedWidget, afterElement);
        }
      };

      var handleDragEnter = function(event) {
        if (!draggedWidget) return;
        if (!canDropInBox(draggedWidget, box)) return;
        event.preventDefault();
        box.classList.add('drag-over');
      };

      var handleDragLeave = function(event) {
        if (!event.relatedTarget || !box.contains(event.relatedTarget)) {
          box.classList.remove('drag-over');
        }
      };

      var handleDrop = function(event) {
        event.preventDefault();
        box.classList.remove('drag-over');
      };

      box.addEventListener('dragover', handleDragOver);
      box.addEventListener('dragenter', handleDragEnter);
      box.addEventListener('dragleave', handleDragLeave);
      box.addEventListener('drop', handleDrop);

      addCleanup(function() {
        box.removeEventListener('dragover', handleDragOver);
        box.removeEventListener('dragenter', handleDragEnter);
        box.removeEventListener('dragleave', handleDragLeave);
        box.removeEventListener('drop', handleDrop);
        box.classList.remove('drag-over');
      });
    });
  };

  var disable = function() {
    if (!state.active) return;
    while (state.cleanup.length) {
      var dispose = state.cleanup.pop();
      try {
        dispose && dispose();
      } catch (e) {}
    }
    state.active = false;
    state.history = [];
    state.pendingSnapshot = null;
    state.baselineSnapshot = null;
    state.baselineLayout = null;
    state.lastMoves = [];
    setDirty(false);
    emitHistory();
    clearDragHighlights();
  };

  var undoLast = function() {
    if (!state.active || state.history.length === 0) return;
    var previous = state.history.pop();
    restoreSnapshot(previous || null);
    emitHistory();
    var current = snapshot();
    setDirty(!snapshotsEqual(current, state.baselineSnapshot));
    state.lastMoves = [];
  };

  var save = function() {
    var layout = collectLayout();
    var moves = diffLayouts(state.baselineLayout || layout, layout);
    state.history = [];
    state.baselineSnapshot = snapshot();
    state.baselineLayout = layout;
    state.lastMoves = moves;
    emitHistory();
    setDirty(false);
    emitSaved({ layout: layout, moves: moves });
    console.log('[gridDnD] Widget moves', moves);
    console.info('[gridDnD] Layout ready', layout);
    return { layout: layout, moves: moves };
  };

  window.gridDnD = {
    enable: enable,
    disable: disable,
    undoLast: undoLast,
    save: save,
    getLayout: collectLayout,
    getMoves: function() { return state.lastMoves.slice(); }
  };
})();
