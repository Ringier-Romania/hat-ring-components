import React from "react";
import * as _ from "lodash";
import {AbstractWidget, AppContext, WidgetParams} from "../../types/types";

interface GridWidgetParams {
    context: AppContext;
    widgetConfig: any,
};

//@TODO box tag etc from parent config
export function Widget({widgetConfig, context}: GridWidgetParams) {
    const availableWidgets = context.customData.widgets;
    const widgetName = _.upperFirst(widgetConfig.widgetType);
    const Component = availableWidgets[widgetName] as AbstractWidget;

    if (!Component) {
        console.error(`No widget with name ${widgetConfig.widgetType}`);
        return <span className={widgetName} style={{display: 'none'}}
                     dangerouslySetInnerHTML={{__html: `<!-- No widget found ${widgetName} -->`}}/>;
    }
    const customClass = widgetConfig.customClass || '';
    return <div className={'gridWidget ' + widgetName + ' ' + customClass}>
        <Component widgetConfig={widgetConfig}
                   context={context}/>
    </div>;
}

