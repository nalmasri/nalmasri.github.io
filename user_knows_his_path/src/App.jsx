import React, { useState } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';
import CardGrid from './components/CardGrid';
import BackgroundCanvas from './components/BackgroundCanvas';
import { PROGRAMS } from './constants/programs';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [needleRotation, setNeedleRotation] = useState(0);

  const handleCardClick = (programName) => {
    setSelectedCard(programName);
    setSelectedProgram(programName);
    setIsModalOpen(true);
  };

  const handleMouseEnter = (card) => {
    const compass = document.querySelector('.compass-wrap');
    const mainGrid = document.querySelector('.main-grid');
    if (!compass || !mainGrid) return;

    const cardElement = document.querySelector(`[data-program="${card.program}"]`);
    if (!cardElement) return;

    const mainGridRect = mainGrid.getBoundingClientRect();
    const compassRect = compass.getBoundingClientRect();
    const cardRect = cardElement.getBoundingClientRect();

    const angle =
      Math.atan2(
        cardRect.top - mainGridRect.top + cardRect.height / 2 - (compassRect.top - mainGridRect.top + compassRect.height / 2),
        cardRect.left - mainGridRect.left + cardRect.width / 2 - (compassRect.left - mainGridRect.left + compassRect.width / 2)
      ) *
      (180 / Math.PI);

    setNeedleRotation(angle + 90);
  };

  const handleMouseLeave = () => {
    setNeedleRotation(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="app">
      <Header />
      <BackgroundCanvas />

      <div className="page">
        <div className="top-badge">
          <span>المسار الأول - اعرف شغفك!</span>
        </div>
        <h1>
          شو حابب تصير <span>بالمستقبل</span>؟
        </h1>
        <p className="subtitle">
          اختر المجال اللي يناسب اهتماماتك وقدراتك لعرض البرامج التدريبية المناسبة
        </p>
        <div className="guide-badge">
          <span>● توجيه مهني 20 برنامج تدريبي متخصص</span>
        </div>
      </div>

      <CardGrid
        selectedCard={selectedCard}
        onCardSelect={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        needleRotation={needleRotation}
      />

      <Modal
        isOpen={isModalOpen}
        programName={selectedProgram}
        programData={selectedProgram ? PROGRAMS[selectedProgram] : null}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
