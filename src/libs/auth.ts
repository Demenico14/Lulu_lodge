import type { NextAuthOptions } from "next-auth"
import { SanityAdapter, SanityCredentials } from "next-auth-sanity"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

import sanityClient from "./sanity"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    SanityCredentials(sanityClient),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: SanityAdapter(sanityClient),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
  callbacks: {
    session: async ({ session, token }) => {
      const userEmail = token.email
      const userIdObj = await sanityClient.fetch<{ _id: string }>(
        `*[_type == "user" && email == $email][0] {
            _id
        }`,
        { email: userEmail },
      )

      return {
        ...session,
        user: {
          ...session.user,
          id: userIdObj?._id || "",
        },
      }
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
}

