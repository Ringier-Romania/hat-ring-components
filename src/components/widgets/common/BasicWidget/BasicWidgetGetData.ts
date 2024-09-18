import * as ItemParts from "./itemParts";
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {AppContext} from "../../../../types/types";
import _ from "lodash";

export async function BasicWidget_getData(context: AppContext, queryNodeFragment, widgetConfig, extendableAttributes) {
    let dynamicVariablesTypes = {};
    let dynamicVariables = {};
    let dynamicFragmentsNames = "";

    const dynamicFragments = (widgetConfig.showOptions || [])
        .map((showOption) => {
            const allItemParts = (extendableAttributes ? extendableAttributes.itemParts : null) || ItemParts;
            const ItemPart = allItemParts[_.upperFirst(showOption)];

            if (ItemPart) {
                let getFragment = ItemPart.getFragment;
                if (!getFragment) {
                    const ItemPart = allItemParts[_.upperFirst(showOption) + "_getFragment"];
                    if (ItemPart) {
                        getFragment = ItemPart;
                    }
                }
                if (getFragment) {
                    const fragment = getFragment(widgetConfig);
                    if (fragment.variables) {
                        dynamicVariables = {...dynamicVariables, ...fragment.variables};
                    }

                    if (fragment.variablesTypes) {
                        dynamicVariablesTypes = {...dynamicVariablesTypes, ...fragment.variablesTypes};
                    }

                    if (fragment.query) {
                        dynamicFragmentsNames += ` ...${fragment.query.definitions[0].name.value} \n`;
                        return `${fragment.query.loc?.source.body}`;
                    }
                }
            }
        })
        .join("\n");

    const mappedDynamicVariablesTypes = Object.keys(dynamicVariablesTypes)
        .map((key) => {
            return `, ${key}: ${dynamicVariablesTypes[key]}`;
        })
        .join(" ");

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

    return await WebsiteApiProvider.call(query, variables);
}
