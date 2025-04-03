import {WebsitesApiClientBuilder} from '@ringpublishing/graphql-api-client';
import {DocumentNode} from "graphql/language/ast";
import {
    CacheHelper_get,
    CacheHelper_set, CacheHelper_runCallbackIfTimeStampHasExpired
} from "../helpers/CacheHelper";
import {MonitoringProvider} from "./MonitoringProvider";

if (!global.HATCacheInCallInProgress) global.HATCacheInCallInProgress = {};

export class WebsiteApiProvider {
    static async call(query: DocumentNode, variables, cacheTtl: null | number = null): Promise<any> {
        const cacheKey = {query: query.loc?.source.body, variables};
        const cacheKeyString = JSON.stringify(cacheKey);
        const queryType = this._determineQueryType(query);
        const tags = this.determineQueryTags(query, variables, queryType);

        try {
            return new Promise(async (resolve, reject) => {
                let cachedResponse = await CacheHelper_get(cacheKey);
                if (!cachedResponse) {
                    if (global.HATCacheInCallInProgress[cacheKeyString]) {
                        await new Promise(() => {
                            const interval = setInterval(async () => {
                                if (!global.HATCacheInCallInProgress[cacheKeyString]) {
                                    resolve(await this.call(query, variables, cacheTtl));
                                    clearInterval(interval);
                                }
                            }, 10);
                        });
                    } else {
                        global.HATCacheInCallInProgress[cacheKeyString] = 1;
                    }
                }
                try {
                    if (cachedResponse) {
                        MonitoringProvider.counter('info.WebsitesApiProvider.call.cachedResponse');
                        CacheHelper_runCallbackIfTimeStampHasExpired(cacheKey, async () => {
                            const response = await this._call(query, variables, 'no-cache', queryType);
                            if (response) {
                                CacheHelper_set(cacheKey, response, cacheTtl, tags);
                            } else {
                                MonitoringProvider.counter('error.WebsitesApiProvider.call.emptyResponse');
                            }
                            delete global.HATCacheInCallInProgress[cacheKeyString];
                        });
                        return resolve(cachedResponse);
                    }
                    MonitoringProvider.counter('info.WebsitesApiProvider.call.nonCachedResponse');
                    const response = await this._call(query, variables, 'no-cache', queryType);
                    if (response) {
                        CacheHelper_set(cacheKey, response, cacheTtl, tags);
                    } else {
                        MonitoringProvider.counter('error.WebsitesApiProvider.call.emptyResponse');
                    }
                    delete global.HATCacheInCallInProgress[cacheKeyString];
                    return resolve(response);
                } catch (e) {
                    delete global.HATCacheInCallInProgress[cacheKeyString];
                    MonitoringProvider.counter('error.WebsitesApiProvider.call.catch');
                    console.error(query.loc?.source.body, variables, e);
                    return resolve(null);
                }
            });
        } catch (e) {
            if (global.HATCacheInCallInProgress) {
                delete global.HATCacheInCallInProgress[cacheKeyString];
            }

            MonitoringProvider.counter('error.WebsitesApiProvider.call.catch');
            console.error(query.loc?.source.body, variables, e);
            return null;
        }

    }

    static _determineQueryType(query: DocumentNode): string {
        const queryTypeDef = {
            'story(': 'Story',
            'config(': 'Config',
            'node(': 'Node',
            'author(': 'Author',
            'stories(': 'Stories',
            'site(': 'Site',
            'section(': 'Section',
        };

        const queryBody = query.loc?.source.body || '';
        let counterType = 'Unspecified';
        for (const [queryType, counterName] of Object.entries(queryTypeDef)) {
            if (queryBody.includes(queryType)) {
                counterType = counterName;
                break;
            }
        }

        return counterType;
    }

    static determineQueryTags(query: DocumentNode, variables: any, queryType): string[] {
        let tags = [];
        if (variables) {
            if (queryType === 'Story') {
                const storyUuid = this._findStoryUuidInQuery(query, variables);
                if (storyUuid) {
                    tags.push(`story_${storyUuid}`);
                }
            }

            if (queryType === 'Config' && variables.variant) {
                tags.push(`config_${variables.variant}`);
            }
        }

        return tags;
    }

    static _findStoryUuidInQuery(query: DocumentNode, variables: any): string | null {
        let storyUuid = null;
        const potentialVariables = ['storyId', 'storyID', 'storyUUID', 'storyUuid', 'id', 'ID', 'uuid', 'UUID', 'Uuid'];
        if (variables) {
            for (const variable of potentialVariables) {
                if (variables[variable]) {
                    storyUuid = variables[variable];
                    break;
                }
            }
        }

        return storyUuid;
    }


    static async _call(query: DocumentNode, variables, fetchPolicy = 'no-cache', queryType: string = 'Unspecified'): Promise<any> {
        try {
            //console.log('call', JSON.stringify(query.loc?.source.body).replace(/\s/g, ''), variables);
            // console.log('call');
            const accessKey = process.env.WEBSITE_API_PUBLIC!;
            const secretKey = process.env.WEBSITE_API_SECRET!;
            const spaceUuid = process.env.WEBSITE_API_NAMESPACE_ID!;

            if (!global.websitesApiApolloClient) {
                global.websitesApiApolloClient = new WebsitesApiClientBuilder({
                    accessKey,
                    secretKey,
                    spaceUuid
                }).buildApolloClient();
            }

            const currentTime = new Date().getTime();
            const timer = MonitoringProvider.timer(
                `info.WebsitesApiProvider.call.hitApiTimer`
            );


            MonitoringProvider.counter(`info.WebsitesApiProvider.call.apiCall_${queryType}`);

            const response = await global.websitesApiApolloClient.query({
                query,
                variables,
                fetchPolicy
            });

            if (timer) {
                timer.done();
            }
            const timeDifference = new Date().getTime() - currentTime;
            if (timeDifference > 4000) {
                console.info('Websites Api long query ', query.loc?.source.body, variables);
            }
            MonitoringProvider.gauge('info.WebsitesApiProvider.call.hitApiTime', timeDifference);
            return response;

        } catch (e) {
            console.error('Websites Api _call error:', variables, e);
            return null;
        }
    }
}


// promises - missing header bug
// let cachedResponse = await CacheHelper_get(cacheKey);
//
// if (!cachedResponse) {
//     if (!global.HATCacheTest) {
//         global.HATCacheTest = {};
//     }
//
//     if (!global.HATCacheTest[cacheKeyString]) {
//         // console.log('missing HATCacheTest')
//         global.HATCacheTest[cacheKeyString] = this._call(query, variables).then((response) => {
//             MonitoringProvider.counter('info.WebsitesApiProvider.call.nonCachedResponse');
//             if (response) {
//                 CacheHelper_set(cacheKeyString, response, cacheTtl);
//             } else {
//                 MonitoringProvider.counter('error.WebsitesApiProvider.call.emptyResponse');
//             }
//             if (response && typeof response === 'object') {
//                 response["isCachedByHat"] = false;
//             }
//             // delete global.HATCacheTest[cacheKeyString];
//             return response;
//         });
//     }
//     // console.log('HATCacheTest')
//     return await global.HATCacheTest[cacheKeyString]
// } else {
//     delete global.HATCacheTest[cacheKeyString];
//     // console.log('cached')
//     MonitoringProvider.counter('info.WebsitesApiProvider.call.cachedResponse');
//
//     CacheHelper_runCallbackIfTimeStampHasExpired(cacheKey, async () => {
//         //console.log('Cache expired, calling api');
//         if (!global.HATCacheInCallInProgress) {
//             global.HATCacheInCallInProgress = {};
//             //console.log('global.HATCacheInCallInProgress initialized');
//         }
//         if (global.HATCacheInCallInProgress[cacheKeyString]) {
//             // console.log('during calling api') ;
//             return false;
//         }
//         global.HATCacheInCallInProgress[cacheKeyString] = 1;
//         const response = await this._call(query, variables);
//         if (response) {
//             CacheHelper_set(cacheKey, response, cacheTtl);
//         } else {
//             MonitoringProvider.counter('error.WebsitesApiProvider.call.emptyResponse');
//         }
//         delete global.HATCacheInCallInProgress[cacheKeyString];
//     });
//     if (cachedResponse && typeof cachedResponse === 'object') {
//         cachedResponse["isCachedByHat"] = true;
//     }
//
//     return cachedResponse;
// }

