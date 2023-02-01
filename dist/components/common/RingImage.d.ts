/// <reference types="react" />
import { ImageProps } from "next/image";
export interface RingImageProps extends ImageProps {
    transform?: TransformType;
}
export declare enum TransformType {
    ResizeCropAuto = "resizeCropAuto",
    Resize = "resize",
    None = "none"
}
export declare function ocdnLoader(src: any, width: any, height: any, transformType: any): any;
export default function RingImage(props: RingImageProps): JSX.Element;
