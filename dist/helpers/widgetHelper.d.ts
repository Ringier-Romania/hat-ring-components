/// <reference types="react" />
import { AbstractWidgetConfig, AppContext } from "../types/types";
export declare class WidgetHelper {
    static shouldHideWidget(widgetConfig: any, context: any): boolean;
    static renderEmptyWidget(widgetConfig: any, text?: string): JSX.Element;
    static renderEmptyComponent(componentClassName: any, text?: string): JSX.Element;
    static getWidgetCssClasses(widgetConfig: AbstractWidgetConfig, additionalCssClasses?: Array<string>): string;
    static getImageDimensionsFromWidgetConfig(widgetConfig: any, context: AppContext, desktopFieldName?: string, mobileFieldName?: string, defaultSizesString?: string): {
        width: number | `${number}`;
        height: number | `${number}`;
    };
}
