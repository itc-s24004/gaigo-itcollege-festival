"use client";

import Link from "next/link";
import { AccountButton } from "../account_button";
import styles from "./index.module.css";
import { useState } from "react";
import { db_festival_id } from "@/libs/db/db.type";


export const Header = ({festival_id, isLoggedIn, icon}: {festival_id: db_festival_id, isLoggedIn: boolean, icon: string | null}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return <header className={styles.header}>
        <div className={styles.leftSection}>
            <h1 className={styles.title}>ガイカレ祭り</h1>
            <div className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
                &#9776;
                {/* 展開ボタン */}
            </div>
            <nav className={ menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}>
                <ul className={styles.navList}>
                    <Link href="/"><li className={styles.navItem}>ホーム</li></Link>
                    <Link href={`/festival/${festival_id}/event`}><li className={styles.navItem}>イベント一覧</li></Link>
                    <Link href="/archive"><li className={styles.navItem}>過去の祭り</li></Link>
                    <Link href="/about"><li className={styles.navItem}>このサイトについて</li></Link>
                </ul>
            </nav>
        </div>
        <AccountButton isLoggedIn={isLoggedIn} icon={icon} />
    </header>;
}