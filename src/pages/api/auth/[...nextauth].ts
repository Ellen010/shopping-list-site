import { NextApiRequest } from "next";
import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials"; 
import {UserInfo} from "remult";
import { getToken } from "next-auth/jwt";

<div className="bg-picMain h-screen flex items-center flex-col justify-center text-lg bg-cover">
const validUsers:UserInfo[]=[
    { id:"1", name:"Anna", roles: ["admin"] },
    { id:"2", name:"Marc" },
]
export default NextAuth ({
    providers:[
        CredentialsProvider({
            credentials:{
                name:{
                    label:"Username",
                    placeholder: "Type Anna or Marc"
                }
            },
            authorize:
            credentials=>
            validUsers.find(user=>user.name===credentials?.name)||null
        })
    ]
})
          </div>

export async function getUserFromNextAuth (req: NextApiRequest) {
    const token= await getToken({ req });
    return validUsers.find(user => user.id === token?.sub)
}