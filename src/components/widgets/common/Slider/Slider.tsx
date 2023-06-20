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


export async function Slider(
    {widgetConfig, context}: SliderParams
) {

    const frontendContext = {...context};
    frontendContext.customData = {...context.customData}
    frontendContext.customData.widgets = [];

    function renderSlideContent(slide, dimensions) {
        return <>
            {slide['Title'] && <div className={"slideTitle"}>{slide['Title']}</div>}
            {slide['Description'] && <div className={"slideDescription"}>{slide['Description']}</div>}
            {slide['Source url'] && slide['Source type'] === 'Image'
                && <div className={"slideImage"}>
                    <RingImage src={slide['Source url']} alt={slide['Title'] || ''} width={dimensions.width} height={dimensions.height} transform={TransformType.ResizeCropAuto}/>
                </div>
            }
        </>
    }

    return <div className={WidgetHelper_getWidgetCssClasses('Slider', widgetConfig, context, [styles.Slider])}>
        <SliderFront widgetConfig={widgetConfig} context={frontendContext}>
            {widgetConfig.slides.map((slide: SliderElement) => {
                const dimensions = WidgetHelper_getImageDimensionsFromWidgetConfig(slide, context, "Source desktop dimensions(eg. 600x300)", "Source mobile dimensions(eg. 600x300)", '600x300');

                return (
                    // @ts-ignore in web-components class is valid
                    <swiper-slide class={slide['Custom CSS Class'] || ''} suppressHydrationWarning={true}>
                        {slide['Link url']
                            ? <>
                                <RingLink href={slide['Link url']}>
                                    {renderSlideContent(slide, dimensions)}
                                </RingLink>
                            </>
                            : <>
                                {renderSlideContent(slide, dimensions)}
                            </>
                        }
                    </swiper-slide>
                )
            })}
        </SliderFront>
    </div>
}
