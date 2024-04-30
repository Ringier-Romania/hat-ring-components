import React from 'react';
import {AppContext} from "../../../../../types/types";
import {GenericListResponseNode, GenericListWidgetConfig} from "../types";
import _ from "lodash";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";

export default function Title(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            data: GenericListResponseNode,
        }) {

    if (!data?.title) {
        return WidgetHelper_renderEmptyComponent('Title');
    }

    const HeaderTag = (widgetConfig.headerTag && widgetConfig.headerTag !== 'none' ? widgetConfig.headerTag : 'span' ) as keyof JSX.IntrinsicElements;
    let ItemHeaderTag = HeaderTag;

    const itemsHeaderArr = HeaderTag.split('h');
    if (itemsHeaderArr.length === 2) {
        const tagLevel = Number(itemsHeaderArr[1]);
        if (tagLevel >= 6) {
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
        query: gql`fragment TitleFragment on Story {
            title
        }`
    }
}

