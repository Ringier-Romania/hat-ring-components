/// <reference types="react" />
import { WidgetParams } from "../../../../types/types";
export interface EmbeddedApplicationBlockParams extends WidgetParams {
    blockData: {
        type: string;
        embed: {
            html: string;
        };
    };
}
export default function EmbeddedApplicationBlock({ blockData, context }: EmbeddedApplicationBlockParams): JSX.Element;
