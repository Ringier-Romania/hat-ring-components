import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import * as _ from "lodash";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";

export default function Title(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    if (!data.title) {
        return WidgetHelper.renderEmptyComponent('Title');
    }

    const HeaderTag = (widgetConfig.headerSeoTag && widgetConfig.headerSeoTag !== 'none' ? widgetConfig.headerSeoTag : 'span' ) as keyof JSX.IntrinsicElements;
    let ItemHeaderTag = HeaderTag;

    const itemsHeaderArr = HeaderTag.split('h');
    if (itemsHeaderArr.length === 2) {
        const tagLevel = Number(itemsHeaderArr[1]);
        if (tagLevel === 6) {
            ItemHeaderTag = 'span';
        } else {
            ItemHeaderTag = `h${_.clamp(tagLevel + 1, 2, 6)}` as keyof JSX.IntrinsicElements;
        }
    }

    return (
        <div className={['Title'].join(' ')}>
            <ItemHeaderTag>{data.title}</ItemHeaderTag>
        </div>
    )
}

Title.getFragment = () => {
    return {
        variables: {},
        query: gql`fragment TitleFragment on SectionItem {
            title
        }`
    }
}

