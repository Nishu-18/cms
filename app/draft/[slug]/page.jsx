"use client";

import {Toaster, toast} from "sonner"   
import DraftForm from "../../../components/DraftForm";
import { use, useEffect, useState } from "react";

export default  function EditPreviousDraft({ params }){
    const { slug } = use( params);
    const [post, setPost ] = useState("");

    useEffect(()=> {
        const fetchPost = async()=> {
            const res = await fetch(`/api/v1/update/${slug}`);
            if(!res.ok){
                if(res.status === 403){
                    toast({
                        title: "Uh oh!",
                        description: 'You are not allowed to edit the post'
                    })
                }
                else toast({
                    title: "Uh oh!",
                    description: 'Unable to load post' 
                })
            }
            const response = await res.json();
            console.log(response, ' direct before saving')
            setPost(response);
        }
        fetchPost();
    }, [slug])


    const savePost = async({ title, ogImage, content, excerpt, metaDescription, category, keywords, status }) => {
        
        const res = await fetch(`/api/v1/update/${slug}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, ogImage, content, excerpt, metaDescription, keywords, status })
        })
        if(!res.ok){
            throw new Error('Post updating failed');
        }
    }
    if(!post){
        return <></>;
    }
    return <div className="p-8">
        <Toaster/>
        
        <DraftForm onSave={savePost} initialData={post} />
    </div>
}