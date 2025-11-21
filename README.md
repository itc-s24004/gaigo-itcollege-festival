# ガイカレ 紹介 管理サイト

## ディレクトリ構成
- app
    - account / ユーザーアカウントに関するページ
        - contents / ユーザーがアップロードしたファイル一覧
    -admin / 管理者用ページ
    - api / ユーザー登録などのエンドポイントとクライアント用の関数
    - archive / 過去の祭り
    - festival / 
        - [festival_id] / 祭りの詳細ページ
            - editor / 管理ページ
            - event / イベント一覧
                - [event_id] / イベントの詳細
                    - editor / 管理ページ
                    - item / イベントのアイテム一覧
                        - [item_id] / アイテムの詳細ページ
                            - editor / 管理ページ
                - entry / 出展登録ページ
    
- libs / サーバーサイド用の関数など
- page_components / ページコンポーネント
- public / サイト全体の画像など


## env
[next-auth](https://authjs.dev/getting-started/deployment)  
AUTH_URL / http://localhost:3000/api/auth  
AUTH_SECRET / openssl rand -base64 33  
NEXTAUTH_SECRET / デプロイ時に必要  
[google認証(参考)](https://zenn.dev/hayato94087/articles/91179fbbe1cad4#google-developer-console%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9)  
AUTH_GOOGLE_ID / xxxxx-yyyyy.apps.googleusercontent.com  
AUTH_GOOGLE_SECRET /  
[neon](https://neon.com/)  
DATABASE_URL / データベース  
[vercel-blob](https://vercel.com/docs/vercel-blob)  
BLOB_READ_WRITE_TOKEN / ファイルアップロード  


## 開発ルール
- ページに関して
    - サーバーとクライアントを分ける
        - content.tsx / クライアント \
        ユーザー情報などは引数から受け取る \
        追加の操作はapiを通して行う
        - page.tsx / サーバー 
- apiに関して
    - クライアント用の関数を用意する
        - client.ts / クライアント
        - route.ts / サーバー