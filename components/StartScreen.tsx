import React from 'react';
import { useLanguage } from '../i18n';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const { t } = useLanguage();

  return (
    <div className="text-center animate-fade-in-up flex flex-col items-center">
      <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        {t('appName')}
      </h1>
      <p className="text-xl text-slate-300 mb-8 max-w-md">
        {t('appDescription')}
      </p>
      <button
        onClick={onStart}
        className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/50"
      >
        {t('startChallenge')}
      </button>
    </div>
  );
};

export default StartScreen;
