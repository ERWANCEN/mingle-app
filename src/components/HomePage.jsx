import React, { useState } from 'react';

// === DONNÉES EN DUR (Catégories alignées avec les filtres) ===
const EVENTS = [
  {
    id: 1,
    title: 'Ino Casablanca',
    location: 'La Cigale',
    price: '19.99€',
    date: '24/02 — 20h',
    category: 'Concerts', 
    image: '/ino-casablanca.png',
    details: {
      organizer: 'La Cigale',
      dateDay: 'mardi',
      dateHighlight: '24 février',
      timeRange: '20:00 à 22:30',
      fullAddress: '120 Boulevard Marguerite de Rochechouart, 75018 Paris, France',
      groupSize: '8',
      genres: [
        { name: 'Rap', style: 'bg-[#D1466F] text-white' },
        { name: 'Hip-hop', style: 'bg-[#FFF0A8] text-gray-900' }
      ]
    }
  },
  {
    id: 2,
    title: 'We Love Green - Pass Jour 1',
    location: 'Bois de Vincennes',
    price: '74€',
    date: '05/06 — 14h',
    category: 'Festivals',
    image: '/we-love-green.png',
  },
  {
    id: 3,
    title: 'Marty Supreme',
    location: 'mk2 Bibliothèque',
    price: '9€',
    date: '06/03 — 18h30',
    category: 'Cinéma',
    image: '/marty-supreme.png',
  },
  {
    id: 4,
    title: 'Alechinsky, Balzac, Picasso...',
    location: 'Maison de Balzac',
    price: '9€',
    date: '20/11 — 13h30',
    category: 'Musée',
    image: '/alechinsky.png',
  },
  {
    id: 5,
    title: 'Atelier tufting : création de tapis',
    location: 'Tufting Studio',
    price: '153€',
    date: '01/03 — 14h',
    category: 'Musée',
    image: '/atelier-tufting.png',
  },
  {
    id: 6,
    title: 'The Last Dinner Party',
    location: 'Zénith Paris La Villette',
    price: '29€',
    date: '25/02 — 20h',
    category: 'Concerts',
    image: '/the-last-dinner-party.png',
  },
  {
    id: 7,
    title: 'sombr',
    location: 'Salle Pleyel',
    price: '32€',
    date: '01/03 — 20h',
    category: 'Concerts',
    image: '/sombr.png',
  },
  {
    id: 8,
    title: 'Giveon',
    location: 'Adidas Arena',
    price: '45€',
    date: '14/03 — 20h',
    category: 'Concerts',
    image: '/giveon.png',
  },
  {
    id: 9,
    title: 'Renee Rapp',
    location: 'Zénith Paris La Villette',
    price: '37€',
    date: '16/03 — 20h',
    category: 'Concerts',
    image: '/renee-rapp.png',
  },
];

// === DONNÉES FILTRES ===
const FILTER_TYPES = [
  'Musée', 'Sport', 'Bars/Restau', 'Ateliers créatifs', 'Cinéma',
  'Théâtre', 'Concerts', 'Festivals', 'Activités insolites', 'Open air'
];
const FILTER_PRICES = ['<10€', '<20€', '<50€', '<200€'];

const HomePage = ({ onEventClick }) => {
  const [activeTab, setActiveTab] = useState('pour_toi');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const [bouncingItem, setBouncingItem] = useState(null);

  const triggerBounce = (id) => {
    setBouncingItem(id);
    setTimeout(() => setBouncingItem(null), 200);
  };

  const toggleFilter = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }

    setBouncingItem(item);
    setTimeout(() => setBouncingItem(null), 200);
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedPrices([]);
  };

  const filteredEvents = EVENTS.filter(event => {
    const matchType = selectedTypes.length === 0 || selectedTypes.includes(event.category);
    let matchPrice = true;
    if (selectedPrices.length > 0) {
      const eventPrice = parseFloat(event.price.replace('€', ''));
      matchPrice = selectedPrices.some(priceFilter => {
        const maxPrice = parseInt(priceFilter.replace('<', '').replace('€', ''));
        return eventPrice < maxPrice;
      });
    }
    return matchType && matchPrice;
  });

  const pinkBorderClass = "border border-[#D1466F]";

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F1F3F9] font-sans relative overflow-hidden">
      
      {/* --- HEADER FIXE --- */}
      <div className="w-full flex-shrink-0 bg-[#F1F3F9] z-20 pb-2">
        <div className="px-4 mt-2">
          <div className="flex gap-3 mb-3">
            <button 
              onClick={() => triggerBounce('btn-paris')}
              className={`flex items-center gap-1.5 border border-[#D1466F] text-[#D1466F] px-4 py-1 rounded-full text-xs font-semibold bg-transparent transition-transform ${bouncingItem === 'btn-paris' ? 'animate-rebound' : ''}`}
            >
              <img src="/ville.svg" alt="Icône ville" className="w-3 h-3" />
              Paris
            </button>
            <button 
              onClick={() => { triggerBounce('btn-filters'); setIsFilterOpen(true); }}
              className={`border border-[#D1466F] text-[#D1466F] px-4 py-1 rounded-full text-xs font-semibold bg-transparent transition-transform ${bouncingItem === 'btn-filters' ? 'animate-rebound' : ''}`}
            >
              Filtres {selectedTypes.length + selectedPrices.length > 0 && `(${selectedTypes.length + selectedPrices.length})`}
            </button>
          </div>

          {(selectedTypes.length > 0 || selectedPrices.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-3">
              {[...selectedTypes, ...selectedPrices].map(item => (
                <button 
                  key={item} 
                  onClick={() => {
                    const isType = selectedTypes.includes(item);
                    toggleFilter(item, isType ? selectedTypes : selectedPrices, isType ? setSelectedTypes : setSelectedPrices);
                  }}
                  className={`bg-[#EFA7BA] text-white px-3 py-1 rounded-full text-[11px] font-bold ${pinkBorderClass} ${bouncingItem === item ? 'animate-rebound' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          <div className="relative w-full mb-4">
            <input 
              type="text" 
              placeholder="Rechercher une activité, un lieu..." 
              className="w-full bg-[#E3E6EE] text-gray-800 placeholder-gray-500 rounded-lg pl-4 pr-10 py-2.5 text-sm outline-none font-medium"
            />
            <img 
              src="/loupe.svg" 
              alt="Rechercher" 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" 
            />
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => { triggerBounce('tab-pour-toi'); setActiveTab('pour_toi'); }} 
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${bouncingItem === 'tab-pour-toi' ? 'animate-rebound' : ''} ${activeTab === 'pour_toi' ? 'bg-[#D1466F] text-white' : 'bg-[#EFA7BA] text-white'}`}
            >
              Pour toi
            </button>
            <button 
              onClick={() => { triggerBounce('tab-exclusif'); setActiveTab('exclusif'); }} 
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${bouncingItem === 'tab-exclusif' ? 'animate-rebound' : ''} ${activeTab === 'exclusif' ? 'bg-[#D1466F] text-white' : 'bg-[#EFA7BA] text-white'}`}
            >
              Événements exclusifs 🔒
            </button>
          </div>
        </div>
      </div>

      {/* --- FEED (DÉROULANT) --- */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-28">
        <div className="flex flex-col gap-6">
          {filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10">
              <span className="text-4xl mb-3">🥺</span>
              <p className="font-semibold text-sm">Aucun événement ne correspond à tes filtres.</p>
              <button onClick={clearFilters} className="text-[#D1466F] font-bold text-sm mt-3 underline">Tout effacer</button>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div 
                key={event.id} 
                onClick={() => onEventClick(event)} 
                className="w-full flex flex-col cursor-pointer group"
              >
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-2 shadow-sm">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 left-3 bg-[#D1466F]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {event.category}
                  </div>
                  {/* BOUTON MODIFIÉ ICI */}
                  <button className="absolute bottom-3 right-3 bg-gradient-to-r from-[#D1466F] to-[#EFA7BA] text-white px-4 py-2 rounded-full shadow-lg active:scale-95 transition-transform flex items-center justify-center border border-white/20">
                    <img src="/fleche-droite.svg" alt="Go" className="w-3 h-auto" />
                  </button>
                </div>
                <div className="flex justify-between items-start px-1">
                  <div className="flex flex-col w-2/3">
                    <h3 className="text-black font-bold text-sm truncate">{event.title}</h3>
                    <p className="text-gray-600 font-medium text-xs">{event.location}</p>
                  </div>
                  <div className="flex flex-col items-end w-1/3">
                    <span className="text-[#D1466F] font-bold text-sm">{event.price}</span>
                    <span className="text-black font-bold text-xs">{event.date}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- BARRE DE NAVIGATION FLOTTANTE --- */}
      <div className="absolute bottom-25 left-1/2 -translate-x-1/2 w-[280px] h-16 bg-[#D1466F]/50 backdrop-blur-xl rounded-full shadow-2xl flex justify-around items-center px-4 z-30 border-2 border-[#D1466F]">
        
        {/* Bouton Accueil - État Actif */}
        <button 
          onClick={() => triggerBounce('nav-home')}
          className={`p-3 rounded-full transition-all ${bouncingItem === 'nav-home' ? 'animate-rebound' : ''}`}
        >
          <img src="/home.svg" alt="Accueil" className="w-7 h-7" />
        </button>

        {/* Bouton Billet - État Inactif */}
        <button 
          onClick={() => triggerBounce('nav-billet')}
          className={`p-3 transition-all ${bouncingItem === 'nav-billet' ? 'animate-rebound' : ''}`}
        >
          <img src="/billet.svg" alt="Réservations" className="w-7 h-7 brightness-200" />
        </button>

        {/* Bouton Profil - État Inactif */}
        <button 
          onClick={() => triggerBounce('nav-profil')}
          className={`p-3 transition-all ${bouncingItem === 'nav-profil' ? 'animate-rebound' : ''}`}
        >
          <img src="/profil.svg" alt="Compte" className="w-7 h-7 brightness-200" />
        </button>

      </div>

      {/* --- MODALE DE FILTRES --- */}
      {isFilterOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end bottom-17">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsFilterOpen(false)}></div>
          <div className="relative bg-[#F1F3F9] w-full rounded-t-3xl p-6 pb-8 shadow-2xl flex flex-col transform transition-transform duration-300 translate-y-0">
            <div className="mb-6">
              <h3 className="text-[#D1466F] font-bold text-base mb-3">Types</h3>
              <div className="flex flex-wrap gap-2">
                {FILTER_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${bouncingItem === type ? 'animate-rebound' : ''} ${selectedTypes.includes(type) ? 'bg-[#D1466F] text-white border-[#D1466F]' : 'bg-[#E3E6EE] text-gray-800 border-[#D0D4DF]'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-[#D1466F] font-bold text-base mb-3">Prix</h3>
              <div className="flex flex-wrap gap-2">
                {FILTER_PRICES.map(price => (
                  <button
                    key={price}
                    onClick={() => toggleFilter(price, selectedPrices, setSelectedPrices)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${bouncingItem === price ? 'animate-rebound' : ''} ${selectedPrices.includes(price) ? 'bg-[#D1466F] text-white border-[#D1466F]' : 'bg-[#E3E6EE] text-gray-800 border-[#D0D4DF]'}`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <button onClick={clearFilters} className="text-gray-500 text-xs font-semibold py-2 px-2">Tout effacer</button>
              <button onClick={() => setIsFilterOpen(false)} className="bg-[#D1466F] text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-md active:scale-95 transition-transform">Voir {filteredEvents.length} évènement{filteredEvents.length !== 1 ? 's' : ''}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HomePage;