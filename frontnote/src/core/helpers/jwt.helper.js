/**
 * Helpers JWT
 * Gestion bas niveau du décodage et validation des tokens JWT
 * @module core/helpers/jwt
 */

/**
 * Décode le payload d'un token JWT sans vérifier la signature
 * (La signature est vérifiée côté backend)
 * @param {string} token - Token JWT
 * @returns {Object|null} Payload décodé ou null en cas d'erreur
 */
export const decodeJWT = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erreur décodage JWT:', error);
    return null;
  }
};

/**
 * Vérifie si un token JWT est expiré
 * @param {string} token - Token JWT
 * @returns {boolean} true si expiré, false sinon
 */
export const isJWTExpired = (token) => {
  const payload = decodeJWT(token);
  if (!payload?.exp) {
    return true;
  }
  return Date.now() >= payload.exp * 1000;
};

/**
 * Extrait une propriété spécifique du payload JWT
 * @param {string} token - Token JWT
 * @param {string} key - Clé à extraire
 * @returns {any} Valeur de la propriété ou null
 */
export const extractJWTClaim = (token, key) => {
  const payload = decodeJWT(token);
  return payload?.[key] || null;
};

/**
 * Récupère toutes les informations du token JWT
 * @param {string} token - Token JWT
 * @returns {Object|null} Objet avec toutes les infos du token
 */
export const getJWTInfo = (token) => {
  const payload = decodeJWT(token);
  if (!payload) return null;

  return {
    id: payload.id,
    username: payload.sub,
    role: payload.role,
    expiresAt: payload.exp ? new Date(payload.exp * 1000) : null,
    issuedAt: payload.iat ? new Date(payload.iat * 1000) : null,
    isExpired: isJWTExpired(token),
    payload,
  };
};
