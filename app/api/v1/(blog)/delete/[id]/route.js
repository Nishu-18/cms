import { authOptions } from "../../../../../../lib/auth"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { isAdmin } from "../../../../../../utils/isAdmin";
import prisma from "../../../../../../lib/prisma";

export async function DELETE(request,{params}){
    const {id}=await params;
    const session=await getServerSession(authOptions)
    const adminCheck=await isAdmin(session)
    const grabpost=await prisma.post.findUnique({where:{id:id}})
    if(!grabpost) return NextResponse.json({message:"Post not found"},{status:404})
    const isAuthor=grabpost.authorId==session.user.id;
    if(isAuthor || adminCheck){
        const deletedPost=await prisma.post.delete({
            where:{
                id
            }
        })
        return NextResponse.json(deletedPost,{status:200})
    }
    return NextResponse.json({message:"Not Authorized"},{status:403})
}