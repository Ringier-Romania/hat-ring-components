/// <reference types="react" />
export interface Embedded_applicationBlockParams {
    blockData: {
        type: string;
        embed: {
            html: string;
        };
    };
}
export default function EmbeddedApplicationBlock({ blockData }: Embedded_applicationBlockParams): JSX.Element;
