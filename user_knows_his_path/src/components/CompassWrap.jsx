import React, { useRef } from 'react';

export default function CompassWrap({ needleRotation }) {
  const svgRef = useRef(null);

  const compassColors = {
    main: '#AB131C',
    soft: '#c41a22',
    dark: '#7a0b12',
    deep: '#e83040',
  };

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
              {/* MAIN FACE */}
              <radialGradient id="cFace" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f5efe7" />
                <stop offset="100%" stopColor="#e8ddd0" />
              </radialGradient>

              {/* RED GLOW */}
              <radialGradient id="cGlow" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor={compassColors.main}
                  stopOpacity="0.18"
                />
                <stop
                  offset="100%"
                  stopColor={compassColors.main}
                  stopOpacity="0"
                />
              </radialGradient>

              {/* SOFT GLOW */}
              <filter
                id="softGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  stdDeviation="10"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* OUTER ARCS */}

            <path
              d="M 147.5 14.5 A 133 133 0 0 1 280.5 147.5"
              fill="none"
              stroke={compassColors.main}
              strokeWidth="7"
              strokeLinecap="round"
            />

            <path
              d="M 280.5 147.5 A 133 133 0 0 1 147.5 280.5"
              fill="none"
              stroke={compassColors.soft}
              strokeWidth="7"
              strokeLinecap="round"
            />

            <path
              d="M 147.5 280.5 A 133 133 0 0 1 14.5 147.5"
              fill="none"
              stroke={compassColors.dark}
              strokeWidth="7"
              strokeLinecap="round"
            />

            <path
              d="M 14.5 147.5 A 133 133 0 0 1 147.5 14.5"
              fill="none"
              stroke={compassColors.deep}
              strokeWidth="7"
              strokeLinecap="round"
            />

            {/* OUTER DOTS */}

            <circle
              cx="147.5"
              cy="14.5"
              r="6.5"
              fill={compassColors.main}
            />

            <circle
              cx="280.5"
              cy="147.5"
              r="6.5"
              fill={compassColors.soft}
            />

            <circle
              cx="147.5"
              cy="280.5"
              r="6.5"
              fill={compassColors.dark}
            />

            <circle
              cx="14.5"
              cy="147.5"
              r="6.5"
              fill={compassColors.deep}
            />

            {/* OUTER RING */}

            <circle
              cx="147.5"
              cy="147.5"
              r="114"
              fill="none"
              stroke="#d9cfc1"
              strokeWidth="1.2"
            />

            {/* MARK LINES */}

            <g stroke="#cabdaf" strokeWidth="1.1">
              {[0, 45, 90, 135, 180, 225, 270, 315].map(
                (angle) => (
                  <line
                    key={angle}
                    x1="147.5"
                    y1="33.5"
                    x2="147.5"
                    y2={angle % 90 === 0 ? 27 : 30}
                    transform={`rotate(${angle},147.5,147.5)`}
                  />
                )
              )}
            </g>

            {/* INNER CIRCLES */}

            <circle
              cx="147.5"
              cy="147.5"
              r="102"
              fill="url(#cGlow)"
              filter="url(#softGlow)"
            />

            <circle
              cx="147.5"
              cy="147.5"
              r="96"
              fill="none"
              stroke="#d9cfc1"
              strokeWidth="1"
            />

            <circle
              cx="147.5"
              cy="147.5"
              r="90"
              fill="url(#cFace)"
            />

            {/* SMALL TRIANGLES */}

            <g fill="#d7c9bc" opacity="0.7">
              {[
                22.5,
                67.5,
                112.5,
                157.5,
                202.5,
                247.5,
                292.5,
                337.5,
              ].map((angle) => (
                <polygon
                  key={angle}
                  points="147.5,57.5 151,118 147.5,124 144,118"
                  transform={`rotate(${angle},147.5,147.5)`}
                />
              ))}
            </g>

            {/* BIG TRIANGLES */}

            {[45, 135, 225, 315].map((angle) => (
              <polygon
                key={`solid-${angle}`}
                points="147.5,57.5 152,117 147.5,123 143,117"
                fill={compassColors.dark}
                transform={`rotate(${angle},147.5,147.5)`}
              />
            ))}

            {/* NEEDLES */}

            <polygon
              id="needle-n"
              points="147.5,57.5 153,117 147.5,123 142,117"
              fill={compassColors.main}
              style={{
                transformOrigin: '147.5px 147.5px',
                transform: `rotate(${needleRotation}deg)`,
                transition: 'transform 0.45s ease-out',
              }}
            />

            <polygon
              id="needle-s"
              points="147.5,237.5 153,178 147.5,172 142,178"
              fill={compassColors.dark}
            />

            <polygon
              id="needle-e"
              points="237.5,147.5 178,153 172,147.5 178,142"
              fill={compassColors.dark}
            />

            <polygon
              id="needle-w"
              points="57.5,147.5 117,153 123,147.5 117,142"
              fill={compassColors.dark}
            />

            {/* CENTER */}

            <circle
              cx="147.5"
              cy="147.5"
              r="20"
              fill={compassColors.dark}
            />

            <circle
              cx="147.5"
              cy="147.5"
              r="13"
              fill="#f5efe7"
            />

            <circle
              cx="147.5"
              cy="147.5"
              r="5.5"
              fill={compassColors.main}
            />

            {/* TEXT */}
{/* 
            <text
              x="147.5"
              y="139"
              textAnchor="middle"
              fontFamily="'Forma DJR Arabic',sans-serif"
              fontSize="9"
              fontWeight="800"
              fill="#ffffff"
            >
              اهتماماتك
            </text> */}

            {/* <text
              x="147.5"
              y="152"
              textAnchor="middle"
              fontFamily="'Forma DJR Arabic',sans-serif"
              fontSize="6"
              fontWeight="400"
              fill={compassColors.dark}
              opacity="0.65"
            >
              اضغط للاكتشاف
            </text> */}

            {/* CARDINAL LABELS */}

            <text
              x="147.5"
              y="47"
              textAnchor="middle"
              fontFamily="Tahoma, Arial, sans-serif"
              fontSize="13"
              fontWeight="800"
              fill="#231f20"
            >
              N
            </text>

            <text
              x="147.5"
              y="258"
              textAnchor="middle"
              fontFamily="Tahoma, Arial, sans-serif"
              fontSize="13"
              fontWeight="800"
              fill="#231f20"
            >
              S
            </text>

            <text
              x="47"
              y="152"
              textAnchor="middle"
              fontFamily="Tahoma, Arial, sans-serif"
              fontSize="13"
              fontWeight="800"
              fill="#231f20"
            >
              W
            </text>

            <text
              x="248"
              y="152"
              textAnchor="middle"
              fontFamily="Tahoma, Arial, sans-serif"
              fontSize="13"
              fontWeight="800"
              fill="#231f20"
            >
              E
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
