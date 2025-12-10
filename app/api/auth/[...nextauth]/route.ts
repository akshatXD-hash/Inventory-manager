import { prisma } from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import Github from "next-auth/providers/github";


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
            where:{
                email:credentials.email,
                password:credentials.password
            },
            
        })
        if(!user){
            return null;
        }
        return {
            id:user.id,
            email:user.email,
            password:user.password
        }
      },
    }),
    GitHubProvider({
        clientId:process.env.GITHUB_CLIENT_ID||"",
        clientSecret:process.env.GITHUB_CLIENT_SECRET||""
    }),
    
   
    
     
  ],
  pages:{
    signIn:"/signin"
  },
  secret:process.env.NEXTAUTH_SECRET
});

export const GET = handler;
export const POST = handler;
