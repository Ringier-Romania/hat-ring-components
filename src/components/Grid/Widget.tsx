import React from "react";
import * as _ from "lodash";
import {AbstractWidget, AbstractWidgetConfig, AppContext, WidgetParams} from "../../types/types";
import {renderEmptyComponent, shouldHideWidget, getWidgetCssClasses} from "../../helpers";

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
        return renderEmptyComponent(`gridWidget ${widgetName}`, 'No widget found');
    }

    if(shouldHideWidget(widgetConfig, context)) {
        return renderEmptyComponent(`gridWidget ${widgetName}`);
    }

    return <div className={getWidgetCssClasses(widgetConfig, ['gridWidget'])}>
        <Component widgetConfig={widgetConfig} context={context}/>
    </div>;
}

