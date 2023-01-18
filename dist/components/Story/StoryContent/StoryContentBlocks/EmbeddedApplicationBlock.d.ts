/// <reference types="react" />
export interface EmbeddedApplicationBlockParams {
    blockData: {
        type: string;
        embed: {
            html: string;
        };
    };
}
export default function EmbeddedApplicationBlock({ blockData }: EmbeddedApplicationBlockParams): JSX.Element;
