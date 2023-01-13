/// <reference types="react" />
export interface ParagraphBlockParams {
    blockData: {
        type: string;
        text: string;
    };
}
export default function ParagraphBlock({ blockData }: ParagraphBlockParams): JSX.Element;
