import React from "react";
import {SliderElement, SliderFrontParams} from "./types";
import { RingLink } from "../../../common/RingLink/RingLink";
import { RingImage } from "../../../common/RingImage";
import { ImageHelper_getImageDimensionsFromObject } from "../../../../helpers/ImageHelper";
import _ from "lodash";
import {TransformType} from "../../../../helpers/AcceleratorImagesHelper";

export function SliderFront(
    {widgetConfig, context, headerTagLevel}: SliderFrontParams
) {
    let ItemsHeaderTag = 'span' as keyof JSX.IntrinsicElements;

    function renderImage(slide, dimensions) {

        const imgUrl = slide['Source url'];
        return <div className={"image"}>
            {widgetConfig.isUsedWithLightbox ?
                <a href={imgUrl} target="_blank"  data-pswp-width={dimensions.width} data-pswp-height={dimensions.height} >
                    <RingImage src={imgUrl} alt={slide['Title'] || ''} width={dimensions.width}
                               height={dimensions.height} transform={TransformType.ResizeCropAuto}/>
                </a>
                :
                <RingImage src={imgUrl} alt={slide['Title'] || ''} width={dimensions.width}
                           height={dimensions.height} transform={TransformType.ResizeCropAuto}/>
            }
        </div>
    }

    function renderSlideContent(slide, dimensions, itemsHeaderTagLevel = 6, childLevel) {
        if (itemsHeaderTagLevel < 6) {
            ItemsHeaderTag = `h${_.clamp(itemsHeaderTagLevel, 2, 6)}` as keyof JSX.IntrinsicElements;
        }

        return <div className={"item"}>
            {slide['Link url'] &&
                <div className={'linkOverlay'}>
                    <RingLink href={slide['Link url']} title={slide.Title || slide.Text || slide.Description || ''}></RingLink>
                </div>
            }
            {slide['Title'] && <div className={"title"}><ItemsHeaderTag>{slide['Title']}</ItemsHeaderTag></div>}
            {slide['Description'] && <div className={"description"}><p>{slide['Description']}</p></div>}
            {slide['Source url'] && slide['Source type'] === 'Image'
                && renderImage(slide, dimensions)
            }
            {slide.children && slide.children.length > 0 &&
                <div className={`children childrenLevel${childLevel}`}>
                    {slide.children.map((slideChild) => renderSlideContent(slideChild, dimensions, itemsHeaderTagLevel + 1, childLevel + 1))}
                </div>
            }
        </div>
    }

    const slides = widgetConfig.slides.map((slide: SliderElement) => {
        const dimensions = ImageHelper_getImageDimensionsFromObject(slide, context, "Source desktop dimensions(eg. 600x300)", "Source mobile dimensions(eg. 600x300)", '600x300');

        return (
            // @ts-ignore in web-components class is valid
            <swiper-slide class={slide['Custom CSS Class'] || ''} suppressHydrationWarning={true}>
                {renderSlideContent(slide, dimensions, headerTagLevel, 1)}
            </swiper-slide>
        )
    });

    return <>
            <swiper-container
                init={false}
                suppressHydrationWarning={true}
                >
                {slides}
            </swiper-container>
    </>;
}
