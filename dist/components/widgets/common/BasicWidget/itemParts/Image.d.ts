/// <reference types="react" />
import { AppContext } from "types/types";
import { BasicWidgetConfig, BasicWidgetResponseNode } from "../types";
export default function Image({ context, widgetConfig, data }: {
    context: AppContext;
    widgetConfig: BasicWidgetConfig;
    data: BasicWidgetResponseNode;
}): JSX.Element | null;
