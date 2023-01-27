/// <reference types="react" />
import { AppContext } from "types/types";
interface StoryContentSwitcherParams {
    content: any[];
    context: AppContext;
    config: {
        width: number;
        height: number;
    };
}
export declare function StoryContentSwitcher({ content, config, context }: StoryContentSwitcherParams): JSX.Element[];
export {};
