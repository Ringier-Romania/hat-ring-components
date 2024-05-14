import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import _ from "lodash";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";

export default function Lead(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    if (!data.lead) {
        return WidgetHelper_renderEmptyComponent('Lead', '',true);
    }

    return (
        <div className={['Lead'].join(' ')}>
                <span>{data.lead}</span>
        </div>
    )
}

Lead.getFragment = () => {
    return {
        variables: {},
        query: gql`fragment LeadFragment on SectionItem {
            lead
        }`
    }
}

