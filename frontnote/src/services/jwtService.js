// src/services/jwtService.js

export const jwtService = {
  /**
   * Décode le payload JWT sans vérifier la signature
   * (La signature est vérifiée côté backend)
   */
  decodeToken: (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erreur décodage token:', error);
      return null;
    }
  },

  /**
   * Extrait le rôle depuis le token
   */
  extractRole: (token) => {
    const payload = jwtService.decodeToken(token);
    return payload?.role || null;
  },

  /**
   * Extrait le username depuis le token
   */
  extractUsername: (token) => {
    const payload = jwtService.decodeToken(token);
    return payload?.sub || null; // "sub" = subject (username)
  },


    /**
   * Extrait l'id utilisateur depuis le token
   */
  extractUserId: (token) => {
    const payload = jwtService.decodeToken(token);
    return payload?.id || null; 
  },

  /**
   * Vérifie si le token est expiré
   */
  isTokenExpired: (token) => {
    const payload = jwtService.decodeToken(token);
    if (!payload?.exp) return true;
    return Date.now() >= payload.exp * 1000;
  },

  /**
   *  Récupère toutes les infos du token (FONCTION MANQUANTE)
   */
  getTokenInfo: (token) => {
    const payload = jwtService.decodeToken(token);
    if (!payload) return null;

    return {
      id: payload.id,
      username: payload.sub,
      role: payload.role,
      expiresAt: new Date(payload.exp * 1000),
      issuedAt: new Date(payload.iat * 1000),
      isExpired: jwtService.isTokenExpired(token),
    };
  }
};