/// <reference types="react" />
import { WidgetParams } from "../../../types/types";
interface StoryLiveBlogParams extends WidgetParams {
    widgetConfig: {
        response?: any;
        extensionType?: string;
        selector?: string;
        extensionAppCodeName?: string;
    };
}
export declare function StoryLiveBlog({ widgetConfig, context }: StoryLiveBlogParams): Promise<JSX.Element>;
export {};
