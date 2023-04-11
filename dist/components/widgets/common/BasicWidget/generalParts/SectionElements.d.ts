/// <reference types="react" />
import { AppContext } from "../../../../../types/types";
import { BasicWidgetConfig, BasicWidgetExtendableAttributes, BasicWidgetResponse } from "../types";
export default function SectionElements({ context, widgetConfig, response, extendableAttributes }: {
    context: AppContext;
    widgetConfig: BasicWidgetConfig;
    response: BasicWidgetResponse;
    extendableAttributes: BasicWidgetExtendableAttributes;
}): JSX.Element;
