/// <reference types="react" />
import { ComponentParams } from "types/types";
export interface StoryContentParams extends ComponentParams {
    config: {
        width: number;
        height: number;
    };
}
export declare function StoryContent({ config, context }: StoryContentParams): Promise<JSX.Element>;
