import Google from 'next-auth/providers/google'
import NextAuth from 'next-auth'

export const na = NextAuth({
    theme: { 
        logo: "https://authjs.dev/img/logo-sm.png"
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        })
    ],
    callbacks: {
        signIn: async ({ user, account, profile, credentials }) => {
            
            // const name = user.name || "anonymous";
            // const email = user.email;

            // if (!email) {
            //     return false;
            // }
            // addUser(email, name);



            return true;
        },
        session: async ({ session, user, token }) => {
            // console.log(session)
            // console.log(user)
            // console.log(token)
            return session
        }
    }
})


export const { handlers, auth, signIn, signOut } = na