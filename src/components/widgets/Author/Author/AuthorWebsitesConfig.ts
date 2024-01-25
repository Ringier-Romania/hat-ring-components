import {StoryAuthorsWebsitesConfig} from "../../Story/StoryAuthors/StoryAuthorsWebsitesConfig";
import _ from "lodash";

let wdg = _.cloneDeep(StoryAuthorsWebsitesConfig);
wdg.name = 'Author';
wdg.defaultParams.widgetType = 'author';
export let AuthorWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "Author_wdg": wdg
    }
}
