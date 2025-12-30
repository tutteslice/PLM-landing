import React from 'react';
import { AppView } from '../types';

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  view: AppView;
  icon?: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const tools: Tool[] = [
    {
      id: 'information',
      name: 'Information',
      description: 'Learn about digital rights, freedom of speech, and threats to privacy in the digital age',
      view: AppView.INFORMATION,
    },
    {
      id: 'croatian-beats',
      name: 'Croatian Beats',
      description: 'Your essential Croatian translation tool for festivals, parties, and everyday conversations',
      view: AppView.TRANSLATOR,
    },
    // More tools can be added here in the future
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(to bottom, #1e3a8a 0%, #3b82f6 30%, #8b5cf6 60%, #ec4899 100%)'
    }}>
      {/* Header */}
      <header className="w-full bg-slate-900/60 backdrop-blur-sm border-b border-slate-800/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-black text-pink-500">
              Private Lives Matter
            </div>
            <nav className="hidden md:flex gap-6 text-white">
              <button 
                onClick={() => onNavigate(AppView.LANDING)}
                className="hover:text-pink-400 transition-colors"
              >
                Tools
              </button>
              <button 
                onClick={() => onNavigate(AppView.ABOUT)}
                className="hover:text-pink-400 transition-colors"
              >
                About
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-5xl mx-auto space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-black text-pink-500 leading-tight">
              Private Lives Matter
            </h1>
            <p className="text-xl md:text-2xl text-white leading-relaxed max-w-3xl mx-auto">
              A curated collection of tools designed to empower you in your digital journey and real-world experiences. Navigate online challenges and everyday situations with confidence.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.view)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-left hover:bg-white/20 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-pink-500 group-hover:text-pink-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-pink-400 font-semibold text-sm mt-4 group-hover:text-pink-300 transition-colors">
                    Open tool
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

