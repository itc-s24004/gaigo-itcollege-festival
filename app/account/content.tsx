"use client"

import { signOutAction } from "@/page_components/auth/action";
import { GoogleAuthBtn } from "@/page_components/auth/google"
import { MultiForm } from "@/page_components/form/multi_form";
import { PlainForm } from "@/page_components/form/plain"
import { useState } from "react";





export function GoogleLogin() {
    const [logout, setLogout] = useState(false);
    return (
        <div>
            <p>Googleアカウントでログインしています</p>
            <label>別のアカウントですか?</label>
            <p>追加のユーザー情報を登録してください。</p>

            <MultiForm>
                <PlainForm
                    inputs={[
                        {
                            node: <GoogleAuthBtn type="button" text="別のアカウントでログイン" customAttributes={{onClick: (ev) => {
                                setLogout(!logout);
                            }}}/>
                        },
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
                    customFormAttributes={
                        {
                            action: logout ? signOutAction : "/api/auth/complete_signup",
                            method: "post",
                        }
                    }
                >

                    <GoogleAuthBtn type="submit" text={logout ? "ログアウト" : "登録"} />
                    
                </PlainForm>
            </MultiForm>
        </div>
    )
}
