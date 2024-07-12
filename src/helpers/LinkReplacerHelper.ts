import { AppContext } from '../types/types';
import {getDeveloperSettingDetail} from './ConfigHelper';

export async function LinkReplacerHelper_replaceLinks(context: AppContext, text: string) {
    const { linksReplace } = await getDeveloperSettingDetail(context);

    if (!linksReplace) {
        return text;
    }

    linksReplace.forEach((item) => {
        text = text.replace(`data-link-role-code="${item.role}"`, item.replace);
    });

    return text;
}