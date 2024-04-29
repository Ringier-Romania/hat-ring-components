import {CreateVersionForm} from "./CreateVersionForm";
import {UpdateVersionForm} from "./UpdateVersionForm";

import {UtilsHelper_isDevelopmentMode} from "../../helpers/UtilsHelper";
import React from "react";
// import styles from "../../../styles/pages/HatAdmin.module.scss";

import "../../../styles/pages/HatAdmin.scss";

export const revalidate = 0;

export function HatAdmin({params, searchParams}: {
    params: {
        path: Array<string>;
    };
    searchParams: any;
}) {

    if (!UtilsHelper_isDevelopmentMode()) {
        //@TODO
        //return redirect('/404')
    }

    const templateName = process.env.CONFIGURATION_TEMPLATE_NAME;

    if (!templateName) {
        return <>no CONFIGURATION_TEMPLATE_NAME env set, update hat cli and setup</>
    }

    return <>
        <div className={[].join(' ')}>
            <div className={'container'}>
                <h1>HAT Admin</h1>
                <section>
                    <h2>Websites Manager configuration management</h2>
                    <div className={'col'}>
                        <CreateVersionForm/>
                    </div>
                    <div className={'col'}>
                        <UpdateVersionForm/>
                    </div>
                </section>
            </div>
        </div>

    </>;
}
