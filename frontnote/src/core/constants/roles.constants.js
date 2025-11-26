/**
 * Constantes de rôles utilisateur
 * @module core/constants/roles
 */

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  LEGAL_GUARDIAN: 'LEGAL_GUARDIAN',
};

export const ROLE_PREFIXES = {
  SPRING_SECURITY: 'ROLE_',
};

/**
 * Normaliser un rôle en supprimant le préfixe Spring Security
 * @param {string} role - Rôle à normaliser
 * @returns {string} Rôle normalisé
 */
export const normalizeRole = (role) => {
  if (!role) return '';
  return role.replace(ROLE_PREFIXES.SPRING_SECURITY, '');
};
