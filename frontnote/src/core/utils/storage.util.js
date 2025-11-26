/**
 * Utilitaires de stockage local
 * Gestion sécurisée du localStorage avec gestion d'erreurs
 * @module core/utils/storage
 */

/**
 * Sauvegarde une valeur dans le localStorage
 * @param {string} key - Clé de stockage
 * @param {any} value - Valeur à stocker
 * @returns {boolean} true si réussi, false sinon
 */
export const setItem = (key, value) => {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde de ${key}:`, error);
    return false;
  }
};

/**
 * Récupère une valeur du localStorage
 * @param {string} key - Clé de stockage
 * @param {boolean} parse - Si true, tente de parser en JSON
 * @returns {any} Valeur ou null
 */
export const getItem = (key, parse = false) => {
  try {
    const value = localStorage.getItem(key);
    if (!value) return null;

    if (parse) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }

    return value;
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${key}:`, error);
    return null;
  }
};

/**
 * Supprime une valeur du localStorage
 * @param {string} key - Clé de stockage
 * @returns {boolean} true si réussi, false sinon
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression de ${key}:`, error);
    return false;
  }
};

/**
 * Vérifie si une clé existe dans le localStorage
 * @param {string} key - Clé de stockage
 * @returns {boolean}
 */
export const hasItem = (key) => {
  return localStorage.getItem(key) !== null;
};

/**
 * Vide complètement le localStorage
 * @returns {boolean} true si réussi, false sinon
 */
export const clearAll = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Erreur lors du vidage du localStorage:', error);
    return false;
  }
};

/**
 * Supprime plusieurs clés du localStorage
 * @param {string[]} keys - Liste de clés à supprimer
 * @returns {boolean} true si toutes réussies, false sinon
 */
export const removeMultiple = (keys) => {
  try {
    keys.forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression multiple:', error);
    return false;
  }
};
