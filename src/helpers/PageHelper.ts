import type {AppContext, HatControllerParams, SiteContentType} from "../types/types";


export function PageHelper_mapSearchParamsToAppContext(
        controllerParams: HatControllerParams,
        customData: any,
        cssModules: any = {},
    ): AppContext {
        return {
            siteContentType: controllerParams.gqlResponse?.data?.site?.data
                ?.content?.__typename as SiteContentType,
            siteNodeId: controllerParams.gqlResponse?.data?.site?.data?.node?.id,
            id: controllerParams.gqlResponse?.data?.site?.data?.content?.id,
            url: controllerParams.urlWithParsedQuery?.pathname || "/",
            hatControllerParams: controllerParams,
            customData,
            cssModules,
            websiteManagerVariant: controllerParams.websiteManagerVariant,
            domain: controllerParams.domain
        };
    }
