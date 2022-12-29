/// <reference types="react" />
import { ComponentParams } from "../../types/types";
export interface GridParams extends ComponentParams {
    config: {
        sections: string[];
        boxes: string[];
    };
}
export declare function Grid(params: GridParams): Promise<JSX.Element[]>;
