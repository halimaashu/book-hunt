import icon from "@/assets/bg-logo.png";
import avater from "@/assets/user.png";

import { Button, Dropdown } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import MyNextLink from "../ui/MyNextLink";

export default function NavBar() {
  return (
    <div className="bg-base-200 shadow-xl rounded-md">
      <nav className="flex justify-between container mx-auto  items-center px-5 py-1">
        <Link href={"/"} className="">
          <Image src={icon} height={200} width={200} alt={"hero icon"} />
        </Link>
        <div className="hidden md:flex">
          <ul className="flex gap-4 items-center justify-center">
            <li>
              <MyNextLink href={"/"}>Home</MyNextLink>
            </li>
            <li>
              <MyNextLink href={"/allBooks"}>All books</MyNextLink>
            </li>
            <li>
              <MyNextLink href={"/profile"}>Profile</MyNextLink>
            </li>
          </ul>
        </div>
        <div className="flex md:hidden"></div>
        <div className="flex items-center justify-center gap-5 hidden md:flex">
          <Image src={avater} height={50} width={50} alt="user-avter"></Image>
          <Link href={"/login"}>
            <Button
              className={"bg-[#B9AC92] rounded-xl px-10 text-xl font-medium"}
            >
              Log In
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
