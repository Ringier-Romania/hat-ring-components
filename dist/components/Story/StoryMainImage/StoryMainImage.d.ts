/// <reference types="react" />
import { ComponentParams } from "../../../types/types";
export interface StoryMainImageResponse {
    "data": {
        "story": {
            "image": {
                "url": string;
                "caption": string | null;
            };
        };
    };
}
export interface StoryMainImageParams extends ComponentParams {
    widgetConfig: {
        width?: number;
        height?: number;
        response?: StoryMainImageResponse;
    };
}
export declare function StoryMainImage(params: StoryMainImageParams): Promise<JSX.Element | null>;
