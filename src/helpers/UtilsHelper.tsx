import React from "react";
import * as _ from 'lodash';
import {AbstractWidgetConfig} from "../types/types";

export class UtilsHelper {

    static convertToInt(input: string | number) {
        return typeof input === "number" ? input : parseInt(input);
    }
}
