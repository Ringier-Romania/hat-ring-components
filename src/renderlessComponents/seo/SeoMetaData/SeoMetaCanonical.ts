import React from "react";
import {gql} from "graphql-tag";
import {get} from "lodash";

// Helpers
import {ConfigHelper_currentUrl,} from "../../../helpers/ConfigHelper";
import {UtilsHelper_getCurrentPageType} from "../../../helpers/UtilsHelper";

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
    let canonicalToReturn = (await ConfigHelper_currentUrl(context) || '').split('?')[0];

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
        const mainPublicationPointUrl = get(canonicalResponse, 'data.story.mainPublicationPoint.url', '');
        const canonicalUrl = get(canonicalResponse, 'data.story.canonical', '');

        if (canonicalUrl && canonicalUrl !== '') {
            canonicalToReturn = canonicalUrl;
        } else if (mainPublicationPointUrl && mainPublicationPointUrl !== '') {
            canonicalToReturn = mainPublicationPointUrl;
        }
    }

    return {
        alternates: {
            canonical: canonicalToReturn,
        }
    };
}
