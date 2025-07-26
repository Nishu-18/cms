import { Calendar } from "lucide-react";
import Image from "next/image";

export default function blogPage(){
    const tempTags="Tech,Travel,Food"
    return <section className="px-4 md:p-0">
        <div className="flex flex-col items-center gap-4">
            <Image className="rounded border w-[90% ]  md:w-[700px]" src={'/react-vs-next.jpeg'} alt="react vs next" width={500} height={250}/>
        <div className="space-y-2">
                <div className="flex gap-3 items-center">
            <Calendar className="text-gray-400 size-4"/>
            <p className="text-gray-400 text-xs">Created on {new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</p>
        </div>
        <div className="text-xs items-center flex gap-2">
            <p>Category: </p>
            <p className="badge bg-gray-700/30 w-fit border px-2 py-1 rounded">Technology</p>
        </div>
        <div className="text-xs items-center flex gap-2">
            <p>Tags: </p>
            {tempTags.split(",").map((tag)=>(<p key={tag} className="badge bg-gray-700/30 w-fit border px-[4px] py-[2px] rounded">{tag}</p>))}
           
        </div>

        </div>
        <p className="md:w-2/3 w-[90%] text-sm text-gray-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit quasi magnam vitae architecto nesciunt. Doloribus, ullam obcaecati rem quod a accusantium impedit est officiis, sit dolorum eius dignissimos mollitia aliquid placeat. Numquam, temporibus. Libero, perspiciatis molestiae velit quod praesentium sint nulla cupiditate magnam nisi. Quaerat debitis iure, esse sequi possimus, porro nostrum voluptate consectetur aspernatur mollitia recusandae facere voluptatem? Illo reiciendis alias incidunt dolor pariatur velit quidem molestias atque fuga accusantium beatae numquam laboriosam neque, possimus voluptatum ea, itaque praesentium eius quis quia veritatis voluptatibus distinctio! Rerum corporis laborum iure fugiat delectus voluptatum at, mollitia dolore! Aliquid voluptates deleniti est.
        </p>


        </div>
        
    
        
    </section>
}



