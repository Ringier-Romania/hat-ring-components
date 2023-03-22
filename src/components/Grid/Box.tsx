import React from "react";
import * as _ from "lodash";
import {AbstractWidgetConfig, AppContext} from "../../types/types";
import {Widget} from "./Widget";
import styles from "../../../styles/Grid/Grid.module.scss";

//@TODO section config type
interface GridBoxParams {
    context: AppContext;
    boxName: string,
    widgets: Array<AbstractWidgetConfig>,
    size: number,
    tagName: string
};

//@TODO box tag etc from parent config
export function Box({boxName, widgets, context, size, tagName}: GridBoxParams) {

    const BoxTag = `${tagName || 'div'}`;
    if (!widgets) {
        return null;
    }
    // @ts-ignore
    return <BoxTag className={['gridBox', boxName, 'gridCol' + size, styles.box].join(' ')}>
        {widgets.map(widgetConfig => {
            return <Widget widgetConfig={widgetConfig} context={context}/>
        })}
    </BoxTag>;
}
