/**
 * API Client - Classes
 * @module infrastructure/api/classgroup
 */

import { API_ENDPOINTS } from '../../core/constants/index.js';
import httpClient from './http.client.js';

/**
 * API Client pour les classes
 */
export const classGroupApiClient = {
  /**
   * Récupérer toutes les classes
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  getAll: async (token) => {
    return httpClient.get(API_ENDPOINTS.CLASS_GROUPS, token);
  },

  /**
   * Récupérer un ClassGroup par ID
   * @param {number} classGroupId - ID de la classe
   * @param {string} token - Token d'authentification
   * @returns {Promise<Object>}
   */
  getById: async (classGroupId, token) => {
    return httpClient.get(API_ENDPOINTS.CLASS_GROUP_BY_ID(classGroupId), token);
  },

  /**
   * Récupérer la classe complète d'un étudiant
   * @param {number} studentId - ID de l'étudiant
   * @param {string} token - Token d'authentification
   * @returns {Promise<Object>}
   */
  getByStudent: async (studentId, token) => {
    return httpClient.get(API_ENDPOINTS.CLASS_GROUP_BY_STUDENT(studentId), token);
  },

  /**
   * Récupérer seulement l'ID de la classe d'un étudiant
   * @param {number} studentId - ID de l'étudiant
   * @param {string} token - Token d'authentification
   * @returns {Promise<number>}
   */
  getClassGroupIdByStudent: async (studentId, token) => {
    return httpClient.get(API_ENDPOINTS.CLASS_GROUP_ID_BY_STUDENT(studentId), token);
  },
};

export default classGroupApiClient;
