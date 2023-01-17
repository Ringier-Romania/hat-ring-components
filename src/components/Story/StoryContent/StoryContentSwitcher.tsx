import React from 'react';
import * as _ from 'lodash';
import * as BlocksTypes from "./StoryContentBlocks";

interface StoryContentSwitcherParams {
    content: any[];
    config: {
        width: number;
        height: number;
    }
}

export function StoryContentSwitcher({content, config}: StoryContentSwitcherParams) {
    let isGroupBlock = false;
    const groupElements: any[] = [];


    const buildBlockName = (name) =>{
        return _.upperFirst(_.camelCase(name)) + 'Block'
    }

    return content.map((block) => {

        if(block.type === 'groupStart') {
            isGroupBlock = true;
            return <></>
        }

        if(block.type === 'groupEnd') {
            isGroupBlock = false;
            block.type = 'group';
            block.elements = [...groupElements];
        }

        if(isGroupBlock === true) {
            groupElements.push(block);
            return <></>
        }

        const blockType = block.type ? _.upperFirst(_.camelCase(block.type)) + 'Block' : 'NotHandledBlock';
        const Block = BlocksTypes[blockType] ? BlocksTypes[blockType] : BlocksTypes['NotHandledBlock'];
        return <Block blockData={block} config={config}/>
    })
}