import {AppContext} from "../../../../types/types";
import {gql} from "graphql-tag";
import {StoryHelper_getGqlContentFragment} from "../../../../helpers/StoryHelper";
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";
import _ from "lodash";

export async function StoryContent_getData(context: AppContext, queryStoryFragment: string) {
    const query = gql`
        query($storyId: UUID){
            story(id:$storyId){
                ${StoryHelper_getGqlContentFragment()}
                ${queryStoryFragment}

            }
        }
    `;
    const variables = {
        storyId: context.id,
    };

    const response = await WebsiteApiProvider.call(query, variables);
    return _.get(response, 'data.story.content[0].blocks');
}
