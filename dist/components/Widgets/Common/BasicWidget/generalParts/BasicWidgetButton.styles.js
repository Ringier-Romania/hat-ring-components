"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonWrapper = exports.PrimaryButton = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.PrimaryButton = styled_components_1.default.a `
    background-color: #e3e3e3;
    color: #000;
    box-shadow: 0 16px 20px rgb(0 0 0 / 10%);
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    padding: 5px 20px;

    &:hover, &:focus {
        text-decoration: none;
    }
`;
exports.ButtonWrapper = styled_components_1.default.div `
    text-align: center;
    margin-bottom: 25px;
`;
//# sourceMappingURL=BasicWidgetButton.styles.js.map