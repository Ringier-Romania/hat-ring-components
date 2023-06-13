import Link, {LinkProps} from "next/link";
import React, {HTMLAttributes, ReactNode} from "react";
import {UtilsHelper_isDevelopmentMode} from "../../helpers/UtilsHelper";

export function RingLink(props: LinkProps & { children?: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    let href = props.href;
    if (props.href && process.env.NEXT_PUBLIC_WEBSITE_DOMAIN && UtilsHelper_isDevelopmentMode()) {
        if (typeof props.href === 'string') {
            href = props.href.replace(process.env.NEXT_PUBLIC_WEBSITE_DOMAIN, '');
        }
    }
    let prefetch = props.prefetch;
    prefetch = false;
    return <Link {...props} href={href} prefetch={prefetch}>{props.children}</Link>
}


