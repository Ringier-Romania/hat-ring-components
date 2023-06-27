import React from "react";
import {
    WidgetHelper_getImageDimensionsFromWidgetConfig,
    WidgetHelper_getWidgetCssClasses
} from "../../../../helpers/WidgetHelper";
import {SliderFront} from "./SliderFront";
import {RingImage, TransformType} from "../../../common/RingImage";
import {RingLink} from "../../../common/RingLink";
import {SliderElement, SliderParams} from "./types";
import styles from '../../../../../styles/widgets/common/Slider.module.scss';
import * as _ from "lodash";


export async function Slider(
    {widgetConfig, context}: SliderParams
) {

    const frontendContext = {...context};
    frontendContext.customData = {...context.customData}
    frontendContext.customData.widgets = [];

    const headerTag = (widgetConfig.headerSeoTag && widgetConfig.headerSeoTag !== 'none' ? widgetConfig.headerSeoTag : 'span' ) as keyof JSX.IntrinsicElements;

    let headerTagLevel = 6;

    const itemsHeaderArr = headerTag.split('h');
    if (itemsHeaderArr.length === 2) {
        headerTagLevel = _.clamp(Number(itemsHeaderArr[1]), 1, 6);
    }

    let HeaderTag = 'span' as keyof JSX.IntrinsicElements;
    let ItemsHeaderTag = 'span' as keyof JSX.IntrinsicElements;

    if (headerTagLevel < 6) {
        HeaderTag = `h${_.clamp(headerTagLevel, 1, 6)}` as keyof JSX.IntrinsicElements;
    }


    console.log(widgetConfig)

    function renderSlideContent(slide, dimensions, itemsHeaderTagLevel = 6, childLevel) {
        if (itemsHeaderTagLevel < 6) {
            ItemsHeaderTag = `h${_.clamp(itemsHeaderTagLevel, 2, 6)}` as keyof JSX.IntrinsicElements;
        }

        return <>
            {slide['Title'] && <div className={"slideTitle"}><ItemsHeaderTag>{slide['Title']}</ItemsHeaderTag></div>}
            {slide['Description'] && <div className={"slideDescription"}>{slide['Description']}</div>}
            {slide['Source url'] && slide['Source type'] === 'Image'
                && <div className={"slideImage"}>
                    <RingImage src={slide['Source url']} alt={slide['Title'] || ''} width={dimensions.width} height={dimensions.height} transform={TransformType.ResizeCropAuto} />
                </div>
            }
            {slide.children && slide.children.length > 0 &&
                <div className={`slideChildren slideChildrenLevel${childLevel}`}>
                    {slide.children.map((slideChild) => renderSlideContent(slideChild, dimensions, itemsHeaderTagLevel + 1, childLevel + 1))}
                </div>
            }
        </>
    }

    return <div className={WidgetHelper_getWidgetCssClasses('Slider', widgetConfig, context, [styles.Slider])}>
        {widgetConfig.headerText && <div className={"sliderTitle"}><HeaderTag>{widgetConfig.headerText}</HeaderTag></div>}
        {widgetConfig.description && <div className={"sliderDescription"}>{widgetConfig.description}</div>}
        <SliderFront widgetConfig={widgetConfig} context={frontendContext}>
            {widgetConfig.slides.map((slide: SliderElement) => {
                const dimensions = WidgetHelper_getImageDimensionsFromWidgetConfig(slide, context, "Source desktop dimensions(eg. 600x300)", "Source mobile dimensions(eg. 600x300)", '600x300');

                return (
                    // @ts-ignore in web-components class is valid
                    <swiper-slide class={slide['Custom CSS Class'] || ''} suppressHydrationWarning={true}>
                        {slide['Link url']
                            ? <>
                                <RingLink href={slide['Link url']}>
                                    {renderSlideContent(slide, dimensions, headerTagLevel + 1, 1)}
                                </RingLink>
                            </>
                            : <>
                                {renderSlideContent(slide, dimensions, headerTagLevel + 1, 1)}
                            </>
                        }
                    </swiper-slide>
                )
            })}
        </SliderFront>
    </div>
}
