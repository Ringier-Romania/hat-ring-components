import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {AppContext} from "../../../../types/types";
import _ from "lodash";
import {StorySimilarStoriesWidgetConfig} from "./types";
import {GenericListResponse} from "../../Lists/GenericList/types";
import {UtilsHelper_convertToInt} from "../../../../helpers/UtilsHelper";
import {CacheHelper_createParentChildRelation} from "../../../../helpers/CacheHelper";
import {
    ShowOptionsHelper_buildFragments,
    ShowOptionsHelper_extractExcludedFlags,
    ShowOptionsHelper_extractAllowedKinds,
    ShowOptionsHelper_mapVariablesTypes
} from "../../../../helpers/ShowOptionsHelper";

export async function StorySimilarStories_getData(context: AppContext, widgetConfig: StorySimilarStoriesWidgetConfig): Promise<GenericListResponse> {
    if (!context.id) {
        console.warn('StorySimilarStories_getData: storyId is not defined for url:', context.url);
        return {data: {stories: {edges: [], total: 0}}};
    }

    const fragmentResult = ShowOptionsHelper_buildFragments({ widgetConfig });
    let { dynamicVariablesTypes, dynamicVariables } = fragmentResult;
    const { dynamicFragments, dynamicFragmentsNames } = fragmentResult;

    const excludedFlags = ShowOptionsHelper_extractExcludedFlags(widgetConfig.excludedFlags);
    const allowedKinds = ShowOptionsHelper_extractAllowedKinds(widgetConfig.allowedKinds);
    const limit = UtilsHelper_convertToInt(widgetConfig.limit) || 5;

    // Build kind filter
    if (allowedKinds.length > 0) {
        dynamicVariablesTypes = { ...dynamicVariablesTypes, $allowedKinds: '[String!]' };
        dynamicVariables = { ...dynamicVariables, allowedKinds };
    }

    const mappedDynamicVariablesTypes = ShowOptionsHelper_mapVariablesTypes(dynamicVariablesTypes);

    const variables: any = {
        storyId: context.id,
        limit: limit,
        excludedFlags: excludedFlags,
        ...dynamicVariables,
    };

    // Build filter conditions
    let filterConditions = 'flag: {notIn: $excludedFlags}';
    if (allowedKinds.length > 0) {
        filterConditions += ', kind: {in: $allowedKinds}';
    }

    const query = gql`
        query StorySimilarStoriesQuery($storyId: UUID!, $limit: Int!, $excludedFlags: [String!] ${mappedDynamicVariablesTypes}){
            stories(similar: {id: $storyId}, limit: $limit, filter: {${filterConditions}, canonical: true }) {
                total
                edges {
                    node {
                        id
                        kind {
                            code
                        }
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

    const result = await WebsiteApiProvider.call(query, variables, widgetConfig?.cacheTTL);

    const res: GenericListResponse = {
        data: {
            stories: {
                edges: _.get(result, 'data.stories.edges', []),
                total: _.get(result, 'data.stories.total', 0)
            }
        }
    };

    CacheHelper_createParentChildRelation(context.id, res.data.stories.edges.map((edge) => edge?.node?.id));

    return res;
}
