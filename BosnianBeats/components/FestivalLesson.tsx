import React, { useState, useRef, useMemo } from 'react';
import { LessonPhrase } from '../types';
import { speakBosnian, decodeBase64, decodeAudioData } from '../services/geminiService';

const ALL_PHRASES: LessonPhrase[] = [
  // --- Festival Original ---
  {
    id: 'f1',
    bosnian: 'Gdje je glavna pozornica?',
    phonetic: 'G-dje je glavna pozor-nit-sa?',
    english: 'Where is the main stage?',
    swedish: 'Var är huvudscenen?',
    context: 'Festival'
  },
  {
    id: 'f2',
    bosnian: 'Jednu vodu, molim.',
    phonetic: 'Jed-nu vo-du, mo-lim.',
    english: 'One water, please.',
    swedish: 'En vatten, tack.',
    context: 'Festival'
  },
  {
    id: 'f3',
    bosnian: 'Ovo je nevjerovatno!',
    phonetic: 'O-vo je nev-je-ro-vat-no!',
    english: 'This is incredible!',
    swedish: 'Detta är otroligt!',
    context: 'Festival'
  },
  {
    id: 'f4',
    bosnian: 'Izgubio sam prijatelje.',
    phonetic: 'Iz-gu-bi-o sam pri-ja-telje.',
    english: 'I lost my friends.',
    swedish: 'Jag tappade bort mina vänner.',
    context: 'Festival'
  },
  {
    id: 'f5',
    bosnian: 'Hoćemo li plesati?',
    phonetic: 'Ho-tjem-o lji ple-sa-ti?',
    english: 'Shall we dance?',
    swedish: 'Ska vi dansa?',
    context: 'Festival'
  },
  {
    id: 'f6',
    bosnian: 'Kada svira ovaj DJ?',
    phonetic: 'Ka-da svi-ra o-vaj di-džej?',
    english: 'When is this DJ playing?',
    swedish: 'När spelar den här DJ:n?',
    context: 'Festival'
  },
  // --- House Party ---
  {
    id: 'h1',
    bosnian: 'Gdje mogu ostaviti jaknu?',
    phonetic: 'G-dje mo-gu os-ta-vi-ti jak-nu?',
    english: 'Where can I leave my jacket?',
    swedish: 'Var kan jag lämna min jacka?',
    context: 'House Party'
  },
  {
    id: 'h2',
    bosnian: 'Super ti je stan!',
    phonetic: 'Su-per ti je stan!',
    english: 'Your apartment is great!',
    swedish: 'Din lägenhet är jättefin!',
    context: 'House Party'
  },
  {
    id: 'h3',
    bosnian: 'Imate li leda?',
    phonetic: 'I-ma-te lji lje-da?',
    english: 'Do you have any ice?',
    swedish: 'Har ni is?',
    context: 'House Party'
  },
  {
    id: 'h4',
    bosnian: 'Ko je zadužen za muziku?',
    phonetic: 'Ko je za-du-zjen za mu-zi-ku?',
    english: 'Who is in charge of the music?',
    swedish: 'Vem ansvarar för musiken?',
    context: 'House Party'
  },
  {
    id: 'h5',
    bosnian: 'Mogu li napuniti telefon?',
    phonetic: 'Mo-gu lji na-pu-ni-ti te-le-fon?',
    english: 'Can I charge my phone?',
    swedish: 'Kan jag ladda min mobil?',
    context: 'House Party'
  },
  {
    id: 'h6',
    bosnian: 'Hoćemo li naručiti pizzu?',
    phonetic: 'Ho-tjem-o lji na-ru-tji-ti pit-su?',
    english: 'Shall we order pizza?',
    swedish: 'Ska vi beställa pizza?',
    context: 'House Party'
  },
  // --- Rave ---
  {
    id: 'r1',
    bosnian: 'Bas je prejak!',
    phonetic: 'Bas je pre-jak!',
    english: 'The bass is so strong!',
    swedish: 'Basen är så stark!',
    context: 'Rave'
  },
  {
    id: 'r2',
    bosnian: 'Gdje je after?',
    phonetic: 'G-dje je af-ter?',
    english: 'Where is the afterparty?',
    swedish: 'Var är efterfesten?',
    context: 'Rave'
  },
  {
    id: 'r3',
    bosnian: 'Imaš li žvaku?',
    phonetic: 'I-masj lji zjva-ku?',
    english: 'Do you have a chewing gum?',
    swedish: 'Har du ett tuggummi?',
    context: 'Rave'
  },
  {
    id: 'r4',
    bosnian: 'Idemo u prve redove!',
    phonetic: 'I-dem-o u pr-ve re-do-ve!',
    english: "Let's go to the front rows!",
    swedish: 'Vi går till de främsta raderna!',
    context: 'Rave'
  },
  {
    id: 'r5',
    bosnian: 'Sviđaju mi se tvoje naočale.',
    phonetic: 'Svi-dja-ju mi se tvo-je na-o-tja-lje.',
    english: 'I like your glasses.',
    swedish: 'Jag gillar dina glasögon.',
    context: 'Rave'
  },
  {
    id: 'r6',
    bosnian: 'Ovaj beat je lud!',
    phonetic: 'O-vaj bit je lud!',
    english: 'This beat is crazy!',
    swedish: 'Detta beat är galet!',
    context: 'Rave'
  }
];

const FestivalLesson: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const audioContextRef = useRef<AudioContext | null>(null);

  const categories = ['All', 'Festival', 'House Party', 'Rave'];

  const filteredPhrases = useMemo(() => {
    if (activeCategory === 'All') return ALL_PHRASES;
    return ALL_PHRASES.filter(p => p.context === activeCategory);
  }, [activeCategory]);

  const playPhrase = async (phrase: LessonPhrase) => {
    if (playingId) return;
    
    setPlayingId(phrase.id);
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const ctx = audioContextRef.current;
      const base64Audio = await speakBosnian(phrase.bosnian);
      
      if (base64Audio) {
        const bytes = decodeBase64(base64Audio);
        const buffer = await decodeAudioData(bytes, ctx);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setPlayingId(null);
        source.start(0);
      } else {
        setPlayingId(null);
      }
    } catch (error) {
      console.error(error);
      setPlayingId(null);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-4xl font-black text-white mb-2 tracking-tight">PARTY SURVIVAL GUIDE</h2>
        <p className="text-slate-400 max-w-md">Essential phrases for Bosnia's world-class dance music scene.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeCategory === cat
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.map((phrase) => (
          <div 
            key={phrase.id} 
            className="group relative bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl hover:border-purple-500/50 hover:bg-slate-800/60 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${
                phrase.context === 'Rave' ? 'bg-pink-500/10 text-pink-400' :
                phrase.context === 'House Party' ? 'bg-blue-500/10 text-blue-400' :
                'bg-purple-500/10 text-purple-400'
              }`}>
                {phrase.context}
              </span>
              <button
                onClick={() => playPhrase(phrase)}
                className={`p-2 rounded-full transition-all ${
                  playingId === phrase.id 
                    ? 'bg-purple-500 text-white animate-pulse shadow-lg' 
                    : 'bg-slate-700 text-slate-300 hover:bg-purple-500 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {phrase.bosnian}
                </p>
                <p className="text-purple-400/80 text-xs italic font-medium">
                   Uttal: {phrase.phonetic}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 text-[10px] italic">
                  EN: {phrase.english}
                </p>
                <p className="text-slate-400 text-[10px] italic">
                  SE: {phrase.swedish}
                </p>
              </div>
            </div>
            
            <div className="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
               </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FestivalLesson;

