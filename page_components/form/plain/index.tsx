"use client";

import styles from "./index.module.css";
import React from "react";



type Options = {
    title?: string;
    inputs: (
        { label: string, attr: React.InputHTMLAttributes<HTMLInputElement>, type: "input" } |
        { label: string, attr: React.InputHTMLAttributes<HTMLTextAreaElement>, type:  "textarea" } |
        { node: React.ReactNode}
    )[];
    submitLabel?: string;
    submitCallback?: (formData: FormData) => void;

    customFormAttributes?: React.FormHTMLAttributes<HTMLFormElement>;

    children?: React.ReactNode;
};

export function PlainForm({ title, inputs, submitLabel, submitCallback, customFormAttributes, children }: Options) {

    return (
        <form className={styles.form} {...customFormAttributes} onSubmit={(e) => {
            if (!submitCallback) return;

            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            submitCallback(formData);
        }}>
            {title && <h2>{title}</h2>}
            {inputs.map((input, i) => (

                ("node" in input) ? (
                    <div key={i} className={styles.form_field_container}>
                        {input.node}
                    </div>

                ) : (
                    <div key={i} className={styles.form_field_container}>
                        <label className={styles.form_label}>
                            {input.label}
                            {input.type === "textarea" ? (
                                <textarea {...input.attr} className={styles.form_textarea}/>
                            ) : (
                                <input {...input.attr} className={styles.form_input}/>
                            )}
                        </label>
                    </div>
                    
                )
            ))}
            {children}
            {submitLabel && <button type="submit" className={styles.form_button}>{submitLabel}</button>}
        </form>
    )
}
