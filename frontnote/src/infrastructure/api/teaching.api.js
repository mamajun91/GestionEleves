/**
 * API Client - Enseignements
 * @module infrastructure/api/teaching
 */

import { API_ENDPOINTS } from '../../core/constants/index.js';
import httpClient from './http.client.js';

/**
 * API Client pour les enseignements
 */
export const teachingApiClient = {
  /**
   * Récupérer les enseignements par classe
   * @param {number} classGroupId - ID de la classe
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  getByClassGroup: async (classGroupId, token) => {
    return httpClient.get(API_ENDPOINTS.TEACHINGS_BY_CLASS(classGroupId), token);
  },

  /**
   * Récupérer un enseignement par ID
   * @param {number} id - ID de l'enseignement
   * @param {string} token - Token d'authentification
   * @returns {Promise<Object>}
   */
  getById: async (id, token) => {
    return httpClient.get(API_ENDPOINTS.TEACHINGS_BY_ID(id), token);
  },

  /**
   * Récupérer un enseignement par nom d'enseignant
   * @param {string} teacherName - Nom de l'enseignant
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  getByTeacher: async (teacherName, token) => {
    return httpClient.get(API_ENDPOINTS.TEACHINGS_BY_TEACHER(teacherName), token);
  },
};

export default teachingApiClient;
