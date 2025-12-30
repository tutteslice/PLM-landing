
import React, { useState, useRef, useEffect } from 'react';
import { 
  translateToCroatian, 
  speakCroatian, 
  decodeBase64, 
  decodeAudioData, 
  connectLiveTranscription,
  createAudioBlob,
  TranslationResponse
} from '../services/geminiService';

type TranslationMode = 'natural' | 'formal' | 'literal';

const Translator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<TranslationResponse | null>(null);
  const [activeMode, setActiveMode] = useState<TranslationMode>('natural');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentlyPlayingText, setCurrentlyPlayingText] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const debounceTimerRef = useRef<any>(null);
  const liveSessionRef = useRef<any>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!inputText.trim()) {
      setResults(null);
      setIsTranslating(false);
      return;
    }

    setIsTranslating(true);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const result = await translateToCroatian(inputText);
        setResults(result);
      } catch (error) {
        console.error("Translation error:", error);
      } finally {
        setIsTranslating(false);
      }
    }, 800);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputText]);

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    // Live transcription is not available via Cloudflare Functions
    // Show a helpful message to the user
    alert("Live voice transcription is not available in this deployment. Please type your text instead.");
    return;

    // Original code kept for reference (commented out)
    /*
    setInputText('');
    setResults(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      inputAudioContextRef.current = inputCtx;

      const sessionPromise = connectLiveTranscription(
        (text) => {
          setInputText(prev => prev + (prev ? ' ' : '') + text);
        },
        () => {
          setIsRecording(true);
          const source = inputCtx.createMediaStreamSource(stream);
          const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (event) => {
            const inputData = event.inputBuffer.getChannelData(0);
            const pcmBlob = createAudioBlob(inputData);
            sessionPromise.then(session => {
              session.sendRealtimeInput({ media: pcmBlob });
            });
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputCtx.destination);
          (window as any)._scriptNode = scriptProcessor;
        },
        () => {
          setIsRecording(false);
        }
      );

      liveSessionRef.current = sessionPromise;
    } catch (err) {
      console.error("Mic error:", err);
      alert("Could not access microphone.");
    }
    */
  };

  const stopRecording = () => {
    if (liveSessionRef.current) {
      liveSessionRef.current.then((session: any) => session.close());
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
    }
    setIsRecording(false);
  };

  const playAudio = async (textToSpeak: string) => {
    if (!textToSpeak || isSpeaking) return;

    setIsSpeaking(true);
    setCurrentlyPlayingText(textToSpeak);
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const ctx = audioContextRef.current;
      const base64Audio = await speakCroatian(textToSpeak);
      
      if (base64Audio) {
        const bytes = decodeBase64(base64Audio);
        const buffer = await decodeAudioData(bytes, ctx);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => {
          setIsSpeaking(false);
          setCurrentlyPlayingText(null);
        };
        source.start(0);
      } else {
        setIsSpeaking(false);
        setCurrentlyPlayingText(null);
      }
    } catch (error) {
      console.error("Audio error:", error);
      setIsSpeaking(false);
      setCurrentlyPlayingText(null);
    }
  };

  const activeTranslation = results ? results[activeMode] : null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col gap-6">
          {/* Input Area */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                English or Swedish
              </label>
              <div className="flex items-center gap-3">
                {isRecording && (
                  <div className="flex items-center gap-2 text-red-400 text-xs font-bold animate-pulse">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    LISTENING...
                  </div>
                )}
                {isTranslating && (
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-bold animate-pulse">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                    TRANSLATING...
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <textarea
                className={`w-full bg-slate-900 border rounded-2xl p-4 pr-16 text-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none min-h-[120px] transition-all ${
                  isTranslating ? 'border-purple-500/50' : 'border-slate-700'
                }`}
                placeholder="Start typing or use voice..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                onClick={toggleRecording}
                className={`absolute right-4 top-4 p-3 rounded-full transition-all shadow-lg opacity-50 cursor-not-allowed ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-slate-800 text-slate-400'
                }`}
                title="Voice input not available (requires WebSocket support)"
                disabled
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 013 3v8a3 3 0 01-6 0V7a3 3 0 013-3z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Result Area */}
          <div className={`space-y-4 transition-all duration-500 ${inputText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
            <div className="flex justify-between items-center ml-1">
              <label className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                Croatian
              </label>
              
              {/* Toggles */}
              {results && !isTranslating && (
                <div className="flex bg-slate-900/80 p-1 rounded-lg border border-slate-700">
                  {(['natural', 'formal', 'literal'] as TranslationMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setActiveMode(mode)}
                      className={`px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded transition-all ${
                        activeMode === mode 
                          ? 'bg-purple-500 text-white shadow-lg' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div className={`w-full bg-slate-900 border-2 rounded-2xl p-6 min-h-[120px] flex flex-col justify-center shadow-inner transition-colors ${
                isTranslating ? 'border-purple-500/20 opacity-50' : 'border-purple-500/30 opacity-100'
              }`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded uppercase font-bold tracking-widest">
                        {activeMode}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-white leading-tight">
                      {activeTranslation?.text || (isTranslating ? '...' : '')}
                    </p>
                    {activeTranslation?.phonetic && !isTranslating && (
                      <p className="text-purple-400/80 text-sm italic font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 005.93 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                        </svg>
                        Uttal: {activeTranslation.phonetic}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2 shrink-0 self-end">
                    {activeTranslation && !isTranslating && (
                      <button
                        onClick={() => playAudio(activeTranslation.text)}
                        disabled={isSpeaking}
                        className={`p-4 rounded-full transition-all transform active:scale-95 ${
                          isSpeaking && currentlyPlayingText === activeTranslation.text
                            ? 'bg-purple-500 text-white animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
                            : 'bg-slate-800 text-purple-400 hover:bg-purple-500 hover:text-white shadow-lg border border-slate-700'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/10 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-slate-300 font-semibold">Smart Translation</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <p className="text-slate-400"><strong className="text-purple-400 uppercase text-[10px] tracking-widest block">Natural</strong> This is the default. It's how people actually talk at Pag, Ultra, or a house party.</p>
          </div>
          <div className="space-y-2">
            <p className="text-slate-400"><strong className="text-blue-400 uppercase text-[10px] tracking-widest block">Formal vs Literal</strong> Switch to see how to be polite or how the words translate directly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;
