
import React, { useState, useCallback } from 'react';
import { GameState, QuizQuestion, Difficulty } from './types';
import { generateQuiz } from './services/geminiService';
import StartScreen from './components/StartScreen';
import CategorySelection from './components/CategorySelection';
import QuizScreen from './components/QuizScreen';
import EndScreen from './components/EndScreen';
import Loader from './components/Loader';
import { CATEGORIES } from './constants';
import { useLanguage } from './i18n';
import LanguageSwitcher from './components/LanguageSwitcher';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Settings State
  const [selectedModel, setSelectedModel] = useState<string>('gemini-2.5-flash');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.Medium);

  const { language, t } = useLanguage();

  const handleStart = () => setGameState(GameState.CategorySelection);

  const handleSelectCategory = useCallback(async (categoryKey: string) => {
    const category = CATEGORIES.find(c => c.key === categoryKey);
    if (!category) return;

    setLoading(true);
    setError(null);
    setCurrentCategory(t(`categories.${category.key}`));
    try {
      const newQuestions = await generateQuiz(category.name_en, language, selectedModel);
      if (newQuestions && newQuestions.length > 0) {
        setQuestions(newQuestions);
        setGameState(GameState.Quiz);
      } else {
        throw new Error('Failed to generate quiz questions.');
      }
    } catch (err) {
      setError(t('errorGeneratingQuiz'));
      console.error(err);
      setGameState(GameState.CategorySelection);
    } finally {
      setLoading(false);
    }
  }, [language, t, selectedModel]);

  const handleQuizComplete = (finalUserScore: number, finalAiScore: number) => {
    setUserScore(finalUserScore);
    setAiScore(finalAiScore);
    setGameState(GameState.End);
  };

  const handlePlayAgain = () => {
    setQuestions([]);
    setUserScore(0);
    setAiScore(0);
    setCurrentCategory(null);
    setError(null);
    setGameState(GameState.CategorySelection);
  };

  const renderContent = () => {
    if (loading) {
      return <Loader message={t('generatingQuiz', { category: currentCategory || '' })} />;
    }

    switch (gameState) {
      case GameState.Start:
        return (
          <StartScreen 
            onStart={handleStart} 
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
          />
        );
      case GameState.CategorySelection:
        return <CategorySelection onSelectCategory={handleSelectCategory} error={error} />;
      case GameState.Quiz:
        return (
          <QuizScreen 
            questions={questions} 
            onQuizComplete={handleQuizComplete} 
            category={currentCategory || 'Quiz'}
            modelId={selectedModel}
            difficulty={selectedDifficulty}
          />
        );
      case GameState.End:
        return <EndScreen userScore={userScore} aiScore={aiScore} totalQuestions={questions.length} onPlayAgain={handlePlayAgain} />;
      default:
        return (
          <StartScreen 
            onStart={handleStart}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
          />
        );
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center p-4 transition-colors duration-500">
      <LanguageSwitcher />
      <div className="w-full max-w-2xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
