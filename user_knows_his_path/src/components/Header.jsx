// import React from 'react';
// import logo from '../assets/image2.png';

// export default function Header() {
//   const isMobile = window.innerWidth < 640;
//   const headerHeight = 64;

//   return (
//     <div style={{
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       zIndex: 100,
//       height: headerHeight,
//       background: '#9C0D13',
//       display: 'grid',
//       alignItems: 'center',
//       gridTemplateColumns: isMobile ? '88px 1fr 80px' : '150px 1fr 110px',
//       gap: isMobile ? 6 : 12,
//       padding: isMobile ? '0 10px' : '0 18px',
//       boxShadow: '0 3px 20px rgba(156,13,19,0.4)',
//       direction: 'ltr',
//     }}>
//       {/* LEFT — back button */}
//       <button
//         onClick={() => window.history.back()}
//         style={{
//           background: 'rgba(255,255,255,0.15)',
//           border: '1px solid rgba(255,255,255,0.35)',
//           color: 'white',
//           padding: isMobile ? '5px 12px' : '6px 18px',
//           borderRadius: 6,
//           fontFamily: 'Tajawal,sans-serif',
//           fontSize: isMobile ? 12 : 13,
//           cursor: 'pointer',
//           justifySelf: 'start',
//         }}
//       >
//         رجوع
//       </button>

//       {/* CENTER — subtitle */}
//     <h6
//   style={{
//     margin: 0,
//     fontWeight: '200', // remove bold
//     fontSize: isMobile ? 10 : 20,
//     letterSpacing: isMobile ? 1 : 2,
//     color: 'rgba(255,255,255,0.95)',
//     fontFamily: 'Tajawal, sans-serif',
//     textAlign: 'center',
//   }}
// >
//         اعرف شغفك — المسار الأول
// </h6>

       
//       {/* RIGHT — logo */}
//       <img
//         src={logo}
//         alt="CAVT Logo"
//         style={{
//           height: isMobile ? 28 : 42,
//           width: 'auto',
//           objectFit: 'contain',
//           display: 'block',
//           justifySelf: 'end',
//           maxWidth: isMobile ? 84 : 140,
//         }}
//       />
//     </div>
//   );
// }

import React from 'react';
import logo from '../assets/image2.png'; // adjust path if needed

export default function Header({ onBack }) {
  const isMobile = window.innerWidth < 640;
  const handleLogoClick = () => {
    if (onBack) onBack();
    else window.history.back();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      height: 64,
      background: '#9C0D13',
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: isMobile ? '88px 1fr 110px' : '150px 1fr 170px',
      gap: isMobile ? 6 : 12,
      padding: isMobile ? '0 10px' : '0 18px',
      boxShadow: '0 3px 20px rgba(156,13,19,0.4)',
      direction: 'ltr',
    }}>
      {/* LEFT — back button */}
      <button
        onClick={() => onBack ? onBack() : window.history.back()}
        style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.35)',
          color: 'white',
          padding: isMobile ? '5px 12px' : '6px 18px',
          borderRadius: 6,
          fontFamily: 'Tajawal,sans-serif',
          fontSize: isMobile ? 12 : 14,
          cursor: 'pointer',
          justifySelf: 'start',
          fontWeight: 500,
        }}
      >
        رجوع
      </button>

      {/* CENTER — subtitle */}
      <h6 style={{
        margin: 0,
        fontWeight: 300,
        fontSize: isMobile ? 11 : 20,
        letterSpacing: isMobile ? 1 : 2,
        color: 'rgba(255,255,255,0.95)',
        fontFamily: 'Tajawal, sans-serif',
        textAlign: 'center',
        direction: 'rtl',
      }}>
        اعرف شغفك — المسار الأول
      </h6>

      {/* RIGHT — logo */}
      <img
        src={logo}
        alt="CAVT Logo"
        onClick={handleLogoClick}
        style={{
          height: isMobile ? 40 : 54,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          justifySelf: 'end',
          maxWidth: isMobile ? 110 : 170,
          cursor: 'pointer',
        }}
      />
    </div>
  );
}