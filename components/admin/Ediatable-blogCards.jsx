"use client"

import { Button } from "../../components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EdiatableBlogCards({post}) {
    const handleDelete=async(id)=>{
        
        const res=await fetch(`/api/v1/delete/${post.id}`,{method:"DELETE",headers:{'Content-Type':'application/json'}})
        if(res.ok){
            setCurrentStatus('DELETED')
            router.refresh()
        }
       
    }
    const convertPublish=async(id)=>{
        const res=await fetch(`/api/v1/state`,{method:"PATCH",headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status:"PUBLISHED"})})
        if(res.ok){
            setCurrentStatus('PUBLISHED')
            router.refresh()
        }
    
    }
    const convertDraft=async(id)=>{
        const res=await fetch(`/api/v1/state`,{method:"PATCH",headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status:"DRAFT"})})
        if(res.ok){
            setCurrentStatus('DRAFT')
            router.refresh()
        }
    }
    const router=useRouter()
    const [currentStatus,setCurrentStatus]=useState(post.status)
    return <div className="flex ">
        <div className="bg-gray-600/20 p-3 rounded-lg w-full flex gap-3 flex-col sm:justify-between sm:flex-row md:flex-row">
        <div>
             <h2 className="font-bold text-lg">{post.title}</h2> 
            <p className="text-sm text-gray-300">{post.excerpts.substring(0,20)}...</p>
            <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</span>

        </div>
        <div className="space-x-2 flex gap-3 items-center">
            {currentStatus==='PUBLISHED'?<Button onClick={()=>convertDraft(post.id)} variant={"outline"}>Convert to Draft</Button>:<Button onClick={()=>convertPublish(post.id)} variant={"outline"}>Publish</Button>}
            {currentStatus==='PUBLISHED' && <Button onClick={()=>{router.push(`/blog/${post.slug}`)}}>View</Button>}
            <Trash onClick={()=>handleDelete(post.id)} className="size-5 text-gray-400"/>
        </div>
          
        </div>
    </div>;
}