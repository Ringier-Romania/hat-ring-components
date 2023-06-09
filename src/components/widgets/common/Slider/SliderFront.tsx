'use client'
import React, {ReactElement} from "react";
import * as _ from 'lodash';
import {AbstractWidgetConfig, WidgetParams} from "../../../../types/types";
import styles from '../../../../../styles/widgets/common/Slider.module.scss';
import {WidgetHelper} from "../../../../helpers/WidgetHelper";
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import {SwiperProps, SwiperSlideProps} from "swiper/react";
import {Swiper} from "swiper/types";

interface SliderElement {
    "text": string,
}

interface SliderConfig extends AbstractWidgetConfig {
}

export interface SliderParams extends WidgetParams {
    widgetConfig: SliderConfig,
    children: React.ReactNode,
}

/*
 * Swiper 9 doesn't support Typescript yet, we are watching the following issue:
 * @link https://github.com/nolimits4web/swiper/issues/6466
 *
 * All parameters can be found on the following page:
 * @link https://swiperjs.com/swiper-api#parameters
 */
type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "swiper-container": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & SwiperProps,
                HTMLElement
            >;
            "swiper-slide": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & SwiperSlideProps,
                HTMLElement
            >;
        }
    }
}
export function SliderFront(
    {widgetConfig, context, children}: SliderParams
) {
    register();
    const swiperElRef = useRef<SwiperRef>(null);

    useEffect(() => {
        if (swiperElRef.current) {
            // listen for Swiper events using addEventListener
            swiperElRef.current.addEventListener('progress', (e) => {
                // const [swiper, progress] = e.detail;
                // console.log(progress);
            });

            swiperElRef.current.addEventListener('slidechange', (e) => {
                console.log('slide changed');
            });
        }
    }, []);


    return <div className={WidgetHelper.getWidgetCssClasses(widgetConfig, [styles.Slider])} suppressHydrationWarning={true}>
        <swiper-container
            suppressHydrationWarning={true}
            ref={swiperElRef}
            slidesPerView={3}
            navigation={true}
            pagination={true}
        >
            {children}
        </swiper-container>
    </div>;
}
