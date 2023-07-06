'use client'
import React, {useEffect} from "react";
import {UtilsHelper_getValueIfExists} from "../../../../helpers/UtilsHelper";
import { useRef } from 'react';
import { register } from 'swiper/element/bundle';
import {SliderFrontParams, SwiperRef} from "./types";

export function SliderFront(
    {widgetConfig, context, children, extendableAttributes}: SliderFrontParams
) {
    extendableAttributes = extendableAttributes || {};
    extendableAttributes.swiperOptions = extendableAttributes.swiperOptions || {}
    register();
    const swiperElRef = useRef<SwiperRef>(null);

    const autoplayDelay = UtilsHelper_getValueIfExists(widgetConfig.autoplayDelay, 0);
    const isAutoplay = Number(autoplayDelay) !== 0;
    const isLoop = UtilsHelper_getValueIfExists(widgetConfig.loop, false);
    const slidesPerView = UtilsHelper_getValueIfExists(widgetConfig.slidesPerView, 'auto');
    const navigation = UtilsHelper_getValueIfExists(widgetConfig.navigation, true);
    const pagination = UtilsHelper_getValueIfExists(widgetConfig.pagination, false);
    const centeredSlides = UtilsHelper_getValueIfExists(widgetConfig.centeredSlides, false);
    const configBreakpoints = UtilsHelper_getValueIfExists(widgetConfig.breakpoints, []);

    const breakpoints = {};
    configBreakpoints.forEach(breakpoint => {
        breakpoints[breakpoint["Minimal screen size"]] = {};
        breakpoints[breakpoint["Minimal screen size"]].slidesPerView = breakpoint["Slides per view"];
    });

    const autoplay = isAutoplay ? {delay: autoplayDelay} : false;

    let inited = false;
    useEffect(() => {
        if (swiperElRef.current && !inited) {
            inited = true;
            const swiperParams = {
                autoplay,
                loop: isLoop,
                slidesPerView,
                navigation,
                pagination,
                centeredSlides,
                breakpoints,
                ...extendableAttributes.swiperOptions
            };

            Object.assign(swiperElRef.current, swiperParams);
            swiperElRef.current.initialize();
        }
    }, []);



    return <>
        <swiper-container
            init={false}
            ref={swiperElRef}
            suppressHydrationWarning={true}
        >
            {children}
        </swiper-container>
    </>;
}
