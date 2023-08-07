/**
 * Temp workaround for images preloading
 * waiting for: https://github.com/vercel/next.js/issues/52995
 * @param props
 * @constructor
 */
export function RingImagePreload(props) {
     // @ts-ignore
    return (<link rel="preload" href="" srcset={props.srcSet.join(', ')} fetchpriority={"high"}/>);
}
