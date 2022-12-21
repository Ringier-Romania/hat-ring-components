export enum SiteContentType {
    Author = "Author",
    CustomAction = 'CustomAction',
    SiteNode = 'SiteNode',
    Source = 'Source',
    Story = 'Story',
    Topic = 'Topic'
}

export interface AppContext {
    siteContentType: SiteContentType,
    id: string | null,
    customData: any,
}

export interface ComponentParams {
    context: AppContext,
    config: any
}
