/// <reference types="react" />
import { AppContext } from "../../../../../types/types";
import { GenericListResponseNode, GenericListWidgetConfig } from "../types";
declare function Title({ context, widgetConfig, data }: {
    context: AppContext;
    widgetConfig: GenericListWidgetConfig;
    data: GenericListResponseNode;
}): JSX.Element;
declare namespace Title {
    var getFragment: () => {
        variables: {};
        query: import("graphql").DocumentNode;
    };
}
export default Title;
