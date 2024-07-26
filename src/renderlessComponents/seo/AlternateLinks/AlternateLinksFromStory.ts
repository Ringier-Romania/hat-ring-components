// Libraries
import React from 'react';
import {gql} from 'graphql-tag';
import _ from "lodash";

// Providers
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";

//Types
import {AppContext} from "@hatTypes/types";
import {AlternateLinksResponse} from "./types";
import { AlternateLinksObject } from './AlternateLinks';

/**
 * Alternate links from Story publication data/package
 * @param context
 * @param seoConfig
 * @param alternateLinks
 * @constructor
 */
export async function AlternateLinksFromStory(context: AppContext, seoConfig: object, alternateLinks: Array<AlternateLinksObject> = []) {
    let xDefault: string | null = null;
    let alternateStories = [];

    const response = await WebsiteApiProvider.call(gql`
        query($storyId: UUID){
            story(id:$storyId){
                stories {
                    url
                    role {
                        code
                    }
                }
            }
        }
    `, {storyId: context.id,}) as AlternateLinksResponse;

    alternateStories = _.get(response, 'data.story.stories', []) || [];
    const alternateStoriesLength = alternateStories.length;

    if (alternateStoriesLength > 0) {
        const supportedLanguages = (_.get(seoConfig, 'supportedLanguages', []) || []);
        const supportedLanguagesLength = supportedLanguages.length;
        alternateLinks = [];

        for (let i = 0; i < supportedLanguagesLength; i++) {
            const language = supportedLanguages[i]['Alternative role codename'];

            for (let j = 0; j < alternateStoriesLength; j++) {
                const linkRole = _.get(alternateStories[j], 'role.code');

                if (alternateStories[j]['url'] && linkRole && linkRole === language) {
                    alternateLinks.push({hrefLang: supportedLanguages[i]['Language code'], href: alternateStories[j]['url']})

                    if (supportedLanguages[i]['Default language'] === 'on') {
                        xDefault = alternateStories[j]['url'];
                    }
                }
            }
        }
    }

    if (xDefault) {
        alternateLinks.push({hrefLang: 'x-default', href: xDefault});
    }

    
    return alternateLinks;
}
