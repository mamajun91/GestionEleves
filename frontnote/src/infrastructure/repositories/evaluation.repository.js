/**
 * Repository - Évaluations
 * @module infrastructure/repositories/evaluation
 */

import { evaluationApiClient } from '../api/index.js';

/**
 * Repository pour les évaluations
 */
export const evaluationRepository = {
  /**
   * Récupérer les évaluations d'un enseignement
   * @param {number} teachingId - ID de l'enseignement
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  findByTeaching: async (teachingId, token) => {
    return evaluationApiClient.getByTeaching(teachingId, token);
  },
};

export default evaluationRepository;
