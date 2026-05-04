"use client";
import React from "react";
import { Button } from "@heroui/react"
import { toast } from "react-toastify";

export default function MorrowNawButton() {
    const handleToast=()=> toast.success("Borrow This Book is success")
  return (
    <div>
      <Button
      onClick={handleToast}
        className={
          "text-right flex justify-center items-center mx-auto mt-20 max-w-[200px]"
        }
      >
        Borrow This Book
      </Button>
    </div>
  );
}
