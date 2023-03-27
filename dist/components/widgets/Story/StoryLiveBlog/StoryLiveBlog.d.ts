/// <reference types="react" />
import { AbstractWidgetConfig, WidgetParams } from "../../../../types/types";
interface StoryLiveBlogParams extends WidgetParams {
    widgetConfig: StoryLiveBlogParamsConfig;
}
interface StoryLiveBlogParamsConfig extends AbstractWidgetConfig {
    liveBlogId?: string;
    extensionAppCodeName?: string;
    liveBlogPlatformUrl?: string;
    liveBlogClientId: string;
    liveBlogLanguage: string;
}
export declare function StoryLiveBlog({ widgetConfig, context }: StoryLiveBlogParams): Promise<JSX.Element | null>;
export {};
