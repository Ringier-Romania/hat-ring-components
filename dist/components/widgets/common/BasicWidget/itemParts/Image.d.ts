/// <reference types="react" />
import { AppContext } from "../../../../../types/types";
import { BasicWidgetConfig, BasicWidgetResponseNode } from "../types";
declare function Image({ itemIndex, context, widgetConfig, data }: {
    itemIndex: number;
    context: AppContext;
    widgetConfig: BasicWidgetConfig;
    data: BasicWidgetResponseNode;
}): JSX.Element;
declare namespace Image {
    var getFragment: (widgetConfig: any) => {
        query: import("graphql").DocumentNode;
    };
}
export default Image;
