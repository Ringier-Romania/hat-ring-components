import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../providers/WebsiteApiProvider";
import _ from "lodash";
import {ConfigHelper_getSeoOpenGraphConfig} from "../ConfigHelper";
import {ImageHelper_getImageDimensionsFromObject} from "../ImageHelper";
import {AppContext, SiteContentType} from "../../types/types";

export async function OpenGraphHelper_getMainStoryImageData(context:AppContext) {
    if(context.siteContentType !== SiteContentType.Story){
        return false;
    }
    const seoOpenGraphSettings = await ConfigHelper_getSeoOpenGraphConfig(context);
    const configImageSizes = ImageHelper_getImageDimensionsFromObject(seoOpenGraphSettings, context, 'imageSizesDesktop', 'imageSizesMobile', '0x0');

    //TODO add support for different format
    const query = gql`
        query($storyId: UUID, $imageWidth:Int!, $imageHeight:Int!, $imageScaleDown:Boolean, $imageScaleUp:Boolean){
            story(id:$storyId){
                image{
                    url(transforms:[
                        {
                            resize:{width:$imageWidth,height:$imageHeight,scaleDown:$imageScaleDown,scaleUp:$imageScaleUp}
                        },
                        {
                            format: {format: PNG},
                        }
                    ]),
                    caption
                }
            }
        }
    `;

    const variables = {
        storyId: context.id,
        imageWidth: configImageSizes.width,
        imageHeight: configImageSizes.height,
        imageScaleDown: true,
        imageScaleUp: true
    };

    type ImageDataResponse = {
        "data": {
            "story": {
                "image": {
                    "url": string,
                    "caption": string | null
                }
            }
        }
    }

    let response = await WebsiteApiProvider.call(query, variables) as ImageDataResponse;

    const imgSrc = _.get(response, 'data.story.image.url');
    const caption = _.get(response, 'data.story.image.caption');

    return { src: imgSrc, width: variables.imageWidth, height: variables.imageHeight, caption: caption };
}
