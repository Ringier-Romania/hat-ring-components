/// <reference types="react" />
import { AppContext } from "../../types/types";
interface GridWidgetParams {
    context: AppContext;
    widgetConfig: any;
}
export declare function Widget({ widgetConfig, context }: GridWidgetParams): JSX.Element;
export {};
