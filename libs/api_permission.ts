import { NextResponse } from "next/server";
import { UserAccount } from "./data";
import { db_user_level } from "./db/db.type";

/**
 * apiの権限をチェックする関数
 * @param successCallback 
 * 条件を満たした場合に実行されるコールバック関数
 * @param staffOnly 
 * スタッフ専用APIかどうか\
 * スタッフユーザーかつユーザーレベルがobserver以外であれば成功とみなす
 * @param user 
 * 現在のユーザー情報
 * @param level 
 * 必要なユーザーレベル\
 * 空の場合は未認証でも成功とみなす
 * @returns 
 */
export async function checkApiPermission(successCallback: () => Promise<NextResponse>, staffOnly: boolean, user?: UserAccount, level?: db_user_level): Promise<NextResponse> {
    // レベル指定がない場合は成功とみなす
    if (level === undefined) return await successCallback();
    // ユーザー情報がない場合は認証エラー
    if (user === undefined) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    // Super Admins なら何でもできる
    if (user.level === db_user_level.superAdmin) return await successCallback();
    
    // スタッフ専用APIの場合
    if (staffOnly) {
        if (user.isStaff && user.level != db_user_level.observer) return await successCallback();
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // レベル別チェック
    switch (level) {
        case db_user_level.observer:
            return await successCallback();
        case db_user_level.user:
            if (user.level !== db_user_level.observer) return await successCallback();
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        case db_user_level.admin:
            if (user.level === db_user_level.admin) return await successCallback();
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        case db_user_level.superAdmin:
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
}