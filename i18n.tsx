import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { en } from './en';
import { ja } from './ja';

const translations = { en, ja };

export type Language = 'en' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('quiz-lang') as Language;
    const browserLang = navigator.language.split('-')[0];
    if (storedLang && ['en', 'ja'].includes(storedLang)) {
      setLanguage(storedLang);
    } else if (browserLang === 'ja') {
      setLanguage('ja');
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('quiz-lang', lang);
  };

  const t = useCallback((key: string, replacements?: { [key: string]: string | number }) => {
    const keys = key.split('.');
    let text: any = translations[language];
    for (const k of keys) {
      if (text && typeof text === 'object' && k in text) {
        text = text[k];
      } else {
        return key; // Return key if not found
      }
    }

    let result = String(text);

    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        result = result.replace(`{${placeholder}}`, String(replacements[placeholder]));
      });
    }
    
    return result;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
