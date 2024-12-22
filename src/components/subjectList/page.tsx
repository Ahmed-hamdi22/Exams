"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import Image from "next/image";


export default function QuizesCard() {
  const { data: session } = useSession();
  const [allSubjects, setSubjects] = useState([]);
  const getAllSubjects = () => {
  
    return axios.get(`https://exam.elevateegy.com/api/v1/subjects`,{
          headers: {
            token: session?.token,
          },
        }
      )
      .then((res) => {
        setSubjects(res.data?.subjects);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllSubjects();
   
  }, []);


  return (
    <>
      <div className="m-10">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-[#4461F2] text-[24px] font-medium">Quizes</h2>
         <h2  className="text-[#4461F2] text-[24px] font-medium">view All</h2>

     </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 bg-white py-8 px-4 rounded-xl">
          {allSubjects?.map((subject, index) => (
            <Link href={`/dashboard/${subject._id}`} key={index}>
           <div className="relative rounded-lg w-full h-[292px] overflow-hidden">
            <Image src={subject?.icon} alt="" fill={true}/>
            <div className='absolute top-[60%] left-[50%] translate-x-[-50%] bg-[#1100FF66] bg-opacity-70 w-4/5 mx-auto p-5 text-center backdrop-blur rounded-lg'>
                <h3 className="text-white font-medium">{subject?.name}</h3>
            </div>
        </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
