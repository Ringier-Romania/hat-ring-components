import React from "react";
import {UtilsHelper_isDevelopmentMode} from "../../../helpers/UtilsHelper";
import dynamic from 'next/dynamic';

export function RingLink(props: { children?: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {

    let href = props.href;
    if (props.href && process.env.NEXT_PUBLIC_WEBSITE_DOMAIN && UtilsHelper_isDevelopmentMode()) {
        if (typeof props.href === 'string') {
            href = props.href.replace(process.env.NEXT_PUBLIC_WEBSITE_DOMAIN, '');
        }
    }


    return  <a {...props} href={href}>{props.children}</a>;
}


