import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";

export function AccountButton({isLoggedIn, icon}: {isLoggedIn: boolean, icon: string | null}) {

    return (
        <Link href="/account">
            {
                isLoggedIn ? (
                    <div className={styles.accountButton}>
                        <Image src={icon ?? "/default-avatar.png"} alt={""} width={48} height={48}  className={styles.icon}/>
                        <span>ログイン済み</span>
                    </div>
                ) : (
                    <div className={styles.accountButton}>
                        <span>ログイン</span>
                    </div>
                )
            }
        </Link>
    )
}