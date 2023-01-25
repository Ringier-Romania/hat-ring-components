/// <reference types="react" />
import { WidgetParams } from "../../../types/types";
interface BasicWidgetParams extends WidgetParams {
    widgetConfig: {};
}
export declare function HtmlInsert({ widgetConfig, context }: BasicWidgetParams): JSX.Element;
export {};
