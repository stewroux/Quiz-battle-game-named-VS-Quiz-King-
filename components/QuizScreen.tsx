
import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion, Difficulty } from '../types';
import { getAiAnswer } from '../services/geminiService';
import QuizKingAvatar from './QuizKingAvatar';
import { useLanguage } from '../i18n';

interface QuizScreenProps {
  questions: QuizQuestion[];
  onQuizComplete: (userScore: number, aiScore: number) => void;
  category: string;
  modelId: string;
  difficulty: Difficulty;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onQuizComplete, category, modelId, difficulty }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(true);
  const { t } = useLanguage();

  const currentQuestion = questions[currentQuestionIndex];

  const fetchAiAnswer = useCallback(async () => {
    setIsAiThinking(true);
    // Simulate AI thinking time for better UX (shorter for 'easy' to simulate impulsive guess, longer for 'hard'?)
    // Keeping random variance for natural feel.
    const thinkingTime = Math.random() * 1500 + 500; 
    await new Promise(res => setTimeout(res, thinkingTime));
    
    const answer = await getAiAnswer(currentQuestion, modelId, difficulty);
    setAiAnswer(answer);
    setIsAiThinking(false);
  }, [currentQuestion, modelId, difficulty]);

  useEffect(() => {
    if (currentQuestion) {
      fetchAiAnswer();
    }
  }, [currentQuestion, fetchAiAnswer]);


  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    setUserAnswer(answer);
    setIsAnswered(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setUserScore(prev => prev + 1);
    }
    
    // The AI's score is determined after its answer is revealed.
    if (aiAnswer === currentQuestion.correctAnswer) {
      setAiScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      resetStateForNextQuestion();
    } else {
      onQuizComplete(userScore, aiScore);
    }
  };
  
  const resetStateForNextQuestion = () => {
    setUserAnswer(null);
    setAiAnswer(null);
    setIsAnswered(false);
    setIsAiThinking(true);
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return "bg-slate-800 hover:bg-purple-600";
    }
    if (option === currentQuestion.correctAnswer) {
      return "bg-green-500 scale-105";
    }
    if (option === userAnswer && option !== currentQuestion.correctAnswer) {
      return "bg-red-500";
    }
    return "bg-slate-700 opacity-60";
  };
  
  if (!currentQuestion) {
    return <div>{t('loadingQuestion')}</div>;
  }

  return (
    <div className="p-4 md:p-6 bg-slate-800/50 rounded-2xl shadow-2xl animate-fade-in-up w-full">
      <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-4">
        <div>
          <p className="text-slate-400 text-sm">{t('categoryLabel')}</p>
          <h2 className="text-xl font-bold text-purple-400">{category}</h2>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm">{t('questionLabel')}</p>
          <h2 className="text-xl font-bold">{currentQuestionIndex + 1} / {questions.length}</h2>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6 text-center">
        <div>
          <p className="text-lg font-semibold">{t('youLabel')}</p>
          <p className="text-3xl font-bold text-cyan-400">{userScore}</p>
        </div>
        <QuizKingAvatar isThinking={isAiThinking} />
        <div>
          <p className="text-lg font-semibold">{t('quizKingLabel')}</p>
          <p className="text-3xl font-bold text-pink-500">{aiScore}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-center leading-tight">
          {currentQuestion.question}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {currentQuestion.options.map(option => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-lg text-lg font-medium transition-all duration-300 ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
      
      {isAnswered && (
        <div className="text-center animate-fade-in">
           {!isAiThinking && aiAnswer && (
             <p className="mb-4 text-lg text-slate-300">
               {t('quizKingChose', { answer: aiAnswer })}
             </p>
           )}
           <button
             onClick={handleNextQuestion}
             className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/50"
           >
             {currentQuestionIndex < questions.length - 1 ? t('nextQuestion') : t('seeResults')}
           </button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
