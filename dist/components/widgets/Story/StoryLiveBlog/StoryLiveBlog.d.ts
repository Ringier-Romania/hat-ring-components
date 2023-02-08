/// <reference types="react" />
import { WidgetParams } from "../../../../types/types";
interface StoryLiveBlogParams extends WidgetParams {
    widgetConfig: {
        liveBlogId?: string;
        extensionAppCodeName?: string;
        liveBlogPlatformUrl?: string;
        liveBlogClientId: string;
        liveBlogLanguage: string;
    };
}
export declare function StoryLiveBlog({ widgetConfig, context }: StoryLiveBlogParams): Promise<JSX.Element>;
export {};
