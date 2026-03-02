import React from 'react';

const WelcomePage = ({ onNavigate }) => {
  return (
    <div className="relative h-screen w-screen flex flex-col justify-between items-center bg-[#F1F3F9] font-sans overflow-hidden">
      <div className="flex-grow flex flex-col items-center justify-center w-full px-6 z-10">
        <div className="relative w-[320px] h-[320px] mb-8 flex items-center justify-center">
          <img src="/Ellipse 69.svg" alt="Halo fond" className="absolute top-[5%] left-[5%] w-[180px] h-[180px] opacity-30 blur-[65px] z-0 mix-blend-multiply" />
          <img src="/Ellipse 70.svg" alt="Halo fond" className="absolute top-[20%] right-[0%] w-[200px] h-[200px] opacity-70 blur-[70px] z-0 mix-blend-multiply" />
          <img src="/Ellipse 68.svg" alt="Halo fond" className="absolute bottom-[10%] left-[20%] w-[170px] h-[170px] opacity-80 blur-[70px] z-0 mix-blend-multiply" />
          <img src="/Calque_1.svg" alt="Groupe Mingle" className="relative z-10 w-[250px] h-auto" />
        </div>

        <h1 className="text-2xl font-bold text-center text-black mb-3 leading-tight">
          Bienvenue sur Mingle.
        </h1>
        <p className="text-base text-center text-black/80 mb-12 leading-relaxed max-w-xs">
          L’app qui te permet de faire des rencontres autour d’activités qui te correspondent vraiment.
        </p>
      </div>

      <div className="w-full px-6 pb-6 z-10 flex-shrink-0">
        <div className="flex flex-col gap-4 mb-12">
          <button 
            onClick={() => onNavigate('register')}
            className="w-full bg-[#D1466F] text-white py-4 rounded-full font-semibold text-base shadow-sm active:scale-95 transition-all"
          >
            Créer mon compte
          </button>
          
          <button 
            onClick={() => onNavigate('login')}
            className="w-full bg-[#DFEBFC] text-[#234A83] py-4 rounded-full font-semibold text-base shadow-inner border border-[#9AA5D4]/10 active:scale-95 transition-all"
          >
            Se connecter
          </button>
        </div>

        <p className="text-xs text-center text-black/60 leading-tight">
          En continuant, tu acceptes les <span className="underline cursor-pointer">Conditions d’utilisation</span> et la <span className="underline cursor-pointer">Politique de confidentialité</span>.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;