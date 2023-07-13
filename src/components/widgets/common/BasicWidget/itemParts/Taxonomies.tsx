import React from 'react';
import {AppContext} from "../../../../../types/types";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
import {RingLink} from "../../../../common/RingLink/RingLink";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";

export default function Taxonomies(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {

    const topics = data.originalContent?.topics?.map((obj) => obj.topic) || [];

    if (!topics || topics.length === 0) {
        return WidgetHelper_renderEmptyComponent('Taxonomies');
    }

    return (
        <div className={['Taxonomies'].join(' ')}>
            {topics.map(topic => {
                let url = topic?.publicationPoint?.url || false;
                return <div className={'topic'} data-kind={topic?.kind?.code}>
                    { url ?
                    <RingLink href={url} title={topic?.name}>
                        <span>{topic?.name}</span>
                    </RingLink> : <span>{topic?.name}</span>
                    }
                </div>
            })}
        </div>
    )
}

Taxonomies.getFragment = () => {
    return {
        variables: {},
        query: gql`fragment TopicsFragment on SectionItem {
            originalContent {
                ... on Story {
                    topics {
                        topic {
                            name
                            kind {
                                code
                            }
                            publicationPoint {
                                url
                            }
                        }
                    }
                }
            }
        }`
    }
}

