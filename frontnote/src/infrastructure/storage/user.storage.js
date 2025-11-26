/**
 * Storage - Gestion des données utilisateur
 * @module infrastructure/storage/user
 */

import { STORAGE_KEYS } from '../../core/constants/index.js';
import { setItem, getItem, removeItem } from '../../core/utils/index.js';

/**
 * Service de stockage pour les données utilisateur
 */
export const userStorage = {
  /**
   * Sauvegarder les données utilisateur
   * @param {Object} userData - Données utilisateur
   * @returns {boolean} true si réussi
   */
  save: (userData) => {
    return setItem(STORAGE_KEYS.USER, userData);
  },

  /**
   * Récupérer les données utilisateur
   * @returns {Object|null} Données utilisateur ou null
   */
  get: () => {
    return getItem(STORAGE_KEYS.USER, true);
  },

  /**
   * Supprimer les données utilisateur
   * @returns {boolean} true si réussi
   */
  remove: () => {
    return removeItem(STORAGE_KEYS.USER);
  },
};

export default userStorage;
