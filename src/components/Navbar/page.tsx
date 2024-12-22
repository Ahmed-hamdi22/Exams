'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = async()=>{
    signOut();
}
  return (
    <div className="relative bg-[#4461F2] p-3 lg:p-0 lg:bg-transparent w-full">
      <div className="flex justify-between items-center gap-6 w-full">
        <button className="block md:hidden" onClick={toggleMenu}>
          <Image
            src="/images/align-justified.png" 
            height={25}
            width={25}
            alt="menu-icon"
          />
        </button>

        <div className="flex justify-between w-[70%] bg-white p-[12px] rounded-[20px] shadow-md items-center">
          <Image
            src="/images/search.png"
            height={20}
            width={20}
            alt="search-icon"
          />
          <input
            className="w-[95%] outline-none"
            type="text"
            placeholder="Search Quiz"
          />
        </div>

        <div className="hidden md:block w-[23%] font-semibold">
        <button
      type="submit"
       className="w-full bg-[#4461F2] h-[55px] text-white rounded-[20px] md:bg-slate-50 md:text-[#4461F2]"
    >
       <Link href={'/allquizes'}>      Start Quiz  </Link>
     
    </button>        </div>

        <div className="xs:w-[15%] lg:w-[7%] flex justify-end">
          <Image
            className="rounded-full w-[40px] h-[40px] "
            src="/images/Frame.png"
            height={60}
            width={60}
            alt="profile-image"
          />
        </div>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-white z-50 transition-transform ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex justify-between items-center border-b p-4">
        <Image
            className="w-[83px] h-[15px] mr-3"
            src="/images/Final Logo 1.png" 
            height={15}
            width={83}
            alt="profile-image"
          />
          <button onClick={toggleMenu} className="text-black text-2xl">
            &times;
          </button>
        </div>

        <nav className="flex flex-col gap-7 p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-5 text-[16px] text-[#696F79] font-poppins font-[600]"
        >
          <Image
            src="/images/Vector (2).png"
            alt="Dashboard Icon"
            width={20}
            height={20}
            className="object-contain"
          />
          Dashboard
        </Link>
        <Link
          href="#"
          className="flex items-center gap-5 text-[16px] text-[#696F79] font-poppins font-[600] "
        >
          <Image
            src="/images/quiz-icon.png"
            alt="Quiz History Icon"
            width={20}
            height={20}
            className="object-contain"
          />
          Quiz History
        </Link>

        {/* Log Out Link */}
        <div onClick={handleLogout}>

            <Link
            href="#"
            className="flex items-center gap-5 text-[16px] text-[#696F79] font-poppins font-[600]"
            >
            <Image
                src="/images/logout-icon.png"
                alt="Log Out Icon"
                width={20}
                height={20}
                className="object-contain"
            />
            Log Out
            </Link>
        </div>
      </nav>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
}
