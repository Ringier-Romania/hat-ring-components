import {CreateVersionForm} from "./CreateVersionForm";
import {UpdateVersionForm} from "./UpdateVersionForm";
import {redirect} from 'next/navigation'
import {UtilsHelper_isDevelopmentMode} from "../../helpers/UtilsHelper";
import React from "react";

export const revalidate = 0;

export function HatAdmin({params, searchParams}: {
    params: {
        path: Array<string>;
    };
    searchParams: any;
}) {

    if (!UtilsHelper_isDevelopmentMode()) {
        return redirect('/404')
    }

    const templateName = process.env.CONFIGURATION_TEMPLATE_NAME;

    if (!templateName) {
        return <>no CONFIGURATION_TEMPLATE_NAME env set, update hat cli and setup</>
    }

    return <>
        <div>
            <h1>HAT Admin</h1>
            <section>
                <h2>Websites Manager configuration management</h2>
                <CreateVersionForm />
                <UpdateVersionForm/>
            </section>
        </div>

    </>;
}
