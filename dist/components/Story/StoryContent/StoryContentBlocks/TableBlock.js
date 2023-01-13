"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function TableBlock({ blockData }) {
    const { rows } = blockData;
    return (0, jsx_runtime_1.jsx)("table", { className: "tableBlock", children: (0, jsx_runtime_1.jsx)("tbody", { children: rows.map(row => (0, jsx_runtime_1.jsx)("tr", { children: row.cells.map((cell) => {
                    let allCellClasses = cell.alignment ? `align-${cell.alignment} ` : '';
                    cell.classes.forEach(cellClass => allCellClasses + `${cellClass} `);
                    return cell.isHeader ? ((0, jsx_runtime_1.jsx)("th", { className: allCellClasses, children: cell.link ? (0, jsx_runtime_1.jsx)("a", { href: cell.link.url, children: cell.text }) : cell.text })) :
                        (0, jsx_runtime_1.jsx)("td", { colSpan: cell.colspan ? cell.colspan : undefined, rowSpan: cell.rowspan ? cell.rowspan : undefined, className: allCellClasses, children: cell.link ? (0, jsx_runtime_1.jsx)("a", { href: cell.link.url, children: cell.text }) : cell.text });
                }) })) }) });
}
exports.default = TableBlock;
//# sourceMappingURL=TableBlock.js.map