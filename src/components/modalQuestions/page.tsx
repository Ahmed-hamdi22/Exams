"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import "react-circular-progressbar/dist/styles.css";
// import { Chart  , ArcElement,Tooltip,Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

// Chart.register(
//   ArcElement,
//   Tooltip,
//   Legend
// )

type Question = {
  question: string;
  correct: string;
};

type QuizProps = {
  isOpen: boolean;
  onClose: () => void;
  examId: string;
};


const StartQuestion: React.FC<QuizProps> = ({ isOpen,onClose, examId,}) => {
  const { data } = useSession();
  const token = data?.token;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{  [key: number]:any;}>({});
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<boolean>(false);

  const [results, setResults] = useState<{
    correct: number;
    incorrect: number;
  }>({ correct: 0, incorrect: 0 });


  useEffect(() => {
    if (isOpen) {
      GetQuizData();
    }
  }, [isOpen]);
 
  const GetQuizData = async () => {
    try {
      const res = await axios.get(`https://exam.elevateegy.com/api/v1/questions?exam=${examId}`, {  headers: { token, }, });

      if (res.data.message === "success" && res.data.questions) {
        const { questions } = res.data;
        const exam = questions[0].exam;
        setQuestions(questions);

        if (exam && exam.duration) {
          setTimeLeft(exam.duration * 60);
        } 
      } else {
        setError("Failed data.");
      }
    } catch (error) {
      setError(" error fetching data.");
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleQuizResult = () => {
    const correctAnswers = questions.reduce((count, question, index) => {
      if (selectedAnswers[index] === question.correct) return count + 1;
      return count;
    }, 0);

    const incorrectAnswers = questions.length - correctAnswers;
    setResults({ correct: correctAnswers, incorrect: incorrectAnswers });
    setQuiz(true);
  };

  // const time = timeLeft;
  // const  minutes = Math.floor(time / 60);
  // const seconds = time % 60;
 
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-[20px] shadow-lg w-11/12 max-w-2xl p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Quiz Questions</h2>

        {quiz ? (
            <div className="flex flex-col">
              <h2 className="text-[24px] font-normal mb-4 text-[#0F0F0F]">
                Your Score
              </h2>
              <div className="flex justify-center items-center gap-28 my-4">
                <div className="mb-4">
                  <div className="flex justify-between gap-5 mb-4">
                    <h4 className="text-[20px] font-normal text-[#02369C]">
                      Correct
                    </h4>
                    <p className="flex items-center justify-center p-2 text-[16px] text-[#02369C] border-2 border-[#02369C] rounded-full w-8 h-8">
                      {results.correct}
                    </p>
                  </div>
                  <div className="flex justify-between gap-5">
                    <h4 className="text-[20px] font-normal text-[#CC1010]">
                      Incorrect
                    </h4>
                    <p className="flex items-center justify-center p-2 text-[16px] text-[#CC1010] border-2 border-[#CC1010] rounded-full w-8 h-8">
                      {results.incorrect}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-betweeng gap-10">
                <button
                  className="w-full border-2 border-[#4461F2] text-[#4461F2] px-4 py-3 rounded-[100px]"
                  onClick={onClose}
                >
                  Back
                </button>
                <button
                  className="bg-[#4461F2] w-full text-white px-4 py-3 rounded-[100px]"
                  onClick={onClose}
                >
                 Close
                </button>
              </div>
            </div>
          ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : timeLeft !== null && questions.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-[#4461F2]">
                Question {currentIndex + 1} OF {questions.length}
              </span>
              <div className="flex items-center justify-between gap-2">
                <Image
                  src={"/images/alarm.png"}
                  alt="clock"
                  height={25}
                  width={25}
                />
                <span className="text-sm text-[#11CE19]">
                  
                  {timeLeft }
                </span>
              </div>
            </div>
  
            <h3 className="font-normal text-[22px] mb-4">
              {currentIndex + 1}. {questions[currentIndex].question}
            </h3>
            <ul className="space-y-2">
              {questions[currentIndex].answers.map((answer, idx) => (
                <li
                  key={idx}
                  className="px-2 py-4 rounded-[10px] cursor-pointer border bg-[#EDEFF3]"
                >
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${currentIndex}`}
                      value={answer.key}
                      checked={selectedAnswers[currentIndex] === answer.key}
                      onChange={handleAnswerChange}
                      className="form-radio w-5 h-5 text-[#02369C] border-[#02369C]"
                    />
                    <span>{answer.answer}</span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="flex justify-betweeng gap-10 mt-6">
              <button
                className="w-full border-2 border-[#4461F2] text-[#4461F2] px-4 py-3 rounded-[100px]"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              {currentIndex === questions.length - 1 ? (
                <button
                  className="bg-[#4461F2] w-full text-white px-4 py-3 rounded-[100px]"
                  onClick={handleQuizResult}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="bg-[#4461F2] w-full text-white px-4 py-3 rounded-[100px] "
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default StartQuestion;
