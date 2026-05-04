"use client";
import React from "react";
import { toast } from "react-toastify";

export default function MorrowNawButton() {
  return (
    <div>
      <Button
      onClick={()=> toast.success("Borrow This Book is success")}
        className={
          "text-right flex justify-center items-center mx-auto mt-20 max-w-[200px]"
        }
      >
        Borrow This Book
      </Button>
    </div>
  );
}
