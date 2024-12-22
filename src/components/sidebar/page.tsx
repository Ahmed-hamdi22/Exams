'use client'
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
    const handleLogout = async()=>{
        signOut();
    }
  return (
    <div className="flex flex-col gap-10 w-[200px] h-full">
      <div className="flex items-center mb-6">
        <Image
          src="/images/Final Logo 1.png"
          alt="logo"
          width={150}
          height={30}
          className="object-contain"
        />
      </div>

      <nav className="flex flex-col gap-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-5 text-[20px] text-[#696F79] font-poppins font-[600]"
        >
          <Image
            src="/images/Vector (2).png"
            alt="Dashboard Icon"
            width={22}
            height={22}
            className="object-contain"
          />
          Dashboard
        </Link>

        <Link
          href="#"
          className="flex items-center gap-5 text-[20px] text-[#696F79] font-poppins font-[600] "
        >
          <Image
            src="/images/quiz-icon.png"
            alt="Quiz History Icon"
            width={22}
            height={22}
            className="object-contain"
          />
          Quiz History
        </Link>

        <div onClick={handleLogout}>

            <Link
            href="#"
            className="flex items-center gap-5 text-[20px] text-[#696F79] font-poppins font-[600]"
            >
            <Image
                src="/images/logout-icon.png"
                alt="Log Out Icon"
                width={22}
                height={22}
                className="object-contain"
            />
            Log Out
            </Link>
        </div>
      </nav>
    </div>
  );
}
