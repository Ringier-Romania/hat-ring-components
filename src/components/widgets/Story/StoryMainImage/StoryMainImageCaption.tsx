import React from 'react';


export function StoryMainImageCaption(params){
    return <p className={'StoryMainImageCaption'} dangerouslySetInnerHTML={{__html:params.caption}}></p>;
}

