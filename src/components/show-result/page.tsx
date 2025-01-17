import React from 'react';

type ShowResultProps = {
    getWrongQuestions: any;
    selectedAnswers: any;
    onClose: any;
    questions: any;
    answer: any;
    idx: any;
};
const ShowResult = (
    { getWrongQuestions, selectedAnswers, onClose, questions, answer, idx }: ShowResultProps
) => {
    return (
        <>
        
    
            <div
              className="overflow-y-auto h-full w-full"
              style={{ maxHeight: "100vh" }}
            >
             
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
                className="bg-blue-500 text-white px-6 py-3 rounded-full mt-6 right-0"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          
        </>
    );
}

export default ShowResult
