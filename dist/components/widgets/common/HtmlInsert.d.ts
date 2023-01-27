/// <reference types="react" />
import { WidgetParams } from "../../../types/types";
interface HtmlInsertParams extends WidgetParams {
    widgetConfig: {
        plainHtml: string;
    };
}
export declare function HtmlInsert({ widgetConfig, context }: HtmlInsertParams): JSX.Element;
export {};
