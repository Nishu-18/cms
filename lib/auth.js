import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { redirect } from "next/dist/server/api-utils";



export const authOptions={
   adapter:PrismaAdapter(),
   session:{
    strategy:"jwt"
   },
   pages:{
       signIn:"/sign-in"
   },
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callBack:{
        async jwt({token,user}){
            if(user){
                const dbUser=await prisma.user.findUnique({
                    where:{email:user.email},
                    select:{id:true,name:true,email:true,role:true,username:true,image:true}
                })
                if(dbUser){
                    token.id=dbUser.id
                    token.role=dbUser.role
                    token.username=dbUser.username
                    token.image=dbUser.image
                    token.name=dbUser.name
                    token.email=dbUser.email
                }else{
                    const newUser=await prisma.user.create({
                        data:{email:user.email,name:user.name,image:user.image,role:'user'}
                    })
                    token.id=newUser.id
                   

                }
                return token;
                
                
            }


        },
        async session({session,token}){
            if(token){
                session.user.id=token.id
                session.user.role=token.role
                session.user.username=token.username
                session.user.image=token.image
                session.user.name=token.name
                session.user.email=token.email  
            }
            return session

        },
        redirect(){
            return "/dashboard"
        }   
    }
}