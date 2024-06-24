import { NextApiRequest } from "next";
import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials"; 
import {UserInfo} from "remult";
import { getToken } from "next-auth/jwt";

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
                    className="border-b gap-2 h-30 w-full"
                }
            },
            authorize:
            credentials=>
            validUsers.find(user=>user.name===credentials?.name)||null
        })
    ]
})
    

export async function getUserFromNextAuth (req: NextApiRequest) {
    const token= await getToken({ req });
    return validUsers.find(user => user.id === token?.sub)
}