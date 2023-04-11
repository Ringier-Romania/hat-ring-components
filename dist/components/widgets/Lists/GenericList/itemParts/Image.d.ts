/// <reference types="react" />
import { AppContext } from "../../../../../types/types";
import { GenericListResponseNode, GenericListWidgetConfig } from "../types";
declare function Image({ itemIndex, context, widgetConfig, data }: {
    itemIndex: number;
    context: AppContext;
    widgetConfig: GenericListWidgetConfig;
    data: GenericListResponseNode;
}): JSX.Element;
declare namespace Image {
    var getFragment: (widgetConfig: any) => {
        variables: {
            mainImageWidth: number;
            mainImageHeight: number;
        };
        variablesTypes: {
            $mainImageWidth: string;
            $mainImageHeight: string;
        };
        query: import("graphql").DocumentNode;
    };
}
export default Image;
