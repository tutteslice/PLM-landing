export interface LessonPhrase {
  id: string;
  bosnian: string;
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

