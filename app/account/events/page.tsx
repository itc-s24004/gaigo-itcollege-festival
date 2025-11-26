import { db_getEventUsersByUserID } from "@/libs/db/event_users";
import { db_getEventByID, db_getEventsWithImageByOwnerID, db_getEventWithImageByID } from "@/libs/db/events";
import { checkPagePermission } from "@/libs/page_permission";
import { getUserInfo } from "@/libs/user";
import { PageContent } from "./content";

export default async function Page() {
    const user = (await getUserInfo()).user

    return checkPagePermission(async () => {
        const event_users = await db_getEventUsersByUserID(user!.id);

        const joined_events = (await Promise.all(event_users.map(async (eu) => {
            return await db_getEventWithImageByID(eu.event_id);
        }))).filter(e => e !== null);

        const owned_events = await db_getEventsWithImageByOwnerID(user!.id);
        
        return <PageContent owned_events={owned_events} joined_events={joined_events} user_id={user!.id}/>
        
    }, true, user);
}