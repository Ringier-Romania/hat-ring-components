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
        variablesTypes: {
            $bigImageWidth: string;
            $bigImageHeight: string;
            $imageWidth: string;
            $imageHeight: string;
        } | {
            $bigImageWidth?: undefined;
            $bigImageHeight?: undefined;
            $imageWidth: string;
            $imageHeight: string;
        };
        variables: {
            bigImageWidth: number;
            bigImageHeight: number;
            imageWidth: number;
            imageHeight: number;
        } | {
            bigImageWidth?: undefined;
            bigImageHeight?: undefined;
            imageWidth: number;
            imageHeight: number;
        };
        query: import("graphql").DocumentNode;
    };
}
export default Image;
