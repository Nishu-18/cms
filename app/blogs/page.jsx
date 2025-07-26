import Image from "next/image"
import Link from "next/link"

const blogs=[{title:"Next Js vs React js",content:"content","image":"/react-vs-next.jpeg",url:'react-vs-next'},{title:"Backend developer",content:"content",image:'/backend.jpeg',url:'backend'},{title:"Remote Job",content:"content",image:'/remote.jpeg',url:'remote'}]
export default function Blogs(){
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-8">
            {blogs.map((blog)=>{
                return (
                    <BlogCard key={blog.title} title={blog.title} content={blog.content} image={blog.image} url={blog.url} />
                )
            })}
        </div>
    )
}

const BlogCard=({title,content,image,url})=>{
    return (
        <div className="bg-gray-600/20 rounded-md border flex flex-col p-1 gap-1 hover:scale-[1.03] transition-all delay-100 duration-200">
          
                <Image className="w-full h-2/3 rounded-md" src={image} alt={title} width={300} height={300}/>

            
            
            <h1 className="font-bold text-xl text-gray-200">{title}</h1>
            <p className=" text-sm text-gray-400">{content}</p>
           
            <Link className="bg-zinc-600/70 py-2 px-3 rounded w-fit text-xs" href={`/blog/${url}`}>Read more</Link>
        </div>
    )    
}