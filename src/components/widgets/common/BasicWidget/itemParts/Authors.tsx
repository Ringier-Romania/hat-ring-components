import React from 'react';
import {AppContext} from "../../../../../types/types";
import {BasicWidgetConfig, BasicWidgetResponseNode} from "../types";
import RingImage, {TransformType} from "../../../../common/RingImage";
import {renderEmptyComponent} from "@helpers";

export default function Authors(
    {context, widgetConfig, data}:
        {
            context: AppContext,
            widgetConfig: BasicWidgetConfig,
            data: BasicWidgetResponseNode,
        }) {
    const authorsObjs = data.originalContent?.authors?.map((obj) => obj.author);

    if (!authorsObjs || authorsObjs.length === 0) {
        return renderEmptyComponent('Authors');
    }

    return (
        <div className={['Authors'].join(' ')}>
            {authorsObjs.map((author) => (
                <div className="authorWrapper">
                    {author.image?.url &&
                        <div className="authorImage">
                            <RingImage src={author.image.url} alt={author.image.caption || author.name} width={100} height={100} transform={TransformType.ResizeCropAuto} />
                        </div>
                    }
                    {author.name &&
                        <div className="authorName">
                            {author.name}
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

