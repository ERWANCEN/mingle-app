import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import ProfileCreationPage from './components/ProfileCreationPage';
import HomePage from './components/HomePage';
import ActivityInfosPage from './components/ActivityInfosPage';
import ActivitySummaryPage from './components/ActivitySummaryPage';
import GroupChatPage from './components/GroupChatPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [isBooking, setIsBooking] = useState(false); 
  const [isConfirmed, setIsConfirmed] = useState(false); 

  // --- PAGE GROUPE ---
  if (currentPage === 'group' && selectedEvent) {
    return (
      <GroupChatPage 
        event={selectedEvent} 
        onBack={() => {
          // MODIFICATION ICI : On quitte la vue groupe, 
          // mais on NE MET PLUS setSelectedEvent à null. 
          // Ça permet au routeur de retomber sur la page de détails de l'événement.
          setCurrentPage('home'); 
        }} 
      />
    );
  }

  // --- FLUX DE RÉSERVATION ET DÉTAILS DE L'ÉVÉNEMENT ---
  if (selectedEvent) {
    if (isBooking) {
      return (
        <ActivitySummaryPage 
          event={selectedEvent} 
          onBack={() => setIsBooking(false)}
          onConfirmPayment={() => {
            setIsBooking(false);
            setIsConfirmed(true);
          }} 
        />
      );
    }
    
    return (
      <ActivityInfosPage 
        event={selectedEvent} 
        isConfirmed={isConfirmed}
        onBack={() => {
          // C'est ICI qu'on efface l'événement si l'utilisateur 
          // fait "retour" depuis la fiche de l'événement
          setSelectedEvent(null);
          setIsConfirmed(false);
        }} 
        onReserve={() => setIsBooking(true)}
        onCloseConfirmation={() => {
          setIsConfirmed(false);
          setSelectedEvent(null); 
        }}
        onAccessGroup={() => {
          setIsConfirmed(false);
          setCurrentPage('group'); 
        }}
      />
    );
  }

  // --- NAVIGATION CLASSIQUE ---
  if (currentPage === 'register') {
    return <ProfileCreationPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'login') {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F1F3F9]">
        <button onClick={() => setCurrentPage('welcome')} className="text-[#D1466F] font-bold">Retour</button>
      </div>
    );
  }

  if (currentPage === 'home') {
    return <HomePage onEventClick={(event) => setSelectedEvent(event)} />;
  }

  return <WelcomePage onNavigate={setCurrentPage} />;
}