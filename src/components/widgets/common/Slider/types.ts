import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";
import React from "react";
import {SwiperProps, SwiperSlideProps} from "swiper/react/swiper-react";
import {Swiper} from "swiper/types";

export interface SliderElement {
    "Title": string,
    "Description": string,
    "Link url": string,
    "Source url": string,
    "Source type": "Image" | "",
    "Source desktop dimensions(eg. 600x300)": string,
    "Source mobile dimensions(eg. 600x300)": string,
    "Custom CSS Class": string
}

export interface SliderConfig extends AbstractWidgetConfig {
    headerSeoTag: string,
    headerText: string,
    description: string,
    slides: Array<SliderElement>,
    slidesPerView: number | 'auto',
    autoplayDelay: number,
    loop: boolean,
    navigation: boolean,
    pagination: boolean
    centeredSlides: boolean,
    breakpoints: Array<Breakpoint>
}

export interface Breakpoint {
    "Minimal screen size": number,
    "Slides per view": number
}

export interface SliderParams extends WidgetParams {
    widgetConfig: SliderConfig,
    extendableAttributes?: any
}

/*
 * Swiper 9 doesn't support Typescript yet, we are watching the following issue:
 * @link https://github.com/nolimits4web/swiper/issues/6466
 *
 * All parameters can be found on the following page:
 * @link https://swiperjs.com/swiper-api#parameters
 */
export type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "swiper-slide": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & SwiperSlideProps,
                HTMLElement
            >;
        }
        interface IntrinsicElements {
            "swiper-container": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & SwiperProps,
                HTMLElement
            >;
        }
    }
}
export interface SliderFrontParams extends WidgetParams {
    widgetConfig: SliderConfig,
    children: React.ReactNode,
    extendableAttributes?: any
}

