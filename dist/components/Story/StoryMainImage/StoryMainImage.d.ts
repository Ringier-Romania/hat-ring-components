/// <reference types="react" />
import { ComponentParams } from "types/types";
export interface StoryMainImageParams extends ComponentParams {
    config: {
        width: number;
        height: number;
    };
}
export declare function StoryMainImage(params: StoryMainImageParams): Promise<JSX.Element>;
