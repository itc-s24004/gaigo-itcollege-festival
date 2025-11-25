import Image from "next/image";

export function PageContent() {
    return (
        <div>
            <h1>ログインエラー</h1>
            <Image src={"/error/login.png"} alt={"ログインエラー"} width={400} height={300} />
            <p>対処方法</p>
            <ul>
                <li>
                    サイト情報を開き、Cookieとサイトデータの削除を行ってください。
                    <Image src={"/error/login1.png"} alt={"Cookie削除方法"} width={400} height={300} />
                </li>
                <li>
                    Cookieとサイトデータ
                    <Image src={"/error/login2.png"} alt={"Cookie削除方法2"} width={400} height={300} />
                </li>
                <li>
                    デバイス上のサイトデータを管理
                    <Image src={"/error/login3.png"} alt={"Cookie削除方法3"} width={400} height={300} />
                </li>
                <li>
                    保存されているデータをすべて削除
                    <Image src={"/error/login4.png"} alt={"Cookie削除方法4"} width={400} height={300} />
                </li>
                <li>
                    ブラウザを再起動し、再度ログインをお試しください。
                </li>
            </ul>
        </div>
    )
}