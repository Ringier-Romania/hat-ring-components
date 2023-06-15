import React from "react";
import upperFirst from 'lodash/upperFirst';
import get from 'lodash/get';
import {AbstractWidgetConfig, AppContext} from "../types/types";
import {UtilsHelper_isMobile} from "./UtilsHelper";
export function WidgetHelper_shouldHideWidget(widgetConfig, context) {
    if (typeof context.hatControllerParams.isMobile === 'boolean'
        && typeof widgetConfig.platformDesktop === 'boolean'
        && typeof widgetConfig.platformMobile === 'boolean'
    ) {
        return !(
            (context.hatControllerParams.isMobile && widgetConfig.platformMobile)
            || (!context.hatControllerParams.isMobile && widgetConfig.platformDesktop)
        );
    }
    return false;
}

export function WidgetHelper_renderEmptyWidget(widgetConfig, text = '') {
    return WidgetHelper_renderEmptyComponent(upperFirst(widgetConfig.widgetType), text);
}

export function WidgetHelper_renderEmptyComponent(componentClassName, text = '') {
    return (<div className={componentClassName} style={{display: 'none'}}
                 dangerouslySetInnerHTML={{__html: text && `<!-- ${text} -->`}}/>);
}

export function WidgetHelper_getWidgetCssClasses(componentName: string, widgetConfig: AbstractWidgetConfig, context: AppContext, additionalCssClasses: Array<string> = []): string {
    const cssClasses = [] as Array<string>;
    componentName = upperFirst(componentName);

    cssClasses.push(componentName);

    if (get(context, `cssModules.${componentName}`, false)) {
        cssClasses.push(get(context, `cssModules.${componentName}`));
    }

    if (widgetConfig.customWidth && widgetConfig.customWidth !== 'none') {
        cssClasses.push(`widgetWidth${widgetConfig.customWidth}`);
    }

    if (widgetConfig.customPosition && widgetConfig.customPosition !== 'none') {
        cssClasses.push(`widgetPosition${upperFirst(widgetConfig.customPosition)}`);
    }

    if (widgetConfig.customClass && widgetConfig.customClass !== '') {
        cssClasses.push(widgetConfig.customClass);
    }

    return [...additionalCssClasses, ...cssClasses].join(' ');
}

/**
 * Generate object of dimensions {width, height} from widgetConfig
 * @param widgetConfig
 * @param context
 * @param desktopFieldName
 * @param mobileFieldName
 * @param defaultSizesString
 * @return {width: SafeNumber, height: SafeNumber}
 */
export function WidgetHelper_getImageDimensionsFromWidgetConfig(widgetConfig, context: AppContext, desktopFieldName = 'standardImageSize', mobileFieldName = 'imageSizeMobile', defaultSizesString = '800x450'):
{ width: number | `${number}`, height: number | `${number}` } {
    let dimensionsString: string = '';
    if (UtilsHelper_isMobile(context)) {
        if (widgetConfig[mobileFieldName]) {
            dimensionsString = widgetConfig[mobileFieldName];
        } else {
            if (widgetConfig[desktopFieldName]) {
                dimensionsString = widgetConfig[desktopFieldName];
            }
        }
    } else {
        if (widgetConfig[desktopFieldName]) {
            dimensionsString = widgetConfig[desktopFieldName];
        }
    }

    if (dimensionsString === '') {
        dimensionsString = defaultSizesString;
    }
    const sizes = dimensionsString.split('x');
    return {width: parseInt(sizes[0]), height: parseInt(sizes[1])};
}
