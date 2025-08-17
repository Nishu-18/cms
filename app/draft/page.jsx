"use client"
import DraftForm from "../../components/DraftForm";

export default  function draft() {


    const savePost=async ({title,ogImage,slug,content,excerpt,category,metaDescription,keywords,status})=>{
        //api to backend
        const res=await fetch("/api/v1/create",{method:"POST",headers:{
            "ContentType":"application/json",
        },body:JSON.stringify({title,ogImage,slug,content,excerpt,category,metaDescription,keywords,status})});
        if(!res.ok){
            throw new Error("Failed to create post");
        }


        
    }
    return <div className="p-8">
        <DraftForm onSave={savePost}/>
    </div>;
}