/**
 * Repository - Authentification
 * Couche d'orchestration entre les API clients et les services de domaine
 * @module infrastructure/repositories/auth
 */

import { authApiClient } from '../api/index.js';
import { getJWTInfo } from '../../core/helpers/index.js';
import { normalizeRole } from '../../core/constants/index.js';

/**
 * Repository pour l'authentification
 * Gère la logique métier de connexion/déconnexion
 */
export const authRepository = {
  /**
   * Authentifier un utilisateur
   * @param {string} username - Nom d'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise<Object>} Données d'authentification avec token et user
   */
  authenticate: async (username, password) => {
    // 1. Appel API login
    const loginData = await authApiClient.login(username, password);

    if (!loginData.token) {
      throw new Error('Token non reçu du serveur');
    }

    // 2. Extraire les infos du JWT
    const tokenInfo = getJWTInfo(loginData.token);

    if (!tokenInfo) {
      throw new Error('Impossible de décoder le token');
    }

    // 3. Construire l'objet utilisateur avec rôle normalisé
    const user = {
      id: tokenInfo.id,
      username: tokenInfo.username,
      role: normalizeRole(tokenInfo.role), // Normaliser le rôle (enlever "ROLE_")
    };

    return {
      token: loginData.token,
      user,
      tokenInfo: {
        expiresAt: tokenInfo.expiresAt,
        issuedAt: tokenInfo.issuedAt,
      },
    };
  },
};

export default authRepository;
