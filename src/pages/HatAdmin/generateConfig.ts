import _ from "lodash";

export async function generateConfig() {
    let config = {};

    function customizer(objValue, srcValue) {
        if (_.isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    }

    for (const [key, componentsConfig] of Object.entries(global.websiteManagerConfigs)) {
        config = _.mergeWith(config, componentsConfig, customizer);
    }

    const modules = Object.keys(config["modules"] || {}) || [];
    const sortedModulesKeys = _.sortBy(modules, function(key) { return config["modules"][key].name; });
    const sortedModules = {}
    sortedModulesKeys.forEach(key => {
        sortedModules[key] = config['modules'][key];
    });
    config['modules'] = sortedModules;

    function populateWidgets(obj) {
        const stringsToReplace = [
            "GULP-MODULES-LIST",
            "GULP-DETAIL-MODULES-LIST",
            "GULP-HEAD-MODULES-LIST",
            "GULP-HEADER-MODULES-LIST",
            "GULP-FOOTER-MODULES-LIST",
            "GULP-AMP-MODULES-LIST",
        ];
        if (typeof obj === "object") {
            for (var keys in obj) {
                if (typeof obj[keys] === "object") {
                    populateWidgets(obj[keys]);
                } else {
                    if (typeof obj[keys] === "string") {
                        if (stringsToReplace.includes(obj[keys])) {
                            obj[keys] = modules;
                        }
                    }
                }
            }
        }
        return obj;
    }

    populateWidgets(config);

    return config;
}
