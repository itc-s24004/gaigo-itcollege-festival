import Link from "next/link";
import styles from "./index.module.css";


type Options = {

    link?: string;
    children?: React.ReactNode;
}
export function Poster({ link, children }: Options) {
    return link ? (
        <div className={styles.poster}>
            <Link href={link} className={styles.poster_link}>
                {children}
            </Link>
        </div>
    ) : (
        <div className={styles.poster}>
            {children}
        </div>
    )
}