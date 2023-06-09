import React, {DOMAttributes} from "react";
import * as _ from 'lodash';
import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";
import styles from '../../../../../styles/widgets/common/Slider.module.scss';
import {WidgetHelper} from "../../../../helpers/WidgetHelper";
import { useTransition } from 'react'
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import {SwiperProps, SwiperSlideProps} from "swiper/react";
import {Swiper} from "swiper/types";
import {SliderFront} from "./SliderFront";
import {RingImage} from "../../../common/RingImage";
import {renderToString} from "react-dom/server";
import {RingLink} from "../../../common/RingLink";

interface SliderElement {
    "Title": string,
    "Description": string,
    "Link url": string,
    "Source url": string,
    "Source type": "Image" | "",
    "Source desktop dimensions(eg. 600x300)": string,
    "Source mobile dimensions(eg. 600x300)": string,
    "Custom CSS Class": string
}

interface SliderConfig extends AbstractWidgetConfig {
    slides: Array<SliderElement>
}

export interface SliderParams extends WidgetParams {
    widgetConfig: SliderConfig
}

export async function Slider(
    {widgetConfig, context}: SliderParams
) {

    const frontendContext = {...context};
    frontendContext.customData = {...context.customData}
    frontendContext.customData.widgets = [];

    return <div className={WidgetHelper.getWidgetCssClasses(widgetConfig, [styles.Slider])}>
        <SliderFront widgetConfig={widgetConfig} context={frontendContext}>
            {widgetConfig.slides.map((slide: SliderElement) => {
                const dimensions = WidgetHelper.getImageDimensionsFromWidgetConfig(slide, context, "Source desktop dimensions(eg. 600x300)", "Source mobile dimensions(eg. 600x300)", '600x300');

                return (
                    // @ts-ignore in web-components class is valid
                    <swiper-slide class={slide['Custom CSS Class'] || ''}>
                        {slide['Link url'] ?
                            <>
                                <RingLink href={slide['Link url']}>
                                    {slide['Title'] && <div className={"slideTitle"}>{slide['Title']}</div>}
                                    {slide['Description'] && <div className={"slideDescription"}>{slide['Description']}</div>}
                                    {slide['Source url'] && slide['Source type'] === 'Image'
                                        && <div className={"slideImage"}>
                                            <RingImage src={slide['Source url']} alt={slide['Title'] || ''} width={dimensions.width} height={dimensions.height} />
                                        </div>}
                                </RingLink>
                            </>
                            : <>
                                {slide['Title'] && <div className={"slideTitle"}>{slide['Title']}</div>}
                                {slide['Description'] && <div className={"slideDescription"}>{slide['Description']}</div>}
                                {slide['Source url'] && slide['Source type'] === 'Image'
                                    && <div className={"slideImage"}>
                                        <RingImage src={slide['Source url']} alt={slide['Title'] || ''} width={dimensions.width} height={dimensions.height} />
                                    </div>}
                            </>}

                    </swiper-slide>
                )
            })}
        </SliderFront>
    </div>
}
