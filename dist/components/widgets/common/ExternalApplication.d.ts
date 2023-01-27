/// <reference types="react" />
import { WidgetParams } from "types/types";
interface ExternalApplicationParams extends WidgetParams {
    widgetConfig: {
        controllerUrl: string;
    };
}
export declare function ExternalApplication({ widgetConfig, context }: ExternalApplicationParams): Promise<JSX.Element>;
export {};
