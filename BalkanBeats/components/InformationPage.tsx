import React from 'react';

const InformationPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Digital Yttrandefrihet Under Attack
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Försvara dina digitala rättigheter och yttrandefrihet i en tid av ökande övervakning
          </p>
        </div>

        {/* Main Threats Section */}
        <div className="space-y-6">
          {/* Chat Control */}
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📱</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">Chattkontroll & Övervakning</h3>
                <p className="text-slate-300 leading-relaxed">
                  EU:s föreslagna chattkontroll-lagstiftning hotar att scanna all privat kommunikation. Detta är ett direkt angrepp på vår rätt till privat kommunikation och kan användas för att tysta oliktänkande.
                </p>
              </div>
            </div>
          </div>

          {/* Freedom of Speech */}
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🗣️</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">Yttrandefrihet Online</h3>
                <p className="text-slate-300 leading-relaxed">
                  Allt fler personer åtalas och döms för åsikter uttryckta på sociala medier. Det som en gång var skyddat som yttrandefrihet klassas nu som "hatbrott" baserat på subjektiva tolkningar.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Censorship */}
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🔐</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">Teknisk Censur</h3>
                <p className="text-slate-300 leading-relaxed">
                  Stora techföretag censurerar innehåll i samarbete med regeringar. Algoritmer och AI-system används för att automatiskt begränsa spridningen av "oönskade" åsikter.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orwell Quote */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-8 rounded-2xl border border-purple-700/50 shadow-xl backdrop-blur-sm">
          <blockquote className="text-xl md:text-2xl text-white italic text-center leading-relaxed">
            "Om du vill ha en bild av framtiden, föreställ dig en stövel som trampar på ett mänskligt ansikte - för evigt."
          </blockquote>
          <p className="text-right text-slate-400 mt-4 text-lg">— George Orwell, 1984</p>
        </div>

        {/* Real Cases Section */}
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span>⚠️</span>
            Verkliga Fall av Förföljelse
          </h2>
          
          <div className="space-y-6">
            {/* UK */}
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold text-pink-400 mb-2">Storbritannien</h3>
              <p className="text-slate-300 leading-relaxed">
                Över 3000 personer arresterades 2022 för "offensiva" inlägg på sociala medier. Många dömdes till fängelse för memes och kommentarer.
              </p>
            </div>

            {/* Germany */}
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold text-pink-400 mb-2">Tyskland</h3>
              <p className="text-slate-300 leading-relaxed">
                Hundratals husrannsakningar genomförs årligen mot personer som delat "problematiska" inlägg på Facebook och Twitter.
              </p>
            </div>

            {/* France */}
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold text-pink-400 mb-2">Frankrike</h3>
              <p className="text-slate-300 leading-relaxed">
                Lärare och journalister har dömts till fängelse för att ha uttryckt åsikter som ansetts "kränka" vissa grupper online.
              </p>
            </div>
          </div>
        </div>

        {/* Parallels to 1984 */}
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-6">Parallelerna till Orwells 1984</h2>
          
          <div className="space-y-6">
            {/* Thought Police */}
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold text-purple-400 mb-3">Tankepolisen</h3>
              <p className="text-slate-300 leading-relaxed">
                Precis som i 1984 övervakas nu våra privata tankar och uttryck genom digital spårning. AI-algoritmer analyserar våra meddelanden för "fel" åsikter.
              </p>
            </div>

            {/* Newspeak */}
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold text-purple-400 mb-3">Nytala (Newspeak)</h3>
              <p className="text-slate-300 leading-relaxed">
                Språket omdefinieras för att begränsa tankar. Ord som "hatbrott" och "felaktig information" används för att förbjuda legitima åsikter och debatt.
              </p>
            </div>

            {/* Memory Hole */}
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
              <h3 className="text-xl font-bold text-purple-400 mb-3">Minneshål</h3>
              <p className="text-slate-300 leading-relaxed">
                Sociala medieplattformar raderar historiskt innehåll och konton, vilket skapar digitala "minneshål" där obekväma sanningar försvinner.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-3xl border border-blue-700/50 shadow-2xl backdrop-blur-sm text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Håll dig informerad</h2>
          <p className="text-slate-300 mb-6 text-lg">
            Få de senaste uppdateringarna om digital integritet, yttrandefrihet och försvar av våra grundläggande rättigheter.
          </p>
          <button className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
            Prenumerera
          </button>
          <p className="text-slate-400 text-sm mt-4">
            Vi respekterar din integritet och delar aldrig din e-postadress med tredje part.
          </p>
        </div>

        {/* About Section */}
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-6">Om Private Lives Matter</h2>
          <p className="text-slate-300 leading-relaxed mb-6 text-lg">
            Private Lives Matter är en rörelse som kämpar för bevarandet av digitala rättigheter och yttrandefrihet i en tid då dessa grundläggande friheter är under konstant attack.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-pink-400 mb-3">Vårt uppdrag</h3>
              <p className="text-slate-300 leading-relaxed">
                Att informera medborgare om hoten mot digital integritet och yttrandefrihet, samt att erbjuda praktiska verktyg och kunskap för att skydda dessa rättigheter.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-pink-400 mb-3">Våra värderingar</h3>
              <p className="text-slate-300 leading-relaxed">
                Vi tror på fundamental yttrandefrihet, rätten till privat kommunikation och vikten av att ifrågasätta auktoritet när den överskrider sina befogenheter.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
            <blockquote className="text-lg text-white italic leading-relaxed">
              "De som ger upp väsentlig frihet för att få lite tillfällig säkerhet förtjänar varken frihet eller säkerhet."
            </blockquote>
            <p className="text-right text-slate-400 mt-3">— Benjamin Franklin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;

