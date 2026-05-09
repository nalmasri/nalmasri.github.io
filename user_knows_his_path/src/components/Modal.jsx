import React, { useEffect } from 'react';

export default function Modal({ isOpen, programName, programData, onClose }) {
  const placeIcons = ['🏭', '🏢', '🏗️', '🔬', '🏛️', '🏨', '🛒'];

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !programData) return null;

  const handleOverlayClick = (e) => {
    if (e.target.id === 'modalOverlay') {
      onClose();
    }
  };

  return (
    <div
      id="modalOverlay"
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="modal">
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
          <div className="modal-program-badge">🎓 برنامج تدريبي متخصص</div>
          <div className="modal-title">{programName}</div>
          <div className="modal-interests">
            {programData.interests.map((interest, idx) => (
              <span key={idx} className="interest-tag">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <div className="section-header">
              <div className="section-icon learn">📚</div>
              <div>
                <div className="section-title">ماذا ستتعلم؟</div>
                <div className="section-subtitle">
                  المهارات والمعارف التي ستكتسبها
                </div>
              </div>
            </div>
            <ul className="learn-list">
              {programData.learn.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <div className="section-header">
              <div className="section-icon jobs">💼</div>
              <div>
                <div className="section-title">الفرص الوظيفية</div>
                <div className="section-subtitle">
                  المسارات المهنية المتاحة بعد التخرج
                </div>
              </div>
            </div>
            <div className="jobs-grid">
              {programData.jobs.map((job, idx) => (
                <div key={idx} className="job-card">
                  <div className="job-dot"></div>
                  <div className="job-name">{job}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <div className="section-header">
              <div className="section-icon places">🏢</div>
              <div>
                <div className="section-title">أماكن العمل المستقبلية</div>
                <div className="section-subtitle">
                  بيئات العمل التي ستعمل فيها
                </div>
              </div>
            </div>
            <div className="places-list">
              {programData.places.map((place, idx) => (
                <div key={idx} className="place-item">
                  <span className="place-icon">
                    {placeIcons[idx % placeIcons.length]}
                  </span>
                  {place}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <p>
            برامج <strong>CAVT</strong> المعتمدة — التدريب المهني المتقدم
          </p>
        </div>
      </div>
    </div>
  );
}
