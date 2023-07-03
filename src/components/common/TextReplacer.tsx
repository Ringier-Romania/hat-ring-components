import {ConfigHelper_getDeveloperSettingsConfig} from "../../helpers/ConfigHelper";
import React from 'react'
import {AppContext} from "../../types/types";

export async function TextReplacer({children, context, parentComponent}: {
    children?: React.ReactNode,
    context: AppContext,
    parentComponent: keyof JSX.IntrinsicElements
}) {
    const devSettingsConfig = await ConfigHelper_getDeveloperSettingsConfig(context);

    if (devSettingsConfig.textReplacers && children) {
        const replacementFunctions = devSettingsConfig.textReplacers.map((replacerObj) => {
            return (text) => text.replaceAll(replacerObj['Match pattern'], replacerObj['Replacement'])
        })

        const replacer = (text) => {
            return replacementFunctions.reduce(
                (prevString, replacementFnc) => replacementFnc(prevString),
                text
            );
        }

        const Parent = parentComponent;

        return <>
            {Array.isArray(children)
                ? children.map((child) => typeof child === 'string'
                    ? <Parent dangerouslySetInnerHTML={{ __html: replacer(child) }}/>
                    : child)
                : typeof children === 'string'
                    ? <Parent dangerouslySetInnerHTML={{ __html: replacer(children) }}/>
                    : children
            }
            </>
    }
    return null;
}


