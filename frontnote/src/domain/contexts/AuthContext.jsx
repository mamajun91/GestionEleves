/**
 * Context - Authentification
 * Context React pour partager l'état d'authentification globalement
 * @module domain/contexts/AuthContext
 */

import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/index.js';

const AuthContext = createContext(null);

/**
 * Provider pour le contexte d'authentification
 * @param {Object} props - Props du provider
 * @param {React.ReactNode} props.children - Composants enfants
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

/**
 * Hook pour utiliser le contexte d'authentification
 * @returns {Object} Contexte d'authentification
 * @throws {Error} Si utilisé en dehors d'un AuthProvider
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext doit être utilisé dans un AuthProvider');
  }
  return context;
};

export default AuthContext;
