/// <reference types="react" />
export interface GroupBlockParams {
    name: string;
    type: string;
    alignment: string;
    elements: any[];
}
export default function GroupBlock({ blockData }: {
    blockData: any;
}): JSX.Element;
