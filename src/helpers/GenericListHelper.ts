import {UtilsHelper_convertToInt} from "./UtilsHelper";
import {GenericListWidgetConfig} from "../components/widgets/Lists/GenericList/types";

export function WidgetHelper_calculateOffsetForGenericListPagination(widgetConfig: GenericListWidgetConfig, currentPage: number, isAjaxCall: boolean, isFirstCall: boolean) {
    const perPageAllItems = UtilsHelper_convertToInt(widgetConfig.perPageAllItems) || UtilsHelper_convertToInt(widgetConfig.paginationElements);
    const postShiftValue = UtilsHelper_convertToInt(widgetConfig.postShift) || 0;
    const totalItemsBefore = perPageAllItems * (currentPage - 1);
    let offset = 0;
    if (isAjaxCall) {
        if (isFirstCall) {
            offset = totalItemsBefore;
        } else {
            const shiftAdjustment = postShiftValue * (currentPage - 2);
            offset = totalItemsBefore - shiftAdjustment;
        }
    } else {
        offset = totalItemsBefore + postShiftValue;
    }
    return offset;
}