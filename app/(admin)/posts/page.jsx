import { isAdmin } from "../../../utils/isAdmin";
import { authOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth";
import AdminAllPosts from "../../../components/admin/admin-all-posts";
import UserAllPosts from "../../../components/admin/user-all-posts";

export default async function AllPosts({searchParams}){
    const page=await searchParams.page||1;
    const category= await searchParams.cat||null;
    const session=await getServerSession(authOptions);
    const admincheck=await isAdmin(session);
    if(!admincheck){
        return <UserAllPosts page={page} category={category} user={session.user} />
    }
    return <div>
        <AdminAllPosts page={page} category={category} />

    </div>
}