import React from 'react';
import * as _ from 'lodash';
import * as BlocksTypes from "./StoryContentBlocks";
import {AppContext} from "../../../../types/types";
import {StoryContentWidgetConfig, StoryContentSwitcherParams} from "./types";
import {UtilsHelper_convertToInt} from "../../../../helpers/UtilsHelper";


export function StoryContentSwitcher({
                                         content,
                                         widgetConfig,
                                         context,
                                         extendableAttributes
                                     }: StoryContentSwitcherParams) {
    let isGroupBlock = false;
    let groupElements: any[] = [];

    return content.map((block, index) => {
        block = {...block};
        if (block.type === 'groupStart') {
            isGroupBlock = true;
            return <></>;
        }

        if (block.type === 'groupEnd') {
            isGroupBlock = false;
            block.type = 'group';
            block.elements = [...groupElements];
            groupElements = [];
        }

        if (isGroupBlock) {
            groupElements.push(block);
            return <></>;
        }
        const displayFrom = widgetConfig.displayFrom && UtilsHelper_convertToInt(widgetConfig.displayFrom);
        const displayTo = widgetConfig.displayTo && UtilsHelper_convertToInt(widgetConfig.displayTo);
        if (displayFrom && displayFrom > index + 1) {
            return null;
        }

        if (displayTo && displayTo < index + 1) {
            return null;
        }

        let clientContext = context;
        clientContext.customData.widgets = {};
        const blockType = block.type ? _.upperFirst(_.camelCase(block.type)) + 'Block' : 'NotHandledBlock';
        let Block = BlocksTypes[blockType] ? BlocksTypes[blockType] : BlocksTypes['NotHandledBlock'];
        const isClientSideComponent = Block.$$typeof && Block.$$typeof === Symbol.for('react.client.reference');
        if (blockType === 'GroupBlock' && extendableAttributes?.customGroupBlocks && extendableAttributes?.customGroupBlocks[block.name]) {

            Block = extendableAttributes?.customGroupBlocks[block.name];

        }
        return <Block blockData={block} widgetConfig={widgetConfig}
                      context={isClientSideComponent ? clientContext : context}/>;
    });
}
