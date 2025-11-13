import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";
import { UserInfo } from "@/libs/user";

export async function AccountButton({userInfo}: {userInfo: UserInfo}) {

    const icon = userInfo.icon;
    const user = userInfo.user;
    return (
        <Link href="/account">
            {
                user ? (
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