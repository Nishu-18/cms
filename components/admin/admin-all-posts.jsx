import Pagination from "../pagination";
import { getAllBlogs } from "../../app/actions/getBlogs";
import EdiatableBlogCards from "./Ediatable-blogCards";
import { config } from "../../static/config";
import FilterCategory from "../FilterCategory";

export  default async function AdminAllPosts({page=1,category}){
    const {posts,count}=await getAllBlogs({page,category})
    return(
        <section className="p-8 flex flex-col gap-4">
            <h2>Manage all Blogs</h2>
            <FilterCategory/>
            {posts.map(post=>{
                return <EdiatableBlogCards key={post.title} post={post}/>
            })}
            <Pagination className="fixed bottom-10 left-1/2 -translate-x-1/2"  currentPage={page} totalItems={count} itemsPerPage={config.perPage} />
        </section>
    )
}