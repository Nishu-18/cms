import TrueFocus from "../animations/TrueFocus";
import { Anvil } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export default function Navbar() {
    const isAuthenticated = true
    const userData={
        name:"John Doe",
        email:"2wVlT@example.com",}
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
            {isAuthenticated ? <DropDownModule user={userData}  /> : (<Link href={'/login'}>Login</Link>)}
 
        </div>
    )
}


function DropDownModule({user}){
    return (
        <div className="cursor-pointer">
            <DropdownMenu >
  <DropdownMenuTrigger>{user.name}</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Hi {user.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        </div>
        
    )
}