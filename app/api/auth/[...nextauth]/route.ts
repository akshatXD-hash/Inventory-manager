import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Details",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials: any) {
        return { id: "1" };
      },
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET
});

export const GET = handler;
export const POST = handler;
