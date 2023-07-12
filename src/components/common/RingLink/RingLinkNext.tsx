import Link, {LinkProps} from "next/link";
import React, {HTMLAttributes, ReactNode} from "react";

export default function RingLinkNext(props: LinkProps & { children?: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return <Link {...props} prefetch={props.prefetch ? props.prefetch : false}>{props.children}</Link>
}


