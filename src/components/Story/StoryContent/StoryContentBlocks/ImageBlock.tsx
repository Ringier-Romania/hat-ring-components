import React from "react";
import Image from "next/image";

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
}

export default function ImageBlock({blockData}: ImageBlockParams) {
    const {title, alt, image, url, link} = blockData
    return <div>
        {
            link ?
                <a href={link.url}>
                    <Image src={url} alt={alt} width={image.width} height={image.height} />
                </a> :
                <Image src={url} alt={alt} width={image.width} height={image.height} />
        }
        <div className="imgMetaData">
            {title && <span className="caption">{title}</span>}
            {image.description && <span className="description">{image.description}</span>}
            {/* TODO add translation */}
            {image.sources?.length && <span className="copyright">{`Foto: ${image.sources[0].source.name}`}</span>}
        </div>
    </div>
}