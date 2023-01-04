import Link, {LinkProps} from "next/link";
import React from "react";

export default function RingLink(props: LinkProps & { children?: React.ReactNode }) {
    let href = props.href;
    if (props.href && process.env.WEBSITE_API_DOMAIN && process.env.NODE_ENV === 'development') {
        if (typeof props.href === 'string') {
            href = props.href.replace(process.env.WEBSITE_API_DOMAIN, '');
        }
    }
    return <Link {...props} href={href}>{props.children}</Link>
}


