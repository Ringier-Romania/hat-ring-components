/**
 * Workaround for images preloading - React-dom doesnt allow empty href in preload() fnc,
 * but we need this to resolve the Safari bug with preload, also there is an unstable fnc in nextjs at this moment: unstable_getImgProps
 * solution: https://github.com/vercel/next.js/issues/43134#issuecomment-1634615162
 * @param props
 * @constructor
 */
export function RingImagePreload(props) {
     // @ts-ignore
    return (<link rel="preload" as="image" href="" imageSrcSet={props.src} fetchpriority={"high"} />);
}
