import gql from "graphql-tag";
import {WebsiteApiProvider} from "../../providers/WebsiteApiProvider";


export async function createConfig(config, templateName, version) {
    const variables = {
        configStructure: config,
        templateName: templateName,
        id: version
    };

    const query = gql`
        mutation ($id: ID!, $configStructure: JSONObject!, $templateName: String!){
            createConfigurationTemplateVersion( input: {
                id: $id,
                configurationTemplateName: $templateName,
                structure: $configStructure
            }){
                status
                errors {
                    message
                }
            }
        }
    `;

    const response = await WebsiteApiProvider.call(query, variables);
    return response;
}

export async function updateConfig(config, templateName, version) {
    const variables = {
        configStructure: config,
        templateName: templateName,
        id: version
    };

    const query = gql`
        mutation ($id: ID!, $configStructure: JSONObject!, $templateName: String!){
            updateConfigurationTemplateVersion(id: $id, configurationTemplateName: $templateName, input: {structure: $configStructure}){
                status
                errors {
                    message
                }
            }
        }
    `;

    const response = await WebsiteApiProvider.call(query, variables);
    return response;
}
