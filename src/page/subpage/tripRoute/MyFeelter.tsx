import React, { useState, useEffect } from 'react';
import hyo from "../../../scss/hyo.module.scss";
import MyFeelterResult from './MyFeelterResult';

import { MyFeelterQ } from '../../../types/common';

export interface MyFeelterProps {
    myfeelter: MyFeelterQ; // optional로 받도록 지정
}

const MyFeelter:React.FC <MyFeelterProps> = ({myfeelter}) => {

    const questions = myfeelter;
    const lastQIdx: number = questions.length - 1;

    const [key, setKey] = useState<number>(() => {
        const savedKey = localStorage.getItem("myfeelter_key");
        return savedKey ? parseInt(savedKey, 10) : 0;
    });
    const [answers, setAnswers]  = useState<Record<string, string | number>>(()=>{
        const saved = localStorage.getItem("myfeelter_answers");
        return saved ? JSON.parse(saved) :{};
    });
    useEffect(() => {
        localStorage.setItem("myfeelter_answers", JSON.stringify(answers));
        localStorage.setItem("myfeelter_key", key.toString());
    }, [answers, key]);
    // 다음 질문
    const handleNextQ = (qIdx: string, value: string | number) => {
    const newAnswers = {
        ...answers,
        [qIdx]: value,
    };
     const isLastQuestion = key === lastQIdx;

    setAnswers(newAnswers);

    if (isLastQuestion) {
        console.log("최종 응답 결과:", newAnswers); // ✅ 마지막 질문에서만 로그
    }

    setKey((prevKey) => prevKey + 1);
  };
    //뒤로
    const handlePrevQ = () => {
        if (key > 0) {
            setKey((prev) => prev - 1);
          }
    };

    //다시하기
      const handleRestart = () => {
        setKey(0);
        setAnswers({});
        localStorage.removeItem("myfeelter_answers");
        localStorage.removeItem("myfeelter_key");
    };

    // 모든 질문 완료 시 결과 페이지로 이동
    if (key > lastQIdx) {
        return <MyFeelterResult answers={answers} onRestart={handleRestart} />;
    }

    return (
        <div>
            <div className={`p-4 border-b border-trip-gray1`}>
                <div className="flex justify-between items-center">
                    <div
                        className={`${hyo.back_btn} w-8 h-8 `}
                        onClick={handlePrevQ}
                    ></div>
                    <div className="question_num">
                        <span>{key+1}</span><span>/{questions.length}</span>
                    </div>
                </div>
            </div>         

            <div id="myfeelterForm" className={`pb-[7.5rem]`}>
                <fieldset className={`filset${key} flex-wrap gap-[1.25rem]`}>
                    <div className="flex justify-center my-5 md:my-0 md:py-[2.5rem] md:px-[1rem]  md:justify-start ">
                        <legend className={`font-semibold text-small-text xs:text-medium-text`}><span className={`text-trip-blue text-small-text xs:text-big-text font-700`}>Q{key+1}.</span> {questions[key].question}</legend>
                    </div>

                    <div className={`${hyo.answerBox} flex flex-wrap gap-[1.25rem] justify-center  flex-col md:flex-row ${hyo[questions[key].className]}`}>
                        {questions[key].answers.map((answer) => (
                            <div key={answer.value}>
                                <input
                                    type="radio"
                                    name={`q_${key}`}
                                    value={answer.value}
                                    id={`${key}_${answer.value}`}
                                    className="hidden"
                                    onChange={() => handleNextQ(`q_${key}`, answer.value)}
                                    checked={answers[`q_${key}`] === answer.value}
                                />
                                <label
                                    className="flex justify-center items-center"
                                    htmlFor={`${key}_${answer.value}`}
                                    style={{ backgroundImage: `url(${answer.src})` }}
                                >
                                    <span className={`relative text-semismall-text`}>{answer.label}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
        </div>
    );
};
export default MyFeelter;