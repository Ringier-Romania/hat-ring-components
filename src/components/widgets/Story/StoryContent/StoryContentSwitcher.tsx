import React from 'react';
import * as _ from 'lodash';
import * as BlocksTypes from "./StoryContentBlocks";
import {AppContext} from "../../../../types/types";
import {StoryContentWidgetConfig, StoryContentSwitcherParams} from "./types";


export function StoryContentSwitcher({content, widgetConfig, context}: StoryContentSwitcherParams) {
    let isGroupBlock = false;
    const groupElements: any[] = [];

    return content.map((block, index) => {
        if (block.type === 'groupStart') {
            isGroupBlock = true;
            return <></>;
        }

        if (block.type === 'groupEnd') {
            isGroupBlock = false;
            block.type = 'group';
            block.elements = [...groupElements];
        }

        if (isGroupBlock === true) {
            groupElements.push(block);
            return <></>;
        }

        if(widgetConfig.displayFrom && widgetConfig.displayFrom > index + 1){
            return null;
        }

        if(widgetConfig.displayTo && widgetConfig.displayTo < index + 1){
            return null;
        }

        let clientContext = context;
        clientContext.customData.widgets = {};
        const blockType = block.type ? _.upperFirst(_.camelCase(block.type)) + 'Block' : 'NotHandledBlock';
        const Block = BlocksTypes[blockType] ? BlocksTypes[blockType] : BlocksTypes['NotHandledBlock'];
        const isClientSideComponent = Block.$$typeof && Block.$$typeof === Symbol.for('react.client.reference');
        return <Block blockData={block} widgetConfig={widgetConfig}
                      context={isClientSideComponent ? clientContext : context}/>;
    });
}
