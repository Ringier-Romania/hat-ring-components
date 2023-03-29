import React from "react";
import * as _ from 'lodash';
import {AbstractWidgetConfig, AppContext} from "../types/types";
import {UtilsHelper} from "./UtilsHelper";

export class WidgetHelper {
    static shouldHideWidget(widgetConfig, context) {
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

    static renderEmptyWidget(widgetConfig, text = '') {
        return WidgetHelper.renderEmptyComponent(_.upperFirst(widgetConfig.widgetType), text);
    }

    static renderEmptyComponent(componentClassName, text = '') {
        return (<div className={componentClassName} style={{display: 'none'}}
                     dangerouslySetInnerHTML={{__html: text && `<!-- ${text} -->`}}/>);
    }

    static getWidgetCssClasses(widgetConfig: AbstractWidgetConfig, additionalCssClasses: Array<string> = []): string {
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

    /**
     * Generate object of dimensions {width, height} from widgetConfig
     * @param widgetConfig
     * @param context
     * @param desktopFieldName
     * @param mobileFieldName
     * @param defaultSizesString
     * @return {width: SafeNumber, height: SafeNumber}
     */
    static getImageDimensionsFromWidgetConfig(widgetConfig, context: AppContext, desktopFieldName = 'standardImageSize', mobileFieldName = 'imageSizeMobile', defaultSizesString = '800x450'):
        { width: number | `${number}`, height: number | `${number}` } {
        let dimensionsString: string = '';
        if (UtilsHelper.isMobile(context)) {
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
}
