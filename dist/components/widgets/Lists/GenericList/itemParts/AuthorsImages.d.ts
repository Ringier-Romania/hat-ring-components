/// <reference types="react" />
import { AppContext } from "../../../../../types/types";
import { BasicWidgetConfig, BasicWidgetResponseNode } from "../types";
declare function AuthorsImages({ context, widgetConfig, data }: {
    context: AppContext;
    widgetConfig: BasicWidgetConfig;
    data: BasicWidgetResponseNode;
}): JSX.Element;
declare namespace AuthorsImages {
    var getFragment: () => {
        variables: {};
        query: import("graphql").DocumentNode;
    };
}
export default AuthorsImages;
