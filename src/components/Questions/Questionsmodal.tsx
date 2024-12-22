"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Answer = {
  answer: string;
  key: string;
};

type Question = {
  question: string;
  answers: Answer[];
  correct: string;
};

type QuizStartModalQuestionProps = {
  isOpen: boolean;
  onClose: () => void;
  examId: string;
};

const QuizStartModalQuestion: React.FC<QuizStartModalQuestionProps> = ({
  isOpen,
  onClose,
  examId,
}) => {
  const { data } = useSession();
  const token = data?.token;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [showWrongQuestions, setShowWrongQuestions] = useState<boolean>(false);

  const [results, setResults] = useState<{
    correct: number;
    incorrect: number;
  }>({ correct: 0, incorrect: 0 });


  useEffect(() => {
    if (isOpen) {
      fetchQuizData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            handleQuizCompletion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get(`https://exam.elevateegy.com/api/v1/questions?exam=${examId}`, {
        headers: {
          token,
        },
      });

      if (response.data.message === "success" && response.data.questions) {
        const { questions } = response.data;
        const exam = questions[0].exam;

        setQuestions(questions);

        if (exam && exam.duration) {
          setTimeLeft(exam.duration * 60);
        } else {
          setError("Quiz duration not provided.");
        }
      } else {
        setError("Failed to fetch quiz data.");
      }
    } catch (error) {
      setError("An error occurred while fetching quiz data.");
    }
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: event.target.value,
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

  const handleQuizCompletion = () => {
    const correctAnswers = questions.reduce((count, question, index) => {
      if (selectedAnswers[index] === question.correct) return count + 1;
      return count;
    }, 0);

    const incorrectAnswers = questions.length - correctAnswers;

    setResults({ correct: correctAnswers, incorrect: incorrectAnswers });
    setQuizCompleted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleShowWrongQuestions = () => {
    setShowWrongQuestions(true);
  };

  const getWrongQuestions = () =>
    questions.filter(
      (_, index) => selectedAnswers[index] !== questions[index].correct
    );

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

        {quizCompleted ? (
          showWrongQuestions ? (
            <div
              className="overflow-y-auto h-[80vh] w-full"
              style={{ maxHeight: "80vh" }}
            >
              <h2 className="text-2xl font-semibold text-center mb-6">
                Wrong Answers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getWrongQuestions().map((question, index) => {
                  const userAnswerKey = selectedAnswers[index];
                  const correctAnswerKey = question.correct;
                  return (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-2 bg-white shadow-md"
                    >
                      <h3 className="text-lg font-medium">
                        {question.question}
                      </h3>
                      <ul className="space-y-1">
                        {question.answers.map((answer, idx) => (
                          <li
                            key={idx}
                            className={`px-4 py-2 break-words rounded-md border ${
                              answer.key === correctAnswerKey
                                ? "bg-green-100 text-[#011234] border-green-500"
                                : answer.key === userAnswerKey
                                ? "bg-red-100 text-red-800 border-red-500"
                                : ""
                            }`}
                          >
                            {answer.answer}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-full mt-6 w-full"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <h2 className="text-[24px] font-normal mb-4 text-[#0F0F0F]">
                Your Score
              </h2>
              <div className="flex justify-center items-center gap-28 my-4">
                <div className="w-32 h-32 mb-4">
                  <CircularProgressbar
                    strokeWidth={6}
                    circleRatio={1}
                    value={(results.correct / questions.length) * 100}
                    text={`${Math.round(
                      (results.correct / questions.length) * 100
                    )}%`}
                    styles={buildStyles({
                      strokeLinecap: "butt",
                      textSize: "16px",
                      pathColor: "#02369C",
                      textColor: "#000",
                      trailColor: "#CC1010",
                    })}
                  />
                </div>
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
                  onClick={handleShowWrongQuestions}
                >
                  Show Wrong Answers
                </button>
              </div>
            </div>
          )
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : timeLeft !== null && questions.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-[#4461F2]">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <div className="flex items-center justify-between gap-2">
                <Image
                  src={"/images/clock.png"}
                  alt="clock"
                  height={25}
                  width={25}
                />
                <span className="text-sm text-[#11CE19]">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-8 my-8">
              {Array.from({ length: questions.length }, (_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
              ))}
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
                  onClick={handleQuizCompletion}
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

export default QuizStartModalQuestion;
