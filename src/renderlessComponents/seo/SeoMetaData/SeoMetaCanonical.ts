import React from "react";
import {gql} from "graphql-tag";
import _ from "lodash";

// Helpers
import {ConfigHelper_currentUrl,} from "../../../helpers/ConfigHelper";
import {
    UtilsHelper_getCurrentPageType,
    UtilsHelper_getQueryParam,
    UtilsHelper_parsePositiveIntFromString
} from "../../../helpers/UtilsHelper";

// Types
import {AppContext, SiteContentType} from "../../../types/types";

// Providers
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";

/**
 * Support for canonicals
 * @param {object} context > Application context
 * @constructor
 */
export async function SeoMetaCanonical(context: AppContext) {
    const pageType = UtilsHelper_getCurrentPageType(context);
    const page = UtilsHelper_parsePositiveIntFromString(UtilsHelper_getQueryParam('page', context));
    let canonicalToReturn = await ConfigHelper_currentUrl(context);

    if ([SiteContentType.Search, SiteContentType.Topic, SiteContentType.SiteNode, SiteContentType.Author].includes(pageType) && page) {
        canonicalToReturn += `?page=${page}`;
    }

    if (pageType === SiteContentType.Story) {
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
        const mainPublicationPointUrl = _.get(canonicalResponse, 'data.story.mainPublicationPoint.url', '');
        const canonicalUrl = _.get(canonicalResponse, 'data.story.canonical.url', '');

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
