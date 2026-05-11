import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import BackgroundCanvas from './components/BackgroundCanvas';
import { PROGRAMS } from './constants/programs';

import './App.css';

function App() {

  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' && window.innerWidth <= 900
  ));

  const [selectedCard, setSelectedCard] =
    useState(null);

  const [needleRotation, setNeedleRotation] =
    useState(0);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

        {/* <div className="top-badge">

          <span>
            المسار الأول - اعرف شغفك!
          </span>

        </div> */}

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
                  {selectedData.program}
                </h2>

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

              {/* PLACES */}

              <div className="details-section">

                <h3>
                  اماكن العمل المستقبلية
                </h3>

                <div className="jobs-grid">

                  {selectedData.places?.map(
                    (place, index) => (

                      <div
                        className="job-box"
                        key={index}
                      >
                        {place}
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

      <div style={{
        background: '#414141',
        color: 'rgba(255,255,255,0.92)',
        boxShadow: '0 -8px 24px rgba(0,0,0,0.2)',
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? '18px 16px 14px' : '28px 48px 22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: isMobile ? 14 : 18,
          fontFamily: 'Tahoma, Arial, sans-serif',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1.6fr 0.9fr',
            gap: isMobile ? 20 : 24,
            alignItems: 'start',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <img
                src="data:image/png;base64,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"
                alt="CAVT Logo"
                style={{ width: isMobile ? 118 : 150, height: 'auto', objectFit: 'contain', display: 'block' }}
              />
              <div style={{ color: 'rgba(255,255,255,0.84)', fontSize: isMobile ? 12 : 14, lineHeight: 1.7, maxWidth: 280 }}>
                اكتشف اهتماماتك، وتعرّف على المسارات والبرامج المناسبة لك بطريقة واضحة وسريعة.
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 12 : 18, alignItems: 'center', justifyContent: isMobile ? 'flex-start' : 'center', paddingTop: isMobile ? 0 : 18 }}>
              {[
                { label: 'الصفحة الرئيسية', href: 'https://www.cavt.jo/ar/' },
                { label: 'لمحة عن كلية التدريب المهني المتقدم', href: 'https://www.cavt.jo/ar/%d9%84%d9%85%d8%ad%d8%a9-%d8%b9%d9%86-%d9%83%d9%84%d9%8a%d8%a9-%d8%a7%d9%84%d8%aa%d8%af%d8%b1%d9%8a%d8%a8-%d8%a7%d9%84%d9%85%d9%87%d9%86%d9%8a-%d8%a7%d9%84%d9%85%d8%aa%d9%82%d8%af%d9%85/' },
                // { label: 'FAQs', href: 'http://localhost:3000/#' },
                { label: 'اتصل بنا', href: 'https://www.cavt.jo/ar/%d8%a7%d8%aa%d8%b5%d9%84-%d8%a8%d9%86%d8%a7/' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'rgba(255,255,255,0.92)',
                    textDecoration: 'none',
                    fontSize: isMobile ? 14 : 18,
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end', alignItems: 'flex-start', gap: 10, paddingTop: isMobile ? 0 : 6, flexWrap: 'wrap' }}>
              {[
                { label: 'f', name: 'Facebook', href: 'https://www.facebook.com/cavt.jo' },
                { label: 'x', name: 'X', href: 'https://twitter.com/cavt_jo' },
                {
                  label: (
                    <svg aria-hidden="true" className="svg-inline--fa fa-instagram" focusable="false" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="" style={{width: '18px', height: '18px'}}>
                      <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                    </svg>
                  ),
                  name: 'Instagram',
                  href: 'https://www.instagram.com/cavt.jo'
                },
                { label: 'in', name: 'LinkedIn', href: 'https://www.linkedin.com/company/cavt-jo' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: 'none',
                    background: '#fff',
                    color: '#7b6f5e',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: social.name === 'LinkedIn' ? 16 : 18,
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.14)',
                    textTransform: 'lowercase',
                    textDecoration: 'none',
                  }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            paddingTop: isMobile ? 0 : 6,
            flexWrap: 'wrap',
          }}>
            <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: isMobile ? 12 : 14 }}>
              © All rights reserved 2026 CAVT
            </div>
            {/* <button
              type="button"
              onClick={handleScrollTop}
              aria-label="Scroll to top"
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: 'none',
                background: '#000',
                color: '#fff',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                boxShadow: '0 6px 16px rgba(0,0,0,0.28)',
                position: isMobile ? 'static' : 'fixed',
                right: isMobile ? 'auto' : 22,
                bottom: isMobile ? 'auto' : 18,
                zIndex: 70,
              }}
            >
              ^
            </button> */}
            <button
  type="button"
  onClick={handleScrollTop}
  aria-label="Scroll to top"
  style={{
    width: 56,
    height: 56,
    borderRadius: '50%',
    border: 'none',
    background: 'linear-gradient(135deg, #9c0d13, #c41a22)',
    color: '#fff',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 6px 20px rgba(156,13,19,0.45)',
    position: isMobile ? 'static' : 'fixed',
    right: isMobile ? 'auto' : 24,
    bottom: isMobile ? 'auto' : 24,
    zIndex: 70,
    transition: 'transform 0.2s, box-shadow 0.2s',
  }}
>
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;