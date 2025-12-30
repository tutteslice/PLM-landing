
import React, { useState } from 'react';
import Header from './components/Header';
import Translator from './components/Translator';
import FestivalLesson from './components/FestivalLesson';
import LandingPage from './components/LandingPage';
import InformationPage from './components/InformationPage';
import { AppView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);

  if (view === AppView.LANDING) {
    return <LandingPage onNavigate={setView} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 overflow-x-hidden">
      <Header currentView={view} onViewChange={setView} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="transition-all duration-500 ease-in-out">
          {view === AppView.INFORMATION ? (
            <InformationPage />
          ) : view === AppView.TRANSLATOR ? (
            <Translator />
          ) : view === AppView.LESSON ? (
            <FestivalLesson />
          ) : view === AppView.ABOUT ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
                <div className="flex flex-col gap-6">
                  <h2 className="text-4xl font-black text-white mb-2 tracking-tight">About Private Lives Matter</h2>
                  <div className="space-y-4 text-slate-300 leading-relaxed">
                    <p>
                      Private Lives Matter is a curated collection of tools designed to empower you in your digital journey and real-world experiences.
                    </p>
                    <p>
                      Our mission is to provide practical, accessible tools that help you navigate online challenges and everyday situations with confidence.
                    </p>
                    <p className="text-slate-400 text-sm">
                      More information coming soon...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-800">
        <p>© 2024 CroatiaBeats • Built for the dancefloor</p>
      </footer>
    </div>
  );
};

export default App;
