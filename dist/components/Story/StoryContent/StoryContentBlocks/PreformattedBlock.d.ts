/// <reference types="react" />
export interface PreformattedBlockParams {
    blockData: {
        type: string;
        text: string;
    };
}
export default function PreformattedBlock({ blockData }: PreformattedBlockParams): JSX.Element;
