import React, { useState } from 'react';

const AVAILABLE_GROUPS = [
  { id: 1, name: 'Groupe A', membersCount: 5, max: 8, members: [{ name: 'Lina', age: 22, avatar: 'https://i.pravatar.cc/100?img=1' }, { name: 'Karim', age: 24, avatar: 'https://i.pravatar.cc/100?img=2' }, { name: 'Sophie', age: 21, avatar: 'https://i.pravatar.cc/100?img=3' }, { name: 'Marc', age: 23, avatar: 'https://i.pravatar.cc/100?img=4' }, { name: 'Emma', age: 22, avatar: 'https://i.pravatar.cc/100?img=5' }] },
  { id: 2, name: 'Groupe B', membersCount: 3, max: 8, members: [{ name: 'Thomas', age: 25, avatar: 'https://i.pravatar.cc/100?img=6' }, { name: 'Chloé', age: 23, avatar: 'https://i.pravatar.cc/100?img=7' }, { name: 'Lucas', age: 24, avatar: 'https://i.pravatar.cc/100?img=8' }] },
  { id: 3, name: 'Groupe C', membersCount: 7, max: 8, members: [{ name: 'Alice', age: 22, avatar: 'https://i.pravatar.cc/100?img=9' }, { name: 'Hugo', age: 26, avatar: 'https://i.pravatar.cc/100?img=10' }, { name: 'Léa', age: 21, avatar: 'https://i.pravatar.cc/100?img=11' }, { name: 'Paul', age: 24, avatar: 'https://i.pravatar.cc/100?img=12' }, { name: 'Clara', age: 23, avatar: 'https://i.pravatar.cc/100?img=13' }, { name: 'Antoine', age: 25, avatar: 'https://i.pravatar.cc/100?img=14' }, { name: 'Manon', age: 22, avatar: 'https://i.pravatar.cc/100?img=15' }] },
];

const ActivitySummaryPage = ({ event, onBack, onConfirmPayment }) => {
  const [isApplePayOpen, setIsApplePayOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  if (!event) return null;

  const basePrice = parseFloat(event.price.replace('€', ''));
  const totalPrice = (basePrice + 0.99).toFixed(2).replace('.', ',');
  const isReadyToPay = selectedGroupId !== null;

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F1F3F9] font-sans relative overflow-hidden">
      <div className="w-full flex-shrink-0 z-20 pb-2">
        <div className="flex justify-between items-center px-6 mt-2">
          <button onClick={onBack} className="p-2 -ml-2 active:scale-95 transition-transform"><img src="/fleche-retour.svg" alt="Retour" className="w-4 h-4" /></button>
          <button className="p-2 -mr-2 active:scale-95 transition-transform"><img src="/fleche-export.svg" alt="Exporter" className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-80">
        <h1 className="text-lg font-bold text-gray-900 mb-6">Résumé de l'activité</h1>
        
        {/* Infos Event */}
        <div className="flex bg-white rounded-2xl p-3 shadow-sm gap-4 mb-8">
          <div className="w-28 h-20 rounded-xl overflow-hidden flex-shrink-0"><img src={event.image} alt={event.title} className="w-full h-full object-cover" /></div>
          <div className="flex flex-col justify-center flex-1">
            <h3 className="font-bold text-gray-900 text-sm">{event.title}</h3>
            <span className="text-[#D1466F] font-bold text-sm">{event.price}</span>
            <div className="text-[10px] text-gray-400 font-medium">E-billet +0.99€</div>
          </div>
        </div>

        <h2 className="text-sm font-bold text-gray-800 mb-4">Choisissez votre groupe</h2>
        <div className="flex flex-col gap-3">
          {AVAILABLE_GROUPS.map((group) => {
            const isSelected = selectedGroupId === group.id;
            return (
              <div key={group.id} onClick={() => setSelectedGroupId(isSelected ? null : group.id)} className={`flex flex-col bg-white rounded-2xl cursor-pointer border-2 transition-all overflow-hidden ${isSelected ? 'border-[#D1466F] shadow-md' : 'border-transparent'}`}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex flex-col gap-1"><span className="font-bold text-sm text-gray-900">{group.name}</span><span className="text-xs text-gray-500">{group.membersCount}/{group.max} participants</span></div>
                  <div className="flex items-center gap-3"><div className="flex -space-x-2">{group.members.slice(0, 3).map((m, i) => (<img key={i} src={m.avatar} className="w-7 h-7 rounded-full border-2 border-white object-cover" alt="avatar" />))}</div><span className={`text-[#D1466F] text-xs transition-transform ${isSelected ? 'rotate-180' : ''}`}>▼</span></div>
                </div>
                {isSelected && (
                  <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                    <div className="flex flex-col gap-3 my-2">
                      {group.members.map((member, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3"><img src={member.avatar} className="w-8 h-8 rounded-full object-cover shadow-sm" /><span className="text-sm font-semibold text-gray-700">{member.name}</span></div>
                          <span className="text-xs text-gray-400">{member.age} ans</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- BOUTONS FIXES --- */}
      <div className="absolute bottom-17 w-full px-6 pb-8 pt-4 bg-[#F1F3F9] z-30 flex flex-col gap-3 shadow-[0_-20px_20px_rgba(241,243,249,0.9)]">
        <button disabled={!isReadyToPay} className={`w-full bg-[#E3E6EE] py-4 rounded-xl font-semibold text-base flex justify-center items-center gap-3 transition-all ${isReadyToPay ? 'text-gray-800 active:scale-95' : 'text-gray-400 opacity-50'}`}><img src="/carte.svg" className="h-5" /> Carte</button>
        <button onClick={() => isReadyToPay && setIsApplePayOpen(true)} disabled={!isReadyToPay} className={`w-full bg-black py-4 rounded-xl flex justify-center items-center transition-all ${isReadyToPay ? 'active:scale-95' : 'bg-gray-300 opacity-50'}`}><img src="/apple-pay.svg" className="h-5" /></button>
        <button disabled={!isReadyToPay} className={`w-full bg-black py-4 rounded-xl text-white font-semibold flex justify-center items-center gap-1.5 transition-all ${isReadyToPay ? 'active:scale-95' : 'bg-gray-300 opacity-50'}`}>Payer avec <img src="/google-pay.svg" className="h-4" /></button>
      </div>

      {/* ========================================= */}
      {/* --- MODALE APPLE PAY (MAQUETTE CORRIGÉE) --- */}
      {/* ========================================= */}
      {isApplePayOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsApplePayOpen(false)}></div>
          
          <div className="absolute right-0 top-[20%] flex items-center pr-2 text-white animate-pulse">
            <span className="text-[13px] mr-3 text-right font-medium leading-tight">Appuyez deux fois<br/>pour payer</span>
            <div className="w-1.5 h-20 bg-white rounded-full"></div>
          </div>

          <div className="relative bg-[#1C1C1E] w-full rounded-t-3xl p-6 pb-8 shadow-2xl flex flex-col text-white transform transition-transform duration-300 bottom-17">
            
            {/* Header avec Logo et Croix */}
            <div className="flex justify-between items-center mb-6">
              <img src="/apple-pay.svg" alt="Apple Logo" className="h-5" />
              <button onClick={() => setIsApplePayOpen(false)} className="bg-[#2C2C2E] text-gray-400 rounded-full w-7 h-7 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Bloc Carte Bancaire */}
            <div className="bg-[#2C2C2E] rounded-2xl p-4 mb-3 flex items-center gap-4">
              <div className="w-10 h-6 bg-gradient-to-br from-yellow-100 via-yellow-400 to-orange-400 rounded-sm"></div>
              <span className="font-medium text-[15px]">Gold Crédit Agricole (•••• 1234)</span>
            </div>

            {/* NOUVEAU : Bloc Changer de mode de paiement */}
            <div className="bg-[#2C2C2E] rounded-2xl p-4 mb-3 flex justify-between items-center text-[15px] font-medium group active:bg-[#3A3A3C] transition-colors">
              <span className="text-gray-100">Changer de mode de paiement</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>

            {/* Bloc Résumé Panier (Optimisé selon maquette) */}
            <div className="bg-[#2C2C2E] rounded-2xl p-4 mb-8">
              <p className="font-medium text-[15px] text-gray-300 mb-1">{event.title}</p>
              <p className="mb-1">{totalPrice}€</p>
              <p className="text-gray-400 text-[13px] mb-4 font-medium">Prélèvement ponctuel</p>
              
              {/* Ligne de séparation */}
              <div className="h-[1px] bg-white/10 w-full mb-4"></div>
              
              <p className="text-gray-400 text-[13px] font-medium">Compte : lina.ms@icloud.com</p>
            </div>

            {/* Bouton de confirmation */}
            <div 
              className="flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
              onClick={onConfirmPayment}
            >
              <div className="w-12 h-12 border-2 border-blue-500 rounded-full flex items-center justify-center p-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <p className="text-xs font-medium">Confirmer avec le bouton latéral</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitySummaryPage;