import React from "react"
import {BreadcrumbList, ListItem, NewsArticle, Organization, Thing, WithContext} from 'schema-dts';
import {AppContext, SiteContentType} from "../../../types/types";
import {
    SeoHelper_getContactNumber,
    SeoHelper_getServiceDescription,
    SeoHelper_getServiceLogo,
    SeoHelper_getServiceName
} from "../../../helpers/seo/SeoHelper";
import {last, startCase} from "lodash";
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../../providers/WebsiteApiProvider";
import get from "lodash/get";
import {ConfigHelper_currentUrl, ConfigHelper_getHomepageUrl} from "../../../helpers/ConfigHelper";
import {UtilsHelper_isHomepage} from "../../../helpers/UtilsHelper";

export async function SchemaOrg({context}: { context: AppContext }) {
    const isHomePage = UtilsHelper_isHomepage(context);
    const isArticle = context.siteContentType === SiteContentType.Story;
    return <>
        {isHomePage && JsonLd(await getOrganizationSchema(context))}
        {!isHomePage && JsonLd(await getBreadcrumbListSchema(context))}
        {isArticle && JsonLd(await getNewsArticleSchema(context))}
    </>
}

export async function getOrganizationSchema(context): Promise<WithContext<Organization>> {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${await ConfigHelper_getHomepageUrl(context)}/#organization`,
        "name": await SeoHelper_getServiceName(context),
        "url": await ConfigHelper_getHomepageUrl(context),
        "logo": SeoHelper_getServiceLogo(),
        "description": SeoHelper_getServiceDescription(),
        // "sameAs": [], // social media list
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": SeoHelper_getContactNumber(),
            "contactType": "Customer Service"
        }
    };
}

export async function getBreadcrumbListSchema(context: AppContext): Promise<WithContext<BreadcrumbList>> {
    // TODO: add seoSettings.useTaxonomyPrefixPage support for topic
    const homepageUrl = await ConfigHelper_getHomepageUrl(context);
    const itemListElement: Array<ListItem> = [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": homepageUrl
    }];

    const splitUrl = context.url.split('/').filter(url => url);
    const breadcrumbsPaths: Array<string> = [];

    splitUrl.reduce((prev, curr, index) => {
        // a, a/b, a/b/c
        const breadcrumb = `${prev}/${curr}`;
        breadcrumbsPaths.push(breadcrumb);
        return breadcrumb;
    }, '');

    if (context.siteContentType === SiteContentType.Story) {
        // removing breadcrumb with only name - without id
        breadcrumbsPaths.splice(breadcrumbsPaths.length - 2, 1);
    }

    breadcrumbsPaths.forEach((breadcrumbPath, index) => {
        const splittedPath = breadcrumbPath.split('/');
        if (context.siteContentType === SiteContentType.Story && index === breadcrumbsPaths.length - 1) {
            // removing story id from path
            splittedPath.splice(splittedPath.length - 1, 1);
        }

        const nameFromLastPathSegment = startCase(last(splittedPath));
        itemListElement.push({
            "@type": "ListItem",
            "position": index + 2,
            "name": nameFromLastPathSegment,
            "item": `${homepageUrl}${breadcrumbPath}`
        })
    })

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": itemListElement
    };
}

export async function getNewsArticleSchema(context: AppContext): Promise<WithContext<NewsArticle>> {
    const homepageUrl = await ConfigHelper_getHomepageUrl(context);
    const articleUrl = await ConfigHelper_currentUrl(context);

    const query = gql`
        query($storyId: UUID){
            story(id:$storyId){
                title
                date {
                    creationTime
                    modificationTime
                }
                image {
                    url
                }
                authors {
                    author {
                        name
                    }
                }
                topics(kind:"tag") {
                    topic {
                        name
                    }
                }
                content {
                    blocks {
                        ...on ParagraphBlock {
                            text
                        }
                    }
                }
            }
        }
    `;

    const variables = {
        storyId: context.id,
    };

    const response = await WebsiteApiProvider.call(query, variables);
    const authors = get(response, 'data.story.authors', []).map(authorObj => {
        return {
            "@type": "Person",
            "name": authorObj.author.name
        }
    })

    const dateModified = get(response, 'data.story.date.modificationTime') || get(response, 'data.story.date.creationTime');
    const datePublished = get(response, 'data.story.date.creationTime');
    const tagNames = get(response, 'data.story.topics', []).map((topicObj) => {
        return topicObj.topic.name
    })

    return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${articleUrl}`,
            "primaryImageOfPage": {
                "@id": `${articleUrl}#mainPhoto`
            },
        },
        "headline": get(response, 'data.story.title', ''),
        "image": [get(response, 'data.story.image.url', '')],
        "datePublished": datePublished,
        "dateModified": dateModified,
        "author": authors,
        "publisher": {
            "@type": "Organization",
            "name": await SeoHelper_getServiceName(context),
            "logo": {
                "@type": "ImageObject",
                "url": SeoHelper_getServiceLogo(),
            }
        },
        "keywords": tagNames,
        "description": get(get(response, 'data.story.content[0].blocks', []).filter(block => block.text), '[0].text', ''),
        "isAccessibleForFree": true
    }
}


export function JsonLd<T extends Thing>(json: WithContext<T>): JSX.Element {
    return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(json)}}/>;
}

