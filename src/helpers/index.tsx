import React from "react";
import * as _ from 'lodash';
import {AbstractWidgetConfig} from "../types/types";

export function shouldHideWidget(widgetConfig, context) {
    if (typeof context.hatControllerParams.isMobile === 'boolean') {
        return !((context.hatControllerParams.isMobile && widgetConfig.platformDesktop)
            || (!context.hatControllerParams.isMobile && widgetConfig.platformMobile));
    }
    return false;
}

export function renderEmptyWidget(widgetConfig, text = '') {
    return renderEmptyComponent(_.upperFirst(widgetConfig.widgetType), text);
}

export function renderEmptyComponent(componentClassName, text = '') {
    return (<div className={componentClassName} style={{display: 'none'}} dangerouslySetInnerHTML={{__html: text && `<!-- ${text} -->`}}/>);
}

export function getWidgetCssClasses(widgetConfig: AbstractWidgetConfig, additionalCssClasses:Array<string> = []):string {
    const cssClasses = [] as Array<string>;

    if (widgetConfig.widgetType) {
        cssClasses.push(_.upperFirst(widgetConfig.widgetType));
    }

    if (widgetConfig.customWidth && widgetConfig.customWidth !== 'none') {
        cssClasses.push(`widgetWidth${widgetConfig.customWidth}`);
    }

    if (widgetConfig.customPosition && widgetConfig.customPosition !== 'none') {
        cssClasses.push(`widgetPosition${_.upperFirst(widgetConfig.customPosition)}`);
    }

    if (widgetConfig.customClass && widgetConfig.customClass !== '') {
        cssClasses.push(widgetConfig.customClass);
    }

    return [...additionalCssClasses, ...cssClasses].join(' ');
}
