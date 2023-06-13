import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";

export interface LogoConfig extends AbstractWidgetConfig {
    imageHeight: string
    imageWidth: string
    logoLinkLight: string
    overrideLink: string
    overrideTitle: string
}

export interface LogoParams extends WidgetParams {
    widgetConfig: LogoConfig
}
