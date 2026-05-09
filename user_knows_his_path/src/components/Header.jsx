import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <button className="back-btn" onClick={() => window.history.back()}>
        رجوع
      </button>
      <div className="header-brand" aria-label="CAVT logo">
        <div className="header-brand-mark">CAVT</div>
        <div className="header-brand-sub">College of Advanced Vocational Training</div>
      </div>
    </header>
  );
}
