import React from "react";

export interface TableBlockParams {
    blockData: {
        type: string;
        rows : [
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
                        }
                    }
                ]
            }
        ]
    }
}

export default function TableBlock({blockData}: TableBlockParams) {
    const {rows} = blockData

    return <table className="TableBlock">
        <tbody>
        {
            rows.map(row =>
                 <tr>
                    {
                        row.cells.map((cell) => {
                            let allCellClasses = cell.alignment ? `align${cell.alignment} `: '';
                            cell.classes.forEach(cellClass => allCellClasses + `${cellClass} ` )

                            return cell.isHeader ? (
                                    <th className={allCellClasses}>
                                        {cell.link ? <a href={cell.link.url}>{cell.text}</a> : cell.text}
                                    </th>
                                ) :
                                <td colSpan={cell.colspan ? cell.colspan : undefined}
                                    rowSpan={cell.rowspan ? cell.rowspan : undefined}
                                    className={allCellClasses}>
                                        {cell.link ? <a href={cell.link.url}>{cell.text}</a> : cell.text}
                                </td>
                        })
                    }
                </tr>
            )
        }
        </tbody>
    </table>
}