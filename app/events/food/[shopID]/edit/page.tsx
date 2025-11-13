export default function Page() {
    

    return (
        <div>
            <h1>ショップ編集ページ</h1>
            <h2>概要編集</h2>
            <textarea rows={4} cols={50} defaultValue="ここにショップの概要を入力してください。"></textarea>
            <h2>メニュー編集</h2>
            <textarea rows={6} cols={50} defaultValue="ここにメニューアイテムを入力してください。"></textarea>
            <br />
            <button>保存</button>
        </div>
    );
}