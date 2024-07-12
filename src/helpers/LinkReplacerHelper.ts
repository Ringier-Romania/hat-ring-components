import { AppContext } from '../types/types';
import {ConfigHelper_getDetail} from './ConfigHelper';

export async function LinkReplacerHelper_replaceLinks(context: AppContext, text: string) {
    const { linksReplace } = await ConfigHelper_getDetail(context);

    if (!linksReplace) {
        return text;
    }

    linksReplace.forEach((item) => {
        text = text.replace(`data-link-role-code="${item.role}"`, item.replace);
    });

    return text;
}