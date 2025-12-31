// Simplified App component for PLM integration
import React, { useState } from 'react';
import Translator from './components/Translator';
import FestivalLesson from './components/FestivalLesson';

type View = 'translator' | 'lesson';

const BosnianBeatsApp: React.FC = () => {
  const [view, setView] = useState<View>('translator');

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 shadow-xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" title="Back to Private Lives Matter">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl shadow-lg">
                BA
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter text-white">BOSNIAN BEATS</h1>
                <p className="text-xs text-white/60">← Click to return to PLM</p>
              </div>
            </a>
          </div>

          <nav className="flex gap-2 bg-black/20 p-1 rounded-full backdrop-blur-md">
            <button
              onClick={() => setView('translator')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                view === 'translator'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              Translator
            </button>
            <button
              onClick={() => setView('lesson')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                view === 'lesson'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              Festival Guide
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="transition-all duration-500 ease-in-out">
          {view === 'translator' ? <Translator /> : <FestivalLesson />}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-800">
        <p>© 2024 Bosnian Beats • Built for the dancefloor</p>
        <p className="mt-3">
          <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 rounded-full transition-all font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Private Lives Matter
          </a>
        </p>
      </footer>
    </div>
  );
};

export default BosnianBeatsApp;

