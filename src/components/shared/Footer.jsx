import Image from "next/image";
import React from "react";
import icon from "@/assets/bg-logo.png";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
export default function Footer() {
  return (
    <div className="py-20 bg-[#FBE6D4]  items-center px-10">
      <div className=" ">
        <Image
          src={icon}
          height={200}
          width={200}
          alt={"hero icon"}
          className="mx-auto"
        />
        <h1 className="text-2xl text-center font-bold bg-gradient-to-r from-pink-500 to-gray-500 text-transparent bg-clip-text">
          {" "}
          Books Hunts
        </h1>
        <div className="flex justify-between mt-10 p-4">
          <div className="">
            <h1 className="text-xl font-bold">Services</h1>
            <div className="flex flex-col gap-3 mt-5 text-gray-500 font-semibold">
              <p>New book</p>
              <p>New clection</p>
              <p>UPDATE library every week</p>
              <p>Rejain able price</p>
            </div>
          </div>

          <div className="">
             <h2 className="text-xl font-bold">contact us</h2>
            <div className="flex flex-col gap-3  mt-5">
             
              <p  className="flex items-center gap-2 hover:font-semibold">
                <FaMagnifyingGlassLocation /> Dhaka Satrasta
              </p>
              <p className="hover:font-semibold">Ashik@gmail.com</p>
              <p className="hover:font-semibold">www.BookHunt.com.bd</p>
              <p className="flex items-center gap-2 hover:font-semibold">
                <IoLogoWhatsapp /> 019xxxxxxxx
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold">Social</h1>
            <div className="mt-5 flex gap-5 justify-center items-center">
              <span className="hover:bg-red-500 rounded-full">
                <FaFacebook size={30} />
              </span>
              <span className="hover:bg-red-500 ">
                <FaLinkedin size={30} />
              </span>
              <span className="hover:bg-red-500 ">
                <MdOutgoingMail size={40} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
