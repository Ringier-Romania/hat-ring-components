import React from 'react';
import {AppContext} from "../../../../../types/types";
import {GenericListResponseNode, GenericListWidgetConfig} from "../types";
import * as _ from "lodash";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import gql from "graphql-tag";
import {RingLink} from "../../../../common/RingLink/RingLink";

export default function Taxonomies(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            data: GenericListResponseNode,
        }) {

    if (!data.topics) {
        return WidgetHelper_renderEmptyComponent('Taxonomies');
    }

    return (
        <div className={['Taxonomies'].join(' ')}>

            {data.topics?.map((topic, index) => {
                if (!topic) return null;
                let breadcrumbUrl = topic.topic?.nodeReference?.node.breadcrumbs[topic.topic?.nodeReference?.node.breadcrumbs.length - 1];
                let url = breadcrumbUrl ? breadcrumbUrl.url : null || topic.topic?.publicationPoint?.url;
                return <div className={'topic'} data-kind={topic.topic?.kind.code} key={index}>
                    { url ?
                    <RingLink href={url}>
                        <span>{topic.topic?.name}</span>
                    </RingLink> : <span>{topic.topic?.name}</span>
                    }
                </div>
            })}
        </div>
    )
}

Taxonomies.getFragment = () => {
    return {
        variables: {},
        query: gql`fragment TopicsFragment on Story {
            
            topics{
                topic {
                    id
                    nodeReference {
                        node {
                            breadcrumbs {
                                url
                            }
                        }
                    }
                    kind {
                        code
                    }
                    name
                    publicationPoint {
                        url
                    }
                }
            }
        }`
    }
}

