import React, { useState, useRef } from 'react';

const INTERESTS = [
  {
    category: 'Musique',
    items: ['Variété française', 'Rap', 'Pop', 'Jazz', 'Rock', 'Électro', 'Hip-hop']
  },
  {
    category: 'Cinéma',
    items: ['Drame', 'Comédie', 'Romance', 'Action', 'Aventure', 'Sci-Fi', 'Thriller', 'Horreur', 'Fantaisie']
  },
  {
    category: 'Autres',
    items: ['Musées', 'Sport', 'Bars/Restau', 'Ateliers créatifs', 'Théâtre']
  }
];

// On génère un tableau d'âges pour le menu déroulant (de 18 à 40 par exemple)
const AGE_OPTIONS = Array.from({ length: 23 }, (_, i) => i + 18);

const ProfileCreationPage = ({ onBack }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [age, setAge] = useState(''); 
  const [isAgeDropdownOpen, setIsAgeDropdownOpen] = useState(false); // Nouvel état pour ouvrir/fermer la liste
  const [avatarUrl, setAvatarUrl] = useState(null); 

  const [bouncingItem, setBouncingItem] = useState(null);

  const fileInputRef = useRef(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );

    setBouncingItem(interest);

    setTimeout(() => {
      setBouncingItem(null);
    }, 200);
  };


  return (
    <div className="h-screen w-screen flex flex-col bg-[#F1F3F9] font-sans overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-24">
        
        {/* En-tête profil */}
        <div className="flex gap-4 mb-8">
          
          <div 
            onClick={() => fileInputRef.current.click()} 
            className="w-24 h-24 bg-[#E3E6EE] rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer shadow-sm relative overflow-hidden group"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profil" className="w-full h-full object-cover" />
            ) : (
              <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 group-hover:scale-110 transition-transform">
                <path d="M25.6667 3.5H21L18.6667 0H9.33333L7 3.5H2.33333C1.05 3.5 0 4.55 0 5.83333V21C0 22.2833 1.05 23.3333 2.33333 23.3333H25.6667C26.95 23.3333 28 22.2833 28 21V5.83333C28 4.55 26.95 3.5 25.6667 3.5ZM14 19.25C10.4533 19.25 7.58333 16.38 7.58333 12.8333C7.58333 9.28667 10.4533 6.41667 14 6.41667C17.5467 6.41667 20.4167 9.28667 20.4167 12.8333C20.4167 16.38 17.5467 19.25 14 19.25Z" fill="currentColor"/>
              </svg>
            )}
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
            />
          </div>

          <div className="flex flex-col justify-center gap-2.5 flex-1">
            <input 
              type="text" 
              placeholder="Prénom" 
              className="w-full bg-[#E3E6EE] text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-[#D1466F] font-medium"
            />
            
            <div className="flex gap-2.5 w-full items-start relative">
              
              {/* --- MENU DÉROULANT CUSTOM (ÂGE) --- */}
              <div className="flex flex-col w-1/3 relative">
                <div 
                  onClick={() => setIsAgeDropdownOpen(!isAgeDropdownOpen)}
                  className="w-full bg-[#E3E6EE] rounded-lg px-3 py-2 flex justify-between items-center cursor-pointer h-[40px]"
                >
                  <span className={`font-medium ${age ? 'text-gray-800' : 'text-gray-400'}`}>
                    {age ? `${age}` : 'Âge'}
                  </span>
                  <span className={`text-gray-400 text-xs transition-transform ${isAgeDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                </div>

                {/* La liste qui apparaît au clic */}
                {isAgeDropdownOpen && (
                  <ul className="absolute z-50 top-[44px] left-0 w-full bg-white border border-[#D0D4DF] rounded-lg shadow-lg max-h-[160px] overflow-y-auto">
                    {AGE_OPTIONS.map((num) => (
                      <li 
                        key={num}
                        onClick={() => {
                          setAge(num);
                          setIsAgeDropdownOpen(false); // On ferme la liste au clic
                        }}
                        className="px-3 py-2 text-sm text-gray-800 font-medium hover:bg-[#F1F3F9] cursor-pointer border-b border-gray-50 last:border-0"
                      >
                        {num}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Colonne Ville */}
              <div className="flex items-center bg-[#E3E6EE] rounded-lg px-3 py-2 w-2/3 h-[40px] focus-within:ring-1 focus-within:ring-[#D1466F]">
                <img src="/ville.svg" alt="Icône ville" className="w-4 h-4 mr-2" />
                <input 
                  type="text" 
                  placeholder="Ville" 
                  className="bg-transparent w-full text-gray-800 placeholder-gray-400 outline-none font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-[#D1466F] text-center font-bold text-lg mb-6">
          Choisis tes centres d'intérêt
        </h2>

        {INTERESTS.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-center font-bold text-gray-800 text-base mb-3">
              {section.category}
            </h3>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-3">
              {section.items.map((item, itemIdx) => {
                const isSelected = selectedInterests.includes(item);
                const isBouncing = bouncingItem === item;

                return (
                  <button
                    key={itemIdx}
                    onClick={() => toggleInterest(item)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      isBouncing ? 'animate-rebound' : ''
                    } ${
                      isSelected 
                        ? 'bg-[#D1466F] text-white border-[#D1466F]' 
                        : 'bg-[#E3E6EE] text-gray-700 border-[#D0D4DF]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bouton bas */}
      <div className="w-full px-12 pb-8 pt-4 bg-gradient-to-t from-[#F1F3F9] via-[#F1F3F9] to-transparent absolute bottom-18">
        <button 
          onClick={onBack}
          className={`w-full py-4 rounded-full font-bold text-base transition-all ${
            selectedInterests.length > 0 
              ? 'bg-[#D1466F] text-white shadow-md active:scale-95' 
              : 'bg-[#E3E6EE] text-[#A0A5B5]'
          }`}
        >
          Valider
        </button>
      </div>

    </div>
  );
};

export default ProfileCreationPage;