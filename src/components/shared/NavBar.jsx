"use client";
import icon from "@/assets/bg-logo.png";
import avater from "@/assets/user.png";

import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  MenuItem,
  Modal,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import MyNextLink from "../ui/MyNextLink";
import { authClient } from "@/lib/auth-client";

import { PiMessengerLogoDuotone } from "react-icons/pi";
import { BiMenu } from "react-icons/bi";

export default function NavBar() {
  const handleSignOut = async () => {
    await authClient.signOut();
  };
  const userData = authClient.useSession();
  const user = userData?.data?.user;
  console.log(user, "user login data from navbar pages");
  return (
    <div className="bg-base-200 shadow-xl rounded-md p-2">
      <nav className="flex justify-between container mx-auto  items-center px-5 py-1">
        <Link href={"/"} className="">
          <Image src={icon} height={200} width={200} alt={"hero icon"} />
        </Link>
        <div className={"hidden md:flex"}>
          <ul className={"flex gap-4 items-center justify-center"}>
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
          {user ? (
            <>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <Avatar>
                <Avatar.Image alt="John Doe" src={user?.image} />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
              <Button onClick={handleSignOut} variant="outline">
                Log Out
              </Button>
            </>
          ) : (
            <>
              {" "}
              <Image
                src={avater}
                height={50}
                width={50}
                alt="user-avter"
              ></Image>
              <Link href={"/login"}>
                <h1 className={"border rounded-xl px-7 text-xl font-medium"}>
                  Log In
                </h1>
              </Link>
              <Link href={"/signin"}>
                <h1 className={"border rounded-xl px-7 text-xl font-medium"}>
                  Sign In
                </h1>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <details className="list-style-none">
            <summary className="display-none">
              <BiMenu />
            </summary>
            <ul className={"flex flex-col gap-5 mt-4"}>
              <li>
                <MyNextLink href={"/"}>Home</MyNextLink>
              </li>
              <li>
                <MyNextLink href={"/allBooks"}>All books</MyNextLink>
              </li>
              <li>
                <MyNextLink href={"/profile"}>Profile</MyNextLink>
              </li>

              <Link href={"/login"}>
                <h1 className={""}>Log In</h1>
              </Link>
              <Link href={"/signin"}>
                <h1 className={""}>Sign In</h1>
              </Link>
              <h1 onClick={handleSignOut} variant="outline">
                Log Out
              </h1>
            </ul>
          </details>
        </div>
      </nav>
    </div>
  );
}
