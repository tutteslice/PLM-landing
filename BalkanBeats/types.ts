
export enum AppView {
  LANDING = 'LANDING',
  TRANSLATOR = 'TRANSLATOR',
  LESSON = 'LESSON',
  ABOUT = 'ABOUT',
  INFORMATION = 'INFORMATION'
}

export interface LessonPhrase {
  id: string;
  croatian: string;
  phonetic: string; // Added phonetic guide
  english: string;
  swedish: string;
  context: string;
}

export interface TranslationResult {
  translatedText: string;
  phonetic: string; // Added phonetic field
  detectedSource: string;
}
