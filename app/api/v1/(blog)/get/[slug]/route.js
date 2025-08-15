import { NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(request,{params}){
    const {slug}=await params;
    const post=await prisma.post.findUnique({where:{
        slug:slug,
        status:"PUBLISHED"
    },
    include:{
        author:{
            select:{
                name:true,
                image:true
            }
        }
    }
    
    
    
})

if(!post){
    return new NextResponse("Post not found",{
        status:404
    })
}

return new NextResponse(JSON.stringify(post),{status:200})
}