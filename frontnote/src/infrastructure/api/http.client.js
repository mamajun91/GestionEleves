/**
 * Client HTTP bas niveau
 * Gestion centralisée des requêtes HTTP
 * @module infrastructure/api/http.client
 */

import {
  API_BASE_URL,
  HTTP_STATUS,
  API_ERRORS
} from '../../core/constants/index.js';
import {
  createHeaders,
  isResponseOk,
  extractErrorMessage,
  isAuthError,
  buildUrl
} from '../../core/helpers/index.js';

/**
 * Client HTTP avec gestion d'erreurs et authentification
 */
class HttpClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.onUnauthorized = null;
  }

  /**
   * Configure le callback pour les erreurs 401
   * @param {Function} callback - Fonction appelée lors d'une erreur 401
   */
  setUnauthorizedCallback(callback) {
    this.onUnauthorized = callback;
  }

  /**
   * Requête HTTP générique
   * @param {string} endpoint - Endpoint de l'API
   * @param {Object} options - Options fetch
   * @param {string|null} token - Token d'authentification
   * @returns {Promise<any>} Données de la réponse
   */
  async request(endpoint, options = {}, token = null) {
    const url = buildUrl(this.baseUrl, endpoint);

    const config = {
      headers: createHeaders(token, options.headers),
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // Gérer 401 Unauthorized
      if (isAuthError(response.status)) {
        if (this.onUnauthorized) {
          this.onUnauthorized();
        }
        throw new Error(API_ERRORS.UNAUTHORIZED);
      }

      if (!isResponseOk(response)) {
        const errorMessage = await extractErrorMessage(response);
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('HTTP Request Error:', error);
      throw error;
    }
  }

  /**
   * Requête GET
   * @param {string} endpoint - Endpoint de l'API
   * @param {string|null} token - Token d'authentification
   * @returns {Promise<any>}
   */
  async get(endpoint, token = null) {
    return this.request(endpoint, { method: 'GET' }, token);
  }

  /**
   * Requête POST
   * @param {string} endpoint - Endpoint de l'API
   * @param {Object} data - Données à envoyer
   * @param {string|null} token - Token d'authentification
   * @returns {Promise<any>}
   */
  async post(endpoint, data = {}, token = null) {
    return this.request(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      token
    );
  }

  /**
   * Requête PUT
   * @param {string} endpoint - Endpoint de l'API
   * @param {Object} data - Données à envoyer
   * @param {string|null} token - Token d'authentification
   * @returns {Promise<any>}
   */
  async put(endpoint, data = {}, token = null) {
    return this.request(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      token
    );
  }

  /**
   * Requête DELETE
   * @param {string} endpoint - Endpoint de l'API
   * @param {string|null} token - Token d'authentification
   * @returns {Promise<any>}
   */
  async delete(endpoint, token = null) {
    return this.request(endpoint, { method: 'DELETE' }, token);
  }

  /**
   * Requête PATCH
   * @param {string} endpoint - Endpoint de l'API
   * @param {Object} data - Données à envoyer
   * @param {string|null} token - Token d'authentification
   * @returns {Promise<any>}
   */
  async patch(endpoint, data = {}, token = null) {
    return this.request(
      endpoint,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      },
      token
    );
  }
}

// Instance singleton
export const httpClient = new HttpClient();
export default httpClient;
