import React from 'react';
import { useLanguage } from '../i18n';
import { CATEGORIES } from '../constants';

interface CategorySelectionProps {
  onSelectCategory: (categoryKey: string) => void;
  error: string | null;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelectCategory, error }) => {
  const { t } = useLanguage();
  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-4xl font-bold mb-2">{t('chooseArena')}</h2>
      <p className="text-lg text-slate-400 mb-8">{t('selectCategory')}</p>
      {error && <p className="bg-red-500/20 text-red-300 p-3 rounded-md mb-6">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.key}
            onClick={() => onSelectCategory(category.key)}
            className="bg-slate-800 p-6 rounded-lg text-lg font-semibold text-slate-200 hover:bg-purple-600 hover:text-white hover:scale-105 transform transition-all duration-300 shadow-md"
          >
            {t(`categories.${category.key}`)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;
