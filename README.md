# ガイカレ 紹介 管理サイト

## ディレクトリ構成
- app
    - account / ユーザーアカウントに関するページ
    - api / ユーザー登録などのエンドポイントとクライアント用の関数
    - events / ガイカレ祭りの出店に関するページ
        - experience / 体験コーナー
        - food / 食べ物
        - stage / パフォーマンス
    
    - test / テスト用のページ

- libs / サーバーサイド用の関数など
- page_components / ページコンポーネント
- public / サイト全体の画像など


## env
AUTH_URL / 
AUTH_SECRET / 
AUTH_GOOGLE_ID / 
AUTH_GOOGLE_SECRET / 
DATABASE_URL / 
BLOB_READ_WRITE_TOKEN / 


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