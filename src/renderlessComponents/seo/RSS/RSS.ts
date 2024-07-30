import {AppContext, SiteContentType} from "@hatTypes/types";
import {Feed} from "feed";
import {
    ConfigHelper_getGeneralConfig, ConfigHelper_getSeoGeneralConfig,
    ConfigHelper_getSeoRssDefaultConfig
} from "@hatRingHelpers/ConfigHelper";
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";
import _ from "lodash";
import {Story, StoryEdge} from "@ringpublishing/graphql-api-client/lib/types/websites-api";
import {UtilsHelper_convertToInt} from "@hatRingHelpers/UtilsHelper";
import {Item} from "feed/src/typings";
import {RSSGqlQuery} from "./RSSGqlQuery";
import {StoryHelper_generateContentHtml, StoryHelper_getLeadBlock} from "@hatRingHelpers/StoryHelper";

export async function RSS({context}: { context: AppContext }) {
    const seoRssConfig = await ConfigHelper_getSeoRssDefaultConfig(context);
    const generalConfig = await ConfigHelper_getGeneralConfig(context);
    const seoGeneralConfig = await ConfigHelper_getSeoGeneralConfig(context);
    const domain = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN as string;
    const page = UtilsHelper_convertToInt(_.get(context, 'hatControllerParams.urlWithParsedQuery.query.page', 1));

    const query = RSSGqlQuery;

    const categoryId = _.get(context, 'hatControllerParams.gqlResponse.data.site.data.content.category.id');
    const limit = seoRssConfig.limit || 10;
    const offset = ((page - 1) * UtilsHelper_convertToInt(limit));

    const variables = {
        categoryId: categoryId,
        limit: limit,
        offset
    };

    const response = await WebsiteApiProvider.call(query, variables) as {
        data: {
            stories: { total: number, edges: StoryEdge[] }
        },
    };

    const edges = response.data?.stories?.edges || [];

    const feed = new Feed({
        copyright: "",
        id: domain,
        title: "RSS",
        language: generalConfig.language,
        generator: "RAS Tech",
        link: domain + context.url,
    });

    edges.forEach(edge => {
        const story = edge.node as Story;

        let item: Item = {
            title: story.title,
            guid: story.mainPublicationPoint.url,
            link: story.mainPublicationPoint.url,
            date: new Date(story.date?.creationTime),
            image: story.image?.url ? {url: story.image?.url, type: 'image/png'} : undefined,
            content: StoryHelper_generateContentHtml(story),
            // @TODO: media https://github.com/jpmonette/feed/issues/157
        };

        const lead = StoryHelper_getLeadBlock(story);
        if(lead && lead.text){
            item.description = lead.text;
        }

        if (story.authors) {
            item.author = [];
            story.authors.forEach(author => {
                let email = seoGeneralConfig.defaultArticleAuthorEmail;
                author.author.socialProfiles.forEach(socialProfile => {
                    if (socialProfile.role.code === 'email') {
                        email = socialProfile.url.replace('mailto:', '')
                    }
                })
                item.author?.push({
                    name: author?.author?.name || seoGeneralConfig.defaultArticleAuthor,
                    email: email
                });
            })

        } else {
            if (seoGeneralConfig.defaultArticleAuthor && seoGeneralConfig.defaultArticleAuthorEmail) {
                item.author = [{
                    name: seoGeneralConfig.defaultArticleAuthor,
                    email: seoGeneralConfig.defaultArticleAuthorEmail
                }]
            }
        }

        feed.addItem(item);
    })

    switch (seoRssConfig.rssType) {
        case 'RSS Atom 1.0 feed':
            return {feed: feed.atom1(), type: seoRssConfig.rssType};
        case 'RSS 2.0 feed':
            return {feed: feed.rss2(), type: seoRssConfig.rssType};
        default:
            return {feed: feed.rss2(), type: seoRssConfig.rssType};
    }
}


