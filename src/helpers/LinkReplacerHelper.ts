import { AppContext } from '../types/types';
import {getDeveloperSettingDetail} from './ConfigHelper';

export async function LinkReplacerHelper_replaceLinks(context: AppContext, text: string) {
    const { linksReplace } = await getDeveloperSettingDetail(context) || {linksReplace: []};

    if (!linksReplace || !linksReplace.length) {
        return text;
    }

    linksReplace.forEach((item) => {
        const re = new RegExp(`data-link-role-code="${item.role}"`, 'g');
        text = text.replace(re, item.replace);
    });

    return text;
}