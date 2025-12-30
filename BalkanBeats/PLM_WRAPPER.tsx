/**
 * Croatian Beats Wrapper Component for PLM Integration
 * 
 * This component wraps the Croatian Beats functionality for easy integration
 * into the Private Lives Matter website.
 * 
 * Usage in PLM:
 * 1. Copy this file to PLM-landing/src/tools/croatian-beats/CroatianBeatsWrapper.tsx
 * 2. Copy Translator.tsx and FestivalLesson.tsx to the same directory
 * 3. Copy geminiService.ts to PLM-landing/src/services/
 * 4. Import and use: <CroatianBeatsWrapper />
 */

import React, { useState } from 'react';
import Translator from './components/Translator';
import FestivalLesson from './components/FestivalLesson';

type CroatianBeatsView = 'translator' | 'lesson';

interface CroatianBeatsWrapperProps {
  /**
   * Optional: Custom styling class name
   */
  className?: string;
  
  /**
   * Optional: Show navigation tabs (default: true)
   */
  showNavigation?: boolean;
  
  /**
   * Optional: Initial view (default: 'translator')
   */
  initialView?: CroatianBeatsView;
}

const CroatianBeatsWrapper: React.FC<CroatianBeatsWrapperProps> = ({
  className = '',
  showNavigation = true,
  initialView = 'translator'
}) => {
  const [view, setView] = useState<CroatianBeatsView>(initialView);

  return (
    <div className={`croatian-beats-wrapper ${className}`}>
      {showNavigation && (
        <div className="cb-navigation mb-6 flex gap-2 bg-slate-800/50 p-1 rounded-full backdrop-blur-sm">
          <button
            onClick={() => setView('translator')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              view === 'translator'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            Translator
          </button>
          <button
            onClick={() => setView('lesson')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              view === 'lesson'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            Festival Guide
          </button>
        </div>
      )}

      <div className="cb-content">
        {view === 'translator' ? <Translator /> : <FestivalLesson />}
      </div>
    </div>
  );
};

export default CroatianBeatsWrapper;

/**
 * Example usage in PLM:
 * 
 * // In your PLM router/page component:
 * import CroatianBeatsWrapper from './tools/croatian-beats/CroatianBeatsWrapper';
 * 
 * function CroatianBeatsPage() {
 *   return (
 *     <div className="plm-page-container">
 *       <h1>Croatian Beats</h1>
 *       <p>Your essential Croatian translation tool</p>
 *       <CroatianBeatsWrapper />
 *     </div>
 *   );
 * }
 */

