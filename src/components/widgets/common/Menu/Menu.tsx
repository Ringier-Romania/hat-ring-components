import React from "react";
import _ from 'lodash';
import {AbstractWidgetConfig, WidgetParams} from "@hatTypes/types";
import {RingLink} from "@common/RingLink/RingLink";
import {RingImage} from "@common/RingImage";
import styles from '../../../../../styles/widgets/common/Menu.module.scss';
import {WidgetHelper_getWidgetCssClasses} from "@hatRingHelpers/WidgetHelper";
import {ImageHelper_getImageDimensionsFromObject} from "@hatRingHelpers/ImageHelper";
import {TransformType} from "@hatRingHelpers/AcceleratorImagesHelper";

interface MenuElement {
    "text": string,
    "children": Array<MenuElement>,
    "url": string,
    "image url": string,
    "image dimensions (eg. 200x200)": string,
    "custom css class": string,
    "hidden": boolean,
    "open in new tab": boolean,
}

interface MenuConfig extends AbstractWidgetConfig {
    "overrideMenuElements": Array<MenuElement>,
    "textColor": string,
};

export interface MenuParams extends WidgetParams {
    widgetConfig: MenuConfig
}

export function Menu(
    {widgetConfig, context}: MenuParams
) {

    function renderMenuElement(menuElement: MenuElement, index) {
        const imageDimensions = ImageHelper_getImageDimensionsFromObject(menuElement, context, "image dimensions (eg. 200x200)");
        const item = <>
            <span className={'text'}>{menuElement.text}</span>
            {
                menuElement["image url"] && menuElement["image dimensions (eg. 200x200)"] &&
                <RingImage src={menuElement["image url"]} alt={menuElement.text} width={imageDimensions.width}
                           height={imageDimensions.height} transform={TransformType.ResizeCropAuto}/>
            }
            {
                menuElement.children && menuElement.children.length > 0 &&
                <ul>{menuElement.children.map((menuElement, index) => {
                    return renderMenuElement(menuElement, index);
                })}</ul>
            }</>;

        const currentUrl = _.get(context, 'hatControllerParams.urlWithParsedQuery.pathname') || context.url;
        const isActive = currentUrl == menuElement.url;

        return menuElement.hidden ? null :
            <li className={[menuElement["custom css class"], isActive ? 'active' : ''].join(' ')} key={index}>
                {menuElement.url ?
                    <RingLink href={menuElement.url} title={menuElement.text}
                              target={menuElement["open in new tab"] ? '_blank' : undefined}>
                        {item}
                    </RingLink> : <>{item}</>
                }

            </li>
    }

    return <div className={WidgetHelper_getWidgetCssClasses('Menu', widgetConfig, context, [styles.Menu])}
    >
        <ul>
            {widgetConfig.overrideMenuElements.map((menuElement, index) => {
                return renderMenuElement(menuElement, index);
            })}
        </ul>
    </div>;
}
