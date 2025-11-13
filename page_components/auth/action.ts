import { signIn, signOut } from "@/auth"

export function signInAction(provider?: string) {
    return async () => {
        'use server'
        await signIn(provider);
    }
}

export async function signOutAction() {
    'use server'
    await signOut();
}