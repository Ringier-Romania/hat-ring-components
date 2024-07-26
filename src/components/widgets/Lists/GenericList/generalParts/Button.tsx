import React from 'react';
import {AppContext} from "@hatTypes/types";
import * as ItemParts from "../itemParts";
import _ from "lodash";
import {RingLink} from "@common/RingLink/RingLink";
import {GenericListResponse, GenericListWidgetConfig} from "../types";

export default function Button(
    {context, widgetConfig, response}:
        {

            context: AppContext,
            widgetConfig: GenericListWidgetConfig,
            response: GenericListResponse
        }) {
    return (
        <div className={['Button'].join(' ')}>
            {widgetConfig.moreUrl
                ? <RingLink href={widgetConfig.moreUrl} title={widgetConfig.moreText}>
                    {widgetConfig.moreText}
                </RingLink>
                : <button type="button" title={widgetConfig.moreText}>{widgetConfig.moreText}</button>
            }
        </div>
    )
}

