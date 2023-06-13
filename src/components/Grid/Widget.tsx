import React from "react";
import * as _ from "lodash";
import {AbstractWidget, AbstractWidgetConfig, AppContext, WidgetParams} from "../../types/types";
import {
    WidgetHelper_getWidgetCssClasses,
    WidgetHelper_renderEmptyComponent,
    WidgetHelper_shouldHideWidget
} from "../../helpers/WidgetHelper";

interface GridWidgetParams {
    context: AppContext;
    widgetConfig: AbstractWidgetConfig,
};

//@TODO box tag etc from parent config
export function Widget({widgetConfig, context}: GridWidgetParams) {
    const availableWidgets = context.customData.widgets;
    const widgetName = _.upperFirst(widgetConfig.widgetType)
    const Component = availableWidgets[widgetName] as AbstractWidget;

    if (!Component) {
        console.error(`No widget with name ${widgetConfig.widgetType}`);
        return WidgetHelper_renderEmptyComponent(`gridWidget gridWidgetType${_.upperFirst(widgetConfig.widgetType)}`, 'No widget found');
    }

    if(WidgetHelper_shouldHideWidget(widgetConfig, context)) {
        return WidgetHelper_renderEmptyComponent(`gridWidget gridWidgetType${_.upperFirst(widgetConfig.widgetType)}`);
    }

    const cssClasses: Array<string> = ['gridWidget']

    if (widgetConfig.widgetType) {
        cssClasses.push(`gridWidgetType${_.upperFirst(widgetConfig.widgetType)}`);
    }

    if (widgetConfig.customWidth && widgetConfig.customWidth !== 'none') {
        cssClasses.push(`gridWidth${widgetConfig.customWidth}`);
    }

    if (widgetConfig.customPosition && widgetConfig.customPosition !== 'none') {
        cssClasses.push(`gridPosition${_.upperFirst(widgetConfig.customPosition)}`);
    }

    return <div className={cssClasses.join(' ')}>
        <Component widgetConfig={widgetConfig} context={context}/>
    </div>;
}

