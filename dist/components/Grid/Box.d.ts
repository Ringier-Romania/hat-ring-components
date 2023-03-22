/// <reference types="react" />
import { AbstractWidgetConfig, AppContext } from "../../types/types";
interface GridBoxParams {
    context: AppContext;
    boxName: string;
    widgets: Array<AbstractWidgetConfig>;
    size: number;
    tagName: string;
}
export declare function Box({ boxName, widgets, context, size, tagName }: GridBoxParams): JSX.Element | null;
export {};
