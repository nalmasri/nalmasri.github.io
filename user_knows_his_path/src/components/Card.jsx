import React from 'react';

export default function Card({
  program,
  title,
  description,
  icon,
  iconClass,
  isActive,
  onCardClick,
  onMouseEnter,
  onMouseLeave,
}) {
  const normalizedIcon = typeof icon === 'string' ? icon.replace(/\s+/g, '') : '';
  const isDataUrl = typeof icon === 'string' && icon.startsWith('data:image/');
  const isPngBase64 = typeof icon === 'string' && normalizedIcon.startsWith('iVBORw0KGgo');
  const isSvgBase64 = typeof icon === 'string' && normalizedIcon.startsWith('PHN2Zy');

  return (
    <div
      className={`card ${isActive ? 'active' : ''}`}
      data-program={program}
      onClick={() => onCardClick(program)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="card-text">
        <div className="card-title">{title}</div>
        <div className="card-desc">{description}</div>
      </div>
      <div className={`card-icon ${iconClass}`}>
        {isDataUrl ? (
          <img
            src={icon}
            alt={title}
            width="28"
            height="28"
            style={{ display: 'block' }}
          />
        ) : isPngBase64 ? (
          <img
            src={`data:image/png;base64,${normalizedIcon}`}
            alt={title}
            width="28"
            height="28"
            style={{ display: 'block' }}
          />
        ) : isSvgBase64 ? (
          <img
            src={`data:image/svg+xml;base64,${normalizedIcon}`}
            alt={title}
            width="28"
            height="28"
            style={{ display: 'block' }}
          />
        ) : (
          <span style={{ fontSize: 20 }}>{icon}</span>
        )}
      </div>
    </div>
  );
}
