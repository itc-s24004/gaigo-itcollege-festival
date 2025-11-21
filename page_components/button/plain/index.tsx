import styles from "./index.module.css";


type Options = {
    attributes?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    children?: React.ReactNode;
};
export function PlainButton({ attributes, children }: Options) {
    return (
        <button className={styles.button} {...attributes}>
            {children}
        </button>
    );
}