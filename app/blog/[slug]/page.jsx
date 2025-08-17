import { Calendar } from "lucide-react";
import Image from "next/image";
import "../../styles/blogs.css"

const fetchSingleBlog=async(slug)=>{
    const res=await fetch(process.env.BASE_URL+"/api/v1/get/"+slug,{next:{tags:[slug]}});
    const data=await res.json();
    console.log(data,"sinle blog");
    
    return data
}

export async function generateMetadata({params}){
        const res=await fetchSingleBlog(params.slug)
        return{
            title:res.title,
            description:res.excerpt,
            openGraph:{
                images:[res.thumbnail]
            }
        }
}
export default async function blogPage({params}){
    const {slug}=await params 
    const post=await fetchSingleBlog(slug)
    const tempTags="Tech,Travel,Food"
    return <section className="px-4 mt-10 md:p-0">
        <div className="flex flex-col items-center gap-4">
            <Image className="rounded border w-[90% ]  md:w-[700px]" src={post.thumbnail} alt={post.title} width={500} height={250}/>
            <h1 className="text-2xl font-bold md:text-4xl">{post.title}</h1>
        <div className="space-y-2">
                <div className="flex gap-3 items-center">
            <Calendar className="text-gray-400 size-4"/>
            <p className="text-gray-400 text-xs">Created on {new Date(post.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</p>
        </div>
        <div className="text-xs items-center flex gap-2">
            <p>Category: </p>
            <p className="badge bg-gray-700/30 w-fit border px-2 py-1 rounded">{post.catSlug}</p>
        </div>
   {post.keywords && <div className="text-xs items-center flex gap-2">
        <p>Tags: </p>
        {post.keywords.split(",").map((tag)=>(<p key={tag} className="badge bg-gray-700/30 w-fit border px-[4px] py-[2px] rounded">{tag}</p>))}
        
    </div>}

        </div>
        <div className="blogContent md:w-2/3 w-[90%] text-sm text-gray-300" dangerouslySetInnerHTML={{__html:post.content}}></div>


        </div>
        
    
        
    </section>
}



