import React from 'react';

const GroupChatPage = ({ event, onBack }) => {
  if (!event) return null;

  const groupSize = event.details?.groupSize || "8";
  const participants = Array.from({ length: 7 }).map((_, i) => `https://i.pravatar.cc/100?img=${i + 20}`);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F4F6FB] font-sans relative overflow-hidden">
      
      {/* --- HEADER ROSE --- */}
      <div className="w-full bg-[#D1466F] pt-6 pb-12 flex-shrink-0 z-0">
        <div className="flex justify-between items-center px-4 mt-2 mb-4 text-white">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 active:scale-90 transition-transform">
              <img src="/fleche-retour.svg" className="w-4 h-4" alt="Retour" />
            </button>
            <div className="flex items-center gap-2">
              <span className="border border-white/40 bg-white/10 px-3 py-1 rounded-full text-[10px] font-medium tracking-wide">Musique</span>
              <h1 className="font-bold text-lg leading-none">{event.title}</h1>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-[10px]">
            <img src="/information.svg" className="w-4 h-4" alt="information" />
          </div>
        </div>

        <div className="flex items-center pl-8">
          <div className="flex -space-x-3 mr-3">
            {participants.map((avatar, index) => (
              <div key={index} className="w-8 h-8 rounded-full border-2 border-[#D1466F] overflow-hidden bg-gray-200 shadow-sm">
                <img src={avatar} alt="p" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span className="text-white/90 text-xs font-semibold">{groupSize} personnes</span>
        </div>
      </div>

      {/* --- ZONE DE CHAT SCROLLABLE --- */}
      <div className="flex-1 bg-[#F4F6FB] rounded-t-[32px] -mt-6 z-10 flex flex-col shadow-2xl overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-48 flex flex-col gap-6">
          
          <div className="w-full text-center"><span className="text-[11px] font-bold text-gray-400">14/02</span></div>

          <div className="relative w-full max-w-[85%] self-start">
            <div className="bg-[#DF6982] text-white p-4 rounded-2xl rounded-bl-none shadow-sm">
              <p className="text-[10px] text-white/70 mb-2 font-bold uppercase tracking-wider">Mingle 14h38</p>
              <p className="text-[13px] leading-relaxed font-medium">
                Bienvenue dans le groupe 🫡 <br/>
                N’hésitez pas à échanger et commencez à faire connaissance 😉 <br/><br/>
                Un sujet de discussion vous sera proposé 48h avant l’évènement 🥳
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-[85%] self-start">
            <div className="bg-[#DF6982] text-white p-4 rounded-2xl rounded-bl-none shadow-sm">
              <p className="text-[10px] text-white/70 mb-2 font-bold uppercase tracking-wider">Lana 16h25</p>
              <p className="text-[13px] leading-relaxed font-medium">
                Hello, moi c'est Lana. J'ai 21 ans et j'étudie le droit 🫡
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-[85%] self-start">
            <div className="bg-[#DF6982] text-white p-4 rounded-2xl rounded-bl-none shadow-sm">
              <p className="text-[10px] text-white/70 mb-2 font-bold uppercase tracking-wider">Eliott 16h28</p>
              <p className="text-[13px] leading-relaxed font-medium">
                Moi c'est Eliott, j'ai 19 ans, je suis en licence de lettres :)
              </p>
            </div>
          </div>

          <div className="w-full text-center mt-4"><span className="text-[11px] font-bold text-gray-400">22/02</span></div>

          <div className="relative w-full max-w-[85%] self-start">
            <div className="bg-[#DF6982] text-white p-4 rounded-2xl rounded-bl-none shadow-sm">
              <p className="text-[10px] text-white/70 mb-2 font-bold uppercase tracking-wider">Mingle 09h34</p>
              <p className="text-[13px] leading-relaxed font-medium">
                Plus que 48h avant le concert 😁 <br/>
                Mingle a préparé pour vous un sujet inspirant pour lancer les échanges et créer le lien dès votre arrivée ! <br/><br/>
                🤔 Quelle est la musique avec laquelle tu as découvert Ino Casablanca ?
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* --- BARRE D'ÉCRITURE FIXÉE --- */}
      <div className="absolute bottom-17 w-full px-6 pb-8 pt-3 bg-[#F4F6FB] z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <div className="w-full bg-[#E3E6EE] rounded-xl px-4 py-3.5 flex items-center shadow-sm">
          <input 
            type="text" 
            placeholder="Écrire un message" 
            className="w-full bg-transparent text-gray-800 placeholder-gray-500 font-medium text-sm outline-none" 
          />
        </div>
      </div>

    </div>
  );
};

export default GroupChatPage;