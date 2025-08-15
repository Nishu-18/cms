"use client"
import { useForm } from "react-hook-form"
import dynamic from "next/dynamic";


import 'react-quill-new/dist/quill.snow.css';
import { useState, useRef } from "react";
import { slugify } from "slugmaster";
import ImageUploader from "./ImageUploader";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })
export default function DraftForm({onSave}) {
    const [ogImage,setOgImage]=useState("")
    

    const { register, handleSubmit } = useForm()
    const [value, setValue] = useState("")
    const handleForm = (data) => {
        const generatedSlug=slugify(data.title)
        console.log(data)
        onSave({...data,slug:generatedSlug,ogImage,content:value})
    }
    return <section>
        <form className="space-y-4 flex flex-col mt-[80px]" onSubmit={handleSubmit(handleForm)} >
            <input {...register("title")} type="text" className="bg-zinc-600 px-3 py-2 rounded font-bold text-xl" placeholder="Enter post title" />
            <ReactQuill theme="snow" value={value} onChange={setValue} modules={{toolbar:[[{header:'1'},{header:'2'},{header:'3'}],[{size:[]}],["bold","italic","underline","strike"],[{list:'ordered'},{list:'bullet'}],["link","image","code-block"]]}} formats={["header","font","size","bold","italic","underline","strike","link","image","code-block"]} />
            <input {...register("excerpt")} type="text" className="bg-zinc-600 px-3 py-2 rounded font-bold text-xl" placeholder="Enter an excerpt" />
            <input {...register("category")} type="text" className="bg-zinc-600 px-3 py-2 rounded font-bold text-xl" placeholder="Enter category" />
            <h2 className="text-xl font-bold">SEO Data</h2>
            <ImageUploader returnImage={setOgImage}/>
            <input {...register("metaDescription")} type="text" className="bg-zinc-600 px-3 py-2 rounded font-bold text-xl" placeholder="Enter meta description" />
            <input {...register("keyword")} type="text" className="bg-zinc-600 px-3 py-2 rounded font-bold text-xl" placeholder="Enter keyword" />
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