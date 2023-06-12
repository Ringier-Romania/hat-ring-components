import React from "react";
import {isNil} from 'lodash';
export function UtilsHelper_convertToInt(input: string | number) {
    return typeof input === "number" ? input : parseInt(input);
}

export function UtilsHelper_getValueIfExists(value, defaultValue) {
    return isNil(value) ? defaultValue : value;
}

export function UtilsHelper_isDevelopmentMode() {
    return process.env.NODE_ENV === 'development';
}

export function UtilsHelper_isMobile(context) {
    return !!context.hatControllerParams?.isMobile;
}
