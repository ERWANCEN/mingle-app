import React from 'react';

const ActivityInfosPage = ({ event, onBack, onReserve, isConfirmed, onCloseConfirmation, onAccessGroup }) => {
  if (!event) return null;

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F1F3F9] font-sans relative overflow-hidden">
      
      {/* --- HEADER --- */}
      <div className="w-full flex-shrink-0 z-20 pb-2">

        <div className="flex justify-between items-center px-6 mt-2">
          <button onClick={onBack} className="p-2 -ml-2 text-[#D1466F] active:scale-95 transition-transform">
            <img src="/fleche-retour.svg" alt="Retour" className="w-4 h-4" />
          </button>
          <button className="p-2 -mr-2 text-[#D1466F] active:scale-95 transition-transform">
            <img src="/fleche-export.svg" alt="Exporter" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* --- CONTENU --- */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="relative w-full h-56 rounded-3xl overflow-hidden mb-5 shadow-sm">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 bg-[#D1466F]/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-br-2xl">
            {event.category === 'Concerts' ? 'Musique' : event.category}
          </div>
        </div>

        <div className="flex justify-between items-start mb-1">
          <h1 className="text-xl font-bold text-gray-900 leading-tight w-2/3">{event.title}</h1>
          <span className="text-[#D1466F] font-bold text-lg">{event.price}</span>
        </div>
        
        <p className="text-sm text-gray-500 mb-6">
          Par <span className="font-bold text-gray-900">{event.details?.organizer || event.location}</span>
        </p>

        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-start gap-3 text-sm font-semibold text-gray-800">
            <svg className="w-4 h-4 text-[#D1466F] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
            <p>Le {event.details?.dateDay} <span className="text-[#D1466F]">{event.details?.dateHighlight}</span> de <span className="text-[#D1466F]">{event.details?.timeRange}</span></p>
          </div>
          <div className="flex items-start gap-3 text-sm font-semibold text-gray-800 leading-snug">
            <svg className="w-4 h-4 text-[#D1466F] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <p>{event.details?.fullAddress}</p>
          </div>
          <div className="flex items-start gap-3 text-sm font-semibold text-gray-800">
            <svg className="w-4 h-4 text-[#D1466F] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            <p>Groupe de <span className="text-[#D1466F]">{event.details?.groupSize} personnes</span></p>
          </div>
        </div>

        {event.details?.genres && (
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Genres</h3>
            <div className="flex gap-2">
              {event.details.genres.map((genre, index) => (
                <span key={index} className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${genre.style}`}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- BOUTON RÉSERVER --- */}
      <div className="absolute bottom-17 w-full px-8 pb-8 pt-10 bg-gradient-to-t from-[#F1F3F9] via-[#F1F3F9] to-transparent z-30">
        <button 
          onClick={onReserve}
          className="w-full bg-[#D1466F] text-white py-4 rounded-full font-bold text-base shadow-md active:scale-95 transition-transform"
        >
          Réserver
        </button>
      </div>

      {/* ========================================= */}
      {/* --- MODALE DE CONFIRMATION --- */}
      {/* ========================================= */}
      {isConfirmed && (
        <div className="absolute inset-0 z-50 flex items-center justify-center px-6">
          
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1.5px]" onClick={onCloseConfirmation}></div>

          <div className="relative bg-[#F4F6FB] w-full max-w-[320px] rounded-[32px] p-6 pb-8 flex flex-col items-center text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-200">
            
            <button onClick={onCloseConfirmation} className="absolute top-5 right-5 text-black font-extrabold active:scale-90 transition-transform">
              <img src="/croix.svg" alt="Fermer la fenêtre" className="w-3 h-3" />
            </button>

            {/* --- LOGO DE VALIDATION ANIMÉ --- */}
            <div className="w-20 h-20 mb-5 mt-2 flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 100 100">
                {/* Cercle extérieur qui se construit à 360° */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  stroke="#D1466F" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeLinecap="round"
                  className="animate-draw-circle"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
                {/* Le "Check" (OK) qui se dessine */}
                <path 
                  d="M30 50 L45 65 L70 35" 
                  stroke="#D1466F" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="animate-draw-check"
                />
              </svg>
            </div>

            <h2 className="text-[16px] font-bold text-gray-900 leading-snug mb-6 px-2">
              Votre réservation est terminée.<br/>Rejoignez votre groupe !
            </h2>

            <button 
              onClick={onAccessGroup} 
              className="w-full bg-[#D1466F] text-white py-3.5 rounded-full font-bold text-[15px] shadow-sm active:scale-95 transition-transform"
            >
              Accéder au groupe
            </button>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default ActivityInfosPage;