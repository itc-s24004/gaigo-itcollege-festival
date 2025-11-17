"use client";

import styles from "./index.module.css";
import React from "react";



type Options = {
    title?: string;
    inputs: (
        { label: string, attr: React.InputHTMLAttributes<HTMLInputElement>, type: "input" } |
        { label: string, attr: React.InputHTMLAttributes<HTMLTextAreaElement>, type:  "textarea" } |
        { label: string, attr: React.InputHTMLAttributes<HTMLSelectElement>, type: "select", options: { value: string; label: string }[] } |
        { label: string, type: "custom_input", node: React.ReactNode } |
        { type: "custom", node: React.ReactNode}
    )[];
    submitLabel?: string;
    submitCallback?: (formData: FormData) => void;
    customSubmitButtonAttributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;

    customFormAttributes?: React.FormHTMLAttributes<HTMLFormElement>;

    children?: React.ReactNode;
};

export function PlainForm({ title, inputs, submitLabel, submitCallback, customSubmitButtonAttributes, customFormAttributes, children }: Options) {

    return (
        <form className={styles.form} {...customFormAttributes} onSubmit={(e) => {
            if (!submitCallback) return;

            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            submitCallback(formData);
        }}>
            {title && <h2>{title}</h2>}
            {inputs.map((input, i) => (

                (input.type === "custom") ? (
                    <div key={i} className={styles.form_field_container}>
                        {input.node}
                    </div>

                ) : (
                    <div key={i} className={styles.form_field_container}>
                        <label className={styles.form_label}>
                            {input.label}
                            {
                                input.type === "input" ? (
                                    <input {...input.attr} className={styles.form_input}/>

                                ) : input.type === "textarea" ? (
                                    <textarea {...input.attr} className={styles.form_textarea}/>

                                ) : input.type === "select" ? (
                                    <select {...input.attr} className={styles.form_select}>
                                        {input.options.map((option, j) => (
                                            <option key={j} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                ) : input.type === "custom_input" ? (
                                    input.node

                                ) : null
                            }
                        </label>
                    </div>
                    
                )
            ))}
            {children}
            {submitLabel && <button type="submit" className={styles.form_button} {...customSubmitButtonAttributes}>{submitLabel}</button>}
        </form>
    )
}
