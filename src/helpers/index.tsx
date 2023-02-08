import React from "react";
import * as _ from 'lodash';

export function shouldHideWidget(widgetConfig, context) {
    if (typeof context.hatControllerParams.isMobile === 'boolean') {
        if ((context.hatControllerParams.isMobile && widgetConfig.platformDesktop)
            || (!context.hatControllerParams.isMobile && widgetConfig.platformMobile)) {

            return true;
        }
    }
    return false;
}

export function renderEmptyWidget(widgetConfig, text = '') {
    return renderEmptyComponent(_.upperFirst(widgetConfig.widgetType), text);
}

export function renderEmptyComponent(componentClassName, text = '') {
    return (<div className={componentClassName} style={{display: 'none'}} dangerouslySetInnerHTML={{__html: text && `<!-- ${text} -->`}}/>);
}
