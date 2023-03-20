/// <reference types="react" />
import { AppContext } from "../../../../../types/types";
import { BasicWidgetConfig, BasicWidgetResponseNode } from "../types";
declare function Authors({ context, widgetConfig, data }: {
    context: AppContext;
    widgetConfig: BasicWidgetConfig;
    data: BasicWidgetResponseNode;
}): JSX.Element;
declare namespace Authors {
    var getFragment: () => {
        variables: {};
        query: import("graphql").DocumentNode;
    };
}
export default Authors;
