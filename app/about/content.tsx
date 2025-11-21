import styles from './content.module.css'

export function PageContent() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About Us</h1>
            
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>ガイカレまつり</h2>
                <p className={styles.text}>
                    『ガイカレまつり』は、二つの専門学校「観光、語学の学校 ガイゴ」と、「ゲームとITの学校 アイカレ」の地域のみなさまと一緒に楽しむイベントお祭りです。
                    在校生が出展をしたり、楽しんで学校の事を知ってもらえるプログラムを多数用意しています。
                    皆様のご来場おまちしております。
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>内容</h2>
                <ul className={styles.list}>
                    <li>フードコート</li>
                    <li>ステージイベント</li>
                    <li>浴衣着付け体験コーナー</li>
                    <li>文化体験コーナー</li>
                    <li>学生ゲーム作品試遊コーナー</li>
                    <li>学校説明･入学相談コーナー</li>
                    など盛りだくさん！
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>開催情報</h2>
                <div className={styles.infoBox}>
                    <p><strong>日時:</strong> 2024年12月開催予定</p>
                    <p><strong>場所:</strong> 外語キャンパス</p>
                    <p><strong>参加対象:</strong> 全学生・教職員・一般来場者</p>
                </div>
            </section>
        </div>
    )
}