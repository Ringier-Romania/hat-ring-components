import {ConfigHelper_getDeveloperSettingsConfig} from "../../../helpers/ConfigHelper";
import React from 'react'
import {TextReplacerProps} from "./types";

export async function TextReplacer(props: TextReplacerProps & { children?: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    const devSettingsConfig = await ConfigHelper_getDeveloperSettingsConfig(props.context);

    if (devSettingsConfig.textReplacers && props.children) {
        const replacementFunctions = devSettingsConfig.textReplacers.map((replacerObj) => {
            return (text) => text.replaceAll(replacerObj['Match pattern'], replacerObj['Replacement'])
        })

        function replacer(text) {
            return replacementFunctions.reduce(
                (prevString, replacementFnc) => replacementFnc(prevString),
                text
            );
        }

        return <>
            {Array.isArray(props.children)
                ? props.children.map((child) => typeof child === 'string'
                    ? replacer(child)
                    : child)
                : typeof props.children === 'string'
                    ? replacer(props.children)
                    : props.children
            }
            </>
    }
    return null;
}


