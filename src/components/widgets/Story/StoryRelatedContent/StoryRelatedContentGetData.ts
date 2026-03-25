import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {AppContext} from "../../../../types/types";
import _ from "lodash";
import {StoryRelatedContentAutocompleteFromEnum, StoryRelatedContentWidgetConfig} from "./types";
import {GenericListResponse} from "../../Lists/GenericList/types";
import {StoryEdge} from "@ringpublishing/graphql-api-client-got/lib/types/websites-api";
import {UtilsHelper_convertToInt} from "../../../../helpers/UtilsHelper";
import {ConfigHelper_getMainCategoryUuid} from "../../../../helpers/ConfigHelper";
import {CacheHelper_createParentChildRelation} from "../../../../helpers/CacheHelper";
import {
    ShowOptionsHelper_buildFragments,
    ShowOptionsHelper_extractExcludedFlags,
    ShowOptionsHelper_mapVariablesTypes
} from "../../../../helpers/ShowOptionsHelper";

export async function StoryRelatedContent_getData(context: AppContext, widgetConfig: StoryRelatedContentWidgetConfig): Promise<GenericListResponse> {
    if (!context.id) {
        console.warn('StoryRelatedContent_getData: siteNodeId is not defined for url:', context.url);
        return {data: {stories: {edges: [], total: 0}}};
    }

    const fragmentResult = ShowOptionsHelper_buildFragments({ widgetConfig });
    const { dynamicFragments, dynamicFragmentsNames, dynamicVariablesTypes, dynamicVariables, mappedDynamicVariablesTypes } = fragmentResult;

    const query = gql`
        query($storyId: UUID, $relatedContentRole: String! ${mappedDynamicVariablesTypes}){
            story(id:$storyId){
                topics{
                    topic {
                        kind {
                            code
                        }
                        id
                    }
                }
                stories(role: $relatedContentRole){
                    story {
                        id
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
        relatedContentRole: widgetConfig.relatedContentCodeName,
        ...dynamicVariables,
    };

    let res: GenericListResponse = {data: {stories: {edges: [], total: widgetConfig.paginationElements || 0}}};

    const result = await WebsiteApiProvider.call(query, variables, widgetConfig?.cacheTTL);

    res.data.stories.edges = res.data.stories.edges.concat(_.get(result, 'data.story.stories', []).map(story => {
        return {node: story.story}
    }));
    CacheHelper_createParentChildRelation(context.id, res.data.stories.edges.map((edge) => edge?.node?.id));

    if (widgetConfig.autocomplete && (widgetConfig.paginationElements || 0) > res.data.stories.edges.length) {
        switch (widgetConfig.autocompleteFrom) {
            case StoryRelatedContentAutocompleteFromEnum.FirstStoryTag:
                const storiesNodes = await autocompleteByFirstStoryTag(context, widgetConfig, result, fragmentResult);
                res.data.stories.edges = res.data.stories.edges.concat(storiesNodes);
                break;
        }
    }


    res.data.stories.edges = res.data.stories.edges.slice(0, widgetConfig.paginationElements);

    return res;
}

async function autocompleteByFirstStoryTag(
    context: AppContext,
    widgetConfig: StoryRelatedContentWidgetConfig,
    result: any,
    fragmentResult: ReturnType<typeof ShowOptionsHelper_buildFragments>
): Promise<StoryEdge[]> {

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

    const excludedFlags = ShowOptionsHelper_extractExcludedFlags(widgetConfig.excludedFlags);

    const mainCategoryUuid = await ConfigHelper_getMainCategoryUuid(context);
    if (!mainCategoryUuid) {
        console.warn('no main category uuid configured in developers settings in Website Manager');
        return [];
    }

    const contentTypeFilter = 'topic: {in: [$topicId]}, category: {in: [$nodeCategoryId]}';
    const localDynamicVariablesTypes = {
        ...fragmentResult.dynamicVariablesTypes,
        $nodeCategoryId: 'UUID!'
    };
    const localDynamicVariables = {
        ...fragmentResult.dynamicVariables,
        nodeCategoryId: mainCategoryUuid
    };

    const mappedDynamicVariablesTypes = ShowOptionsHelper_mapVariablesTypes(localDynamicVariablesTypes);
    const excludedIds = _.get(result, 'data.story.stories', []).map((story) => story?.story?.id);
    const variables: any = {
        ...localDynamicVariables,
        topicId: firstTagUuid,
        limit: UtilsHelper_convertToInt(widgetConfig.paginationElements || 0),
        excludedFlags: excludedFlags,
        excludedIds: [context.id, ...excludedIds],
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
                        ${fragmentResult.dynamicFragmentsNames}
                    }
                }
            }
        }
        ${fragmentResult.dynamicFragments}
    `;
    //console.log(query.loc?.source.body, JSON.stringify(variables));
    const response = await WebsiteApiProvider.call(query, variables);
    const res = _.get(response, 'data.stories.edges', []);

    return res;
}
