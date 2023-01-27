/// <reference types="react" />
import { AppContext } from "types/types";
interface GridContainerParams {
    sectionName: string;
    sectionConfig: any;
    boxes: Array<string>;
    context: AppContext;
}
export declare function Container({ sectionName, sectionConfig, context, boxes }: GridContainerParams): JSX.Element;
export {};
