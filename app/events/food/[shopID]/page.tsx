import { getFoodShopByID } from "@/libs/db";

type Options = {
    params: Promise<{
        shopID: string;
    }>;
};

export default async function Page({ params }: Options) {
    console.log("shopID:", await params);
    const shop = await getFoodShopByID((await params).shopID);
    return (
        <div>
            <h1>ショップ詳細ページ</h1>
            <h1>{shop ? shop.name : "ショップが見つかりません"}</h1>
            <p>{shop ? shop.descriptions : ""}</p>
        </div>
    );
}