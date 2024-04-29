import React from "react";
import {RingLink} from "../../../common/RingLink/RingLink";
import {RingImage} from "../../../common/RingImage";
import {WidgetHelper_getWidgetCssClasses} from "../../../../helpers/WidgetHelper";
import {LogoParams} from "./types";
import styles from '../../../../../styles/widgets/common/Logo.module.scss';
import {TransformType} from "../../../../helpers/AcceleratorImagesHelper";


export function Logo(
    {widgetConfig, context}: LogoParams
) {
    // TODO: Get logo src from general config
    const logoSrc = widgetConfig.logoLinkLight || '';
    // TODO: Get service name from general config
    const logoTitle = widgetConfig.overrideTitle || '';
    // TODO: Get service homepage url from general config
    const logoHref = widgetConfig.overrideLink || '/';

    return <div className={WidgetHelper_getWidgetCssClasses('Logo', widgetConfig, context, [styles.Logo])}>
        {logoSrc &&
            <RingLink href={logoHref}>
                <RingImage src={logoSrc} alt={logoTitle} width={Number(widgetConfig.imageWidth || 200)}
                           height={Number(widgetConfig.imageHeight || 200)} transform={TransformType.ResizeCropAuto}/>
            </RingLink>
        }
    </div>;
}
