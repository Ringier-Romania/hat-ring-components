import * as ItemParts from "./itemParts";
import {gql} from "graphql-tag";
import {
    UtilsHelper_convertToInt, UtilsHelper_stripHtmlTags,
    UtilsHelper_getQueryParam,
    UtilsHelper_getSearchQueryParamKey
} from "../../../../helpers/UtilsHelper";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {AppContext, SiteContentType} from "../../../../types/types";
import _ from "lodash";

export async function GenericList_getData(context: AppContext, queryNodeFragment, widgetConfig, extendableAttributes, currentPage) {
    const searchPhrase = UtilsHelper_stripHtmlTags(UtilsHelper_getQueryParam(UtilsHelper_getSearchQueryParamKey(), context) || '');

    let dynamicVariablesTypes: any = {};
    let dynamicVariables: any = {};
    let dynamicFragmentsNames = '';


    const dynamicFragments = (widgetConfig.showOptions || []).map((showOption) => {
        const allItemParts = (extendableAttributes ? extendableAttributes.itemParts : null) || ItemParts;

        const ItemPart = allItemParts[_.upperFirst(showOption)];

        if (ItemPart) {
            let getFragment = ItemPart.getFragment;
            if(!getFragment){
                const ItemPart = allItemParts[_.upperFirst(showOption)+'_getFragment'];
                if(ItemPart){
                    getFragment = ItemPart;
                }
            }
            if(getFragment){
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
            }else{
                console.error(`ItemPart getFragment ${showOption} not found`);
            }

        }
    }).join('\n');

    let topicId = widgetConfig.customListUuid || _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.category.id') || _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.id');
    const nodeCategoryId = _.get(context, 'hatControllerParams.gqlResponse.data.site.data.node.category.id');

    let contentTypeFilter = '';

    switch (context.siteContentType) {
        case SiteContentType.Topic:
            contentTypeFilter = 'topic: {in: [$topicId]}, category: {in: [$nodeCategoryId]}';
            dynamicVariablesTypes.$nodeCategoryId = 'UUID!';
            dynamicVariables.nodeCategoryId = nodeCategoryId;
            break;
        case SiteContentType.Author:
            if(!widgetConfig.customListUuid){
                contentTypeFilter = 'category: {in: [$topicId]}, author:{in:[$authorId]}';
                dynamicVariablesTypes.$authorId = 'UUID!';
                topicId = nodeCategoryId;
                dynamicVariables.authorId = context.id;
            }else{
                contentTypeFilter = 'category: {in: [$topicId]}';
            }
            break;
        default:
            contentTypeFilter = 'category: {in: [$topicId]}';
            break;
    }
    const searchPhraseFragment = searchPhrase ? `, phrase: $searchPhrase` : '';

    if (searchPhrase) {
        dynamicVariablesTypes.$searchPhrase = 'String!';
    }
    let mappedDynamicVariablesTypes = Object.keys(dynamicVariablesTypes).map((key) => {
        return `, ${key}: ${dynamicVariablesTypes[key]}`;
    }).join(' ');


    const excludedFlags = widgetConfig.excludedFlags ? widgetConfig.excludedFlags.map(flag => {
        return flag.excludedFlag
    }) : null;

    const offset = (UtilsHelper_convertToInt(widgetConfig.postShift) || 0) + ((currentPage - 1) * UtilsHelper_convertToInt(widgetConfig.paginationElements));
    const variables: any = {
        ...dynamicVariables,
        topicId: topicId,
        limit: UtilsHelper_convertToInt(widgetConfig.paginationElements),
        offset: offset,
        excludedFlags: excludedFlags,
    };

    if (searchPhrase) {
        variables.searchPhrase = searchPhrase;
    }

    const query = gql`
        query($topicId: UUID!, $limit: Int!, $excludedFlags: [String!], $offset: Int! ${mappedDynamicVariablesTypes}){
            stories(filter:{${contentTypeFilter}, flag: {notIn:$excludedFlags}},limit: $limit, offset: $offset ${searchPhraseFragment} ){
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
        }
        ${dynamicFragments}
    `;


    //console.log(query.loc?.source.body, JSON.stringify(variables));
    const result = await WebsiteApiProvider.call(query, variables, widgetConfig.cacheTTL);
    return result;
}
