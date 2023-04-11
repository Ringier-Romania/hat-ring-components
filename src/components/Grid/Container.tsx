import React from "react";
import * as _ from "lodash";
import {AppContext} from "../../types/types";
import {Box} from "./Box";

import styles from "../../../styles/Grid/Grid.module.scss";

//@TODO section config type
interface GridContainerParams {
    sectionName: string;
    sectionConfig: any;
    boxes: Array<string>,
    context: AppContext;

};

export function Container({sectionName, sectionConfig, context, boxes}: GridContainerParams) {

    if(!sectionConfig){
        return null;
    }
    const ContainerTag = `${sectionConfig.container_html_tag || 'main'}`;
    // @ts-ignore
    return <ContainerTag className={['gridContainer', sectionName, styles.gridContainer].join(' ')}>
        {boxes.map(boxName => {
            return !!sectionConfig[boxName + '_hide'] ? null :
                <Box
                    context={context}
                    boxName={boxName}
                    widgets={sectionConfig[boxName]}
                    size={sectionConfig[boxName + '_size'] || 12}
                    tagName={sectionConfig[boxName + '_html_tag']}
                />
        })}
    </ContainerTag>;
}
