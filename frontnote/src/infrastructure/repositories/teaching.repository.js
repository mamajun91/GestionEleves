/**
 * Repository - Enseignements
 * @module infrastructure/repositories/teaching
 */

import { teachingApiClient } from '../api/index.js';

/**
 * Repository pour les enseignements
 */
export const teachingRepository = {
  /**
   * Récupérer les enseignements par classe
   * @param {number} classGroupId - ID de la classe
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  findByClassGroup: async (classGroupId, token) => {
    return teachingApiClient.getByClassGroup(classGroupId, token);
  },

  /**
   * Récupérer un enseignement par ID
   * @param {number} id - ID de l'enseignement
   * @param {string} token - Token d'authentification
   * @returns {Promise<Object>}
   */
  findById: async (id, token) => {
    return teachingApiClient.getById(id, token);
  },

  /**
   * Récupérer un enseignement par nom d'enseignant
   * @param {string} teacherName - Nom de l'enseignant
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  findByTeacher: async (teacherName, token) => {
    return teachingApiClient.getByTeacher(teacherName, token);
  },
};

export default teachingRepository;
