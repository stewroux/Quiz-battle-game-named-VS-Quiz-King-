import React from 'react';
import { useLanguage } from '../i18n';

interface QuizKingAvatarProps {
    isThinking: boolean;
}

const CrownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.364 2.29297L20.4853 4.41421L18.364 6.53553L16.2426 4.41421L18.364 2.29297ZM12 1L14.1213 3.12132L12 5.24264L9.87868 3.12132L12 1ZM5.63604 2.29297L7.75736 4.41421L5.63604 6.53553L3.51472 4.41421L5.63604 2.29297ZM2.5 8C2.22386 8 2 8.22386 2 8.5V9.5C2 9.77614 2.22386 10 2.5 10H21.5C21.7761 10 22 9.77614 22 9.5V8.5C22 8.22386 21.7761 8 21.5 8H2.5ZM3 11V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V11H3Z"></path>
    </svg>
);


const QuizKingAvatar: React.FC<QuizKingAvatarProps> = ({ isThinking }) => {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-600">
                <CrownIcon className="w-12 h-12 text-yellow-400" />
                {isThinking && (
                    <div className="absolute inset-0 rounded-full bg-slate-900/50 flex items-center justify-center animate-pulse">
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                    </div>
                )}
            </div>
            {isThinking && <p className="mt-2 text-sm text-slate-400 font-semibold animate-pulse">{t('thinking')}</p>}
        </div>
    );
};

export default QuizKingAvatar;
