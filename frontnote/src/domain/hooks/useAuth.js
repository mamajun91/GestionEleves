/**
 * Hook - Authentification
 * Hook React pour la gestion de l'authentification
 * @module domain/hooks/useAuth
 */

import { useState, useCallback } from 'react';
import { authRepository } from '../../infrastructure/repositories/index.js';
import { tokenStorage, userStorage } from '../../infrastructure/storage/index.js';
import { isJWTExpired, extractJWTClaim } from '../../core/helpers/index.js';
import { normalizeRole, USER_ROLES } from '../../core/constants/index.js';
import { validateLoginCredentials } from '../../core/validators/index.js';
import { httpClient } from '../../infrastructure/api/index.js';

/**
 * Hook personnalisé pour l'authentification
 * @returns {Object} Méthodes et état d'authentification
 */
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Connexion utilisateur
   * @param {string} username - Nom d'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise<Object>} Données utilisateur
   */
  const login = useCallback(async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validation des credentials
      const validation = validateLoginCredentials(username, password);
      if (!validation.isValid) {
        throw new Error(
          validation.errors.username || validation.errors.password
        );
      }

      // Authentification
      const authData = await authRepository.authenticate(username, password);

      // Sauvegarde du token et user
      tokenStorage.save(authData.token);
      userStorage.save(authData.user);

      // Configurer le callback 401 pour httpClient
      httpClient.setUnauthorizedCallback(() => {
        logout();
        window.location.href = '/login';
      });

      return authData.user;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la connexion';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Déconnexion utilisateur
   */
  const logout = useCallback(() => {
    tokenStorage.remove();
    userStorage.remove();
    localStorage.removeItem('permissions');
    localStorage.removeItem('preferences');
  }, []);

  /**
   * Vérifier si l'utilisateur est authentifié
   * @returns {boolean}
   */
  const isAuthenticated = useCallback(() => {
    const token = tokenStorage.get();
    if (!token) return false;
    return !isJWTExpired(token);
  }, []);

  /**
   * Récupérer l'utilisateur courant
   * @returns {Object|null}
   */
  const getCurrentUser = useCallback(() => {
    return userStorage.get();
  }, []);

  /**
   * Récupérer le token courant
   * @returns {string|null}
   */
  const getToken = useCallback(() => {
    return tokenStorage.get();
  }, []);

  /**
   * Récupérer le rôle de l'utilisateur courant
   * @returns {string|null}
   */
  const getCurrentRole = useCallback(() => {
    const token = tokenStorage.get();
    if (!token) return null;
    const role = extractJWTClaim(token, 'role');
    return normalizeRole(role);
  }, []);

  /**
   * Récupérer l'ID de l'utilisateur courant
   * @returns {number|null}
   */
  const getCurrentUserId = useCallback(() => {
    const token = tokenStorage.get();
    if (!token) return null;
    return extractJWTClaim(token, 'id');
  }, []);

  /**
   * Vérifier si l'utilisateur a un rôle spécifique
   * @param {string} requiredRole - Rôle requis
   * @returns {boolean}
   */
  const hasRole = useCallback((requiredRole) => {
    const currentRole = getCurrentRole();
    return currentRole === requiredRole;
  }, []);

  /**
   * Vérifier si l'utilisateur est admin
   * @returns {boolean}
   */
  const isAdmin = useCallback(() => {
    return hasRole(USER_ROLES.ADMIN);
  }, [hasRole]);

  /**
   * Vérifier si l'utilisateur est enseignant
   * @returns {boolean}
   */
  const isTeacher = useCallback(() => {
    return hasRole(USER_ROLES.TEACHER);
  }, [hasRole]);

  /**
   * Vérifier si l'utilisateur est étudiant
   * @returns {boolean}
   */
  const isStudent = useCallback(() => {
    return hasRole(USER_ROLES.STUDENT);
  }, [hasRole]);

  /**
   * Vérifier si l'utilisateur est parent
   * @returns {boolean}
   */
  const isParent = useCallback(() => {
    return hasRole(USER_ROLES.LEGAL_GUARDIAN);
  }, [hasRole]);

  return {
    // État
    isLoading,
    error,

    // Actions
    login,
    logout,

    // Queries
    isAuthenticated,
    getCurrentUser,
    getToken,
    getCurrentRole,
    getCurrentUserId,

    // Role checks
    hasRole,
    isAdmin,
    isTeacher,
    isStudent,
    isParent,
  };
};

export default useAuth;
