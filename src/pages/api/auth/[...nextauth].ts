import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextApiRequest } from "next";
import { UserInfo } from "remult";
import { getToken } from "next-auth/jwt";

const validUsers: UserInfo[] = [
    { id: "1", name: "Anna", roles: ["admin"] },
    { id: "2", name: "Marc" },
];

export default NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                name: {
                    label: "Username",
                    placeholder: "Type Anna or Marc"
                }
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

export async function getUserFromNextAuth(req: NextApiRequest) {
    const token = await getToken({ req });
    return validUsers.find(user => user.id === token?.sub);
}
