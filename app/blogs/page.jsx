import Image from "next/image"
import Link from "next/link"

const blogs=[{title:"Next Js vs React js",content:"content","image":"/react-vs-next.jpeg",url:'react-vs-next'},{title:"Backend developer",content:"content",image:'/backend.jpeg',url:'backend'},{title:"Remote Job",content:"content",image:'/remote.jpeg',url:'remote'}]

async function getBlogs(){
    const res=await fetch(`${process.env.BASE_URL}/api/v1/get`)
    const data=await res.json()
    return data.posts;
    
    
}
export default async function Blogs(){
   const blogData=await getBlogs();
   
   
    return (
        <div className="grid gap-4  grid-cols-2 md:grid-cols-3 mt-8 p-8">
            {blogData.map((blog)=>{
                return (
                    <BlogCard key={blog.title} title={blog.title} excerpt={blog.excerpt} image={blog.thumbnail} url={blog.slug} />
                )
            })}
        </div>
    )
}

const BlogCard=({title,excerpt,image,url})=>{
    return (
        <div className="bg-gray-600/20 rounded-lg border flex flex-col p-1 gap-1 hover:scale-[1.03] transition-all delay-100 duration-300 max-h-[300px]">
          
              {image &&  <Image className="w-full h-2/3 rounded-md" src={image} alt={title} width={300} height={170}/>}

            
            
            <h1 className="font-bold text-xl text-gray-200">{title}</h1>
            <p className=" text-sm text-gray-400">{excerpt}</p>
           
            <Link className="bg-zinc-600/70 py-2 px-3 rounded w-fit text-xs" href={`/blog/${url}`}>Read more</Link>
        </div>
    )    
}