/// <reference types="react" />
import { AbstractWidgetConfig } from "../types/types";
export declare function shouldHideWidget(widgetConfig: any, context: any): boolean;
export declare function renderEmptyWidget(widgetConfig: any, text?: string): JSX.Element;
export declare function renderEmptyComponent(componentClassName: any, text?: string): JSX.Element;
export declare function getWidgetCssClasses(widgetConfig: AbstractWidgetConfig, additionalCssClasses?: Array<string>): string;
