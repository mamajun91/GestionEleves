/**
 * Repository - Parents
 * @module infrastructure/repositories/parent
 */

import { parentApiClient } from '../api/index.js';

/**
 * Repository pour les parents (legal guardians)
 */
export const parentRepository = {
  /**
   * Récupérer la liste des enfants d'un parent
   * @param {number} guardianId - ID du tuteur légal
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  findChildren: async (guardianId, token) => {
    return parentApiClient.getChildren(guardianId, token);
  },

  /**
   * Récupérer les bulletins d'un enfant
   * @param {number} studentId - ID de l'élève
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  findChildReports: async (studentId, token) => {
    return parentApiClient.getChildReports(studentId, token);
  },

  /**
   * Récupérer un bulletin spécifique
   * @param {number} reportId - ID du bulletin
   * @param {string} token - Token d'authentification
   * @returns {Promise<Object>}
   */
  findReport: async (reportId, token) => {
    return parentApiClient.getReport(reportId, token);
  },

  /**
   * Récupérer les évaluations d'un enfant
   * @param {number} studentId - ID de l'élève
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  findChildEvaluations: async (studentId, token) => {
    return parentApiClient.getChildEvaluations(studentId, token);
  },
};

export default parentRepository;
