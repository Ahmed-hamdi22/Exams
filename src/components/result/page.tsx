import React from 'react';

const ResultPage = ({ results, handleShowWrongQuestions, onClose }:any) => {

    return (
        <>
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
                  onClick={handleShowWrongQuestions}
                >
                  Show Wrong Answers
                </button>
              </div>
                        </div>
        </>
    );
}

export default ResultPage
