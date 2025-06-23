import _ from "lodash";

interface ComponentToInsert {
    position: number;
    originalIndex: number;
    component: {
        AdditionalComponent: any;
        config: any;
        context: any;
        customCssClass?: string;
    };
}
const NTH_CHILD_PATTERN_REGEX = /(\d*)n([+-]?\d+)?/;

function parseWidgetConfig(config: string | object): any {
    if (typeof config === "string") {
        try {
            return JSON.parse(config);
        } catch (error) {
            console.error("Failed to parse widget config:", error);
            return {};
        }
    }
    return config || {};
}

function isPlatformCompatible(isMobile: boolean, isMobileEnabled?: boolean, isDesktopEnabled?: boolean): boolean {
    return (isMobile && !!isMobileEnabled) || (!isMobile && !!isDesktopEnabled);
}

function calculateInsertPositions(
    sourceLength: number,
    patternMultiplier: number,
    nthChildOffset: number,
    maxInserts: number
): number[] {
    const positions: number[] = [];
    let insertedCount = 0;

    for (let originalPosition = 0; originalPosition < sourceLength && insertedCount < maxInserts; originalPosition++) {
        const elementNumber = originalPosition + 1;
        const calculationValue = (elementNumber - nthChildOffset) % patternMultiplier;

        if (calculationValue === 0) {
            const insertPosition = nthChildOffset < 0 ? originalPosition : originalPosition + 1;
            positions.push(insertPosition);
            insertedCount++;
        }
    }

    return positions;
}

export function AdditionalComponentHelper_insertComponentAtPattern(
    sourceElements: any[],
    widgetConfig,
    context
): any[] {
    if (!sourceElements?.length) return [];
    if (!widgetConfig?.additionalComponents?.length) return sourceElements;

    const isMobile = context?.hatControllerParams?.isMobile ?? false;
    const componentsToInsert: ComponentToInsert[] = [];

    for (let originalIndex = 0; originalIndex < widgetConfig.additionalComponents.length; originalIndex++) {
        const additionalWidget = widgetConfig.additionalComponents[originalIndex];
        const {
            widget,
            platformMobile: isMobileEnabled,
            platformDesktop: isDesktopEnabled,
            pattern: insertionPattern,
            limit,
            customCssClass,
            config: rawConfig,
        } = additionalWidget;

        if (!widget?.trim() || !insertionPattern) continue;

        const widgetName = _.upperFirst(widget.trim());
        const AdditionalComponent = context?.customData?.widgets?.[widgetName];

        if (!AdditionalComponent) continue;
        if (!isPlatformCompatible(isMobile, isMobileEnabled, isDesktopEnabled)) continue;

        const nthChildMatch = insertionPattern.match(NTH_CHILD_PATTERN_REGEX);
        if (!nthChildMatch) continue;

        const patternMultiplier = Number(nthChildMatch[1]) || 1;
        const nthChildOffset = Number(nthChildMatch[2]) || 0;
        const maxComponentsToInsert = limit ? Number(limit) : sourceElements.length;

        if (patternMultiplier <= 0 || maxComponentsToInsert <= 0) continue;

        const config = parseWidgetConfig(rawConfig || {});

        const positions = calculateInsertPositions(
            sourceElements.length,
            patternMultiplier,
            nthChildOffset,
            maxComponentsToInsert
        );

        for (const position of positions) {
            componentsToInsert.push({
                position,
                originalIndex,
                component: {
                    AdditionalComponent,
                    config,
                    context,
                    customCssClass,
                },
            });
        }
    }

    if (componentsToInsert.length === 0) return sourceElements;

    componentsToInsert.sort((a, b) => {
        if (a.position !== b.position) {
            return b.position - a.position;
        }
        return b.originalIndex - a.originalIndex;
    });

    const elementsToRender = [...sourceElements];
    for (const { position, component } of componentsToInsert) {
        elementsToRender.splice(position, 0, component);
    }

    return elementsToRender;
}
