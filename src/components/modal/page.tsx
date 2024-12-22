'use client';

import React, { useState } from "react";
import StartQuestion from "../modalQuestions/page";

type QuizStartModalProps = {
  quizTitle: string;
  quizDuration: number;
  quizId : string;
  isOpen: boolean; 
};

const QuizStartModal: React.FC<QuizStartModalProps> = ({ isOpen, quizTitle,quizId}) => {
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  console.log(`idd` , quizId);
  console.log(`issdd` , quizTitle);
  
  const handleStartQuiz = () => {
    setIsSecondModalOpen(true);
  };

  return (
    <>
      {isOpen && !isSecondModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
          <div className="bg-white p-8 rounded-xl shadow-lg w-[600px]">
          
            <div className="border-b mb-4 pb-4">
              <h2 className=" font-bold mb-2 text-gray-800">Instructions</h2>
              <ul>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Lorem ipsum dolor sit amet consectetur</li>
              </ul>
            </div>
            <div className="mt-2">
              <button onClick={handleStartQuiz} className="px-4 py-2 w-full bg-blue-600 text-white rounded-md">Start Quiz</button>
            </div>
          </div>
        </div>
      )}

      {isSecondModalOpen && (
        <StartQuestion isOpen={isSecondModalOpen} onClose={()=> setIsSecondModalOpen(false)} examId={quizId}/>
      )}
    </>
  );
};

export default QuizStartModal;
