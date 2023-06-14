import {UtilsHelper_isDevelopmentMode} from "./UtilsHelper";
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../providers/WebsiteApiProvider";
import * as _ from "lodash";

export async function ConfigHelper_getConfig(context, configKey) {
    const variant = process.env.NEXT_PUBLIC_WEBSITE_API_VARIANT;
    const domain = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;

    const antycache = UtilsHelper_isDevelopmentMode() ? `antycacheStatusCode${new Date().getTime()}` : 'antycacheStatusCode';
    const query = gql`
        query($url: URL!, $variant:ID!){
            site(url:$url, variantId: $variant){
                ${antycache}:statusCode
                data {
                    node {
                        config {
                            config(codeName: "${configKey}"){
                                data
                            }
                        }
                    }
                }
            }
        }
    `;
    const variables = {
        url: domain + context.url,
        variant: variant,
    };
    const response = await WebsiteApiProvider.call(query, variables);
    const sectionsConfig = _.get(response, 'data.site.data.node.config.config.0.data');
    return sectionsConfig;
}

export async function ConfigHelper_getGeneralConfig(context) {
    return ConfigHelper_getConfig(context, 'general');
}

export async function ConfigHelper_getLanguage(context) {
    const generalSettings = await ConfigHelper_getGeneralConfig(context);
    return generalSettings ? generalSettings.language : 'en';
}

export async function ConfigHelper_getDateFormatConfig(context) {
    return ConfigHelper_getConfig(context, 'dateFormat') as Promise<{
        "timeZone": string,
        "useExtendedDatesFormat": false,
        "sameDay": string,
        "lastDay": string,
        "nextDay": string,
        "lastWeek": string,
        "nextWeek": string,
        "sameElse": string
    }>;
}
