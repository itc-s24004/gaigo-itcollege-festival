import styles from "../plain/index.module.css";

type Props = {
    title?: string;
    inputs?: (
        { label: string, attr: React.InputHTMLAttributes<HTMLInputElement>, type: "input" } |
        { label: string, attr: React.InputHTMLAttributes<HTMLTextAreaElement>, type:  "textarea" } |
        { label: string, attr: React.InputHTMLAttributes<HTMLSelectElement>, type: "select", options: { value: string; label: string }[] } |
        { label: string, type: "custom_input", node: React.ReactNode } |
        { type: "custom", node: React.ReactNode}
    )[];
    children?: React.ReactNode;
}
export function DummyForm({ children, title, inputs }: Props) {
    return (
        <div className={styles.form}>{title && <h2>{title}</h2>}
            {inputs?.map((input, i) => (

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
        </div>
    );
}