import {gql} from "graphql-tag";
import _ from "lodash";

// Helpers
import {ConfigHelper_currentUrl,} from "hat-ring-components/src/helpers/ConfigHelper";
import {
    UtilsHelper_getCurrentPageType,
    UtilsHelper_getQueryParam,
    UtilsHelper_parsePositiveIntFromString
} from "hat-ring-components/src/helpers/UtilsHelper";

// Types
import {AppContext, SiteContentType} from "hat-ring-components/src/types/types";

// Providers
import {WebsiteApiProvider} from "hat-ring-components/src/providers/WebsiteApiProvider";
import {StoryPrefetch_getResponse} from "../../../helpers/StoryPrefetchHelper";

/**
 * Support for canonicals
 */
export async function SeoMetaCanonical(context: AppContext) {
    const pageType = UtilsHelper_getCurrentPageType(context);
    const page = UtilsHelper_parsePositiveIntFromString(UtilsHelper_getQueryParam('page', context));
    let canonicalToReturn = await ConfigHelper_currentUrl(context);

    if ([SiteContentType.Search, SiteContentType.Topic, SiteContentType.SiteNode, SiteContentType.Author].includes(pageType) && page) {
        canonicalToReturn += `?page=${page}`;
    }

    if (pageType === SiteContentType.Story) {
        // Prioritate: prefetch din context
        const prefetchedResponse = StoryPrefetch_getResponse(context);
        let mainPublicationPointUrl = '';
        let canonicalUrl = '';

        if (prefetchedResponse?.data?.story) {
            mainPublicationPointUrl = _.get(prefetchedResponse, 'data.story.mainPublicationPoint.url', '');
            canonicalUrl = _.get(prefetchedResponse, 'data.story.canonical.url', '');
        } else {
            const canonicalQuery = gql`
                query($storyId: UUID){
                    story(id:$storyId){
                        canonical {
                            url
                        }
                        mainPublicationPoint {
                            url
                        }
                    }
                }
            `;

            const canonicalResponse = await WebsiteApiProvider.call(canonicalQuery, {storyId: context.id,});
            mainPublicationPointUrl = _.get(canonicalResponse, 'data.story.mainPublicationPoint.url', '');
            canonicalUrl = _.get(canonicalResponse, 'data.story.canonical.url', '');
        }

        if (canonicalUrl && canonicalUrl !== '') {
            canonicalToReturn = canonicalUrl;
        } else if (mainPublicationPointUrl && mainPublicationPointUrl !== '') {
            canonicalToReturn = mainPublicationPointUrl;
        }
    }

    return {
        canonical: canonicalToReturn,
    };
}

