/// <reference types="react" />
import { AppContext } from "../../../../../types/types";
import { GenericListResponse, GenericListWidgetConfig } from "../types";
export default function Pagination({ context, widgetConfig, response, currentPage }: {
    context: AppContext;
    widgetConfig: GenericListWidgetConfig;
    response: GenericListResponse;
    currentPage: number;
}): JSX.Element;
