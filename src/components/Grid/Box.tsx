import React from "react";
import * as _ from "lodash";
import {AppContext} from "../../types/types";
import {Widget} from "./Widget";

//@TODO section config type
interface GridBoxParams {
    context: AppContext;
    boxName: string,
    widgets: Array<any>,
    size: number,
    tagName: string
};

//@TODO box tag etc from parent config
export function Box({boxName, widgets, context, size, tagName}: GridBoxParams) {

    const BoxTag = `${tagName || 'div'}`;

    // @ts-ignore
    return <BoxTag className={['gridBox', boxName, 'gridCol' + size].join(' ')}>
        {widgets.map(widgetConfig => {
            return <Widget widgetConfig={widgetConfig} context={context}/>
        })}
    </BoxTag>;
}
