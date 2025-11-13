import Link from "next/link";
import { AccountButton } from "../account_button";
import styles from "./index.module.css";
import { getUserInfo } from "@/libs/user";


export const Header = async () => {
    const userInfo = await getUserInfo();
    return <header className={styles.header}>
        <div className={styles.leftSection}>
            <h1 className={styles.title}>ガイカレ祭り</h1>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><Link href="/">ホーム</Link></li>
                    <li className={styles.navItem}><Link href="/events">イベント一覧</Link></li>
                    <li className={styles.navItem}><Link href="/about">このサイトについて</Link></li>
                </ul>
            </nav>
        </div>
        <AccountButton userInfo={userInfo} />
    </header>;
}