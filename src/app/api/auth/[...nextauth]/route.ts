import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                usuario: { label: "Usuário", type: "text" },
                senha: { label: "Senha", type: "password" }
            },
            async authorize(credentials, req) {
                const url = process.env.NEXT_PUBLIC_API;
                const res = await fetch(url+"/api/login", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        usuario: credentials?.usuario,
                        senha: credentials?.senha,
                    }),
                });

                const user = await res.json();
        
                if (res.ok && user) {
                    return user;
                } else {
                    return null; 
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },
    },
})

export { handler as GET, handler as POST };

