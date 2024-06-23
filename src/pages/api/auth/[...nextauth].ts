import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const validUsers = [
  { id: "1", name: "Anna", roles: ["admin"] },
  { id: "2", name: "Marc" },
];

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "text", placeholder: "Type Anna or Marc" },
      },
      authorize: (credentials) => {
        const user = validUsers.find(user => user.name === credentials?.name);
        return user || null;
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
});

export async function getUserFromNextAuth(req) {
  const token = await getToken({ req });
  return validUsers.find(user => user.id === token?.sub);
}
