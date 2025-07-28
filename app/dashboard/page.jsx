import { getAuthSession } from "../../lib/auth";

export default async function DashBoard(){
    const session=await getAuthSession()
    if(!session) return <div className="flex w-full h-screen justify-center items-center">Not Authenticated</div>
    return <section className="flex w-full h-screen justify-center items-center">Welcome back, {session.user.name}</section>
}