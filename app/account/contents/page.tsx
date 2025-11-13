import { getUserInfo } from "@/libs/user";
import { PageContent } from "./content";

export default async function Page() {
    const userInfo = await getUserInfo();

    const user = userInfo.user;

    if (user) {
        return (
            <div>
                <PageContent />
            </div>
        )
    } else {
        return (
            <div>
                <p>ユーザー情報が見つかりません。</p>
            </div>
        )
    }
}