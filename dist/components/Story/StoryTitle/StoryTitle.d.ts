/// <reference types="react" />
import { ComponentParams } from "../../../types/types";
export interface StoryTitleResponse {
    data: {
        story: {
            name: string;
        };
    };
}
export interface StoryTitleParams extends ComponentParams {
    widgetConfig: {
        response?: StoryTitleResponse;
    };
}
export declare function StoryTitle(params: StoryTitleParams): Promise<JSX.Element>;
