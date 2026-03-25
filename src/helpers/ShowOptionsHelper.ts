import _ from 'lodash';
import * as DefaultItemParts from '../components/widgets/Lists/GenericList/itemParts';

/**
 * Represents the result of building dynamic GraphQL fragments from widget showOptions.
 */
export interface ShowOptionsFragmentResult {
    /** Concatenated string of GraphQL fragment definitions */
    dynamicFragments: string;
    /** Fragment spread names for query body (e.g. "...FragmentName \n") */
    dynamicFragmentsNames: string;
    /** GraphQL variable types for dynamic variables (e.g. { $varName: 'String!' }) */
    dynamicVariablesTypes: Record<string, string>;
    /** Actual variable values to pass with the query */
    dynamicVariables: Record<string, any>;
    /** Pre-mapped string of variable types for GraphQL query definition */
    mappedDynamicVariablesTypes: string;
}

export interface ShowOptionsBuildOptions {
    /** Widget configuration with showOptions array */
    widgetConfig: { showOptions?: string[]; [key: string]: any };
    /** Custom item parts to use instead of defaults */
    customItemParts?: Record<string, any>;
}

/**
 * Builds dynamic GraphQL fragments from widget showOptions.
 *
 * This is a centralized utility that extracts the common pattern used across
 * multiple widgets (GenericList, BasicWidget, StorySimilarStories, StoryRelatedContent)
 * for building dynamic fragments from showOptions configuration.
 *
 * @param options - Configuration options for building fragments
 * @returns Object containing all fragment-related data needed for GraphQL queries
 */
export function ShowOptionsHelper_buildFragments(
    options: ShowOptionsBuildOptions
): ShowOptionsFragmentResult {
    const { widgetConfig, customItemParts } = options;
    const allItemParts = customItemParts || DefaultItemParts;

    let dynamicVariablesTypes: Record<string, string> = {};
    let dynamicVariables: Record<string, any> = {};
    let dynamicFragmentsNames = '';

    const dynamicFragments = (widgetConfig.showOptions || [])
        .map((showOption) => {
            const ItemPart = allItemParts[_.upperFirst(showOption)];

            if (ItemPart) {
                let getFragment = ItemPart.getFragment;
                if (!getFragment) {
                    const FragmentPart = allItemParts[_.upperFirst(showOption) + '_getFragment'];
                    if (FragmentPart) {
                        getFragment = FragmentPart;
                    }
                }
                if (getFragment) {
                    const fragment = getFragment(widgetConfig);
                    if (fragment.variables) {
                        dynamicVariables = { ...dynamicVariables, ...fragment.variables };
                    }

                    if (fragment.variablesTypes) {
                        dynamicVariablesTypes = { ...dynamicVariablesTypes, ...fragment.variablesTypes };
                    }

                    if (fragment.query) {
                        dynamicFragmentsNames += ` ...${fragment.query.definitions[0].name.value} \n`;
                        return `${fragment.query.loc?.source.body}`;
                    }
                } else {
                    console.error(`ItemPart getFragment ${showOption} not found`);
                }
            }
            return undefined;
        })
        .filter(Boolean)
        .join('\n');

    const mappedDynamicVariablesTypes = ShowOptionsHelper_mapVariablesTypes(dynamicVariablesTypes);

    return {
        dynamicFragments,
        dynamicFragmentsNames,
        dynamicVariablesTypes,
        dynamicVariables,
        mappedDynamicVariablesTypes,
    };
}

/**
 * Maps dynamic variable types object to GraphQL query definition string.
 *
 * @param variablesTypes - Object with variable names as keys and GraphQL types as values
 * @returns Formatted string for GraphQL query definition (e.g. ", $varName: String!")
 */
export function ShowOptionsHelper_mapVariablesTypes(
    variablesTypes: Record<string, string>
): string {
    return Object.keys(variablesTypes)
        .map((key) => `, ${key}: ${variablesTypes[key]}`)
        .join(' ');
}

/**
 * Extracts excluded flags from widget configuration.
 *
 * @param excludedFlags - Array of objects with excludedFlag property
 * @returns Array of flag strings or empty array
 */
export function ShowOptionsHelper_extractExcludedFlags(
    excludedFlags?: Array<{ excludedFlag: string }>
): string[] {
    return excludedFlags ? excludedFlags.map((flag) => flag.excludedFlag) : [];
}

/**
 * Extracts allowed kinds from widget configuration.
 *
 * @param allowedKinds - Array of objects with kindCode property
 * @returns Array of kind code strings or empty array
 */
export function ShowOptionsHelper_extractAllowedKinds(
    allowedKinds?: Array<{ kindCode: string }>
): string[] {
    return allowedKinds ? allowedKinds.map((kind) => kind.kindCode) : [];
}

