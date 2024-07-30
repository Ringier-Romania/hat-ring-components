import React from 'react';
import {AppContext} from "@hatTypes/types";
import {GenericListResponseNode, GenericListWidgetConfig} from "../types";
import _ from "lodash";
import {WidgetHelper_renderEmptyComponent} from "@hatRingHelpers/WidgetHelper";
import gql from "graphql-tag";
import {RingLink} from "@common/RingLink/RingLink";
import {DateHelper_convertDate} from "@hatRingHelpers/DateHelper";
import {StoryHelper_getLeadBlock} from "@hatRingHelpers/StoryHelper";
import {Story} from "@ringpublishing/graphql-api-client/lib/types/websites-api";

export default function Lead(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            data: GenericListResponseNode,
        }) {

    // const paragraphFound = _.find(_.get(data, 'content.0.blocks',[]),{__typename:'ParagraphBlock'});
    const paragraphFound = StoryHelper_getLeadBlock(data as Story);

    if (!paragraphFound || !paragraphFound.text) {
        return WidgetHelper_renderEmptyComponent('Lead','',true);
    }

    return (
        <div className={['Lead'].join(' ')} >
            <div className={['leadContent'].join(' ')} dangerouslySetInnerHTML={{__html: paragraphFound.text}}></div>
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

