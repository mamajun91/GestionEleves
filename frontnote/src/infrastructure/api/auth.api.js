/**
 * API Client - Authentification
 * @module infrastructure/api/auth
 */

import { API_ENDPOINTS } from '../../core/constants/index.js';
import httpClient from './http.client.js';

/**
 * API Client pour l'authentification
 */
export const authApiClient = {
  /**
   * Connexion utilisateur
   * @param {string} username - Nom d'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise<Object>} Réponse avec token
   */
  login: async (username, password) => {
    return httpClient.post(API_ENDPOINTS.LOGIN, { username, password });
  },
};

export default authApiClient;
