import React from "react";
import { DefaultControllerParams } from "hat-server";
export interface AppContext {
    customData: any;
    url: string;
    controllerParams: DefaultControllerParams;
}
export interface ComponentParams {
    context: AppContext;
    config: any;
}
export interface AbstractWidget extends React.ComponentClass<WidgetParams> {
}
export interface WidgetParams {
    context: AppContext;
    widgetConfig: any;
}
export interface AbstractWidgetConfig {
    module: string;
    widgetType: string;
    platformDesktop: boolean;
    platformMobile: boolean;
    customClass: string;
    customPosition: string;
    customWidth: string;
}
