import { options } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

type Subject = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
};

export default async function QuizGrid() {
  const session = await getServerSession(options);
  const token = session?.token;

  async function getSubjects(): Promise<Subject[]> {
    try {
      const res = await axios.get("https://exam.elevateegy.com/api/v1/subjects", {
        headers: {
          token
        },
      });
      return res.data.subjects; 
    } catch (error) {
      console.error("Error fetching subjects:", error);
      return [];
    }
  }

  const subjects = await getSubjects();

  return (
    <div className="bg-white shadow-md py-8 px-4 mt-7 rounded-[20px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#4461F2] text-[24px] font-medium">Quizzes</h2>
        <a href="#" className="text-[#4461F2] text-[24px] font-medium">
          View All
        </a>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
        <Link href={`/dashboard/${subject._id}`} key={subject._id}>
            <div
              className="relative rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={subject.icon}
                alt={subject.name}
                width={330}
                height={292}
                className="w-full h-[292px] object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 m-4 bg-[#1935CA] bg-opacity-40 backdrop-blur-[27.01px] text-white rounded-xl">
                <h3 className="font-bold text-sm mb-1">{subject.name}</h3>
                <p className="text-xs font-medium">{subject._id}</p>
              </div>
            </div>
        </Link>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No subjects available.</p>
        )}
      </div>
    </div>
  );
}
