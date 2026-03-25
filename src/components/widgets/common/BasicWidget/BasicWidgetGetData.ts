import * as ItemParts from "./itemParts";
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {AppContext} from "../../../../types/types";
import {ShowOptionsHelper_buildFragments} from "../../../../helpers/ShowOptionsHelper";

export async function BasicWidget_getData(context: AppContext, queryNodeFragment, widgetConfig, extendableAttributes) {
    const customItemParts = extendableAttributes?.itemParts || ItemParts;
    console.log('aaa');
    process.exit();
    const fragmentResult = ShowOptionsHelper_buildFragments({ widgetConfig, customItemParts });
    const { dynamicFragments, dynamicFragmentsNames, dynamicVariables, mappedDynamicVariablesTypes } = fragmentResult;

    const sectionGroup = widgetConfig.sectionGroup || "";
    const querySectionVariablesTypes =
        sectionGroup !== "" ? "$codeName:  ID!, $sectionGroupCodeName: ID!" : "$codeName:  ID!";

    const querySection =
        sectionGroup !== ""
            ? `sectionGroup(codeName: $sectionGroupCodeName, nodeId: $nodeId) {
                    sections(codeName: $codeName)`
            : "section(codeName: $codeName, nodeId: $nodeId)";

    const querySectionClose = sectionGroup !== "" ? "}" : "";

    const query = gql`
            query($nodeId:  ID!, $first: Int ${mappedDynamicVariablesTypes}, ${querySectionVariablesTypes}){
                ${querySection} {
                    basicWidgetCodeName: codeName
                    items(first: $first) {
                        edges {
                            node {
                                id
                                url
                                ... on SectionItem {
                                    originalContent {
                                        ... on Story {
                                            kind {
                                                code
                                            }
                                        }
                                    }
                                }
                                ${dynamicFragmentsNames}
                                ${queryNodeFragment}
                            }
                        }
                    }
                }
                ${querySectionClose}
            }
            ${dynamicFragments}
        `;

    const variables = {
        ...dynamicVariables,
        codeName: widgetConfig.section_name,
        nodeId: context.siteNodeId,
        // there is no offset for sections so:
        // we have to sum offset + count and delete offset items from response object
        first: Number(widgetConfig.offset) + Number(widgetConfig.count) || null,
    };

    if (sectionGroup !== "") {
        Object.assign(variables, {sectionGroupCodeName: sectionGroup});
    }

    return await WebsiteApiProvider.call(query, variables, widgetConfig?.cacheTTL);
}
