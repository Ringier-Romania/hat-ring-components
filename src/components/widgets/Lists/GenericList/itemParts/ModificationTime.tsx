import React from 'react';
import {AppContext} from "../../../../../types/types";
import {GenericListResponseNode, GenericListWidgetConfig} from "../types";
import _ from "lodash";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
import {RingLink} from "../../../../common/RingLink/RingLink";
import {DateHelper_convertDate} from "../../../../../helpers/DateHelper";

export default function ModificationTime(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            data: GenericListResponseNode,
        }) {

    if (!data.date?.modificationTime) {
        return WidgetHelper_renderEmptyComponent('ModificationTime');
    }

    return (
        <div className={['ModificationTime'].join(' ')}>
            {data.date.modificationTime}
        </div>
    )
}

ModificationTime.getFragment = () => {
    return {
        variables: {},
        query: gql`fragment ModificationTimeFragment on Story {
            date {
                modificationTime
            }
        }`
    }
}

