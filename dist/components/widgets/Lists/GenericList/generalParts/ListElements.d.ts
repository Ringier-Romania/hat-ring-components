/// <reference types="react" />
import { AppContext } from "../../../../../types/types";
import { GenericListResponse, GenericListWidgetConfig } from "../types";
export default function Header({ context, widgetConfig, response }: {
    context: AppContext;
    widgetConfig: GenericListWidgetConfig;
    response: GenericListResponse;
}): JSX.Element;
