import { auth } from "@/auth"
import { UserAccount } from "./data";
import { db_getUserByEmail } from "./db/users";


export class UserInfo {
    #email: string | null = null;
    get email() {
        return this.#email;
    }
    
    #user: UserAccount | undefined = undefined;
    get user() {
        return this.#user;
    }

    #icon: string | null = null;
    get icon() {
        return this.#icon;
    }


    get isGoogleLogin() {
        return this.#email != null && this.#user == null;
    }

    get isLoggedIn() {
        return this.#email != null && this.#user != null;
    }

    constructor(email: string | null, icon: string | null, user: UserAccount | undefined) {
        this.#email = email;
        this.#icon = icon;
        this.#user = user;
    }
}


export async function getUserInfo() {
    const session = await auth();
    const email = session?.user?.email || null;
    const user = email ? await db_getUserByEmail(email) : null;
    const icon = session?.user?.image || null;

    return new UserInfo(email, icon, user ? new UserAccount(user) : undefined);

}