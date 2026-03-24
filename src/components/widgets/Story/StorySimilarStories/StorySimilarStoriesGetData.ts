import * as ItemParts from "../../Lists/GenericList/itemParts";
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {AppContext} from "../../../../types/types";
import _ from "lodash";
import {StorySimilarStoriesWidgetConfig} from "./types";
import {GenericListResponse} from "../../Lists/GenericList/types";
import {UtilsHelper_convertToInt} from "../../../../helpers/UtilsHelper";
import {CacheHelper_createParentChildRelation} from "../../../../helpers/CacheHelper";

export async function StorySimilarStories_getData(context: AppContext, widgetConfig: StorySimilarStoriesWidgetConfig): Promise<GenericListResponse> {
    if (!context.id) {
        console.warn('StorySimilarStories_getData: storyId is not defined for url:', context.url);
        return {data: {stories: {edges: [], total: 0}}};
    }

    let dynamicVariablesTypes: any = {};
    let dynamicVariables: any = {};
    let dynamicFragmentsNames = '';

    const dynamicFragments = (widgetConfig.showOptions || []).map((showOption) => {
        const allItemParts = ItemParts;

        const ItemPart = allItemParts[_.upperFirst(showOption)];

        if (ItemPart) {
            let getFragment = ItemPart['getFragment'];
            if (!getFragment) {
                const FragmentPart = allItemParts[_.upperFirst(showOption) + '_getFragment'];
                if (FragmentPart) {
                    getFragment = FragmentPart;
                }
            }
            if (getFragment) {
                const fragment = getFragment(widgetConfig);
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
            } else {
                console.error(`ItemPart getFragment ${showOption} not found`);
            }
        }
    }).join('\n');

    const excludedFlags = widgetConfig.excludedFlags ? widgetConfig.excludedFlags.map(flag => {
        return flag.excludedFlag
    }) : [];

    const allowedKinds = widgetConfig.allowedKinds ? widgetConfig.allowedKinds.map(kind => {
        return kind.kindCode
    }) : [];

    const limit = UtilsHelper_convertToInt(widgetConfig.limit) || 5;

    // Build kind filter
    if (allowedKinds.length > 0) {
        dynamicVariablesTypes.$allowedKinds = '[String!]';
        dynamicVariables.allowedKinds = allowedKinds;
    }

    const mappedDynamicVariablesTypes = Object.keys(dynamicVariablesTypes).map((key) => {
        return `, ${key}: ${dynamicVariablesTypes[key]}`;
    }).join(' ');

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

