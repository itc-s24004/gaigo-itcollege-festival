import { getUserInfo } from "@/libs/user";
import { signInAction, signOutAction } from "@/page_components/auth/action";
import { GoogleAuthBtn } from "@/page_components/auth/google";
import { MultiForm } from "@/page_components/form/multi_form";
import { PlainForm } from "@/page_components/form/plain";
import Link from "next/link";


export const metadata = {
    title: "アカウント管理",
    description: "ユーザーアカウントの管理ページ",
};


export default async function Page() {

    const userInfo = await getUserInfo();

    const mainFrame = userInfo.isLoggedIn ? (
        <MultiForm>
            <PlainForm 
                title="ユーザー情報の編集"
                inputs={[
                    {
                        label: "NickName",
                        type: "input",
                        attr: {
                            type: "text",
                            name: "nickName",
                            placeholder: "nickName",
                            defaultValue: userInfo.user?.nickName || "",
                        }
                    },
                    {
                        label: "Email",
                        type: "input",
                        attr: {
                            type: "email",
                            name: "email",
                            placeholder: "email",
                            defaultValue: userInfo.user?.email || "",
                            disabled: true,
                        }
                    }
                ]}
                submitLabel="更新"
                customFormAttributes={{
                    action: "/api/auth/update",
                    method: "post",
                }}
            />

            <PlainForm inputs={[]} customFormAttributes={{action: signOutAction}}>
                <GoogleAuthBtn type="submit" text="ログアウト" />
            </PlainForm>
        </MultiForm>
    ) : userInfo.isGoogleLogin ? (
        <MultiForm>


            <PlainForm
                title="追加のユーザー情報を登録"
                inputs={[
                    {
                        label: "NickName",
                        type: "input",
                        attr: {
                            type: "text",
                            name: "nickName",
                            placeholder: "nickName",
                            required: true,
                            minLength: 3,
                            maxLength: 30,
                        }
                    }
                ]}
                submitLabel="登録"
                customFormAttributes={
                    {
                        action: "/api/auth/signup",
                        method: "post",
                    }
                }
            />

            <PlainForm inputs={[]} customFormAttributes={{action: signInAction("google")}}>
                <GoogleAuthBtn type="submit" text="別のアカウントでログイン" />
            </PlainForm>

        </MultiForm>
    ) : (
        <PlainForm 
            title="ログインされていません"
            inputs={[]} customFormAttributes={{action: signInAction("google")}}
        >
            <GoogleAuthBtn type="submit" text="Googleアカウントでサインイン" />
        </PlainForm>
    );
    
    return (
        <>
            {mainFrame}
            <Link href={"/troubleshooting/login"} >ログインに失敗する場合</Link>
            <br />
            <Link href={"/account/events"}>イベント管理ページへ</Link>
        </>
    );
}