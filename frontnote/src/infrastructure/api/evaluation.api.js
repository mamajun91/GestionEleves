/**
 * API Client - Évaluations
 * @module infrastructure/api/evaluation
 */

import { API_ENDPOINTS } from '../../core/constants/index.js';
import httpClient from './http.client.js';

/**
 * API Client pour les évaluations
 */
export const evaluationApiClient = {
  /**
   * Récupérer les évaluations d'un enseignement
   * @param {number} teachingId - ID de l'enseignement
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  getByTeaching: async (teachingId, token) => {
    return httpClient.get(API_ENDPOINTS.EVALUATIONS_BY_TEACHING(teachingId), token);
  },
};

export default evaluationApiClient;
