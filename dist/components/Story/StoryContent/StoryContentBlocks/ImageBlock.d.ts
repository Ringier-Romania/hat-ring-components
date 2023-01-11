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
}
export default function ImageBlock({ blockData }: ImageBlockParams): JSX.Element;
