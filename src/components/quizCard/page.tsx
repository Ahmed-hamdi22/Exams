'use client';

import { useState } from 'react';
import Image from 'next/image';
import QuizStartModal from '../modal/page';

type QuizCardProps = {
  quiz: any;
};

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#F9F9F9] shadow-md rounded-lg">
      <div className="flex items-center space-x-4">
        <Image
          src={"/images/Group.png"} 
          alt={quiz.img}
          width={70}
          height={70}
          className="w-[70px] h-[70px]"
        />
        <div>
          <h2 className="text-lg text-[#0F0F0F] font-medium">{quiz.title}</h2>
          <p className="text-sm text-[#535353]">{quiz.numberOfQuestions} Questions</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-[#0F0F0F]">{quiz.duration} Minutes</span>
        <button
          onClick={handleStartClick} 
          className="px-6 py-2 text-sm font-medium text-white bg-[#4461F2] rounded-[20px]"
        >
          Start
        </button>
      </div>

      <QuizStartModal
        isOpen={isModalOpen}
        onClose={closeModal}
        quizTitle={quiz.title}
        quizDuration={quiz.duration}
        quizId = {quiz._id}
      />
    </div>
  );
};

export default QuizCard;
