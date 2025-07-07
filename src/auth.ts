import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { getUser } from "./lib/fetch/admin";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email = "", password = "" } = credentials as {
          email?: string;
          password?: string;
        };

        const user = await getUser(email, password);
        if (user) return user;

        console.error("Invalid credentials");
        return null;
      },
    }),
  ],
});
