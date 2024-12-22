import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const Button = () => {
    return (
        <>
          <div className="flex items-center justify-center my-2">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-base">Or Continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="grid grid-cols-4 mx-10 gap-4">
            <div onClick={()=>signIn("google",{callbackUrl:"/"}) }
            className=" flex justify-center  items-center border py-4 shadow-md  rounded-2xl cursor-pointer"
            >
                <Image width={25} height={25} alt="google" src={"/images/Logo Google.png"} />
            </div>
            <div onClick={()=>signIn("facebook",{callbackUrl:"/"}) }
            className=" flex justify-center  items-center border py-4 shadow-md  rounded-2xl cursor-pointer">            <Image width={25} height={25} alt="google" src={"/images/Vector.png"} />
            </div>
            <div onClick={()=>signIn("twitter",{callbackUrl:"/"}) }       
                 className=" flex justify-center  items-center border py-4 shadow-md  rounded-2xl cursor-pointer"
            >
                <Image width={25} height={25} alt="twitter" src={"/images/Logo.png"} />
            </div>
            <div
           onClick={()=>signIn("apple",{callbackUrl:"/"}) }
            className=" flex justify-center  items-center border py-4 shadow-md  rounded-2xl cursor-pointer"
            >
                <Image width={25} height={25} alt="apple" src={"/images/Logo (1).png"} />
            </div>
        </div>   
        </>
    );
};

export default Button;