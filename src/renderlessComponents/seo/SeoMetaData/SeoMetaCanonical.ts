import React from "react";
import {gql} from "graphql-tag";
import _ from "lodash";

// Helpers
import {ConfigHelper_currentUrl,} from "@hatRingHelpers/ConfigHelper";
import {UtilsHelper_getCurrentPageType} from "@hatRingHelpers/UtilsHelper";

// Types
import {AppContext, SiteContentType} from "@hatTypes/types";

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
        const mainPublicationPointUrl = _.get(canonicalResponse, 'data.story.mainPublicationPoint.url', '');
        const canonicalUrl = _.get(canonicalResponse, 'data.story.canonical', '');

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
