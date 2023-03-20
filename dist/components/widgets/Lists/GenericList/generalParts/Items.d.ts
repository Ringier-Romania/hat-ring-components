/// <reference types="react" />
import { AppContext } from "../../../../../types/types";
import { GenericListExtendableAttributes, GenericListResponse, GenericListWidgetConfig } from "../types";
export default function Items({ context, widgetConfig, response, extendableAttributes }: {
    context: AppContext;
    widgetConfig: GenericListWidgetConfig;
    response: GenericListResponse;
    extendableAttributes: GenericListExtendableAttributes;
}): JSX.Element;
