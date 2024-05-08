import _ from "lodash";
import {createConfig, updateConfig} from "./WebsitesConfigUtils";
import {generateConfig} from "./generateConfig";

const templateName = process.env.CONFIGURATION_TEMPLATE_NAME;

export async function createVersionHandler(formData: FormData): Promise<{ status: string, errors: any[] }> {
    const config = await generateConfig();
    const version = formData.get('create_version');

    const res = await createConfig(config, templateName, version);
    const status = _.get(res, 'data.createConfigurationTemplateVersion.status');
    const errors = _.get(res, 'data.createConfigurationTemplateVersion.errors');

    return {status, errors};
}

export async function updateVersionHandler(formData: FormData): Promise<{ status: string, errors: any[] }> {
    const config = await generateConfig();
    const version = formData.get('update_version');

    const res = await updateConfig(config, templateName, version);
    const status = _.get(res, 'data.updateConfigurationTemplateVersion.status');
    const errors = _.get(res, 'data.updateConfigurationTemplateVersion.errors');

    return {status, errors};
}
