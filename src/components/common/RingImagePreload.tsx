'use client'
import ReactDOM from 'react-dom'

/**
 * Temp workaround for images preloading
 * waiting for: https://github.com/vercel/next.js/issues/52995
 * @param props
 * @constructor
 */
export function RingImagePreload(props) {
     // @ts-ignore
    ReactDOM.preload(props.avifSrc, {as: "image"});
    return null;
}
