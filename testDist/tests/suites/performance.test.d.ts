import { PlaywrightTest } from "../types";
export declare function TestPerformance_imagesLoadingStrategy({ playwrightTest, imageSrcToSkip }: {
    playwrightTest: PlaywrightTest;
    imageSrcToSkip?: string[];
}): void;
export declare function TestPerformance_visibleIframesLazyLoading({ playwrightTest, iframeSrcToSkip }: {
    playwrightTest: PlaywrightTest;
    iframeSrcToSkip?: string[];
}): void;
