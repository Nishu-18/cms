"use client"
import { useForm } from "react-hook-form"
import dynamic from "next/dynamic";
import {z, ZodError} from "zod"


import 'react-quill-new/dist/quill.snow.css';
import { useState, useRef, useEffect } from "react";
import { slugify } from "slugmaster";
import ImageUploader from "./ImageUploader";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

const schema=z.object({
    title:z.string().min(10,{message:"Title must be at least 10 characters long"}).min(1,{message:"Title is required"}),
    excerpt:z.string().min(10,{message:"Excerpts must be at least 10 characters long"}).min(1,{message:"Excerpts is required"}),
    category:z.string().min(1,{message:"Category is required"}),
    keywords:z.string().min(1,{message:"Keywords is required for SEO Benfits"}),
    status:z.enum(["DRAFT","PUBLISHED"]),
    metaDescription:z.string().optional()
})

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })
export default function DraftForm({onSave,initialData}) {
    console.log(initialData,"initialData");
    
    const [ogImage,setOgImage]=useState("")
    const router = useRouter();
    

    const { register, handleSubmit,setValue } = useForm();

    const [content, setContent] = useState("")

    useEffect(()=>{
        if(initialData){
            setOgImage(initialData.thumbnail)
            setContent(initialData.content)
            setValue("title",initialData.title)
            setValue("excerpt",initialData.excerpts)
            setValue('keywords', initialData.keywords || "");
            setValue('category', initialData.catSlug || "");
            setValue('metaDescription', initialData.desc || "");
            setValue('status', initialData.status);
        }

    },[initialData])
    const handleForm = (data) => {
        try {
            const generatedSlug=initialData?initialData.slug:slugify(data.title)
         onSave({...data,slug:generatedSlug,ogImage,content:content})
        toast.success(initialData?"Your Blog was updated!":"Your Blog was created!");
        if(data.status==="PUBLISHED"){
            router.push(`/blog/${generatedSlug}`)
        }
            
        } catch (error) {

            console.log(error.message);
            
            
        }
        
       
    }
    return <section>
        <form className="space-y-4 flex flex-col mt-[80px]" onSubmit={handleSubmit(async(data)=>{
            try {
                await schema.parseAsync(data);
                await handleForm(data)
            } catch (error) {
               const arr= JSON.parse(error.message)
                console.log(arr,"from console");
                if(error instanceof ZodError){
                     arr.forEach(err=>toast.error(err.message))

                }
               
                
            }
            
        })} >
            <Toaster/>
            <input {...register("title")} type="text" className="bg-zinc-600 px-3 py-2 rounded font-bold text-xl" placeholder="Enter post title" />
            <ReactQuill theme="snow" value={content} onChange={setContent} modules={{toolbar:[[{header:'1'},{header:'2'},{header:'3'}],[{size:[]}],["bold","italic","underline","strike"],[{list:'ordered'},{list:'bullet'}],["link","image","code-block"]]}} formats={["header","font","size","bold","italic","underline","strike","link","image","code-block"]} />
            <input {...register("excerpt")} type="text" className="bg-zinc-600 px-3 py-2 rounded font-bold text-xl" placeholder="Enter an excerpt" />
            <input {...register("category")} type="text" className="bg-zinc-600 px-3 py-2 rounded font-bold text-xl" placeholder="Enter category" />
            <h2 className="text-xl font-bold">SEO Data</h2>
            <ImageUploader returnImage={setOgImage} preLoadedImage={ogImage}/>
            <input {...register("metaDescription")} type="text" className="bg-zinc-600 px-3 py-2 rounded font-bold text-xl" placeholder="Enter meta description" />
            <input {...register("keywords")} type="text" className="bg-zinc-600 px-3 py-2 rounded font-bold text-xl" placeholder="Enter keyword" />
            <div className="flex gap-4">
                <select className="bg-zinc-600 px-3 py-1 rounded font-bold text-lg" {...register("status")}>
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Publish</option>
                </select>
                <button disabled={!ogImage} type="submit" className="bg-zinc-800 px-3 py-2 rounded cursor-pointer w-1/10">Save</button>
            </div>
            
        </form>
    </section>
}