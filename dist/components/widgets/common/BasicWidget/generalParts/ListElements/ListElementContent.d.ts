/// <reference types="react" />
import { AppContext } from "../../../../../../types/types";
import { BasicWidgetConfig, ListElementsData } from "../../types";
export default function ListElementContent({ context, widgetConfig, data }: {
    context: AppContext;
    widgetConfig: BasicWidgetConfig;
    data: ListElementsData;
}): JSX.Element;
