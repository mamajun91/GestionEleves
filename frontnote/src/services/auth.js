/**
 * Service d'authentification
 * Gère tout ce qui concerne l'authentification JWT
 * @module services/auth
 */
import { jwtService } from './jwtService.js';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'user';

// ============================================
// GESTION DU TOKEN
// ============================================

/**
 * Sauvegarder le token dans localStorage
 * @param {string} token - JWT token
 */
export const saveToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Récupérer le token depuis localStorage
 * @returns {string|null} Token ou null
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Supprimer le token de localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Vérifier si un token existe
 * @returns {boolean}
 */
export const hasToken = () => {
  return !!getToken();
};

// ============================================
// GESTION DE L'UTILISATEUR
// ============================================

/**
 * Sauvegarder les infos utilisateur
 * @param {Object} userData - Données utilisateur
 */
export const saveUser = (userData) => {
  if (userData) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  }
};

/**
 * Récupérer les infos utilisateur
 * @returns {Object|null}
 */
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

/**
 * Supprimer les infos utilisateur
 */
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

// ============================================
//  EXTRACTION DEPUIS LE JWT
// ============================================

/**
 * Récupérer le rôle depuis le JWT
 * @returns {string|null} Role (ADMIN, TEACHER, STUDENT, etc.)
 */
export const getRole = () => {
  const token = getToken();
  if (!token) return null;
  return jwtService.extractRole(token);
};

/**
 * Récupérer le username depuis le JWT
 * @returns {string|null} Username
 */
export const getUsername = () => {
  const token = getToken();
  if (!token) return null;
  return jwtService.extractUsername(token);
};

/**
 *  Récupérer l'id utilisateur depuis le JWT
 * @returns {number|null} id utilisateur
 */
export const getUserId = () => {
  const token = getToken();
  if (!token) return null;
  return jwtService.extractUserId(token);
};

/**
 * Récupérer toutes les infos du token décodé
 * @returns {Object|null} Infos complètes du token
 */
export const getTokenInfo = () => {
  const token = getToken();
  if (!token) return null;
  return jwtService.getTokenInfo(token);
};

// ============================================
// HELPERS RÔLES
// ============================================

/**
 * Vérifier si l'utilisateur a un rôle spécifique
 * @param {string} requiredRole - Role à vérifier
 * @returns {boolean}
 */
export const hasRole = (requiredRole) => {
  const role = getRole();
  if (!role) return false;

  const normalizedRole = role.replace("ROLE_", "");
  return normalizedRole === requiredRole;
};


/**
 * Vérifier si l'utilisateur est administrateur
 * @returns {boolean}
 */
export const isAdmin = () => hasRole('ADMIN');

/**
 * Vérifier si l'utilisateur est enseignant
 * @returns {boolean}
 */
export const isTeacher = () => hasRole('TEACHER');

/**
 * Vérifier si l'utilisateur est étudiant
 * @returns {boolean}
 */
export const isStudent = () => hasRole('STUDENT');

/**
 * Vérifier si l'utilisateur est parent
 * @returns {boolean}
 */
export const isParent = () => hasRole('LEGAL_GUARDIAN');

// ============================================
// AUTHENTIFICATION
// ============================================

/**
 * Vérifier si l'utilisateur est authentifié
 * Vérifie l'existence ET la validité du token
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  // ⭐ Utiliser jwtService pour vérifier l'expiration
  return !jwtService.isTokenExpired(token);
};

/**
 * Déconnexion complète
 * Supprime token + user + autres données de session
 */
export const logout = () => {
  removeToken();
  removeUser();
  // Supprimer d'autres données de session si nécessaire
  localStorage.removeItem('permissions');
  localStorage.removeItem('preferences');
};

/**
 * Connexion
 * @param {string} token - JWT token
 * @param {Object} user - Données utilisateur 
 */
export const login = (token, user = null) => {
  saveToken(token);
  
  // Si user n'est pas fourni, l'extraire du JWT
  if (!user) {
    const tokenInfo = jwtService.getTokenInfo(token);
    if (tokenInfo) {
      user = {
        username: tokenInfo.username,
        role: tokenInfo.role,
      };
    }
  }
  
  if (user) {
    saveUser(user);
  }
};

// ============================================
// MÉTHODES
// ============================================

/**
 * @deprecated Utiliser jwtService.decodeToken() à la place
 * Décoder un JWT sans vérifier la signature
 * @param {string} token - JWT token
 * @returns {Object|null} Payload décodé ou null
 */
export const decodeToken = (token) => {
  console.warn('auth.decodeToken() est déprécié. Utilisez jwtService.decodeToken()');
  return jwtService.decodeToken(token);
};

/**
 * @deprecated Utiliser jwtService.isTokenExpired() à la place
 * Vérifier si le token est expiré
 * @param {string} token - JWT token (optionnel, utilise le token stocké par défaut)
 * @returns {boolean}
 */
export const isTokenExpired = (token = null) => {
  console.warn('auth.isTokenExpired() est déprécié. Utilisez jwtService.isTokenExpired()');
  const tokenToCheck = token || getToken();
  if (!tokenToCheck) return true;
  return jwtService.isTokenExpired(tokenToCheck);
};

// ============================================
// EXPORT PAR DÉFAUT
// ============================================

export default {
  // Token
  saveToken,
  getToken,
  removeToken,
  hasToken,
  
  // User
  saveUser,
  getUser,
  removeUser,
  
  // Extraction JWT (NOUVEAU)
  getRole,
  getUsername,
  getTokenInfo,
  getUserId,
  
  // Helpers Rôles (NOUVEAU)
  hasRole,
  isAdmin,
  isTeacher,
  isStudent,
  isParent,
  
  // Auth
  isAuthenticated,
  login,
  logout,
  
  // JWT Utils (déprécié, redirige vers jwtService)
  decodeToken,
  isTokenExpired,
};