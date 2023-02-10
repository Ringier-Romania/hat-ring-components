/// <reference types="react" />
import { AbstractWidgetConfig, AppContext } from "../../types/types";
interface GridWidgetParams {
    context: AppContext;
    widgetConfig: AbstractWidgetConfig;
}
export declare function Widget({ widgetConfig, context }: GridWidgetParams): JSX.Element;
export {};
