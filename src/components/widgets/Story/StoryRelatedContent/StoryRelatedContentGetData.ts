import * as ItemParts from "../../Lists/GenericList/itemParts";
import {gql} from "graphql-tag";
import {UtilsHelper_convertToInt} from "../../../../helpers/UtilsHelper";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import {AppContext, SiteContentType} from "../../../../types/types";
import _ from "lodash";
import {StoryRelatedContentWidgetConfig} from "./types";
import {GenericListResponse} from "../../Lists/GenericList/types";

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


    return res;
}
