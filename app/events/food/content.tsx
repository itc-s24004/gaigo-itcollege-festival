import { getFoodShop } from "@/libs/db";
import Link from "next/link";

import styles from "./page.module.css";

export async function PageContent() {
    const foodShops = await getFoodShop();
    return (
        <div>
            <h1>フードイベントページ</h1>
            <h2>イベント概要</h2>
            <p>ここではフードイベントの詳細情報を提供します。</p>
            <h2>参加ショップ一覧</h2>
            <ul>
                {
                    foodShops.map((shop) => (
                        <li key={shop.id} className={styles.shop_card}>
                            <Link href={`/events/food/${shop.id}`}>
                                <h1 className={styles.shop_name}>{shop.name}</h1>
                                <div>{shop.descriptions}</div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}