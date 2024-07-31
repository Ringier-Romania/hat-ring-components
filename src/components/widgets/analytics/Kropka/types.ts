import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";

export interface KropkaWidgetConfig extends AbstractWidgetConfig {
    dv: string,
    portalId: string,
    target: string,
    tid: string,
    mode: string,
    main: string
}


export interface KropkaParams extends WidgetParams {
    widgetConfig: KropkaWidgetConfig,
}

