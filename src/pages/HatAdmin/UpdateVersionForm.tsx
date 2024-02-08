'use client'
import React from 'react';
// @ts-ignore
import {useFormState} from 'react-dom'
import {updateVersionHandler} from "./actions";

export function UpdateVersionForm({}) {

    const initialState = {
        status: null,
        errors: []
    }

    const [state, formAction] = useFormState(updateVersionHandler, initialState)

    return (
        <form action={formAction}>
            <fieldset>
                <legend>Update Version of configuration</legend>
                <label>version </label>
                <input type="text" name="version" required/>

                <button type="submit">Update</button>
                <p className="status" role="status">
                    {state?.status}
                </p>
                <p className="error">
                    {state?.errors.map((error) => {
                        return <span>{error.message}</span>
                    })}
                </p>
            </fieldset>
        </form>
    )
}
