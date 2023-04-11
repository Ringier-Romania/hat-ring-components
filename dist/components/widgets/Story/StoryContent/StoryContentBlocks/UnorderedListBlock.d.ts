/// <reference types="react" />
export interface UnorderedListBlockParams {
    blockData: {
        type: string;
        entries: string[];
        indentLevel: number;
        styleType: string;
    };
}
export default function UnorderedListBlock({ blockData }: UnorderedListBlockParams): JSX.Element;
