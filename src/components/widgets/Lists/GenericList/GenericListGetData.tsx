import * as ItemParts from "./itemParts";
import {gql} from "graphql-tag";
import {UtilsHelper_convertToInt} from "../../../../helpers/UtilsHelper";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {AppContext, SiteContentType} from "../../../../types/types";
import _ from "lodash";

export async function GenericList_getData(context: AppContext, queryNodeFragment, widgetConfig, extendableAttributes, currentPage) {
    let dynamicVariablesTypes:any = {};
    let dynamicVariables = {};
    let dynamicFragmentsNames = '';

    if(context.siteContentType === SiteContentType.Topic){
        dynamicVariablesTypes.$nodeCategoryId = 'UUID!';
    }
    const dynamicFragments = (widgetConfig.showOptions || []).map((showOption) => {
        const allItemParts = extendableAttributes.itemParts || ItemParts;

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

    const mappedDynamicVariablesTypes = Object.keys(dynamicVariablesTypes).map((key) => {
        return `, ${key}: ${dynamicVariablesTypes[key]}`;
    }).join(' ');

    console.log(JSON.stringify(context.hatControllerParams.gqlResponse));
    const contentTypeFilter = context.siteContentType === SiteContentType.Topic
        ? 'topic: {in: [$topicId]}, category: {in: [$nodeCategoryId]}'
        : 'category: {in: [$topicId]}';

    const query = gql`
        query($topicId: UUID!, $limit: Int!, $excludedFlags: [String!], $offset: Int! ${mappedDynamicVariablesTypes}){
            stories(filter:{${contentTypeFilter}, flag: {notIn:$excludedFlags}},limit: $limit, offset: $offset ){
                total
                edges {
                    node {
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

    const excludedFlags = widgetConfig.excludedFlags ? widgetConfig.excludedFlags.map(flag => {
        return flag.excludedFlag
    }) : null;

    const topicId = widgetConfig.customListUuid || _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.category.id') || _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.id');
    const nodeCategoryId = _.get(context, 'hatControllerParams.gqlResponse.data.site.data.node.category.id');

    const offset = (UtilsHelper_convertToInt(widgetConfig.postShift) || 0) + ((currentPage - 1) * UtilsHelper_convertToInt(widgetConfig.paginationElements));
    const variables:any = {
        ...dynamicVariables,
        topicId: topicId,
        limit: UtilsHelper_convertToInt(widgetConfig.paginationElements),
        offset: offset,
        excludedFlags: excludedFlags,
    };

    if(context.siteContentType === SiteContentType.Topic){
        variables.nodeCategoryId = nodeCategoryId;
    }

    //console.log(query.loc?.source.body);
    const result =  await WebsiteApiProvider.call(query, variables);
    return result;
}
