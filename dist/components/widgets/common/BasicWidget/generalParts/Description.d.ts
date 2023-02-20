/// <reference types="react" />
import { AppContext } from "../../../../../types/types";
import { BasicWidgetConfig, BasicWidgetResponse } from "../types";
export default function Description({ context, widgetConfig, response }: {
    context: AppContext;
    widgetConfig: BasicWidgetConfig;
    response: BasicWidgetResponse;
}): JSX.Element;
