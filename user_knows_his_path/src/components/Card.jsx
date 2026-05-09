// import React, { useState } from 'react';

// export default function Card({
//   program,
//   title,
//   description,
//   icon,
//   iconClass,
//   isActive,
//   onCardClick,
//   onMouseEnter,
//   onMouseLeave,
// }) {
//   return (
//     <div
//       className={`card ${isActive ? 'active' : ''}`}
//       data-program={program}
//       onClick={() => onCardClick(program)}
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//     >
//       <div className="card-text">
//         <div className="card-title">{title}</div>
//         <div className="card-desc">{description}</div>
//       </div>
//       <div className={`card-icon ${iconClass}`}>
//         {typeof icon === 'string' && (
//           // Detect base64 PNG strings (common prefix iVBORw0K) or long base64 data
//           (/^(?:iVBORw0K|[A-Za-z0-9+/=\r\n]{64,})$/.test(icon.replace(/\s+/g, ''))
//             ? (
//               <img
//                 src={`data:image/png;base64,${icon}`}
//                 alt={title}
//                 width="28"
//                 height="28"
//                 style={{ display: 'block' }}
//               />
//             ) : (
//               // Emoji or short text icon
//               <span style={{ fontSize: 20 }}>{icon}</span>
//             ))}
//       </div>
//     </div>
//   );
// })
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
  const isBase64Image =
    typeof icon === 'string' &&
    (normalizedIcon.startsWith('iVBORw0KGgo') || normalizedIcon.length > 120);

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
        {isBase64Image ? (
          <img
            src={`data:image/png;base64,${normalizedIcon}`}
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