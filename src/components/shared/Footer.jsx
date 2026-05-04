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
        <div className="flex flex-col md:flex-row gap-10 md:gap-2 justify-between mt-10 p-4">
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
              <p className="flex items-center gap-2 hover:font-semibold">
                <FaMagnifyingGlassLocation /> Dhaka Satrasta
              </p>
              <p className="hover:font-semibold">Ashik@gmail.com</p>
              <p className="">www.BookHunt.com.bd</p>
              <p className="flex items-center gap-2 hover:font-semibold">
                <IoLogoWhatsapp /> 019xxxxxxxx
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold mb-4 text-gray-800">Social</h1>

            <div className="flex gap-6 items-center">
              <a
                href="#"
                className="p-3 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-110"
              >
                <FaFacebook size={26} />
              </a>

              <a
                href="#"
                className="p-3 rounded-full bg-gray-100 hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-110"
              >
                <FaLinkedin size={26} />
              </a>

              <a
                href="#"
                className="p-3 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-110"
              >
                <MdOutgoingMail size={28} />
              </a>
            </div>
          </div>
        </div>
        <h2 className="text-center mt-20">
          {" "}
          <p>© 2026 BooksHunt. All rights reserved.</p>
        </h2>
      </div>
    </div>
  );
}
