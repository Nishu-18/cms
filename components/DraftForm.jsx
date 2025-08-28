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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,

  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AIContent } from "../lib/ai-content";

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
    const reactQuilRef=useRef(null)
    const ideaRef=useRef(null)
    
    const [ogImage,setOgImage]=useState("")
    const router = useRouter();
    const closeDialogRef=useRef(null);

    const { register, handleSubmit,setValue } = useForm();

    const [content, setContent] = useState("")
    const [selection,setSelection]=useState(false)

    const handleGenerateContentUsingAI=async()=>{
        try {
            const response=await AIContent({text:ideaRef.current.value,customInstructions:'Generate content with proper facts',contentGen:true});
            setContent(response)
            console.log(response,"response form AI");
            
            
        } catch (error) {
            console.log(error.message);
            
            
        }finally{
            closeDialogRef.current.click()
        }
    }
    const handleSelectionChange=async()=>{
        const selection=reactQuilRef.current.getEditor().getSelection();
        console.log(selection);
        
        setSelection(selection && selection.length>0);
    }
    const handleRePhase=async()=>{
        const selection=reactQuilRef.current.getEditor().getSelection();
        try {
            if(selection && selection.length>0){
                const selectedText=reactQuilRef.current.getEditor().getText(selection.index,selection.length);
                const res=await AIContent({text:selectedText,customInstructions:'Rewrite this in easy-to-understand language',contentGen:false});
                reactQuilRef.current.getEditor().deleteText(selection.index,selection.length);
                reactQuilRef.current.getEditor().insertText(selection.index,res);
                setSelection(false)

            }
            
            
        } catch (error) {
            log(error.message);
            
        }
    }

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
            <ReactQuill onChangeSelection={handleSelectionChange} ref={reactQuilRef} theme="snow" value={content} onChange={setContent} modules={{toolbar:[[{header:'1'},{header:'2'},{header:'3'}],[{size:[]}],["bold","italic","underline","strike"],[{list:'ordered'},{list:'bullet'}],["link","image","code-block"]]}} formats={["header","font","size","bold","italic","underline","strike","link","image","code-block"]} />
            <Dialog>
  <DialogTrigger>Generate Content using AI</DialogTrigger>
  <DialogContent>
    <DialogHeader>
        <DialogTitle>Generate Content</DialogTitle>
     
      <DialogDescription>
        Give a brief on the type of content you want to generate
      </DialogDescription>
      <textarea ref={ideaRef} className="bg-zinc-800 p-2 rounded outline-none" rows={10}/>
    </DialogHeader>
    <DialogFooter>
        <Button onClick={handleGenerateContentUsingAI} >Generate</Button>
        <DialogClose ref={closeDialogRef} asChild><Button variant={"ghost"}>Close</Button></DialogClose>
    </DialogFooter>
  </DialogContent>
  
</Dialog>
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
    {selection && <Button onClick={handleRePhase} variant={"outline"}  className="fixed bottom-10 right-10 px-3 py-2 rounded cursor-pointer w-1/10">Rewrite using AI</Button>}
                
       
    </section>
}