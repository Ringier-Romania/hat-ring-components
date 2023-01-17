import React from "react";
import Image from "next/image";
import RingImage, {TransformType} from "../../../common/RingImage";
import RingLink from "../../../common/RingLink";

export interface ImageBlockParams {
    blockData: {
        type: string;
        title: string;
        url: string;
        alt: string;
        link: {
            url: string;
        }
        image: {
            description: string;
            title: string;
            width: number;
            height: number;
            sources: [
                {
                    source: {
                        name: string;
                    }
                }
            ]
        }
    }
    config: {
        width: number;
        height: number;
    }
}

export default function ImageBlock({blockData, config}: ImageBlockParams) {
    const {title, alt, image, url, link} = blockData

    return <div className="ImageBlock">
        {
            link ?
                <RingLink href={link.url}>
                    <RingImage priority={true} src={url} alt={alt || ''} width={config.width} height={config.height} transform={TransformType.ResizeCropAuto}/>
                </RingLink> :
                <RingImage priority={true} src={url} alt={alt || ''} width={config.width} height={config.height} transform={TransformType.ResizeCropAuto}/>
        }
        <div className="imgMetaData">
            {title && <span className="caption">{title}</span>}
            {image.description && <span className="description">{image.description}</span>}
            {/* TODO add translation */}
            {image.sources?.length && <span className="copyright">{`Foto: ${image.sources[0].source.name}`}</span>}
        </div>
    </div>
}