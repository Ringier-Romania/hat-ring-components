import type { APIContext } from "astro";
import { WebsiteApiProvider } from "../../providers/WebsiteApiProvider";
import { gql } from "@ringpublishing/graphql-api-client-got";
import _ from "lodash";
import { generateConfig } from "../HatAdmin/generateConfig";

export interface GridEditAPIOptions {
  websiteManagerConfigs?: any;
}

export function createGridEditAPI(options: GridEditAPIOptions = {}) {
  return async function POST(context: APIContext) {
    const reqBody = await context.request.json();
    let responseString = 'OK';

    const action = reqBody.action;
    switch (action) {
      case 'updateConfig':
        const variant = reqBody.variant;

        // Group moves by configNodeId and container
        const movesByNodeAndContainer: Record<string, Record<string, any[]>> = {};
        reqBody.moves.forEach((move: any) => {
          const configNodeId = move.configNodeId;
          if (!configNodeId) return;

          const container = move.widgetId.split('--')[0];
          const box = move.widgetId.split('--')[1];

          if (!movesByNodeAndContainer[configNodeId]) {
            movesByNodeAndContainer[configNodeId] = {};
          }
          if (!movesByNodeAndContainer[configNodeId][container]) {
            movesByNodeAndContainer[configNodeId][container] = [];
          }
          movesByNodeAndContainer[configNodeId][container].push({
            box: box,
            widgetId: move.widgetId,
            from: move.from,
            to: move.to,
          });
        });

        if (!variant) {
          return new Response(JSON.stringify({ error: 'Missing variant' }), {
            headers: { "Content-Type": "application/json; charset=utf-8" },
          });
        }

        for (const nodeId of Object.keys(movesByNodeAndContainer)) {
          const containerMoves = movesByNodeAndContainer[nodeId];

          for (const container of Object.keys(containerMoves)) {
            const variables = {
              nodeID: nodeId,
              variant: variant,
            };

            const query = gql`
              query($nodeID: ID!, $variant:ID!){
                node(id: $nodeID){
                  config(variantId: $variant){
                    config(codeName: "${container}"){
                      data
                    }
                  }
                }
              }
            `;

            const response = await WebsiteApiProvider.call(query, variables, 0);

            const configData = response?.data?.node?.config?.config?.[0]?.data;
            if (!configData) {
              continue;
            }

            const moves = containerMoves[container];
            const boxNames = _.uniq(moves.map((m: any) => m.box));

            for (const boxName of boxNames) {
              const boxWidgets = configData[boxName];
              if (!boxWidgets || !Array.isArray(boxWidgets)) {
                continue;
              }

              const boxMoves = moves.filter((m: any) => m.box === boxName);
              const newBoxWidgets = [...boxWidgets];

              boxMoves.forEach((move: any) => {
                newBoxWidgets[move.to] = boxWidgets[move.from];
              });

              configData[boxName] = newBoxWidgets;
            }

            const vars = {
              configuration: configData
            };

            const mutation = gql`
              mutation ($configuration: JSONObject!) {
                setModuleConfiguration(
                  configuration: $configuration
                  nodeId: "${nodeId}"
                  variantId: "${variant}"
                  moduleCodeName: "${container}"
                ) {
                  status
                }
              }
            `;

            await WebsiteApiProvider.call(mutation, vars, 0);
          }
        }
        break;

      case 'determineConfigNodeId':
        const detNodeId = reqBody.nodeId;
        const detVariant = reqBody.variant;
        const containerName = reqBody.containerName;

        if (!detNodeId || !detVariant || !containerName) {
          responseString = JSON.stringify({ error: 'Missing nodeId, variant or containerName' });
          break;
        }

        const findConfigNodeId = async (currentNodeId: string): Promise<string> => {
          const detQuery = gql`
            query($nodeID: ID!, $variant: ID!) {
              node(id: $nodeID) {
                id
                parent {
                  id
                  config(variantId: $variant) {
                    config(codeName: "${containerName}") {
                      data
                      name
                    }
                  }
                }
                config(variantId: $variant) {
                  config(codeName: "${containerName}") {
                    data
                    name
                  }
                }
              }
            }
          `;

          const detRes = await WebsiteApiProvider.call(detQuery, { nodeID: currentNodeId, variant: detVariant }, 0);
          const node = detRes?.data?.node;
          if (!node) {
            return currentNodeId;
          }

          const currentConfig = node.config?.config;
          const parent = node.parent;

          if (!parent) {
            return currentNodeId;
          }

          const parentConfig = parent.config?.config;
          const configsEqual = JSON.stringify(currentConfig) === JSON.stringify(parentConfig);

          if (!configsEqual) {
            return currentNodeId;
          }

          return findConfigNodeId(parent.id);
        };

        const realConfigNodeId = await findConfigNodeId(detNodeId);
        responseString = JSON.stringify({ nodeId: realConfigNodeId });
        break;

      case 'getContainerSections':
        try {
          const requestedContainers: string[] = reqBody.containers || [];

          if (options.websiteManagerConfigs) {
            (global as any).websiteManagerConfigs = options.websiteManagerConfigs;
          }

          const config: any = await generateConfig();
          const sections = config?.sections || [];
          const containerToSection: Record<string, string> = {};

          const allContainerToSection: Record<string, string> = {};
          sections.forEach((section: { title: string; keys: string[] }) => {
            const sectionTitle = section.title.toLowerCase().replace(/,\s*/g, ',%20').replace(/\s+/g, '%20');
            section.keys.forEach((key: string) => {
              allContainerToSection[key] = sectionTitle;
            });
          });

          requestedContainers.forEach((containerName: string) => {
            if (allContainerToSection[containerName]) {
              containerToSection[containerName] = allContainerToSection[containerName];
            } else {
              containerToSection[containerName] = 'story';
            }
          });

          responseString = JSON.stringify({ containerToSection });
        } catch (error) {
          console.error('[getContainerSections] Error:', error);
          responseString = JSON.stringify({ error: 'Failed to get container sections', containerToSection: {} });
        }
        break;

      default:
        responseString = 'Unrecognized action';
        break;
    }

    return new Response(responseString, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  };
}
