/// <reference types="react" />
import { AppContext } from "../../types/types";
interface GridBoxParams {
    context: AppContext;
    boxName: string;
    widgets: Array<any>;
    size: number;
    tagName: string;
}
export declare function Box({ boxName, widgets, context, size, tagName }: GridBoxParams): JSX.Element;
export {};
