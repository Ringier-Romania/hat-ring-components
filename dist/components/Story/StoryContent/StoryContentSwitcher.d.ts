/// <reference types="react" />
import { AppContext } from "../../../types/types";
interface StoryContentSwitcherParams {
    content: any[];
    context: AppContext;
    widgetConfig: {
        width: number;
        height: number;
    };
}
export declare function StoryContentSwitcher({ content, widgetConfig, context }: StoryContentSwitcherParams): JSX.Element[];
export {};
