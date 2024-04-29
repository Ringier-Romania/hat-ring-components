import {StoryAuthorsWebsitesConfig} from "../../Story/StoryAuthors/StoryAuthorsWebsitesConfig";
import _ from "lodash";

let wdg = _.cloneDeep(StoryAuthorsWebsitesConfig);
wdg.modules.StoryAuthors_wdg.name = 'Author';
wdg.modules.StoryAuthors_wdg.defaultParams.widgetType = 'author';

export let AuthorWebsitesConfig
    = {
    "sections": [],
    "defaultParams": {},
    "paramsDescription": {},
    "modules": {
        "Author_wdg": wdg.modules.StoryAuthors_wdg
    }
}
