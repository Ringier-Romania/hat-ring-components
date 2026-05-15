import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "hat-ring-components/src/providers/WebsiteApiProvider";
import type {AppContext} from "hat-ring-components/src/types/types";
import _ from "lodash";
import {StoryHelper_getGqlContentFragment} from "hat-ring-components/src/helpers/StoryHelper";

export type StoryPrefetchModule =
    | 'title'        // title + titles
    | 'leads'        // leads{title,text,role}
    | 'date'         // date + publication
    | 'mainImage'    // image{url,caption,image{...}} fara transforms
    | 'content'      // content{blocks} + flags
    | 'authors'      // authors{author{...}}
    | 'taxonomy'     // topics cu campuri de baza (widget)
    | 'taxonomyFull' // topics cu description (MetaHelper)
    | 'canonical'    // canonical + mainPublicationPoint
    | 'flags'        // flags{code}
    | 'stories'      // stories{story{id,publicationPoint}} pentru AlternateLinks

const PREFETCH_KEY = '_storyPrefetch';

// Fiecare modul defineste campurile GraphQL adaugate in query
// IMPORTANT: gql tag-ul se construieste dinamic ca string, nu ca DocumentNode,
// deoarece campurile sunt compuse la runtime
const MODULE_FRAGMENTS: Record<StoryPrefetchModule, string> = {
    title: `
        title
        titles { text role { code } }
    `,
    leads: `
        leads { title text role { name code } }
    `,
    date: `
        date { creationTime modificationTime }
        publication { currentPublicationTime firstPublicationTime }
    `,
    mainImage: `
        image {
            url
            caption
            image {
                url
                width
                height
                sources { source { name link { url } } }
                license { note }
            }
        }
    `,
    content: `
        StoryContent: id
        ${StoryHelper_getGqlContentFragment()}
        flags { code }
    `,
    authors: `
        authors {
            author {
                publicationPoint { url }
                socialProfiles { url role { code } }
                name
                tagline
                image {
                    image { url }
                    url
                }
                gender { name }
                occupation { position workplace careerStartTime }
                publisher { name cooperationStartTime }
                credentials { issuer issueTime name url role { code name } }
                associations { name url }
                awards { name issueTime issuer url }
                works { role { code } url title }
                topics { topic { name } }
            }
        }
    `,
    taxonomy: `
        topics {
            topic {
                id
                kind { code }
                name
                nodeReference { node { breadcrumbs { url } } }
                publicationPoint { url }
            }
        }
    `,
    taxonomyFull: `
        topics {
            topic {
                id
                kind { code }
                name
                nodeReference { node { parent { name } breadcrumbs { url } } }
                publicationPoint { url }
                description {
                    content {
                        blocks {
                            type
                            ... on ParagraphBlock { text }
                        }
                    }
                }
            }
        }
    `,
    canonical: `
        canonical { url }
        mainPublicationPoint { url }
    `,
    flags: `
        flags { code }
    `,
    stories: `
        stories {
            story {
                id
                publicationPoint { url }
            }
            role { code }
        }
    `,
};

// Module care se suprapun — daca e inclus unul mai complet, nu mai adaugam pe cel simplu
const MODULE_SUPERSEDES: Partial<Record<StoryPrefetchModule, StoryPrefetchModule[]>> = {
    taxonomyFull: ['taxonomy'],
    content: ['flags'],
};

/**
 * Incarca datele story printr-un singur query si le stocheaza in context.customData.
 * Apelat O SINGURA DATA per request, inainte de randul widget-urilor.
 *
 * @param context - AppContext curent
 * @param modules - lista de module dorite (ce campuri sa includa)
 * @param cacheTtl - TTL pentru cache WebsiteApiProvider (secunde), default null
 */
export async function StoryPrefetch_load(
    context: AppContext,
    modules: StoryPrefetchModule[],
    cacheTtl: number | null = null
): Promise<void> {
    if (!context.id || !modules || modules.length === 0) return;

    // Daca prefetch-ul e deja facut pentru acest request, skip
    if (context.customData?.[PREFETCH_KEY]) return;

    // Elimina modulele care sunt superseed-uite de altele deja in lista
    const activeModules = modules.filter(mod => {
        for (const [superMod, superseded] of Object.entries(MODULE_SUPERSEDES)) {
            if (modules.includes(superMod as StoryPrefetchModule) && superseded.includes(mod)) {
                return false;
            }
        }
        return true;
    });

    // Deduplicare campuri
    const addedFragments = new Set<string>();
    const fieldsBody = activeModules
        .filter(mod => MODULE_FRAGMENTS[mod])
        .map(mod => {
            const fragment = MODULE_FRAGMENTS[mod];
            if (addedFragments.has(fragment)) return '';
            addedFragments.add(fragment);
            return fragment;
        })
        .join('\n');

    if (!fieldsBody.trim()) return;

    const query = gql`
        query StoryPrefetch($storyId: UUID) {
            story(id: $storyId) {
                ${fieldsBody}
            }
        }
    `;

    const variables = {storyId: context.id};

    try {
        const response = await WebsiteApiProvider.call(query, variables, cacheTtl);
        if (response?.data?.story) {
            context.customData[PREFETCH_KEY] = response;
        } else if (response === null) {
            console.error('[StoryPrefetch] ❌ QUERY RETURNED NULL — posibil query prea mare (weight exceeded) sau timeout. Componentele vor face query individual ca fallback. storyId:', context.id);
        } else {
            console.warn('[StoryPrefetch] ⚠️ no story data in response:', JSON.stringify(response)?.substring(0, 300));
        }
    } catch (e) {
        console.warn('[StoryPrefetch] Failed to prefetch story data:', e);
    }
}

/**
 * Returneaza raspunsul complet prefetch-at (structura identica cu raspunsul WebsiteApiProvider).
 * Compatibil cu pattern-ul existent widgetConfig?.response.
 */
export function StoryPrefetch_getResponse(context: AppContext): any | null {
    return context.customData?.[PREFETCH_KEY] ?? null;
}

/**
 * Returneaza o valoare specifica din raspunsul prefetch folosind lodash path.
 * Ex: StoryPrefetch_getValue(context, 'data.story.title')
 */
export function StoryPrefetch_getValue(context: AppContext, path: string): any {
    const prefetch = StoryPrefetch_getResponse(context);
    if (!prefetch) return undefined;
    return _.get(prefetch, path);
}

/**
 * Verifica daca prefetch-ul a fost incarcat pentru acest request.
 */
export function StoryPrefetch_isLoaded(context: AppContext): boolean {
    return !!context.customData?.[PREFETCH_KEY];
}

