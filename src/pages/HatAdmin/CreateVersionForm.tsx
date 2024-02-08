'use client'
import React from 'react';
// @ts-ignore
import { useFormState } from 'react-dom'
import {createVersionHandler} from "./actions";

export function CreateVersionForm({}) {

    const initialState = {
        status: null,
        errors: []
    }

    const [state, formAction] = useFormState(createVersionHandler, initialState)

    return (
        <form action={formAction}>
            <fieldset>
                <legend>Create Version of configuration </legend>
                <label>version </label>
                <input type="text" name="version" required/>

                <button type="submit">Create</button>
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
