import * as ItemParts from "./itemParts";
import {gql} from "graphql-tag";
import {
    UtilsHelper_convertToInt,
    UtilsHelper_getQueryParam,
    UtilsHelper_getSearchQueryParamKey, UtilsHelper_parsePositiveIntFromString,
    UtilsHelper_stripHtmlTags
} from "../../../../helpers/UtilsHelper";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {AppContext, SiteContentType} from "../../../../types/types";
import _ from "lodash";
import {WidgetHelper_calculateOffsetForGenericListPagination} from "../../../../helpers/GenericListHelper";
import {
    ShowOptionsHelper_buildFragments,
    ShowOptionsHelper_extractExcludedFlags,
    ShowOptionsHelper_mapVariablesTypes
} from "../../../../helpers/ShowOptionsHelper";

export async function GenericList_getData(context: AppContext, queryNodeFragment, widgetConfig, extendableAttributes, currentPage) {
    const searchPhrase = UtilsHelper_stripHtmlTags(UtilsHelper_getQueryParam(UtilsHelper_getSearchQueryParamKey(), context) || '');
    currentPage = UtilsHelper_parsePositiveIntFromString(currentPage) || 1;

    const customItemParts = extendableAttributes?.itemParts || ItemParts;
    const fragmentResult = ShowOptionsHelper_buildFragments({ widgetConfig, customItemParts });
    const { dynamicFragments, dynamicFragmentsNames } = fragmentResult;
    let { dynamicVariablesTypes, dynamicVariables } = fragmentResult;

    let contentFilterId = widgetConfig.customListUuid || _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.category.id') || _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.id') ||  _.get(context, 'hatControllerParams.gqlResponse.data.site.data.node.category.id');
    const nodeCategoryId = _.get(context, 'hatControllerParams.gqlResponse.data.site.data.node.category.id');

    let contentTypeFilter = '';

    switch (context.siteContentType) {
        case SiteContentType.Topic:
            contentTypeFilter = 'topic: {in: [$topicId]}, category: {in: [$nodeCategoryId]}';
            dynamicVariablesTypes = { ...dynamicVariablesTypes, $nodeCategoryId: 'UUID!' };
            dynamicVariables = { ...dynamicVariables, nodeCategoryId };
            break;
        case SiteContentType.Author:
            if (!widgetConfig.customListUuid) {
                contentTypeFilter = 'category: {in: [$topicId]}, author:{in:[$authorId]}';
                dynamicVariablesTypes = { ...dynamicVariablesTypes, $authorId: 'UUID!' };
                contentFilterId = nodeCategoryId;
                dynamicVariables = { ...dynamicVariables, authorId: context.id };
            } else {
                contentTypeFilter = 'category: {in: [$topicId]}';
            }
            break;
        case SiteContentType.Story:
            dynamicVariablesTypes = { ...dynamicVariablesTypes, $storyUuid: 'UUID!' };
            dynamicVariables = { ...dynamicVariables, storyUuid: contentFilterId };
            contentFilterId = nodeCategoryId;
            contentTypeFilter = 'category: {in: [$topicId]}, id:{notIn: [$storyUuid]}';
            break;
        default:
            contentTypeFilter = 'category: {in: [$topicId]}';
            break;
    }
    const searchPhraseFragment = searchPhrase ? `, phrase: $searchPhrase` : '';

    if (searchPhrase) {
        dynamicVariablesTypes = { ...dynamicVariablesTypes, $searchPhrase: 'String!' };
    }
    const mappedDynamicVariablesTypes = ShowOptionsHelper_mapVariablesTypes(dynamicVariablesTypes);

    const excludedFlags = ShowOptionsHelper_extractExcludedFlags(widgetConfig.excludedFlags);

    const isAjaxCall = UtilsHelper_getQueryParam('gridLocationWidgetType', context) === 'genericList';
    const isFirstCall = UtilsHelper_getQueryParam('isFirstCall', context) === '1';
    const offset = WidgetHelper_calculateOffsetForGenericListPagination(widgetConfig, currentPage, isAjaxCall, isFirstCall);
    const queryForDynamicName = getQueryForDynamicName(context, widgetConfig);

    const variables: any = {
        ...dynamicVariables,
        topicId: contentFilterId,
        limit: UtilsHelper_convertToInt(widgetConfig.paginationElements),
        offset: offset,
        excludedFlags: excludedFlags,
    };

    if (searchPhrase) {
        variables.searchPhrase = searchPhrase;
    }


    const query = gql`
        query($topicId: UUID!, $limit: Int!, $excludedFlags: [String!], $offset: Int! ${mappedDynamicVariablesTypes}){
            stories: stories(filter:{${contentTypeFilter}, flag: {notIn:$excludedFlags}},limit: $limit, offset: $offset ${searchPhraseFragment} ){
                total
                genericListReqTotal: total
                edges {
                    node {
                        kind {
                            code
                        }
                        id
                        mainPublicationPoint {
                            url
                        }
                        ${dynamicFragmentsNames}
                        ${queryNodeFragment}
                    }
                }
            }
            ${queryForDynamicName}
        }
        ${dynamicFragments}
    `;

    //console.log(query.loc?.source.body, JSON.stringify(variables));
    const result = await WebsiteApiProvider.call(query, variables, widgetConfig?.cacheTTL);
    return result;
}

function getQueryForDynamicName(context, widgetConfig) {
    const isDynamicNameInHeader = (widgetConfig.generalShowOptions || []).includes("header") && widgetConfig.headerText?.includes('{{dynamicName}}');

    if (isDynamicNameInHeader) {
        switch (context.siteContentType) {
            case SiteContentType.SiteNode:
            case SiteContentType.Story:
            case SiteContentType.Topic:
                return `
                        dynamicName: topic(id: $topicId) {
                            name
                        }
                    `;
            case SiteContentType.Author:
                return `
                        dynamicName: author(id: $authorId) {
                            name
                        }
                    `
            default:
                return "";
        }
    }
    return "";
}
