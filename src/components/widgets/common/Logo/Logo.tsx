import React from "react";
import {RingLink} from "../../../common/RingLink";
import {RingImage, TransformType} from "../../../common/RingImage";
import {WidgetHelper_getWidgetCssClasses} from "../../../../helpers/WidgetHelper";
import {LogoParams} from "./types";


export function Logo(
    {widgetConfig, context}: LogoParams
) {
    // TODO: Get logo src from general config
    const logoSrc = widgetConfig.logoLinkLight || '';
    // TODO: Get service name from general config
    const logoTitle = widgetConfig.overrideTitle || '';
    // TODO: Get service homepage url from general config
    const logoHref = widgetConfig.overrideLink || '/';

    return <div className={WidgetHelper_getWidgetCssClasses(widgetConfig, context)}>
        {logoSrc &&
            <RingLink href={logoHref}>
                <RingImage src={logoSrc} alt={logoTitle} width={Number(widgetConfig.imageWidth || 200)}
                           height={Number(widgetConfig.imageHeight || 200)} transform={TransformType.ResizeCropAuto}/>
            </RingLink>
        }
    </div>;
}
