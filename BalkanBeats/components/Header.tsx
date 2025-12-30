
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const getHeaderTitle = () => {
    if (currentView === AppView.TRANSLATOR || currentView === AppView.LESSON) {
      return 'CROATIAN BEATS';
    }
    return 'PRIVATE LIVES MATTER';
  };

  const getHeaderLogo = () => {
    if (currentView === AppView.TRANSLATOR || currentView === AppView.LESSON) {
      return 'HR';
    }
    return 'PLM';
  };

  const handleLogoClick = () => {
    if (currentView === AppView.TRANSLATOR || currentView === AppView.LESSON) {
      onViewChange(AppView.LANDING);
    } else {
      onViewChange(AppView.LANDING);
    }
  };

  return (
    <header className="sticky top-0 z-50 festival-gradient p-4 shadow-xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick}>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-xl shadow-lg">
            {getHeaderLogo()}
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white">{getHeaderTitle()}</h1>
        </div>

        <nav className="flex gap-2 bg-black/20 p-1 rounded-full backdrop-blur-md">
          <button
            onClick={() => onViewChange(AppView.LANDING)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              currentView === AppView.LANDING 
                ? 'bg-white text-purple-600 shadow-md' 
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            Tools
          </button>
          <button
            onClick={() => onViewChange(AppView.ABOUT)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              currentView === AppView.ABOUT 
                ? 'bg-white text-purple-600 shadow-md' 
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            About
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
