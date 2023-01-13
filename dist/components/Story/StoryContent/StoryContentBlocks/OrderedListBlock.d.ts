/// <reference types="react" />
export interface OrderedListBlockParams {
    blockData: {
        type: string;
        entries: string[];
        indentLevel: number;
        styleType: string;
        startValue: number;
    };
}
export default function OrderedListBlock({ blockData }: OrderedListBlockParams): JSX.Element;
