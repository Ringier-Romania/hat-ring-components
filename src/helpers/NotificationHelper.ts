import {APIContext} from "astro";
import {MonitoringProvider} from "../providers/MonitoringProvider";
import { UtilsHelper_generateRandomString} from "./UtilsHelper";
import {CacheHelper_clearByTag, CacheHelper_getKeysByTag} from "./CacheHelper";

enum NotificationType {
    variantConfigurationChanged = "variantConfigurationChanged",
}

interface NotificationWebsiteApi {
    notificationType: string;
    namespaceId: string;
    variantName?: string;
    variantVersion?: string;
    portalStructureUuid?: string;
    user: string;
    modifiedSections?: string[];
};

interface HatDone {
    hatDone?: boolean;
}

interface NotificationContentApi {
    events: Event[];
}

interface PublicationPoint {
    id: string;
    websiteId: string;
    url: string;
    canonical: boolean;
}

interface Websites {
    [key: string]: {
        status: string;
        message: string | null;
        type: string;
    };
}

interface EventData {
    userId: string;
    objectType: string;
    revision: number;
    status: string;
    objectId: string;
    namespaceId: string;
    message: string;
    type: string;
    publicationId: string;
    firstPublicationDate: string;
    canonicalWebsiteId: string;
    publicationPoints: PublicationPoint[];
    websites: Websites;
}

interface Event {
    clientId: string;
    sourceId: string;
    topicName: string;
    topicVersion: string;
    hookId: string;
    eventTime: string;
    eventId: string;
    eventData: EventData;
}

const podName = process.env.HOSTNAME;
const userAgent = 'RingPublishing HatBot'

export async function NotificationHelper_POST(context: APIContext) {
    handleNotification(context)
    MonitoringProvider.counter(`info.NotificationHandler.response_send_200`);
    return new Response('ok ' + podName, {});
}

async function handleNotification(context) {
    let thisUrl = context.url.href;
    let origin = context.url.origin;

    const timer0 = MonitoringProvider.timer(`info.NotificationHandler.requestJson`);
    let req: any = null;
    try {
        req = await context.request.json() as NotificationWebsiteApi & NotificationContentApi & HatDone;
    } catch (e) {
        MonitoringProvider.counter(`info.NotificationHandler.response_send_500`);
        console.error('error parsing notification request', e);
        console.info(context.request.body);
    }
    if (timer0) {
        timer0.done();
    }
    if (!req) {
        return;
    }

    if (req.notificationType === NotificationType.variantConfigurationChanged && req.variantName) {
        const timer = MonitoringProvider.timer(`info.NotificationHandler.variantConfigurationChanged_CacheHelper_clearByPartialKey`);
        let cacheCleaner = {keys: 0, responses: 0};
        cacheCleaner = await CacheHelper_clearByTag('config_' + req.variantName);

        if (timer) {
            timer.done();
        }

        MonitoringProvider.gauge('info.NotificationHandler.variantConfigurationChanged', cacheCleaner.keys);

        if (!req.hatDone) {
            req.hatDone = true;
            const stringifiedReq = JSON.stringify(req);
            req.hatDone = false;
            setTimeout(async () => {
                repeatRequest(stringifiedReq, thisUrl, origin);
            }, 1000 * 70);
            setTimeout(async () => {
                repeatRequest(stringifiedReq, thisUrl, origin);
            }, 1000 * 305);
        }
    }


    if (req.events) {
        const sourceId = req.events[0]?.sourceId;
        if (sourceId === 'RING::ContentAPI') {
            try {
                const resourceIds = req.events.map((event) => {
                    return {
                        resourceId: event.eventData.objectId,
                        publicationPoints: event.eventData.publicationPoints,
                        objectType: event.eventData.objectType,
                        isNew: !event.eventData.firstPublicationDate
                    }
                });

                for (const {resourceId, publicationPoints, objectType, isNew} of resourceIds) {
                    if (isNew) {
                        continue;
                    }
                    const deleteCount = {
                        keys: 0,
                        responses: 0,
                    }

                    if (objectType === 'Story') {
                        const timer = MonitoringProvider.timer(`info.NotificationHandler.contentApiStory_clearStoryParentsByTags`);
                        const cacheParentCleaner = await clearStoryParentsByTag('story_' + resourceId);
                        deleteCount.keys += cacheParentCleaner.keys;
                        if (timer) {
                            timer.done();
                        }
                    }

                    const timer = MonitoringProvider.timer(`info.NotificationHandler.contentApiStory_CacheHelper_clearByPartialKey`);
                    let cacheCleaner = await CacheHelper_clearByTag('story_' + resourceId);
                    deleteCount.keys += cacheCleaner.keys;

                    if (timer) {
                        timer.done();
                    }

                    MonitoringProvider.gauge('info.NotificationHandler.publicationPoints', publicationPoints.length);
                    for (const publicationPoint of publicationPoints) {
                        const arrUrl = publicationPoint.url.split('/');
                        const pubId = arrUrl[arrUrl.length - 1];
                        const timer2 = MonitoringProvider.timer(`info.NotificationHandler.contentApiStory_pubPoint_CacheHelper_clearByPartialKeyUnlink`);

                        const pubPointsCacheCleaner = await CacheHelper_clearByTag('pubId_' + `${pubId}`);
                        if (timer2) {
                            timer2.done();
                        }
                        deleteCount.keys += pubPointsCacheCleaner.keys;

                        const url = `${publicationPoint.url}?antyCache=${UtilsHelper_generateRandomString()}`;
                        fetch(url, { method: 'HEAD', headers: { 'User-Agent': userAgent, } }).catch(err => {
                            console.error('notification handler fetch error', err);
                            MonitoringProvider.counter('info.NotificationHandler.contentApiStory_pubPoint_CacheHelper_clearByPartialKeyUnlink_fetch_error');

                            setTimeout(async () => {
                                fetch(url, {
                                    method: 'HEAD',
                                    headers: {
                                        'User-Agent': userAgent,
                                    }
                                }).catch((err) => {
                                    console.error('notification handler fetch error catch', err);
                                    MonitoringProvider.counter('info.NotificationHandler.contentApiStory_pubPoint_CacheHelper_clearByPartialKeyUnlink_fetch_error_catch');
                                })
                            }, 1000 * 70);
                        })
                    }
                    MonitoringProvider.gauge('info.NotificationHandler.contentApiStory', deleteCount.keys);

                    if (!req.hatDone) {
                        req.hatDone = true;
                        const stringifiedReq = JSON.stringify(req);
                        req.hatDone = false;
                        setTimeout(async () => {
                            repeatRequest(stringifiedReq, thisUrl, origin);
                        }, 1000 * 70);
                        setTimeout(async () => {
                            repeatRequest(stringifiedReq, thisUrl, origin);
                        }, 1000 * 305);
                    }

                }

            } catch (e) {
                console.error('notification handler error RING::ContentAPI ', e);
            }
        }
    }
    MonitoringProvider.counter(`info.NotificationHandler.${req.hatDone ? 'request_for_repeat_end' : 'request_normal_end'}`);
}

async function repeatRequest(req: any, thisUrl: string, origin: string) {
    if (thisUrl && !req.hatDone) {
        try {
            const options = {
                method: "POST",
                body: req,
                headers: {
                    origin: origin,
                    'User-Agent': userAgent,
                }
            }
            fetch(thisUrl, options).catch(err => {
                console.error('notification handler fetch error repeatRequest', err);
                MonitoringProvider.counter('info.NotificationHandler.repeatRequest_fetch_error');

                setTimeout(async () => {
                    fetch(thisUrl, options).catch(err => {
                        console.error('notification handler fetch error repeatRequest catch', err);
                        MonitoringProvider.counter('info.NotificationHandler.repeatRequest_fetch_error_catch');
                    });
                }, 1000 * 70);
            })
        } catch (e) {
            console.error('notification handler error repeatRequest ', e);
            MonitoringProvider.counter(`info.NotificationHandler.repeatRequest_error`);
        }
        MonitoringProvider.counter('info.NotificationHandler.repeat_done');
    }
}

async function clearStoryParentsByTag(tag) {
    const keys = await CacheHelper_getKeysByTag(tag);

    const deleteCount = {
        keys: 0,
        responses: 0
    }
    if (keys) {
        for (const key of keys) {
            if (key.includes('parent_')) {
                const splitKey = key.replaceAll('"', '').split('_');
                try {
                    const res = await CacheHelper_clearByTag('story_' + `${splitKey[1]}`);
                    deleteCount.keys += res.keys;
                } catch (e) {
                    console.error('clearStoryParentsByTag error parent', e);
                }
            }
        }
    }

    return deleteCount;
}