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

            return true;
        },
        session: async ({ session, user, token }) => {
            
            return session
        }
    }
})


export const { handlers, auth, signIn, signOut } = na