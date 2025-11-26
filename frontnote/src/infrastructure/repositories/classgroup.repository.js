/**
 * Repository - Classes
 * @module infrastructure/repositories/classgroup
 */

import { classGroupApiClient } from '../api/index.js';

/**
 * Repository pour les classes
 */
export const classGroupRepository = {
  /**
   * Récupérer toutes les classes
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>}
   */
  findAll: async (token) => {
    return classGroupApiClient.getAll(token);
  },

  /**
   * Récupérer un ClassGroup par ID
   * @param {number} classGroupId - ID de la classe
   * @param {string} token - Token d'authentification
   * @returns {Promise<Object>}
   */
  findById: async (classGroupId, token) => {
    return classGroupApiClient.getById(classGroupId, token);
  },

  /**
   * Récupérer la classe complète d'un étudiant
   * @param {number} studentId - ID de l'étudiant
   * @param {string} token - Token d'authentification
   * @returns {Promise<Object>}
   */
  findByStudent: async (studentId, token) => {
    return classGroupApiClient.getByStudent(studentId, token);
  },

  /**
   * Récupérer seulement l'ID de la classe d'un étudiant
   * @param {number} studentId - ID de l'étudiant
   * @param {string} token - Token d'authentification
   * @returns {Promise<number>}
   */
  findClassGroupIdByStudent: async (studentId, token) => {
    return classGroupApiClient.getClassGroupIdByStudent(studentId, token);
  },
};

export default classGroupRepository;
