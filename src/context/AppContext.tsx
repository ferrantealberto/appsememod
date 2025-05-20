import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AIModel, UserProfile, Season } from '../types';

// Modello predefinito affidabile
const DEFAULT_MODEL: AIModel = {
  id: 'openai/gpt-3.5-turbo',
  name: 'gpt-3.5-turbo',
  provider: 'openai',
  description: 'Modello affidabile per generare testo.',
  strengths: ['Generazione di testo'],
  capabilities: ['Generazione di testo'],
  free: true
};

interface AppContextType {
  selectedModel: AIModel | null;
  setSelectedModel: (model: AIModel | null) => void;
  currentSeason: Season;
  setCurrentSeason: (season: Season) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  isModelSelectorOpen: boolean;
  setIsModelSelectorOpen: (isOpen: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Get current season based on month
  const getCurrentSeason = (): Season => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return Season.SPRING;
    if (month >= 5 && month <= 7) return Season.SUMMER;
    if (month >= 8 && month <= 10) return Season.FALL;
    return Season.WINTER;
  };

  const [selectedModel, setSelectedModel] = useState<AIModel | null>(DEFAULT_MODEL); // Imposta un modello predefinito
  const [currentSeason, setCurrentSeason] = useState<Season>(getCurrentSeason());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const value = {
    selectedModel,
    setSelectedModel,
    currentSeason,
    setCurrentSeason,
    userProfile,
    setUserProfile,
    isModelSelectorOpen,
    setIsModelSelectorOpen,
    isDarkMode,
    setIsDarkMode
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
