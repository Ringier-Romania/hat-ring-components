import {gql} from "graphql-tag";
import {WebsiteApiProvider} from "../../providers/WebsiteApiProvider";
import _ from "lodash";
import {ConfigHelper_getSeoOpenGraphConfig} from "../ConfigHelper";
import {ImageHelper_getImageDimensionsFromObject} from "../ImageHelper";
import {AppContext, SiteContentType} from "../../types/types";
import {StoryPrefetch_getResponse} from "../StoryPrefetchHelper";

export async function OpenGraphHelper_getMainStoryImageData(context:AppContext) {
    if(context.siteContentType !== SiteContentType.Story){
        return false;
    }
    const seoOpenGraphSettings = await ConfigHelper_getSeoOpenGraphConfig(context);
    const configImageSizes = ImageHelper_getImageDimensionsFromObject(seoOpenGraphSettings, context, 'imageSizesDesktop', 'imageSizesMobile', '0x0');

    // Verificam daca prefetch contine imaginea (fara transforms)
    // Daca da, construim URL-ul cu transforms direct (Ring API suporta transforms via query params)
    const prefetchedResponse = StoryPrefetch_getResponse(context);
    if (prefetchedResponse?.data?.story?.image?.url) {
        const baseUrl: string = _.get(prefetchedResponse, 'data.story.image.url', '');
        const caption: string | null = _.get(prefetchedResponse, 'data.story.image.caption', null);
        // Construim URL cu transforms via query string (Ring CDN suporta w= h= params)
        const transformedUrl = baseUrl.includes('?')
            ? `${baseUrl}&w=${configImageSizes.width}&h=${configImageSizes.height}`
            : `${baseUrl}?w=${configImageSizes.width}&h=${configImageSizes.height}`;
        return { src: transformedUrl, width: configImageSizes.width, height: configImageSizes.height, caption };
    }

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
