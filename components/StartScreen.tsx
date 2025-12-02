
import React from 'react';
import { useLanguage } from '../i18n';
import { MODELS } from '../constants';
import { Difficulty } from '../types';

interface StartScreenProps {
  onStart: () => void;
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ 
  onStart, 
  selectedModel, 
  onModelChange, 
  selectedDifficulty, 
  onDifficultyChange 
}) => {
  const { t } = useLanguage();

  return (
    <div className="text-center animate-fade-in-up flex flex-col items-center">
      <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        {t('appName')}
      </h1>
      <p className="text-xl text-slate-300 mb-8 max-w-md">
        {t('appDescription')}
      </p>

      <div className="bg-slate-800/60 p-6 rounded-xl w-full max-w-md mb-8 border border-slate-700">
        <div className="mb-4 text-left">
          <label className="block text-slate-400 mb-2 text-sm font-semibold uppercase tracking-wider">{t('selectModel')}</label>
          <select 
            value={selectedModel} 
            onChange={(e) => onModelChange(e.target.value)}
            className="w-full bg-slate-900 text-white border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          >
            {MODELS.map(model => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-2 text-left">
          <label className="block text-slate-400 mb-2 text-sm font-semibold uppercase tracking-wider">{t('selectDifficulty')}</label>
          <div className="grid grid-cols-3 gap-2">
            {[Difficulty.Easy, Difficulty.Medium, Difficulty.Hard].map((level) => (
              <button
                key={level}
                onClick={() => onDifficultyChange(level)}
                className={`p-2 rounded-lg text-sm font-medium transition-all ${
                  selectedDifficulty === level 
                    ? 'bg-purple-600 text-white shadow-lg scale-105' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {t(`difficulty.${level}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

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
