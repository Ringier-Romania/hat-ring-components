import React from "react";
import {AppContext, SiteContentType} from "../../../types/types";
import {ConfigHelper_getMetaDataConfig} from "../../../helpers/ConfigHelper";
import _ from "lodash"
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";
import {UtilsHelper_isHomepage} from "../../../helpers/UtilsHelper";

type StoryDataResponse = {
    "data": {
        "story"?: {
            "topics"?: Array<{
                "topic": {
                    "id": "string"
                }
            }>
        }
    }
}

export async function SeoMetaCustomMetaTags(context: AppContext) {
    const config = await ConfigHelper_getMetaDataConfig(context);
    const other: any = [];
    const isHomePage = UtilsHelper_isHomepage(context);
    const actualPageType = context.siteContentType;
    const actualTopicUuid = _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.category.id', null);
    const notDynamicTypes = ['all', 'homepage', ...Object.keys(SiteContentType)];
    // dynamic type like uuid of topic
    const isDynamicTypeInCustomTags = config.customMetaTags.some((tagObject) => {
        return (_.split(_.get(tagObject, 'siteContentType', 'all'), ',') || []).some(type => !notDynamicTypes.includes(type));
    });
    let topicsOfStory: Array<string> = [];

    if (actualPageType === SiteContentType.Story && isDynamicTypeInCustomTags) {
        const query = gql`
            query($storyId: UUID){
                story(id:$storyId){
                    topics {
                        topic {
                            id
                        }
                    }
                }
            }
        `;

        const variables = {
            storyId: context.id,
        };

        const response = await WebsiteApiProvider.call(query, variables) as StoryDataResponse;
        topicsOfStory = response.data.story?.topics?.map(topic => topic.topic?.id) || [];
    }

    config.customMetaTags.forEach(tagObject => {
        const tag = _.get(tagObject, 'metaTag', '').toLowerCase().replace(/\s/g, '');
        const value = _.get(tagObject, 'tagValue', '').toLowerCase().replace(/\s/g, '');
        const type = _.split(_.get(tagObject, 'siteContentType', 'all'), ',') || [];

        if (tag && value) {
            const isSupportedHomePage = isHomePage && type.includes('homepage');
            const isSupportedPageType = !isHomePage && type.includes(actualPageType);
            const isSupportedTopicUuid = type.includes(actualTopicUuid);
            const isGlobal = type.includes('all');

            let storyHasSupportedTaxonomy = false;

            if (topicsOfStory.length > 0) {
                storyHasSupportedTaxonomy = topicsOfStory.some(topicUuid => type.includes(topicUuid));
            }

            if (isSupportedHomePage || isSupportedPageType || isSupportedTopicUuid || storyHasSupportedTaxonomy || isGlobal) {
                other.push({name: tag, content: value});
            }
        }
    });

    return {
        extend: {
            meta: other
        },
    };
}


