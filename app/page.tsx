import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
    return (
        <div>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>トップページ</h1>
                <h2>テスト用リンク</h2>
            </div>
            <ul className={styles.tree}>
                <li>
                    <Link href="/">/ | トップページ</Link>

                    <ul className={styles.tree}>
                        <li>
                            <Link href="/account">/account | アカウント</Link>
                            <ul className={styles.tree}>
                                <li><Link href="/account/contents">/account/contents | アップロードしたコンテンツ</Link></li>
                            </ul>
                        </li>

                        <li>
                            /events | イベント
                            <ul className={styles.tree}>
                                <li><Link href="/events/food">/events/food | 食事</Link></li>
                                <li><Link href="/events/stage">/events/stage | ステージ</Link></li>
                            </ul>
                        </li>
                        
                        <li>
                            <Link href="/test">/test | テスト</Link>
                            <ul className={styles.tree}>
                                <li><Link href="/test/select">/test/select | データ選択</Link></li>
                                <li><Link href="/test/upload">/test/upload | ファイルアップロード</Link></li>
                            </ul>
                        </li>

                    </ul>
                    
                </li>
            </ul>
        </div>
    );
}