import React from 'react';
import * as _ from 'lodash';
import * as BlocksTypes from "./StoryContentBlocks";

interface StoryContentSwitcherParams {
    content: any[]
}

export async function StoryContentSwitcher({content}: StoryContentSwitcherParams) {
    let isGroupBlock = false;
    const groupElements: any[] = [];

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

        const blockType = block.type ? _.upperFirst(block.type) + 'Block' : 'NotHandledBlock';
        const Block = BlocksTypes[blockType] ? BlocksTypes[blockType] : BlocksTypes['NotHandledBlock'];
        // console.log(`block ->`, JSON.stringify(block, null, 4))
        return <Block blockData={block}/>
    })
}