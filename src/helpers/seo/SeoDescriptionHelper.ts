// Helpers
import {ConfigHelper_getSiteDescription} from "hat-ring-components/src/helpers/ConfigHelper";
import {StoryHelper_getLeadBlock} from "hat-ring-components/src/helpers/StoryHelper";

// Providers
import {WebsiteApiProvider} from "hat-ring-components/src/providers/WebsiteApiProvider";

// Libraries
import {Story} from "@ringpublishing/graphql-api-client-got/lib/types/websites-api";
import {gql} from "graphql-tag";
import _ from "lodash";
import {SeoHelper_getSeoCurrentPageType} from "hat-ring-components/src/helpers/seo/SeoHelper";
import {StoryPrefetch_getResponse} from "../../helpers/StoryPrefetchHelper";

/**
 * Helper for handling descriptions according to the SEO requirements
 */
export async function SeoDescriptionHelper_pageDescription(context: any, place: string) {
    const defaultPageDescription = await ConfigHelper_getSiteDescription(context);
    const pageType = await SeoHelper_getSeoCurrentPageType(context);

    switch (pageType) {
        case 'Story':
            return prepareStoryDescription();

        case 'SiteNode':
            return prepareCategoryDescription();

        case 'Homepage':
        default:
            return defaultPageDescription;
    }

    async function getStoryDescriptions() {
        // Prioritate: prefetch din context
        const prefetchedResponse = StoryPrefetch_getResponse(context);
        if (prefetchedResponse?.data?.story) {
            return {
                description: _.get(StoryHelper_getLeadBlock(prefetchedResponse.data.story as Story), 'text', '') || '',
                leads: _.get(prefetchedResponse, 'data.story.leads', []) || [],
            };
        }

        const storyQuery = gql`
            query($storyId: UUID){
                story(id:$storyId){
                    content{
                        blocks {
                            ...on ParagraphBlock{
                                text
                            }
                        }
                    }
                    leads {
                        text
                        role {
                            name
                        }
                    }
                }
            }
        `;

        const storyResponse = await WebsiteApiProvider.call(storyQuery, {storyId: context.id,});

        return {
            // @ts-ignore
            description: _.get(StoryHelper_getLeadBlock(storyResponse.data.story as Story), 'text', '') || '',
            leads: _.get(storyResponse, 'data.story.leads', []) || [],
        }
    }

    async function prepareStoryDescription() {
        const storyDescriptions = await getStoryDescriptions();
        const description = _.get(storyDescriptions, 'description', '');
        const seoDescription = _.get(_.get(storyDescriptions, 'leads', []).find((lead: any) => {return lead.role.name === 'seo'}), 'text');
        const socialMediaDescription = _.get(_.get(storyDescriptions, 'leads', []).find((lead: any) => {return lead.role.name === 'social_media_teaser'}), 'text');

        switch (place) {
            case 'default':
                return defaultPageDescription;

            case 'meta-description':
            case 'schema-description':
                if (seoDescription) {
                    return seoDescription || description || defaultPageDescription;
                }

                if (description) {
                    return description || defaultPageDescription;
                }

                return defaultPageDescription;

            case 'og-description':
            case 'twitter-description':
                if (socialMediaDescription) {
                    return socialMediaDescription || description || defaultPageDescription;
                }

                if (description) {
                    return description || defaultPageDescription;
                }

                return defaultPageDescription;

            default:
                if (description) {
                    return description || defaultPageDescription;
                }

                return defaultPageDescription;
        }
    }

    async function prepareCategoryDescription() {
        return '';
    }
}

