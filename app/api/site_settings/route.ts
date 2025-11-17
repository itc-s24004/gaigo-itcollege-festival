import { db_festival_id } from "@/libs/db/db.type";
import { db_setSiteSetting } from "@/libs/db/site_settings";
import { getUserInfo } from "@/libs/user";

export async function POST(req: Request) {
    const user = (await getUserInfo()).user;

    if (!user) return new Response("Unauthorized", { status: 401 });
    if (!user.isAdmin && !user.isSuperAdmin) return new Response("Forbidden", { status: 403 });

    const form = await req.formData();
    const festival_id = form.get("festival_id") as db_festival_id | null;

    if (festival_id) await db_setSiteSetting("festival_id", festival_id);

    return new Response("Site settings updated", { status: 200 });
}