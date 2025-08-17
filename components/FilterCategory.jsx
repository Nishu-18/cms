"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function FilterCategory() {
    const router=useRouter();
    const searchParams=useSearchParams();
    const [category,setCategory]=useState(searchParams.get('cat')||''); 
    const handleSubmit=(e)=>{
        e.preventDefault();
        const params=new URLSearchParams(searchParams.toString());
        params.set('cat',category);
        router.push(`/posts?${params.toString()}`);
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-3">
            <Input className={"w-[300px]"} placeholder="Filter by Category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
            <Button type="submit">Submit</Button>
        </form>
    )
}