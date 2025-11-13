import styles from "./index.module.css";

type Props = {
    children?: React.ReactNode;
};

export function MultiForm({ children }: Props) {
    return (
        <div className={styles.multi_form}>
            {children}
        </div>
    );
}