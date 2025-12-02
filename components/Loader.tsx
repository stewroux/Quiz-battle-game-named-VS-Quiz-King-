import React from 'react';
import { useLanguage } from '../i18n';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 border-4 border-t-purple-500 border-slate-700 rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-semibold text-slate-200">{message}</h2>
      <p className="text-slate-400 mt-2">{t('quizKingPreparing')}</p>
    </div>
  );
};

export default Loader;
