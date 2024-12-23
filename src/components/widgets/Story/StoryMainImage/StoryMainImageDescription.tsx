import React from 'react';


export function StoryMainImageDescription(params){
    return <p className={'StoryMainImageDescription'} dangerouslySetInnerHTML={{__html:params.description}}></p>;
}

