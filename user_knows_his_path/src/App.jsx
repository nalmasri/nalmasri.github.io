import React, { useState } from 'react';
import { IoBuildOutline } from "react-icons/io5";
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import BackgroundCanvas from './components/BackgroundCanvas';
import { PROGRAMS } from './constants/programs';

import './App.css';

function App() {

  const [selectedCard, setSelectedCard] =
    useState(null);

  const [needleRotation, setNeedleRotation] =
    useState(0);

  // =========================
  // CARD CLICK
  // =========================

  const handleCardClick = (card) => {

    setSelectedCard(card);

  };

  // =========================
  // NEEDLE ROTATION
  // =========================

  const handleMouseEnter = (card) => {

    const compass =
      document.querySelector('.compass-wrap');

    const mainGrid =
      document.querySelector('.main-grid');

    if (!compass || !mainGrid) return;

    const cardElement =
      document.querySelector(
        `[data-program="${card.program}"]`
      );

    if (!cardElement) return;

    const mainGridRect =
      mainGrid.getBoundingClientRect();

    const compassRect =
      compass.getBoundingClientRect();

    const cardRect =
      cardElement.getBoundingClientRect();

    const angle =
      Math.atan2(

        cardRect.top -
          mainGridRect.top +
          cardRect.height / 2 -

          (
            compassRect.top -
            mainGridRect.top +
            compassRect.height / 2
          ),

        cardRect.left -
          mainGridRect.left +
          cardRect.width / 2 -

          (
            compassRect.left -
            mainGridRect.left +
            compassRect.width / 2
          )

      ) *
      (180 / Math.PI);

    setNeedleRotation(angle + 90);

  };

  const handleMouseLeave = () => {

    setNeedleRotation(0);

  };

  // =========================
  // SELECTED DATA
  // =========================

  const selectedData = selectedCard 
    ? {
        ...selectedCard,
        learn: PROGRAMS[selectedCard.program]?.learn || [],
        jobs: PROGRAMS[selectedCard.program]?.jobs || [],
        places: PROGRAMS[selectedCard.program]?.places || [],
        interests: PROGRAMS[selectedCard.program]?.interests || [],
      }
    : null;

  // =========================
  // RENDER
  // =========================

  return (

    <div className="app">

      <Header />

      <BackgroundCanvas />

      {/* =========================
          HERO
      ========================= */}

      <div className="page">

        <div className="top-badge">

          <span>
            المسار الأول - اعرف شغفك!
          </span>

        </div>

        <h1>

          شو حابب تصير
          {' '}
          <span>بالمستقبل</span>

          ؟

        </h1>

        <p className="subtitle">

          اختر المجال اللي يناسب
          اهتماماتك وقدراتك

        </p>

      </div>

      {/* =========================
          MAIN LAYOUT
      ========================= */}

      <div className="main-layout">

        {/* =========================
            SLIDE PANEL
        ========================= */}

        <div
          className={`
            details-panel
            ${selectedData ? 'open' : ''}
          `}
        >

          {/* CLOSE BUTTON */}

          <button
            className="close-panel"
            onClick={() =>
              setSelectedCard(null)
            }
            title="إغلاق"
          >
            ✕
          </button>
         
          {/* CONTENT */}

          {selectedData && (

            <>

              {/* TITLE */}

              <div className="details-header">

                <h2>
                  {selectedData.title}
                </h2>

                <p className="details-tagline">
                  {selectedData.description}
                </p>

              </div>

              {/* LEARN */}

              <div className="details-section">

                <h3>
                  ماذا ستتعلم؟
                </h3>

                <ul>

                  {selectedData.learn?.map(
                    (item, index) => (

                      <li key={index}>
                        {item}
                      </li>

                    )
                  )}

                </ul>

              </div>

              {/* JOBS */}

              <div className="details-section">

                <h3>
                  الوظائف المستقبلية
                </h3>

                <div className="jobs-grid">

                  {selectedData.jobs?.map(
                    (job, index) => (

                      <div
                        className="job-box"
                        key={index}
                      >
                        {job}
                      </div>

                    )
                  )}

                </div>

              </div>

            </>

          )}

          {!selectedData && (

            <div className="empty-state">

              <h3>اختر برنامجاً</h3>

              <p>انقر على أحد البطاقات لعرض التفاصيل</p>

            </div>

          )}

        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="content-side">

          <CardGrid

            selectedCard={
              selectedCard?.program
            }

            onCardSelect={
              handleCardClick
            }

            onMouseEnter={
              handleMouseEnter
            }

            onMouseLeave={
              handleMouseLeave
            }

            needleRotation={
              needleRotation
            }

          />

        </div>

      </div>

    </div>

  );

}

export default App;