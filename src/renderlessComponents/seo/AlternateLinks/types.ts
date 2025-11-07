export interface AlternateLinksResponse {
    data: {
        story: {
            stories: {
                story: {
                    id: string;
                    publicationPoint: {
                        url: string;
                    };
                };
                role: {
                    code: string;
                };
            }[];
        };
    };
}
