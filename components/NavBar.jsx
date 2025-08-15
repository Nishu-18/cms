
import TrueFocus from "../animations/TrueFocus";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import Image from "next/image";
import { SignOut } from "./SignOut";


export default function Navbar({session}) {
    console.log(session);
    

    const userData={
        name:session?.user?.name||"Guest",
        email:session?.user?.email||"noemail@gmail.com",
        image:session?.user?.image||"",
        id:session?.user?.id||"",
        role:session?.user?.role||"",}
    return (
        <div className="w-full flex justify-between h-12 px-8">
            <Link className="flex " href={'/'}><span className="font-extrabold text-[5px]">
                <TrueFocus  sentence="Content Forge"
                className="true-focus-class-name"
                    manualMode={false}
                    blurAmount={5}
                    borderColor="red"
                    animationDuration={2}
                    pauseBetweenAnimations={1}
                />
                
            </span></Link>
            {session ? <DropDownModule user={userData}  /> : (<Link href={'/sign-in'}>Login</Link>)}
 
        </div>
    )
}


function DropDownModule({user}){
    console.log(user);
    
    return (
        <div className="cursor-pointer">
            <DropdownMenu >
 <DropdownMenuTrigger><Image className="w-10 h-10 rounded-full border-2 border-[greenyellow]" src={user?.image} alt={user.name} width={300} height={300}/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Hi {user.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem><SignOut/></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        </div>
        
    )
}