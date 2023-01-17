/// <reference types="react" />
import { ComponentParams } from "../../../types/types";
export interface StoryContentParams extends ComponentParams {
    config: {
        width: number;
        height: number;
    };
}
export declare function StoryContent(params: StoryContentParams): Promise<JSX.Element>;
