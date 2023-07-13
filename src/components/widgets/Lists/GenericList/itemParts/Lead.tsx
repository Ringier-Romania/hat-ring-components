import React from 'react';
import {AppContext} from "../../../../../types/types";
import {GenericListResponseNode, GenericListWidgetConfig} from "../types";
import * as _ from "lodash";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
import {RingLink} from "../../../../common/RingLink/RingLink";
import {DateHelper_convertDate} from "../../../../../helpers/DateHelper";

export default async function Lead(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            data: GenericListResponseNode,
        }) {

    // const paragraphFound = _.find(_.get(data, 'content.0.blocks',[]),{__typename:'ParagraphBlock'});
    const paragraphFound = _.get(data, 'content.0.blocks.0',null);

    if (!paragraphFound || !paragraphFound.text) {
        return WidgetHelper_renderEmptyComponent('Lead');
    }

    return (
        <div className={['Lead'].join(' ')} dangerouslySetInnerHTML={{__html: paragraphFound.text}}>

        </div>
    )
}

Lead.getFragment = () => {
    return {
        variables: {},
        query: gql`fragment LeadFragment on Story {
            content{
                blocks {
                    ...on ParagraphBlock{
                        text
                    }
                }
            }
        }`
    }
}

