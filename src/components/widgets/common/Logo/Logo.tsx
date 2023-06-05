import React from "react";
import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";
import {RingLink} from "../../../common/RingLink";
import {RingImage, TransformType} from "../../../common/RingImage";
import styles from '../../../../../styles/widgets/common/Logo.module.scss';

interface LogoConfig extends AbstractWidgetConfig {
    imageHeight: string
    imageWidth: string
    logoLinkLight: string
    overrideLink: string
    overrideTitle: string
}

export interface LogoParams extends WidgetParams {
    widgetConfig: LogoConfig
}

export function Logo(
    {widgetConfig, context}: LogoParams
) {
    // TODO: Get logo src from general config
    const logoSrc = widgetConfig.logoLinkLight || '';
    // TODO: Get service name from general config
    const logoTitle = widgetConfig.overrideTitle || '';
    // TODO: Get service homepage url from general config
    const logoHref = widgetConfig.overrideLink || '/';

    return <div className={['Logo', widgetConfig.customClass, styles.Logo].join(' ')}>
        {logoSrc &&
            <RingLink href={logoHref}>
                <RingImage src={logoSrc} alt={logoTitle} width={Number(widgetConfig.imageWidth)}
                           height={Number(widgetConfig.imageHeight)} transform={TransformType.ResizeCropAuto}/>
            </RingLink>
        }
    </div>;
}
