'use client'
import React from "react";
import styles from '../../../../../styles/widgets/common/Slider.module.scss';
import {WidgetHelper} from "../../../../helpers/WidgetHelper";
import {UtilsHelper_getValueIfExists} from "../../../../helpers/UtilsHelper";
import { useRef } from 'react';
import { register } from 'swiper/element/bundle';
import {SliderFrontParams, SwiperRef} from "./types";

export function SliderFront(
    {widgetConfig, context, children}: SliderFrontParams
) {
    register();
    const swiperElRef = useRef<SwiperRef>(null);

    const autoplayDelay = UtilsHelper_getValueIfExists(widgetConfig.autoplayDelay, 0);
    const isAutoplay = Number(autoplayDelay) !== 0;
    const isLoop = UtilsHelper_getValueIfExists(widgetConfig.loop, false);
    const slidesPerView = UtilsHelper_getValueIfExists(widgetConfig.slidesPerView, 'auto');
    const navigation = UtilsHelper_getValueIfExists(widgetConfig.navigation, true);
    const pagination = UtilsHelper_getValueIfExists(widgetConfig.pagination, false);

    return <div className={WidgetHelper.getWidgetCssClasses(widgetConfig, [styles.Slider])} suppressHydrationWarning={true}>
        <swiper-container
            ref={swiperElRef}
            autoplay={isAutoplay}
            data-swiper-autoplay={autoplayDelay}
            loop={isLoop}
            slidesPerView={slidesPerView}
            navigation={navigation}
            pagination={pagination}
        >
            {children}
        </swiper-container>
    </div>;
}
