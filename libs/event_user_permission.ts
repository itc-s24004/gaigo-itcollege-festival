import { UserAccount } from "./data";
import { db_event, db_event_id, db_user, db_user_level } from "./db/db.type";
import { db_getEventUsersByEventID } from "./db/event_users";
import { db_getEventByID } from "./db/events";

/**
 * イベントに対するユーザーの権限を確認する
 * 戻り値:
 * 0: 権限なし
 * 1: スタッフ権限
 * 2: オーナー権限
 * 3: 管理者権限
 * @param event 
 * @param user 
 * @returns 
 */
export async function checkEventUserPermission(event: db_event_id | db_event | null, user: db_user | UserAccount) {
    if (typeof event === "string") event = await db_getEventByID(event);
    if (!event) return 0;

    if (user.level == db_user_level.admin || user.level == db_user_level.superAdmin) return 3; // 管理者権限
    if (event.owner_id === user.id) return 2; // オーナー権限

    const staff = await db_getEventUsersByEventID(event.id);
    if (staff.map(s => s.user_id).includes(user.id)) return 1; // スタッフ権限

    return 0; // 権限なし
}