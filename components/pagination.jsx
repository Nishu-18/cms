
"use client"
import { useRouter } from "next/navigation";

export default function Pagination({currentPage,totalItems,itemsPerPage,...props}){
    const router=useRouter();
    const totalPages=Math.ceil(totalItems/itemsPerPage);
    const handlePageChange=(page)=>{
        if(page<1 || page>totalPages) return;
        router.push(`?page=${page}`);
    }
    return <div {...props}>
        <div className="flex justify-center gap-2">
        <button onClick={()=>handlePageChange(parseInt(currentPage)-1)} disabled={currentPage===0} className={`px-2 py-1 border rounded-md text-gray-200 flex gap-2 items-center ${currentPage == 1 ? "text-gray-400 cursor-not-allowed": ""}`}>Prev</button>
        {Array.from({length:totalPages},(_,index)=>{
            return <button key={index}  className={`px-2 py-1 text-sm border rounded-md ${currentPage == index+1 ? "bg-gray-600/40 " : 'bg-transparent'}`} onClick={()=>handlePageChange(index+1)}>{index+1}</button>
        })}
        <button onClick={()=>handlePageChange(parseInt(currentPage)+1)} disabled={currentPage==totalPages} className={`px-2 py-1 border rounded-md text-gray-200 flex gap-2 items-center ${currentPage == totalPages ? "text-gray-400 cursor-not-allowed": ""}`}>Next</button>
        </div>
        
    </div>

}