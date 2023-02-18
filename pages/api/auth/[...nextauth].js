import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma, { Prisma } from "../../../prisma/client"

const adapter = PrismaAdapter(prisma);

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // ...add more providers here
    ],
} 

export default NextAuth(authOptions);