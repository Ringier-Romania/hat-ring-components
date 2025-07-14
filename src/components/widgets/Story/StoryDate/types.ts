import {AbstractWidgetConfig, AppContext, ComponentParams, WidgetParams} from "../../../../types/types";

export interface StoryDateWidgetConfig extends AbstractWidgetConfig {
    dateFormat: string,
    dateType: 'modificationTime' | 'creationTime',
    cacheTTL?: number,
}

export interface StoryDateParams extends WidgetParams {
    widgetConfig: StoryDateWidgetConfig
}

export interface StoryDateResponse {
    data: {
        story: {
            date:{
                modificationTime: string,
                creationTime: string
            }
            publication: {
                currentPublicationTime: string,
            }
        }
    }
}
