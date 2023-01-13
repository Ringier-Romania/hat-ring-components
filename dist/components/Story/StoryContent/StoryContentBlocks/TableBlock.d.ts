/// <reference types="react" />
export interface TableBlockParams {
    blockData: {
        type: string;
        rows: [
            {
                cells: [
                    {
                        alignment: string;
                        classes: string[];
                        colspan: null | number;
                        rowspan: null | number;
                        isHeader: boolean;
                        text: string;
                        link: {
                            url: string;
                        };
                    }
                ];
            }
        ];
    };
}
export default function TableBlock({ blockData }: TableBlockParams): JSX.Element;
