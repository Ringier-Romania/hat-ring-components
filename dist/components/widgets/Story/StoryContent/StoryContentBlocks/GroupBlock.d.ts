/// <reference types="react" />
import { AppContext } from "../../../../../types/types";
export interface GroupBlockParams {
    name: string;
    type: string;
    alignment: string;
    elements: any[];
    widgetConfig: {
        width: number;
        height: number;
    };
    context: AppContext;
}
export default function GroupBlock({ blockData, widgetConfig, context }: {
    blockData: any;
    widgetConfig: any;
    context: any;
}): JSX.Element;
