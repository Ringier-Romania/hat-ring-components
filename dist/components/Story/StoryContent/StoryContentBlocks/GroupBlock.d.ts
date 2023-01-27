/// <reference types="react" />
import { AppContext } from "types/types";
export interface GroupBlockParams {
    name: string;
    type: string;
    alignment: string;
    elements: any[];
    config: {
        width: number;
        height: number;
    };
    context: AppContext;
}
export default function GroupBlock({ blockData, config, context }: {
    blockData: any;
    config: any;
    context: any;
}): JSX.Element;
