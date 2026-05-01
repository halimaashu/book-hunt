import icon from "@/assets/bg-logo.png"
import avater from "@/assets/user.png"

import { Button } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"

export default function NavBar() {
  return (
   <div className="bg-base-200 shadow-xl rounded-md">
     <nav className="flex justify-between container mx-auto  items-center px-5 py-1">
      <Link href={"/"} className="">
        <Image src={icon} height={200} width={200} alt={"hero icon"} />
      </Link>
      <div className="">
        <ul className="flex gap-4 items-center justify-center">
          <li><Link href={"/"}>Home</Link></li>
          <li><Link href={"/"}>All books</Link></li>
          <li><Link href={"/"}>Profile</Link></li>
        </ul>
      </div>
      <div className="flex items-center justify-center gap-5">
        <Image src={avater} height={50} width={50} alt="user-avter"></Image>
        <Button >Log In</Button>
      </div>
    </nav>
   </div>
  )
}
