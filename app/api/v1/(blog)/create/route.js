export const runtime = "nodejs";

import prisma from "../../../../../lib/prisma";
import { getAuthSession } from "../../../../../lib/auth";
import { NextResponse } from "next/server";

export async function  POST(request) {
    console.log("post req hit ");
    
    
    const session=await getAuthSession();
    
  
    
    if(!session|| !session.user){
        return NextResponse.json({message:"UnAuthorized"},{status:401});
    }
    const body=await request.json();
    
    
    const {title,ogImage,slug,content,excerpt,category,metaDescription,keywords,status}=body
    if(!title||!ogImage||!slug||!content||!excerpt||!category||!metaDescription||!keywords||!status){
        return NextResponse.json({message:"All fields are required"},{status:400});
    }
   
    const statusOfPost=status||"DRAFT";
    let categoryCheck=await prisma.category.findUnique({where:{slug:category}});


    if(!categoryCheck){
        categoryCheck=await prisma.category.create({
            data:{
                title:category.charAt(0).toUpperCase()+category.slice(1),
                slug:category
            }
        })
    }

    try {
        const post=await prisma.post.create({
        data:{
            title,
            content,
            slug,
            thumbnail:ogImage||null,
            desc:metaDescription||null,
            keywords:keywords||null,
            excerpts:excerpt||null,
            catSlug:categoryCheck.slug,
            authorId:session.user.id,
            status:statusOfPost,
        }
        
    })
    return NextResponse.json({message:"Post created"},{status:201});
        
    } catch (error) {
        console.error(error);
        
        return NextResponse.json({message:error.message||"Failed to create post fr"},{status:500});
        
    }
   
 

}
export async function GET(request){
    console.log("get req hit");
    
    return NextResponse.json({message:"GET"},{status:200})

}
    
