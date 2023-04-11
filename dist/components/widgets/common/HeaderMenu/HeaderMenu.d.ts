/// <reference types="react" />
import { AbstractWidgetConfig, WidgetParams } from "../../../../types/types";
interface HeaderMenuElement {
    "text": string;
    "children": Array<HeaderMenuElement>;
    "url": string;
    "image url": string;
    "image dimensions (eg. 200x200)": string;
    "custom css class": string;
    "hidden": boolean;
    "open in new tab": boolean;
}
interface HeaderMenuConfig extends AbstractWidgetConfig {
    "overrideMenuElements": Array<HeaderMenuElement>;
    "textColor": string;
}
export interface HeaderMenuParams extends WidgetParams {
    widgetConfig: HeaderMenuConfig;
}
export declare function HeaderMenu({ widgetConfig, context }: HeaderMenuParams): JSX.Element;
export {};
