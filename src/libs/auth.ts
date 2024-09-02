import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import sanityClient from "./sanity"; // Ensure sanity client is imported properly

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string, // Add Google client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string // Add Google client secret
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
    }),
    SanityCredentials(sanityClient) // only if you use sign in with credentials
  ],
  session: {
    strategy: 'jwt'
  },
  adapter: SanityAdapter(sanityClient),
  debug: process.env.NODE_ENV !== 'development',
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      const userEmail = token.email;
      const userIdObj = await sanityClient.fetch<{ _id: string }>(
        `*[_type == "user" && email == $email][0]{ _id }`,
        { email: userEmail } // Provide the email as a parameter to the query
      );

      

      // If user is found, append the ID to the session object
      if (userIdObj) {
        return {
          ...session,
          user: {
            ...session.user,
            id: userIdObj._id
          }
        };
      }

      // Return session as is if no user is found
      return session;
    }
  }
};
