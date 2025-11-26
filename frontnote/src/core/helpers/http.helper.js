/**
 * Helpers HTTP
 * Utilitaires bas niveau pour les requêtes HTTP
 * @module core/helpers/http
 */

import { HTTP_STATUS, API_ERRORS } from '../constants/index.js';

/**
 * Crée les headers par défaut pour une requête API
 * @param {string|null} token - Token d'authentification
 * @param {Object} extraHeaders - Headers supplémentaires
 * @returns {Object} Headers complets
 */
export const createHeaders = (token = null, extraHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Vérifie si une réponse HTTP est réussie
 * @param {Response} response - Réponse fetch
 * @returns {boolean}
 */
export const isResponseOk = (response) => {
  return response && response.ok;
};

/**
 * Extrait le message d'erreur d'une réponse HTTP
 * @param {Response} response - Réponse fetch
 * @returns {Promise<string>} Message d'erreur
 */
export const extractErrorMessage = async (response) => {
  try {
    const errorData = await response.json();
    return errorData.message || `Erreur HTTP: ${response.status}`;
  } catch {
    return `Erreur HTTP: ${response.status}`;
  }
};

/**
 * Vérifie si le statut est une erreur d'authentification
 * @param {number} status - Code de statut HTTP
 * @returns {boolean}
 */
export const isAuthError = (status) => {
  return status === HTTP_STATUS.UNAUTHORIZED;
};

/**
 * Construit une URL complète avec base URL et endpoint
 * @param {string} baseUrl - URL de base
 * @param {string} endpoint - Endpoint
 * @returns {string} URL complète
 */
export const buildUrl = (baseUrl, endpoint) => {
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${cleanBase}${cleanEndpoint}`;
};
