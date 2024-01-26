import * as ItemParts from "../../Lists/GenericList/itemParts";
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {AppContext} from "../../../../types/types";
import _ from "lodash";
import {StoryRelatedContentAutocompleteFromEnum, StoryRelatedContentWidgetConfig} from "./types";
import {GenericListResponse} from "../../Lists/GenericList/types";
import {Story} from "@ringpublishing/graphql-api-client/lib/types/websites-api";
import {UtilsHelper_convertToInt, UtilsHelper_getCurrentNodeCategoryId} from "../../../../helpers/UtilsHelper";

export async function StoryRelatedContent_getData(context: AppContext, widgetConfig: StoryRelatedContentWidgetConfig): Promise<GenericListResponse> {
    let dynamicVariablesTypes: any = {};
    let dynamicVariables: any = {};
    let dynamicFragmentsNames = '';


    const dynamicFragments = (widgetConfig.showOptions || []).map((showOption) => {
        const allItemParts = ItemParts;

        const ItemPart = allItemParts[_.upperFirst(showOption)];

        if (ItemPart && ItemPart.getFragment) {
            const fragment = ItemPart.getFragment(widgetConfig);
            if (fragment.variables) {
                dynamicVariables = {...dynamicVariables, ...fragment.variables}
            }

            if (fragment.variablesTypes) {
                dynamicVariablesTypes = {...dynamicVariablesTypes, ...fragment.variablesTypes}
            }

            if (fragment.query) {
                dynamicFragmentsNames += ` ...${fragment.query.definitions[0].name.value} \n`;
                return `${fragment.query.loc?.source.body}`
            }
        }
    }).join('\n');


    let mappedDynamicVariablesTypes = Object.keys(dynamicVariablesTypes).map((key) => {
        return `, ${key}: ${dynamicVariablesTypes[key]}`;
    }).join(' ');


    const query = gql`
        query($storyId: UUID ${mappedDynamicVariablesTypes}){
            story(id:$storyId){
                topics{
                    topic {
                        kind {
                            code
                        }
                        id
                    }
                }
                stories{
                    story {
                        mainPublicationPoint {
                            url
                        }
                        ${dynamicFragmentsNames}
                    }

                }
            }
        }
        ${dynamicFragments}
    `;

    const variables = {
        storyId: context.id,
        ...dynamicVariables,
    };

    let res: GenericListResponse = {data: {stories: {edges: [], total: widgetConfig.paginationElements || 0}}};

    // console.log(query.loc?.source.body, JSON.stringify(variables));
    const result = await WebsiteApiProvider.call(query, variables);

    res.data.stories.edges = res.data.stories.edges.concat(_.get(result, 'data.story.stories', []).map(story => {
        return {node: story.story}
    }));

    if (widgetConfig.autocomplete) {
        switch (widgetConfig.autocompleteFrom) {
            case StoryRelatedContentAutocompleteFromEnum.FirstStoryTag:
                const storiesNodes = await autocompleteByFirstStoryTag(context, widgetConfig, result, dynamicVariables, dynamicFragments, dynamicFragmentsNames, dynamicVariablesTypes);
                res.data.stories.edges = res.data.stories.edges.concat(storiesNodes);

                break;
        }
    }


    res.data.stories.edges = res.data.stories.edges.slice(0, widgetConfig.paginationElements);

    return res;
}

async function autocompleteByFirstStoryTag(context: AppContext, widgetConfig: StoryRelatedContentWidgetConfig, result, dynamicVariables, dynamicFragments, dynamicFragmentsNames, dynamicVariablesTypes): Promise<StoryEdge[]> {

    const tags = _.get(result, 'data.story.topics', []).filter(topic => {
        const topicCodeName = _.get(topic, 'topic.kind.code', null);
        return topicCodeName === 'tag';
    });

    if (tags.length == 0) {
        return [];
    }
    const firstTagUuid = tags[0].topic?.id;

    if (!firstTagUuid) {
        return [];
    }

    const excludedFlags = widgetConfig.excludedFlags ? widgetConfig.excludedFlags.map(flag => {
        return flag.excludedFlag
    }) : null;

    //const nodeCategoryId = UtilsHelper_getCurrentNodeCategoryId(context);

    const contentTypeFilter = 'topic: {in: [$topicId]}';
    //dynamicVariablesTypes.$nodeCategoryId = 'UUID!';
    //dynamicVariables.nodeCategoryId = nodeCategoryId;

    let mappedDynamicVariablesTypes = Object.keys(dynamicVariablesTypes).map((key) => {
        return `, ${key}: ${dynamicVariablesTypes[key]}`;
    }).join(' ');

    const variables: any = {
        ...dynamicVariables,
        topicId: firstTagUuid,
        limit: UtilsHelper_convertToInt(widgetConfig.paginationElements || 0),
        excludedFlags: excludedFlags,
        excludedIds: [context.id]
    };

    const query = gql`
        query($topicId: UUID!, $limit: Int!, $excludedFlags: [String!], $excludedIds: [UUID!], ${mappedDynamicVariablesTypes}){
            stories(filter:{${contentTypeFilter}, flag: {notIn:$excludedFlags}, id:{notIn:$excludedIds}} ,limit: $limit ){
                total
                edges {
                    node {
                        mainPublicationPoint {
                            url
                        }
                        ${dynamicFragmentsNames}
                    }
                }
            }
        }
        ${dynamicFragments}
    `;
    //console.log(query.loc?.source.body, JSON.stringify(variables));
    const response = await WebsiteApiProvider.call(query, variables);
    const res = _.get(response, 'data.stories.edges', []);

    return res;
}
