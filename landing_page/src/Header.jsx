// import logo from '../../Assets/image2.png';

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
//       {/* LEFT — spacer (no back button) */}
//       <div style={{
//         width: isMobile ? '88px' : '150px',
//       }} />

//       {/* CENTER — subtitle */}
// <h6
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
//   الريادة في التميز المهني
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

import logo from '../../Assets/image2.png';

export default function Header({ onLogoClick }) {
  const isMobile = window.innerWidth < 640;
  const handleLogoClick = onLogoClick || (() => window.scrollTo({ top: 0, behavior: 'smooth' }));

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      height: 64,
      background: '#9C0D13',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '0 14px' : '0 24px',
      boxShadow: '0 3px 20px rgba(156,13,19,0.4)',
      direction: 'ltr',
    }}>
      <h6 style={{
        margin: 0,
        fontWeight: 300,
        fontSize: isMobile ? 11 : 20,
        letterSpacing: isMobile ? 1 : 2,
        color: 'rgba(255,255,255,0.95)',
        fontFamily: 'Tajawal, sans-serif',
        textAlign: 'left',
        direction: 'rtl',
      }}>
        الريادة في التميز المهني
      </h6>
      <img
        src={logo}
        alt="CAVT Logo"
        onClick={handleLogoClick}
        style={{
          height: isMobile ? 40 : 54,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          maxWidth: isMobile ? 110 : 170,
          cursor: 'pointer',
          flexShrink: 0,
        }}
      />
    </div>
  );
}