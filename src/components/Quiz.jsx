import React, { useState, useEffect } from "react";
import Question from "./Question";
import Options from "./Options";
import StartButton from "./StartButton";
import "./Quiz.css";

const Quiz = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        let timer;

        const handleTimerTick = () => {
            setTimeRemaining((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                    return 30;
                } else {
                    return 0;
                }
            });
        };

        const startTimer = () => {
            timer = setInterval(handleTimerTick, 1000);
        };

        if (quizStarted && currentQuestionIndex < questions.length) {
            // Set the timer when the question changes and the quiz starts
            setTimeRemaining(30);
            startTimer();
        }

        return () => {
            // Clear timer when component unmount or question changes
            clearInterval(timer);
        };
    }, [quizStarted, currentQuestionIndex, questions]);

    const handleSelectOption = (selectedOption) => {
        setUserAnswers([...userAnswers, { question: currentQuestionIndex, answer: selectedOption }]);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimeRemaining(30); // Yeni soru için zamanı sıfırla
    };

    const calculateScore = () => {
        let correctAnswers = 0;

        questions.forEach((question, index) => {
            const userAnswer = userAnswers.find((userAnswer) => userAnswer.question === index)?.answer;

            if (question.answer === userAnswer) {
                correctAnswers += 1;
            }
        });

        return correctAnswers * 10;
    };

    const startQuiz = () => {
        setQuizStarted(true);
    };

    const finishQuiz = () => {
        setShowResults(true);
    };

    return (
        <div className="quiz-container">
            {!quizStarted ? (
                <div className="quiz-start">
                    <h2>Teste Başla</h2>
                    <p>Teste hazır mısın?</p>
                    <StartButton onClick={startQuiz} />
                </div>
            ) : currentQuestionIndex < questions.length ? (
                <div className="quiz-question">
                    <Question {...questions[currentQuestionIndex]} />
                    {timeRemaining <= 29 && <Options options={questions[currentQuestionIndex].options} onSelectOption={handleSelectOption} />}
                    <p className="timer">{timeRemaining}</p>
                </div>
            ) : (
                <div className="quiz-results">
                    {showResults ? (
                        <div>
                            <h2>Quiz Tamamlandı!</h2>
                            <p>Toplam Puan: {calculateScore()}</p>
                            <p>Doğru Cevaplar: {calculateScore() / 10}</p>
                            <p>Yanlış Cevaplar: {questions.length - calculateScore() / 10}</p>
                            <h3>Cevaplarınız:</h3>
                            <ul className="list">
                                {userAnswers.map((userAnswer, index) => (
                                    <li key={index}>
                                        Soru {userAnswer.question + 1}: {userAnswer.answer}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="quiz-finish">
                            <p>Bravo başardın sonuçları görmek için bitir;</p>
                            <button className="finish-button" onClick={finishQuiz}>
                                Bitir
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;
