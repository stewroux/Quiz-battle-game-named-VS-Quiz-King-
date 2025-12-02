import React from 'react';
import { useLanguage } from '../i18n';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 bg-slate-700/50 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-slate-600 transition-colors duration-300 z-50 backdrop-blur-sm"
      aria-label={`Switch to ${language === 'en' ? 'Japanese' : 'English'}`}
    >
      {language === 'en' ? '日本語' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;
