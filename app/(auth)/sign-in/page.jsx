"use client"
import { signIn } from "next-auth/react";
import { Icons } from "../../../components/Icons";
import { toast } from "sonner";

export default function SignIn(){
    
    const onGoogleSignIn=()=>{
       try {
        signIn("google")
        
        
       } catch (error) {
        console.error(error)
        toast.error("Failed to sign in")
        
       }
        
    }
    return(<section className="w-full flex h-screen justify-center  items-center">
        <div className="w-full sm:w-1/2 mx-4 px-4 md:w-1/5 bg-zinc-800 flex flex-col items-center gap-4 rounded">
        <div className="extra-bold text-4xl text-center">Content Forge</div>
        <p className="text-center">Welcome, by continuing with content forge you will be a part of our community</p>
        <button onClick={onGoogleSignIn} className="flex gap-2 items-center bg-gray-500/50 hover:bg-gray-500/40 hover:pointer-cursor transition-colors duration-200 px-10 mb-4 text-lg py-2 rounded font-bold"> <Icons.GoogleLogo /> Signin</button>
    </div>

    </section>
    )
}