import prisma from "../../../../../lib/prisma";
import { getAuthSession } from "../../../../../lib/auth";
import { NextResponse } from "next/server";

export async function  POST(request) {
    const session=await getAuthSession();
    console.log(session.user.id,"session");
    
  
    
    if(!session|| !session.user){
        return NextResponse.json({message:"UnAuthorized"},{status:401});
    }
    const body=await request.json();
    console.log(body,"body");
    
    const {title,ogImage,slug,content,excerpt,category,metaDescription,keywords,status}=body
    if(!title||!ogImage||!slug||!content||!excerpt||!category||!metaDescription||!keywords||!status){
        return NextResponse.json({message:"All fields are required"},{status:400});
    }
    console.log(title,ogImage,slug,content,excerpt,category,metaDescription,keywords,status,"content from body");
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
    return NextResponse.json({post},{status:201});
        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message:"Failed to create post"},{status:500});
        
    }
   
 

}
    
