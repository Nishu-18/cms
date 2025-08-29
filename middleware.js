import { rateLimit } from "./lib/rate-limit";
import { NextResponse } from "next/server";

export async function middleware(request){
    const allowedOrigins=['http://localhost:3000','https://cms.vercel.app',]
    if(request.method==='POST'){
        const origin=request.headers.get('origin');
        // if(!allowedOrigins.includes(origin)){
        //     return NextResponse.json({message:'Forbidden'},{status:403})
        // }
        let ip=request.ip || request.headers.get('x-forwarded-for') || 'unknown'
        const {limit,remaining,reset}=await rateLimit.limit(ip)
        console.log(remaining,limit,'remaining and limit');
        
        if(remaining===0){
            return NextResponse.json({message:"Rate limit exceeded"},{status:429})
        }
        return NextResponse.next({
            headers:{
                'x-debug-limit':limit.toString(),
                'x-debug-remaining':remaining.toString(),
            }
        })
    }
}

export const config={
    matcher:['/api/v1/:path']
}