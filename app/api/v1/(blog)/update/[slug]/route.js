import { authOptions } from "../../../../../../lib/auth";
import { getServerSession } from "next-auth/next";
import { isAdmin } from "../../../../../../utils/isAdmin";
import prisma from "../../../../../../lib/prisma"
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function PUT(request,{params}){
    const {slug}=await params;
    const body=await request.json();
    const {title,ogImage,content,excerpts,category,metaDescription,keywords,status}=body;
    const session =await getServerSession(authOptions)
    const admin=await isAdmin(session)
    const post=await prisma.post.findUnique({where:{slug:slug},
    select:{
        authorId:true
    }
    })

    if(!post){
        return NextResponse.json({message:"Post not found !"},{status:404});
    }
    const isAuthor=post.authorId==session.user.id;
    if(!isAuthor && !admin){
        return NextResponse.json({message:"UnAuthorized"},{status:403});
    }

    try {
        const updatedPost=await prisma.post.update({where:{slug:slug},data:{title,content,thumbnail:ogImage||null,desc:metaDescription||null,excerpts,keywords:keywords||null,status}});
        revalidateTag(slug)
        return NextResponse.json(updatedPost,{status:200})
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({message:"Something went wrong !"},{status:500});
        
        
    }
    }


    export async function GET(request,{params}){
        const {slug}=await params;
        const session=await getServerSession(authOptions);
        const admin=await isAdmin(session);
        const post=await prisma.post.findUnique({where:{slug:slug}});
        if(!post){
            return NextResponse.json({message:"Post not found !"},{status:404});

        }
        const isAuthor=session.user.id==post.authorId
        if(!isAuthor && !admin){
            return NextResponse.json({message:"UnAuthorized"},{status:403});

        }
        return NextResponse.json(post,{status:200})
    }