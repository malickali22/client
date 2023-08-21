import { useState } from 'react';

function HoverButton(props) {
  const [hover, setHover] = useState(false);

  return (
    <button
      className={props.className}
      style={{
        marginTop: '-20px',
        marginBottom: '-20px',
        backgroundColor: 'transparent',
        color: 'Black',
        border: 'none',
        padding: '0.2rem 0.5rem',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: '700',
        transition: 'all 0.3s',
        boxShadow: hover
          ? '2px 2px 8px rgba(0, 0, 0, 0.4)'
          : '0px 0px 0px rgba(0, 0, 0, 0)',
        transform: hover ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {props.children}
    </button>
  );
}

export default HoverButton;
