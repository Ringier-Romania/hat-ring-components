import React from "react";
import upperFirst from 'lodash/upperFirst';
import get from 'lodash/get';
import {AbstractWidgetConfig, AppContext} from "../types/types";
import {UtilsHelper_isDevelopmentMode, UtilsHelper_isMobile} from "./UtilsHelper";
import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../providers/WebsiteApiProvider";
import _ from "lodash";

export function WidgetHelper_shouldHideWidget(widgetConfig, context) {
    if (typeof context.hatControllerParams.isMobile === 'boolean'
        && typeof widgetConfig.platformDesktop === 'boolean'
        && typeof widgetConfig.platformMobile === 'boolean'
    ) {
        return !(
            (context.hatControllerParams.isMobile && widgetConfig.platformMobile)
            || (!context.hatControllerParams.isMobile && widgetConfig.platformDesktop)
        );
    }
    return false;
}

export function WidgetHelper_renderEmptyWidget(widgetConfig, text = '') {
    return WidgetHelper_renderEmptyComponent(upperFirst(widgetConfig.widgetType), text);
}

export function WidgetHelper_renderEmptyComponent(componentClassName, text = '') {
    return (<div className={componentClassName} style={{display: 'none'}}
                 dangerouslySetInnerHTML={{__html: text && `<!-- ${text} -->`}}/>);
}

export function WidgetHelper_getWidgetCssClasses(componentName: string, widgetConfig: AbstractWidgetConfig, context: AppContext, additionalCssClasses: Array<string> = []): string {
    const cssClasses = [] as Array<string>;
    componentName = upperFirst(componentName);

    cssClasses.push(componentName);

    if (get(context, `cssModules.${componentName}`, false)) {
        cssClasses.push(get(context, `cssModules.${componentName}`));
    }

    if (widgetConfig) {
        if (widgetConfig.customWidth && widgetConfig.customWidth !== 'none') {
            cssClasses.push(`widgetWidth${widgetConfig.customWidth}`);
        }

        if (widgetConfig.customPosition && widgetConfig.customPosition !== 'none') {
            cssClasses.push(`widgetPosition${upperFirst(widgetConfig.customPosition)}`);
        }

        if (widgetConfig.customClass && widgetConfig.customClass !== '') {
            cssClasses.push(widgetConfig.customClass);
        }
    }

    return [...additionalCssClasses, ...cssClasses].join(' ');
}

export async function WidgetHelper_findWidgetConfig(context: AppContext, objToCompare, containers: string[], boxes: string[] = ['box_top', 'box_left', 'box_middle', 'box_right', 'box_bottom']): Promise<any> {
    return new Promise(async (resolve, reject) => {
        const variant = process.env.NEXT_PUBLIC_WEBSITE_API_VARIANT;
        const domain = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;
        let variablesQuery = '';
        let configQuery = '';
        containers.forEach(section => {
            configQuery += section + ':config(codeName: "' + section + '"){ data } ';
        })

        const antycache = UtilsHelper_isDevelopmentMode() ? `antycacheStatusCode${new Date().getTime()}` : 'antycacheStatusCode';
        const query = gql`
            query($url: URL!, $variant:ID!){
                site(url:$url, variantId: $variant){
                    ${antycache}:statusCode
                    data {
                        node {
                            config {
                                ${configQuery}
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
        const sectionsConfig = get(response, 'data.site.data.node.config');

        if (!sectionsConfig) {
            return null;
        }

        let widgetFound: any = null;
        containers.forEach(container => {
            const sectionConfig = _.get(sectionsConfig, `${container}.0.data`);
            if (sectionConfig) {
                boxes.forEach(box => {
                    widgetFound = _.find(sectionConfig[box], objToCompare);
                    if (widgetFound) {
                        resolve(widgetFound);
                    }

                })
            }
        })

        resolve(widgetFound)
    });
}
