/// <reference types="react" />
import { ComponentParams } from "../../../types/types";
export interface StoryContentParams extends ComponentParams {
    widgetConfig: {
        width: number;
        height: number;
    };
}
export declare function StoryContent({ widgetConfig, context }: StoryContentParams): Promise<JSX.Element>;
