/// <reference types="react" />
export interface ImageBlockParams {
    blockData: {
        type: string;
        title: string;
        url: string;
        alt: string;
        link: {
            url: string;
        };
        image: {
            description: string;
            title: string;
            width: number;
            height: number;
            sources: [
                {
                    source: {
                        name: string;
                    };
                }
            ];
        };
    };
    config: {
        width: number;
        height: number;
    };
}
export default function ImageBlock({ blockData, config }: ImageBlockParams): JSX.Element;
