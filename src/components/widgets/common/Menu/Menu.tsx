import React from "react";
import * as _ from 'lodash';
import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";
import {RingLink} from "../../../common/RingLink";
import {RingImage} from "../../../common/RingImage";
import styles from '../../../../../styles/widgets/common/Menu.module.scss';
import {WidgetHelper_getWidgetCssClasses} from "../../../../helpers/WidgetHelper";

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

    function renderMenuElement(menuElement: MenuElement) {
        const item = <>
            <span className={'text'}>{menuElement.text}</span>
            {
                menuElement["image url"] && menuElement["image dimensions (eg. 200x200)"] &&
                <RingImage src={menuElement["image url"]} alt={menuElement.text} width={200} height={200}/>
            }
            {
                menuElement.children && menuElement.children.length > 0 &&
                <ul>{menuElement.children.map((menuElement) => {
                    return renderMenuElement(menuElement);
                })}</ul>
            }</>;

        const currentUrl = _.get(context, 'hatControllerParams.urlWithParsedQuery.pathname') || context.url;
        const isActive = currentUrl == menuElement.url;

        return menuElement.hidden ? null :
            <li className={[menuElement["custom css class"], isActive ? 'active' : ''].join(' ')}>
                {menuElement.url ?
                    <RingLink href={menuElement.url} target={menuElement["open in new tab"] ? '_blank' : ''}>
                        {item}
                    </RingLink> : <>{item}</>
                }

            </li>
    }

    return <nav className={WidgetHelper_getWidgetCssClasses(widgetConfig, context)}
    >
        <ul>
            {widgetConfig.overrideMenuElements.map((menuElement) => {
                return renderMenuElement(menuElement);
            })}
        </ul>
    </nav>;
}
