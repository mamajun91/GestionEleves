/**
 * API Client - Parents
 * @module infrastructure/api/parent
 */

import { API_ENDPOINTS } from '../../core/constants/index.js';
import httpClient from './http.client.js';

/**
 * API Client pour les parents (legal guardians)
 */
export const parentApiClient = {
  /**
   * Récupérer la liste des enfants d'un parent
   * @param {number} guardianId - ID du tuteur légal
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  getChildren: async (guardianId, token) => {
    return httpClient.get(API_ENDPOINTS.PARENT_CHILDREN(guardianId), token);
  },

  /**
   * Récupérer les bulletins d'un enfant
   * @param {number} studentId - ID de l'élève
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  getChildReports: async (studentId, token) => {
    return httpClient.get(API_ENDPOINTS.CHILD_REPORTS(studentId), token);
  },

  /**
   * Récupérer un bulletin spécifique
   * @param {number} reportId - ID du bulletin
   * @param {string} token - Token d'authentification
   * @returns {Promise<Object>}
   */
  getReport: async (reportId, token) => {
    return httpClient.get(API_ENDPOINTS.SCHOOL_REPORT(reportId), token);
  },

  /**
   * Récupérer les évaluations d'un enfant
   * @param {number} studentId - ID de l'élève
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  getChildEvaluations: async (studentId, token) => {
    return httpClient.get(API_ENDPOINTS.CHILD_EVALUATIONS(studentId), token);
  },
};

export default parentApiClient;
