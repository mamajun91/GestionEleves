import React from 'react';

/**
 * Bouton réutilisable avec variantes de couleur
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenu du bouton
 * @param {Function} props.onClick - Fonction appelée au clic
 * @param {'primary' | 'success' | 'danger' | 'purple'} props.variant - Variante de couleur (défaut: 'primary')
 * @param {string} props.size - Taille ('sm' | 'md' | 'lg') (défaut: 'lg')
 * @param {boolean} props.disabled - Bouton désactivé (défaut: false)
 */
function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'lg',
  disabled = false 
}) {
  const variants = {
    primary: {
      bg: '#2563eb',
      bgHover: '#1d4ed8',
      bgActive: '#1e40af'
    },
    success: {
      bg: '#22c55e',
      bgHover: '#16a34a',
      bgActive: '#15803d'
    },
    danger: {
      bg: '#dc2626',
      bgHover: '#b91c1c',
      bgActive: '#991b1b'
    },
    purple: {
      bg: '#9333ea',
      bgHover: '#7e22ce',
      bgActive: '#6b21a8'
    }
  };

  const sizes = {
    sm: {
      padding: '0.75rem 2rem',
      fontSize: '1rem'
    },
    md: {
      padding: '1rem 3rem',
      fontSize: '1.25rem'
    },
    lg: {
      padding: '1.5rem 4rem',
      fontSize: '1.5rem'
    }
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const getBackgroundColor = () => {
    if (disabled) return '#9ca3af';
    if (isActive) return currentVariant.bgActive;
    if (isHovered) return currentVariant.bgHover;
    return currentVariant.bg;
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      style={{
        backgroundColor: getBackgroundColor(),
        color: 'white',
        padding: currentSize.padding,
        fontSize: currentSize.fontSize,
        fontWeight: '700',
        borderRadius: '1rem',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : '0 10px 15px rgba(0,0,0,0.2)',
        transition: 'all 0.3s',
        opacity: disabled ? 0.6 : 1,
        transform: isActive && !disabled ? 'scale(0.98)' : isHovered && !disabled ? 'scale(1.02)' : 'scale(1)'
      }}
    >
      {children}
    </button>
  );
}

export default Button;