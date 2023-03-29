import React from "react";
import * as _ from 'lodash';
import {AbstractWidgetConfig} from "../types/types";

export class UtilsHelper {

    static convertToInt(input: string | number) {
        return typeof input === "number" ? input : parseInt(input);
    }

    static isMobile(context) {
        return !!context.hatControllerParams?.isMobile;
    }

    static isDevelopmentMode(){
        return process.env.NODE_ENV === 'development';
    }
}
