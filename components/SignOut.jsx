"use client"
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOut(){
    return (
        <div onClick={() => signOut({callbackUrl:'/sign-in',redirect:true})} className="flex items-center gap-2">
             <LogOut size={4}/>
            <div>SignOut</div>

        </div>
       
    )
}