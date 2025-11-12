// Libraries
import React from 'react';
import {gql} from 'graphql-tag';
import _ from "lodash";

// Providers
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";

//Types
import {AppContext} from "../../../types/types";
import {AlternateLinksResponse} from "./types";
import { AlternateLinksObject } from './AlternateLinks';
import {CacheHelper_createParentChildRelation} from "../../../helpers/CacheHelper";

/**
 * Alternate links from Story publication data/package
 * @param context
 * @param seoConfig
 * @param alternateLinks
 * @constructor
 */
export async function AlternateLinksFromStory(context: AppContext, seoConfig: object, alternateLinks: Array<AlternateLinksObject> = []) {
    let xDefault: string | null = null;
    let alternateStories: any = [];

    const response = await WebsiteApiProvider.call(gql`
        query($storyId: UUID){
            story(id:$storyId){
                stories {
                    story {
                        id
                        publicationPoint {
                            url
                        }
                    }
                    role {
                        code
                    }
                }
            }
        }
    `, {storyId: context.id,}) as AlternateLinksResponse;
    const supportedLanguages = _.get(seoConfig, 'supportedLanguages', []) || [];
    const storiesFromApi: any = _.get(response, 'data.story.stories', []) || [];

    alternateStories = storiesFromApi.filter((alternateStory) => {
        const roleCode = _.get(alternateStory, 'role.code');
        if (!roleCode) return false;

        return supportedLanguages.some((lang) =>
            _.get(lang, 'Alternative role codename') === roleCode
        );
    });

    if (alternateStories.length > 0) {
        alternateLinks = [];

        for (const languageConfig of supportedLanguages) {
            const targetRoleCode = _.get(languageConfig, 'Alternative role codename');

            const matchingStory = alternateStories.find((alternateStory) =>
                _.get(alternateStory, 'role.code') === targetRoleCode
            );

            if (matchingStory) {
                const storyUrl = _.get(matchingStory, 'story.publicationPoint.url');

                if (storyUrl) {
                    alternateLinks.push({
                        hrefLang: _.get(languageConfig, 'Language code'),
                        href: storyUrl
                    });

                    if (_.get(languageConfig, 'Default language') === 'on') {
                        xDefault = storyUrl;
                    }
                }
            }
        }
    }

    if (xDefault) {
        alternateLinks.push({hrefLang: 'x-default', href: xDefault});
    }

    const uniqueStories = _.uniqBy(alternateStories, "story.id");
    CacheHelper_createParentChildRelation(context.id, uniqueStories.map((story) => _.get(story, 'story.id')));

    return alternateLinks;
}
