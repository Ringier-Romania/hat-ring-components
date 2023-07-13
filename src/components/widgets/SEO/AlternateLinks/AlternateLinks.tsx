// Libraries
import React from 'react';
import {gql} from 'graphql-tag';
import get from "lodash/get";

// Providers
import {WebsiteApiProvider} from "../../../../providers/WebsiteApiProvider";

//Types
import {AppContext} from "../../../../types/types";
import {AlternateLinksResponse} from "./types";

// Helpers
import {ConfigHelper_getSeoConfig} from "../../../../helpers/ConfigHelper";

export async function AlternateLinks(context: AppContext) {
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

    const alternateLinks = get(response, 'data.story.stories', []) || [];
    const alternateLinksLength = alternateLinks.length;
    let alternates: object | null = null;

    if (alternateLinksLength > 0) {
        const seoConfig = await ConfigHelper_getSeoConfig(context);
        const supportedLanguages = (get(seoConfig, 'supportedLanguages', []) || []);
        const supportedCodeNames = supportedLanguages.map((language) => {
            return {
                languageCode: language['Language code'],
                alternativeCode: language['Alternative role codename'],
            };
        });

        alternates = {languages: {}};

        for (let i = 0; i < alternateLinksLength; i++) {
            const linkRoleCode = get(alternateLinks[i], 'role.code');
            const supportedLanguage = supportedCodeNames.find(({ alternativeCode }) => alternativeCode === linkRoleCode);

            if (linkRoleCode && supportedLanguage && alternateLinks[i].url) {
                alternates["languages"][supportedLanguage.languageCode] = alternateLinks[i].url;
            }
        }
    }

    return alternates;
}
