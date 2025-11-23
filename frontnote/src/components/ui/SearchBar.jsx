import React from 'react';
import { Search } from 'lucide-react';

/**
 * Barre de recherche avec icône
 * @param {Object} props
 * @param {string} props.value - Valeur actuelle du champ
 * @param {Function} props.onChange - Fonction appelée lors du changement de valeur
 * @param {string} props.placeholder - Texte placeholder (défaut: 'Search')
 * @param {boolean} props.compact - Version compacte pour navigation (défaut: false)
 */
function SearchBar({
  value,
  onChange,
  placeholder = 'Search',
  compact = false
}) {
  const compactStyles = {
    container: { maxWidth: '100%', marginBottom: 0 },
    icon: { left: '0.75rem', size: 18 },
    input: {
      paddingLeft: '2.5rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      fontSize: '0.95rem',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }
  };

  const defaultStyles = {
    container: { maxWidth: '800px', marginBottom: '2rem' },
    icon: { left: '1rem', size: 28 },
    input: {
      paddingLeft: '3.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1.25rem',
      paddingBottom: '1.25rem',
      fontSize: '1.25rem',
      border: '2px solid #d1d5db',
      backgroundColor: 'white'
    }
  };

  const styles = compact ? compactStyles : defaultStyles;

  return (
    <div style={styles.container}>
      <div style={{ position: 'relative' }}>
        <Search
          style={{
            position: 'absolute',
            left: styles.icon.left,
            top: '50%',
            transform: 'translateY(-50%)',
            color: compact ? '#64748b' : '#9ca3af'
          }}
          size={styles.icon.size}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          style={{
            width: '100%',
            ...styles.input,
            borderRadius: '0.5rem',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.boxShadow = compact
              ? '0 0 0 2px rgba(59, 130, 246, 0.2)'
              : '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = compact
              ? 'rgba(255, 255, 255, 0.3)'
              : '#d1d5db';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>
    </div>
  );
}

export default SearchBar;