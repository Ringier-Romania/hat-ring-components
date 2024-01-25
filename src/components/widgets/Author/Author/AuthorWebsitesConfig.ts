import {StoryAuthorsWebsitesConfig} from "../../Story/StoryAuthors/StoryAuthorsWebsitesConfig";

let wdg = {...StoryAuthorsWebsitesConfig.modules.StoryAuthors_wdg};
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
