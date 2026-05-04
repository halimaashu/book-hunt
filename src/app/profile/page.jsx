"use client";
import { EditFrom } from "@/components/shared/EditFrom";
import { authClient } from "@/lib/auth-client";
import { Avatar, Card } from "@heroui/react";
import React from "react";

export default function ProfilePage() {
  const userData = authClient.useSession();
  const user = userData?.data?.user;
  return (
    <div className="container mx-auto bg-base-200 rounded-lg py-20 p-2">
      <div className="md:w-1/2 mx-auto shadow-xl">
        <Card>
          <Avatar className="w-40 h-40 text-large mx-auto" size="lg">
            <Avatar.Image alt="John Doe" src={user?.image} />
            <Avatar.Fallback>{user?.name[0]}</Avatar.Fallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-center">
            <span className="text-pink-500">HI</span> {user?.name}
          </h1>
          <div className="flex justify-center items-center">
            <EditFrom />
          </div>
        </Card>
      </div>
    </div>
  );
}
