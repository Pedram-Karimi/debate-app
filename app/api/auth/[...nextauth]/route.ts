// import NextAuth, { Account, Profile } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/client";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await getUser(credentials.email);

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (credentials.password !== user.password) {
          return null;
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    async session({ session, token }) {
      session.user = {
        handle: await getUser(token.email + "").then((data) => {
          if (data === null) {
            return "no handle";
          }
          return data.handle;
        }),
        email: token.email as string,
        id: token.sub as string,
      };

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// let userEmail: string | undefined = "";

// const fetchUserInfo = async () => {
//   const user = await prisma.user.findUnique({
//     where: {
//       email: userEmail,
//     },
//   });
//   return user;
// };

// Extend the Profile type to include the "picture" property
// interface ExtendedProfile extends Profile {
//   picture?: string | undefined;
//   id?: string;
// }

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       image: string;
//     };
//   }
// }
// GoogleProvider({
//   clientId: process.env.GOOGLE_CLIENT_ID as string,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//   authorization: {
//     params: {
//       prompt: "consent",
//       access_type: "offline",
//       response_type: "code",
//     },
//   },
// }),

// callbacks: {
//   async signIn({
//     account,
//     profile,
//   }: {
//     account: Account | null;
//     profile?: ExtendedProfile | undefined;
//   }) {
//     userEmail = profile?.email;
//     try {
//       const isAccount = account && profile;
//       if (isAccount && account.provider === "google") {
//         // Check if the user already exists in the database
//         const existingUser = await prisma.user.findUnique({
//           where: { email: profile?.email as string },
//         });
//         if (!existingUser) {
//           // If the user doesn't exist, create a new user in the database
//           await prisma.user.create({
//             data: {
//               email: profile?.email as string,
//               image:
//                 (profile?.picture as string) ?? (profile?.image as string),
//               username: profile?.name as string,
//             },
//           });

//           return true;
//         }
//         return true;
//       }
//     } catch (err) {
//       console.log(err);
//     }
//     return false;
//   },
//   // async session({ session }) {
//   //   const userInfo = await fetchUserInfo();
//   //   session.user = {
//   //     id: userInfo?.id as string,
//   //     email: userInfo?.email as string,
//   //     name: userInfo?.username as string,
//   //     image: userInfo?.image as string,
//   //   };
//   //   console.log(session.user);
//   //   return session;
//   // },
// },
