import React from 'react';
import {AppContext} from "../../../../../types/types";
import {GenericListResponseNode, GenericListWidgetConfig} from "../types";
import * as _ from "lodash";
import {WidgetHelper} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";

export default function Title(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            data: GenericListResponseNode,
        }) {

    if (!data.title) {
        return WidgetHelper.renderEmptyComponent('Title');
    }

    const HeaderTag = 'span' as keyof JSX.IntrinsicElements;
    let ItemHeaderTag = HeaderTag;

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

