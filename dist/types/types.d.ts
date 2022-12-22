export declare enum SiteContentType {
    Author = "Author",
    CustomAction = "CustomAction",
    SiteNode = "SiteNode",
    Source = "Source",
    Story = "Story",
    Topic = "Topic"
}
export interface AppContext {
    siteContentType: SiteContentType;
    id: string | null;
    url: string;
    customData: any;
}
export interface ComponentParams {
    context: AppContext;
    config: any;
}
