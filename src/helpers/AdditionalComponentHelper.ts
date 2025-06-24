import _ from "lodash";

const NTH_CHILD_PATTERN_REGEX = /(\d*)n([+-]?\d+)?/;
const SIMPLE_NUMBER_PATTERN_REGEX = /^-?\d+$/;

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

    for (let elementNumber = 1; elementNumber <= sourceLength && insertedCount < maxInserts; elementNumber++) {
        const calculationValue = (elementNumber - nthChildOffset) % patternMultiplier;

        if (calculationValue === 0 && elementNumber - nthChildOffset > 0) {
            const insertPosition = nthChildOffset < 0 ? elementNumber - 1 : elementNumber;
            positions.push(insertPosition);
            insertedCount++;
        }
    }

    return positions;
}
function getSimplePatternPositions(pattern: string, sourceLength: number): number[] {
    const targetPosition = Number(pattern);
    const targetPositionAbs = Math.abs(targetPosition);
    if (targetPosition >= 0 && targetPosition <= sourceLength) {
        return [targetPosition];
    } else if (targetPosition < 0 && targetPositionAbs <= sourceLength) {
        const insertPosition = targetPositionAbs - 1;
        return insertPosition >= 0 ? [insertPosition] : [];
    }
    
    return [];
}

function getNthChildPatternPositions(pattern: string, sourceLength: number, limit?: string | number): number[] {
    const nthChildMatch = pattern.match(NTH_CHILD_PATTERN_REGEX);
    if (!nthChildMatch) return [];

    const patternMultiplier = Number(nthChildMatch[1]) || 1;
    const nthChildOffset = Number(nthChildMatch[2]) || 0;
    const maxComponentsToInsert = limit ? Number(limit) : sourceLength;
    
    if (patternMultiplier <= 0 || maxComponentsToInsert <= 0) return [];

    return calculateInsertPositions(sourceLength, patternMultiplier, nthChildOffset, maxComponentsToInsert);
}

export function AdditionalComponentHelper_insertComponentAtPattern(
    sourceElements: any[],
    widgetConfig,
    context
): any[] {
    if (!sourceElements?.length) return [];
    if (!widgetConfig?.additionalComponents?.length) return sourceElements;

    const isMobile = context?.hatControllerParams?.isMobile ?? false;
    const componentsToInsert: { position: number; component: any; originalIndex: number }[] = [];

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

        if (
            !widget?.trim() ||
            !insertionPattern ||
            !isPlatformCompatible(isMobile, isMobileEnabled, isDesktopEnabled)
        ) {
            continue;
        }
        const widgetName = _.upperFirst(widget.trim());
        const AdditionalComponent = context?.customData?.widgets?.[widgetName];
        if (!AdditionalComponent) continue;

        const config = parseWidgetConfig(rawConfig || {});
        const component = { AdditionalComponent, config, context, customCssClass };

        const positions = SIMPLE_NUMBER_PATTERN_REGEX.test(insertionPattern)
            ? getSimplePatternPositions(insertionPattern, sourceElements.length)
            : getNthChildPatternPositions(insertionPattern, sourceElements.length, limit);

        for (const position of positions) {
            componentsToInsert.push({ position, component, originalIndex });
        }
    }

    if (componentsToInsert.length === 0) return sourceElements;

    componentsToInsert.sort((a, b) =>
        a.position !== b.position ? a.position - b.position : a.originalIndex - b.originalIndex
    );

    const result: any[] = [];
    let componentIndex = 0;

    for (let i = 0; i <= sourceElements.length; i++) {
        while (componentIndex < componentsToInsert.length && componentsToInsert[componentIndex].position === i) {
            result.push(componentsToInsert[componentIndex].component);
            componentIndex++;
        }

        if (i < sourceElements.length) {
            result.push(sourceElements[i]);
        }
    }

    return result;
}
