import { prisma } from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
            password: credentials.password, 
          },
        });

        if (!user) return null;

        return {
          id: user.id,      
          email: user.email,
        };
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.id = user.id; // ✅ store id in token
      }
      return token;
    },

    async session({ session, token }:any) {
      if (session.user) {
        session.user.id = token.id as string; // ✅ expose id to session
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
