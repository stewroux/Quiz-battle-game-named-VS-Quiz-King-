import React from 'react';
import { useLanguage } from '../i18n';

interface EndScreenProps {
  userScore: number;
  aiScore: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ userScore, aiScore, totalQuestions, onPlayAgain }) => {
  const { t } = useLanguage();

  const getResult = () => {
    if (userScore > aiScore) {
      return {
        title: t('victoryTitle'),
        message: t('victoryMessage'),
        color: "text-cyan-400",
      };
    } else if (aiScore > userScore) {
      return {
        title: t('defeatTitle'),
        message: t('defeatMessage'),
        color: "text-pink-500",
      };
    } else {
      return {
        title: t('drawTitle'),
        message: t('drawMessage'),
        color: "text-purple-400",
      };
    }
  };
  
  const result = getResult();

  return (
    <div className="text-center bg-slate-800/50 p-8 rounded-2xl shadow-2xl animate-fade-in-up">
      <h2 className={`text-5xl font-bold mb-4 ${result.color}`}>{result.title}</h2>
      <p className="text-xl text-slate-300 mb-8">{result.message}</p>
      
      <div className="flex justify-around items-center bg-slate-900/50 rounded-xl p-6 mb-8">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-400">{t('yourScore')}</p>
          <p className="text-5xl font-bold text-cyan-400">{userScore}
            <span className="text-2xl text-slate-400">/{totalQuestions}</span>
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-400">{t('quizKingScore')}</p>
          <p className="text-5xl font-bold text-pink-500">{aiScore}
            <span className="text-2xl text-slate-400">/{totalQuestions}</span>
          </p>
        </div>
      </div>
      
      <button
        onClick={onPlayAgain}
        className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/50"
      >
        {t('playAgain')}
      </button>
    </div>
  );
};

export default EndScreen;
