import React from "react";
import * as _ from 'lodash';
import {AbstractWidgetConfig} from "../types/types";
export default class WidgetHelper {
    static shouldHideWidget(widgetConfig, context) {
        if (typeof context.hatControllerParams.isMobile === 'boolean') {
            return !((context.hatControllerParams.isMobile && widgetConfig.platformDesktop)
                || (!context.hatControllerParams.isMobile && widgetConfig.platformMobile));
        }
        return false;
    }

    static renderEmptyWidget(widgetConfig, text = '') {
        return WidgetHelper.renderEmptyComponent(_.upperFirst(widgetConfig.widgetType), text);
    }

    static renderEmptyComponent(componentClassName, text = '') {
        return (<div className={componentClassName} style={{display: 'none'}} dangerouslySetInnerHTML={{__html: text && `<!-- ${text} -->`}}/>);
    }

    static getWidgetCssClasses(widgetConfig: AbstractWidgetConfig, additionalCssClasses:Array<string> = []):string {
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
}
