import { authOptions } from "../../../../../lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { isAdmin } from "../../../../../utils/isAdmin";
import prisma from "../../../../../lib/prisma";

export async function PATCH(request){
    const {id,status}=await request.json();
    if(!["DRAFT", "PUBLISHED", "ARCHIVED", "DELETED"].includes(status)){
        return NextResponse.json({ message: "Invalid status"}, { status: 400})
    }
    const session=await getServerSession(authOptions)
    const adminCheck=await isAdmin(session)
    const grabpost=await prisma.post.findUnique({where:{id:id}})
    const isAuthor=grabpost.authorId==session.user.id;
    if(isAuthor || adminCheck){
        const updatedPost=await prisma.post.update({
            where:{
                id
            },
            data:{
                status
            }
        })
        return NextResponse.json(updatedPost,{status:200})
    }
    return NextResponse.json({message:"Not Authorized"},{status:400})
}