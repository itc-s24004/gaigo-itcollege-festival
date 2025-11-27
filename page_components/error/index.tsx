import Link from "next/link";

export function ErrorContent({title="エラー", message="このページを表示できません"}: {title?: string, message?: string}) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{message}</p>
            <Link href="/">ホームに戻る</Link>
        </div>
    );
}



