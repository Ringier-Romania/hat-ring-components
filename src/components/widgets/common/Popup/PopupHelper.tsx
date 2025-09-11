export function PopupHelper_parsePopupSize(sizeString: string | undefined): { width: string; height: string } | null {
    if (!sizeString) return null;

    const s = sizeString.trim();
    const regex = /^\s*(?:(\d+(?:\.\d+)?)(px|%|vw|vh|em|rem)?\s*)?(?:x\s*(\d+(?:\.\d+)?)(px|%|vw|vh|em|rem)?\s*)?$/i;
    
    const match = s.match(regex);
    if (!match) return null;

    const [, wVal, wUnit, hVal, hUnit] = match;
    

    if (!wVal && !hVal) return null;
    
    return {
        width: wVal ? `${wVal}${wUnit || 'px'}` : 'auto',
        height: hVal ? `${hVal}${hUnit || 'px'}` : 'auto'
    };
}
