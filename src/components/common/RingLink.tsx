import Link, {LinkProps} from "next/link";
import React, {HTMLAttributes, ReactNode} from "react";

export function RingLink(props: LinkProps & { children?: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    let href = props.href;
    if (props.href && process.env.WEBSITE_DOMAIN && process.env.NODE_ENV === 'development') {
        if (typeof props.href === 'string') {
            href = props.href.replace(process.env.WEBSITE_DOMAIN, '');
        }
    }
    let prefetch = props.prefetch;
    prefetch = false;
    return <Link {...props} href={href} prefetch={prefetch}>{props.children}</Link>
}


