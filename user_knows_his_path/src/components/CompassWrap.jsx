import React, { useRef } from 'react';

export default function CompassWrap({ needleRotation }) {
  const svgRef = useRef(null);

  return (
    <div className="center-col">
      <div className="compass-wrap" id="compassWrap">
        <svg
          id="conn-svg"
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', inset: 0 }}
        ></svg>
        <div className="compass-svg-wrap">
          <svg
            id="compassSvg"
            width="270"
            height="270"
            viewBox="0 0 295 295"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="face" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f8f3ec" />
                <stop offset="100%" stopColor="#ede5d8" />
              </radialGradient>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d="M 147.5 14.5 A 133 133 0 0 1 280.5 147.5"
              fill="none"
              stroke="#ab131c"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M 280.5 147.5 A 133 133 0 0 1 147.5 280.5"
              fill="none"
              stroke="#8a6820"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M 147.5 280.5 A 133 133 0 0 1 14.5 147.5"
              fill="none"
              stroke="#1e8878"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M 14.5 147.5 A 133 133 0 0 1 147.5 14.5"
              fill="none"
              stroke="#7a5abf"
              strokeWidth="7"
              strokeLinecap="round"
            />

            <circle cx="147.5" cy="14.5" r="6.5" fill="#ab131c" />
            <circle cx="280.5" cy="147.5" r="6.5" fill="#8a6820" />
            <circle cx="147.5" cy="280.5" r="6.5" fill="#1e8878" />
            <circle cx="14.5" cy="147.5" r="6.5" fill="#7a5abf" />

            <circle cx="147.5" cy="147.5" r="114" fill="none" stroke="#ddd5c8" strokeWidth="1.2" />

            <g stroke="#c8c0b2" strokeWidth="1.1">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="147.5"
                  y1="33.5"
                  x2="147.5"
                  y2={angle % 90 === 0 ? 27 : 30}
                  transform={`rotate(${angle},147.5,147.5)`}
                />
              ))}
            </g>

            <circle cx="147.5" cy="147.5" r="96" fill="none" stroke="#ddd5c8" strokeWidth="1" />
            <circle cx="147.5" cy="147.5" r="90" fill="url(#face)" />

            <g fill="#cec6b8" opacity="0.75">
              {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
                <polygon
                  key={angle}
                  points="147.5,57.5 151,118 147.5,124 144,118"
                  transform={`rotate(${angle},147.5,147.5)`}
                />
              ))}
            </g>

            {[45, 135, 225, 315].map((angle) => (
              <polygon
                key={`solid-${angle}`}
                points="147.5,57.5 152,117 147.5,123 143,117"
                fill="#404040"
                transform={`rotate(${angle},147.5,147.5)`}
              />
            ))}

            <polygon
              id="needle-n"
              points="147.5,57.5 153,117 147.5,123 142,117"
              fill="#ab131c"
              style={{
                transformOrigin: '147.5px 147.5px',
                transform: `rotate(${needleRotation}deg)`,
                transition: 'transform 0.45s ease-out',
              }}
            />
            <polygon
              id="needle-s"
              points="147.5,237.5 153,178 147.5,172 142,178"
              fill="#1e8878"
            />
            <polygon
              id="needle-e"
              points="237.5,147.5 178,153 172,147.5 178,142"
              fill="#1e8878"
            />
            <polygon
              id="needle-w"
              points="57.5,147.5 117,153 123,147.5 117,142"
              fill="#1e8878"
            />

            <circle cx="147.5" cy="147.5" r="20" fill="#404040" />
            <circle cx="147.5" cy="147.5" r="13" fill="#f2ece3" />
            <circle cx="147.5" cy="147.5" r="5.5" fill="#404040" />

            <text
              x="147.5"
              y="152"
              textAnchor="middle"
              fontFamily="Tajawal,sans-serif"
              fontSize="7"
              fontWeight="800"
              fill="#404040"
              opacity="0.6"
            >
              CAVT
            </text>
            <text
              x="147.5"
              y="47"
              textAnchor="middle"
              fontFamily="Tajawal,sans-serif"
              fontSize="13"
              fontWeight="800"
              fill="#1e1e2e"
            >
              N
            </text>
            <text
              x="147.5"
              y="258"
              textAnchor="middle"
              fontFamily="Tajawal,sans-serif"
              fontSize="13"
              fontWeight="800"
              fill="#1e1e2e"
            >
              S
            </text>
            <text
              x="47"
              y="152"
              textAnchor="middle"
              fontFamily="Tajawal,sans-serif"
              fontSize="13"
              fontWeight="800"
              fill="#1e1e2e"
            >
              W
            </text>
            <text
              x="248"
              y="152"
              textAnchor="middle"
              fontFamily="Tajawal,sans-serif"
              fontSize="13"
              fontWeight="800"
              fill="#1e1e2e"
            >
              E
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
