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
export declare function RingImage(props: RingImageProps): JSX.Element;
