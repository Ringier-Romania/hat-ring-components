import React from 'react';
import {AppContext} from "../../../../../types/types";
import {GenericListResponseNode, GenericListWidgetConfig} from "../types";
import _ from "lodash";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
import {RingLink} from "../../../../common/RingLink/RingLink";
import {DateHelper_convertDate} from "../../../../../helpers/DateHelper";

export default function CreationTime(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            data: GenericListResponseNode,
        }) {

    if (!data.date?.creationTime) {
        return WidgetHelper_renderEmptyComponent('CreationTime');
    }

    return (
        <div className={['CreationTime'].join(' ')}>
            {data.date.creationTime}
        </div>
    )
}

CreationTime.getFragment = () => {
    return {
        variables: {},
        query: gql`fragment CreationTimeFragment on Story {
            date {
                creationTime
            }
        }`
    }
}

