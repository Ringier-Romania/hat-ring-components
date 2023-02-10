/// <reference types="react" />
import { AbstractWidgetConfig, WidgetParams } from "../../../types/types";
interface HtmlInsertParams extends WidgetParams {
    widgetConfig: HtmlInsertConfig;
}
interface HtmlInsertConfig extends AbstractWidgetConfig {
    plainHtml: string;
}
export declare function HtmlInsert({ widgetConfig, context }: HtmlInsertParams): JSX.Element;
export {};
