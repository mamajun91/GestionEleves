import React from 'react';
import { Power } from 'lucide-react';
import Logo from '../Logo';

/**
 * Header de l'application avec logo et bouton déconnexion
 * @param {Object} props
 * @param {Function} props.onLogout - Fonction appelée lors du clic sur déconnexion
 * @param {React.ReactNode} props.searchBar - Composant de barre de recherche (optionnel)
 */
function Header({ onLogout, searchBar }) {
  return (
    <header style={{
      backgroundColor: 'white',
      borderBottom: '4px solid #d1d5db',
      padding: '1.5rem 2rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: searchBar ? '1rem' : '0'
      }}>
        <Logo size={64} fontSize={4} />

        {/* Bouton déconnexion */}
        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#6b7280',
            fontSize: '1.125rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#374151'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
        >
          <Power size={24} />
          <span>Se déconnecter</span>
        </button>
      </div>

      {/* Barre de recherche (si fournie) */}
      {searchBar && (
        <div style={{ marginTop: '1rem' }}>
          {searchBar}
        </div>
      )}
    </header>
  );
}

export default Header;
