/// <reference types="react" />
import { AbstractWidgetConfig, WidgetParams } from "../../../types/types";
interface ExternalApplicationParams extends WidgetParams {
    widgetConfig: ExternalApplicationConfig;
}
interface ExternalApplicationConfig extends AbstractWidgetConfig {
    controllerUrl: string;
    blockName?: string;
    selector?: string;
}
export declare function ExternalApplication({ widgetConfig, context }: ExternalApplicationParams): Promise<JSX.Element>;
export {};
