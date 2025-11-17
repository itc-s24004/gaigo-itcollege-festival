import Link from "next/link";

export function ErrorContent({title, message}: {title: string, message: string}) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{message}</p>
            <Link href="/">ホームに戻る</Link>
        </div>
    );
}



