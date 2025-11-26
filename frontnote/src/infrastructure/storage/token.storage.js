/**
 * Storage - Gestion du token JWT
 * @module infrastructure/storage/token
 */

import { STORAGE_KEYS } from '../../core/constants/index.js';
import { setItem, getItem, removeItem, hasItem } from '../../core/utils/index.js';

/**
 * Service de stockage pour le token JWT
 */
export const tokenStorage = {
  /**
   * Sauvegarder le token dans le localStorage
   * @param {string} token - Token JWT
   * @returns {boolean} true si réussi
   */
  save: (token) => {
    return setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  /**
   * Récupérer le token depuis le localStorage
   * @returns {string|null} Token ou null
   */
  get: () => {
    return getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Supprimer le token du localStorage
   * @returns {boolean} true si réussi
   */
  remove: () => {
    return removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Vérifier si un token existe
   * @returns {boolean}
   */
  exists: () => {
    return hasItem(STORAGE_KEYS.AUTH_TOKEN);
  },
};

export default tokenStorage;
