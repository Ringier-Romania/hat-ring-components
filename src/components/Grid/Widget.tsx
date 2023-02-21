import React from "react";
import * as _ from "lodash";
import {AbstractWidget, AbstractWidgetConfig, AppContext, WidgetParams} from "../../types/types";
import {WidgetHelper} from "../../helpers/WidgetHelper";

interface GridWidgetParams {
    context: AppContext;
    widgetConfig: AbstractWidgetConfig,
};

//@TODO box tag etc from parent config
export function Widget({widgetConfig, context}: GridWidgetParams) {
    const availableWidgets = context.customData.widgets;
    const widgetName = _.upperFirst(widgetConfig.widgetType);
    const Component = availableWidgets[widgetName] as AbstractWidget;

    if (!Component) {
        console.error(`No widget with name ${widgetConfig.widgetType}`);
        return WidgetHelper.renderEmptyComponent(`gridWidget ${widgetName}`, 'No widget found');
    }

    if(WidgetHelper.shouldHideWidget(widgetConfig, context)) {
        return WidgetHelper.renderEmptyComponent(`gridWidget ${widgetName}`);
    }

    return <div className={WidgetHelper.getWidgetCssClasses(widgetConfig, ['gridWidget'])}>
        <Component widgetConfig={widgetConfig} context={context}/>
    </div>;
}

