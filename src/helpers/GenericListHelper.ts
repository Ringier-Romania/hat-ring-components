import {UtilsHelper_convertToInt} from "./UtilsHelper";
import {GenericListWidgetConfig} from "../components/widgets/Lists/GenericList/types";

export function WidgetHelper_calculateOffsetForGenericListPagination(widgetConfig: GenericListWidgetConfig, currentPage: number, isAjaxCall: boolean, isFirstCall: boolean) {
    const perPageAllItems = UtilsHelper_convertToInt(widgetConfig?.perPageAllItems) || UtilsHelper_convertToInt(widgetConfig?.paginationElements);
    const postShiftValue = UtilsHelper_convertToInt(widgetConfig?.postShift) || 0;
    currentPage = UtilsHelper_convertToInt(currentPage) || 1;
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

    return Math.max(0, offset);
}

export function WidgetHelper_getPaginationDataForGenericList(widgetConfig: GenericListWidgetConfig, totalItems: number) {
    const MAX_OFFSET = 1000;
    const perPageAllItems = UtilsHelper_convertToInt(widgetConfig?.perPageAllItems) || UtilsHelper_convertToInt(widgetConfig?.paginationElements);

    const pages = Math.ceil(totalItems / perPageAllItems);
    const lastAllowedPage = Math.ceil((MAX_OFFSET - perPageAllItems) / perPageAllItems);
    const lastPage = Math.min(pages, lastAllowedPage);


    return lastPage;
}