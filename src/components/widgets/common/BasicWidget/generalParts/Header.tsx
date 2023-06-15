import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetExtendableAttributes, BasicWidgetResponse} from "../types";
import * as ItemParts from "../itemParts";
import * as _ from "lodash";
import {RingLink} from "../../../../common/RingLink";
import {WidgetHelper_renderEmptyComponent} from "../../../../../helpers/WidgetHelper";
import {TextReplacer} from "../../../../common/TextReplacer/TextReplacer";

export default function Header(
    {context, widgetConfig, response}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            response: BasicWidgetResponse,
            extendableAttributes: BasicWidgetExtendableAttributes,
        }) {
    const headerText = widgetConfig.labelValue;

    if (!headerText) {
        return WidgetHelper_renderEmptyComponent('Header');
    }

    const HeaderTag = (widgetConfig.headerSeoTag && widgetConfig.headerSeoTag !== 'none' ? widgetConfig.headerSeoTag : 'span' ) as keyof JSX.IntrinsicElements;
    // @todo dynamic text?
    const headerUrl = widgetConfig.labelLink;

    function renderHeaderText(text) {
        return <HeaderTag>
            {/* @ts-expect-error Server Component */}
            <TextReplacer context={context} config={{}}>
                {text}
            </TextReplacer>
        </HeaderTag>
    }

    return (
        <div className={['Header'].join(' ')}>
                {headerUrl && headerText
                    ? <RingLink href={headerUrl}>
                        {renderHeaderText(headerText)}
                    </RingLink>
                    : <>{renderHeaderText(headerText)}</>
                }
        </div>
    )
}

