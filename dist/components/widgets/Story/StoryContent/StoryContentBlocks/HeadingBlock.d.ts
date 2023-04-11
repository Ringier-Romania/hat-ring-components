/// <reference types="react" />
export interface HeadingBlockParams {
    blockData: {
        type: string;
        text: string;
        level: number;
    };
}
export default function HeadingBlock({ blockData }: HeadingBlockParams): JSX.Element;
