import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import bcrypt from 'bcryptjs';
import { User } from './db/models/user-model';
import { dbConnect } from './db/service/mongo';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials == null) return null;

        try {
          await dbConnect();

          const user = await User.findOne({
            email: credentials?.email,
          });

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials?.password as string,
              user?.password
            );

            if (isMatch) {
              return user;
            } else {
              throw new Error('Check your password');
            }
          } else {
            throw new Error('User not found');
          }
        } catch (err: any) {
          throw new Error(
            err.message || 'An error occurred during authorization'
          );
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === 'google') {
        await dbConnect();
        try {
          const { name, email } = user;
          // Check if the user already exists in the database
          const existingUser = await User.findOne({ email });

          if (existingUser) {
            // If the user exists, return the user
            return true;
          }

          // If the user doesn't exist, create a new user with 'user' role
          const newUser = new User({
            name: name,
            email: email,
            role: 'user', // Set the default role to 'user' for new Google sign-ins
          });

          await newUser.save();
          return true;
        } catch (err) {
          console.log('Error during Google sign-in:', err);
          return false;
        }
      }

      return true; // For non-Google sign-ins, proceed as normal
    },

    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.email = user?.email;
        token.name = user?.name;

        // If the user has a role (credentials login), set it in the token
        if (user.role) {
          token.role = user?.role;
        } else {
          await dbConnect();
          // If the role isn't available directly (Google login), fetch it from the database
          const dbUser = await User.findOne({ email: user?.email });
          if (dbUser) {
            token.role = dbUser.role || 'user';
          }
        }
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role; // Role is now always available in the session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
});
