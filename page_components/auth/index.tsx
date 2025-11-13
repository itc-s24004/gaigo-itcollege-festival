import { PlainForm } from '../form/plain'
import { signInAction, signOutAction } from './action'
import { GoogleAuthBtn } from './google'

export function SigninBtn() {
    return (
        <form action={signInAction("google")}>
            <GoogleAuthBtn type="submit" />
        </form>
        // <PlainForm inputs={[]} submitLabel='サインイン' customFormAttributes={
        //     {
        //         action: signInAction("google"),
        //     }
        // }/>
    )
}

export function SignoutBtn() {
    return (
        <form action={signOutAction}>
            <GoogleAuthBtn type="submit" text="Sign out from Google" />
        </form>
    )
}
