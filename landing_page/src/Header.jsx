import logo from '../../Assets/image2.png';

export default function Header() {
  const isMobile = window.innerWidth < 640;
  const headerHeight = 64;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      height: headerHeight,
      background: '#9C0D13',
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: isMobile ? '88px 1fr 80px' : '150px 1fr 110px',
      gap: isMobile ? 6 : 12,
      padding: isMobile ? '0 10px' : '0 18px',
      boxShadow: '0 3px 20px rgba(156,13,19,0.4)',
      direction: 'ltr',
    }}>
      {/* LEFT — spacer (no back button) */}
      <div style={{
        width: isMobile ? '88px' : '150px',
      }} />

      {/* CENTER — subtitle */}
      <span style={{
        direction: 'rtl',
        fontSize: isMobile ? 9 : 11,
        letterSpacing: isMobile ? 0.8 : 1.5,
        color: 'rgba(255,255,255,0.75)',
        fontFamily: 'Tajawal,sans-serif',
        whiteSpace: 'nowrap',
        maxWidth: isMobile ? '100%' : 'none',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'center',
        justifySelf: 'center',
      }}>
        الريادة في التميز المهني
      </span>

      {/* RIGHT — logo */}
      <img
        src={logo}
        alt="CAVT Logo"
        style={{
          height: isMobile ? 28 : 42,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          justifySelf: 'end',
          maxWidth: isMobile ? 84 : 140,
        }}
      />
    </div>
  );
}
