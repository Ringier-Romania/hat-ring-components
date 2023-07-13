import React from "react";
import {UtilsHelper_isDevelopmentMode} from "../../../helpers/UtilsHelper";
import dynamic from 'next/dynamic';

export function RingLink(props: { children?: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    const useNextLink = process.env.NEXT_PUBLIC_USE_NEXT_LINK == 'true';

    let href = props.href;
    if (props.href && process.env.NEXT_PUBLIC_WEBSITE_DOMAIN && UtilsHelper_isDevelopmentMode()) {
        if (typeof props.href === 'string') {
            href = props.href.replace(process.env.NEXT_PUBLIC_WEBSITE_DOMAIN, '');
        }
    }

    if(useNextLink){
        const RingLinkNext = dynamic(() => import('./RingLinkNext'), { ssr: true });
        return <RingLinkNext href={href as string} {...props}>{props.children}</RingLinkNext>;
    }

    return  <a {...props} href={href}>{props.children}</a>;
}


