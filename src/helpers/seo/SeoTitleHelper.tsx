// Helpers
import {ConfigHelper_getSiteDescription, ConfigHelper_getSiteName} from "../ConfigHelper";
import {UtilsHelper_getCurrentPageType} from "../UtilsHelper";
import {SeoHelper_addTextSeparator} from "./SeoHelper";

// Providers
import {WebsiteApiProvider} from "../../providers/WebsiteApiProvider";

// Libraries
import {gql} from "graphql-tag";
import {get} from "lodash";

/**
 * Helper for handling titles according to the SEO requirements based on the placement of the usage
 * TODO: (1) Add support for seo & social_media_teaser (and other custom teasers) to the WM configuration
 * TODO: (2) Possibility to support fallback names based on the node slug/path
 * @param {object} context > Current page context
 * @param {string} place > Supported place types: default | meta-title | og-title | twitter-title | schema-title
 * @constructor
 */
export async function SeoTitleHelper_pageTitle(context, place: string) {
    const defaultPageTitle = await ConfigHelper_getSiteName(context);
    const defaultPageDescription = await ConfigHelper_getSiteDescription(context);
    const pageType = UtilsHelper_getCurrentPageType(context);

    switch (pageType) {
        case 'Story':
            return await prepareStoryTitle();

        case 'SiteNode':
            return await prepareCategoryTitle();

        case 'Homepage':
        default:
            return prepareDefaultTitle();
    }

    function prepareDefaultTitle() {
        return SeoHelper_addTextSeparator(defaultPageTitle, defaultPageDescription);
    }

    async function getStoryTitles() {
        const storyQuery = gql`
            query($storyId: UUID){
                story(id:$storyId){
                    title
                    leads {
                        title
                        role {
                            name
                        }
                    }
                }
            }
        `;

        const storyResponse = await WebsiteApiProvider.call(storyQuery, {storyId: context.id,});

        return {
            title: get(storyResponse, 'data.story.title', '') || '',
            leads: get(storyResponse, 'data.story.leads', []) || [],
        }
    }

    async function prepareStoryTitle() {
        const storyTitles = await getStoryTitles();
        const title = get(storyTitles, 'title', '');
        const seoTitle = get(get(storyTitles, 'leads', []).find(lead => {return lead.role.name === 'seo'}), 'title'); // TODO: (1)
        const socialMediaTitle = get(get(storyTitles, 'leads', []).find(lead => {return lead.role.name === 'social_media_teaser'}), 'title'); // TODO: (1)

        switch (place) {
            case 'default':
                return `${defaultPageTitle}`;

            case 'meta-title':
            case 'schema-title':
                if (seoTitle) {
                    return SeoHelper_addTextSeparator(seoTitle, defaultPageTitle);
                }

                return SeoHelper_addTextSeparator(title, defaultPageTitle);

            case 'og-title':
            case 'twitter-title':
                if (socialMediaTitle) {
                    return `${socialMediaTitle}`;
                }

                return SeoHelper_addTextSeparator(title, defaultPageTitle);

            default:
                return SeoHelper_addTextSeparator(title, defaultPageTitle);
        }
    }

    async function getCategoryName() {
        const nodeQuery = gql`
            query($url: URL!, $variant:ID!){
                site(url:$url, variantId: $variant){
                    data {
                        node {
                            category {
                                data{
                                    name
                                }
                            }
                        }
                    }
                }
            }
        `;

        const nodeResponse = await WebsiteApiProvider.call(nodeQuery, {
            url: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN + context.url,
            variant: process.env.NEXT_PUBLIC_WEBSITE_API_VARIANT,
        });

        return get(nodeResponse, 'data.site.data.node.category.data.name', '');
    }

    async function prepareCategoryTitle() {
        const categoryName = await getCategoryName();

        switch (place) {
            case 'default':
                return `${defaultPageTitle}`;

            case 'meta-title':
                return SeoHelper_addTextSeparator(categoryName, defaultPageTitle); // TODO: (2)

            case 'og-title':
            case 'schema-title':
            case 'twitter-title':
            default:
                return categoryName;
        }
    }
}
