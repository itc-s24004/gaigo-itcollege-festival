import { checkApiPermission } from "@/libs/api_permission";
import { db_user_content_id, db_user_level } from "@/libs/db/db.type";
import { db_addFestival } from "@/libs/db/festivals";
import { getUserInfo } from "@/libs/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = (await getUserInfo()).user;

    return checkApiPermission(async () => {
        const form = await req.formData();
        const name = form.get("name") as string | null;
        const description = form.get("description") as string | null;
        const image_id = form.get("image_id") as db_user_content_id | null;

        console.log({ name, description, image_id });

        if (!name || !description) return NextResponse.json(
            {
                message: "Missing required fields."
            },
            { status: 400 }
        );

        const result = await db_addFestival(name, description, image_id ?? undefined);
        console.log(result);
        
        return NextResponse.json({ festival: result });
    }, true, user, db_user_level.admin);
}