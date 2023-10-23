import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    GoogleProvider({
      clientId:
        "210096065172-ahbtucs1qj4cg8prqph09h8marjo9sdt.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials: any, req) {
        console.log(credentials);
        return credentials;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    // async signIn({ account, profile }) {
    //   console.log(account, profile);
    //   return true;
    // },
    async jwt({ token, user, trigger, session }) {
      if (session) {
        return { ...token, ...user, ...session };
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      console.log(session);
      return session;
    },
  },
  secret: "oadpofiojdiofuy9we89w08rqiwrqjorhqworjqw0e89qwuye89qwe",
};

export default NextAuth(authOptions);
