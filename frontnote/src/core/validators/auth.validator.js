/**
 * Validateurs pour l'authentification
 * @module core/validators/auth
 */

/**
 * Valide un username
 * @param {string} username - Username à valider
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validateUsername = (username) => {
  if (!username || typeof username !== 'string') {
    return { isValid: false, error: 'Le nom d\'utilisateur est requis' };
  }

  if (username.trim().length < 3) {
    return { isValid: false, error: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' };
  }

  return { isValid: true, error: null };
};

/**
 * Valide un mot de passe
 * @param {string} password - Mot de passe à valider
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, error: 'Le mot de passe est requis' };
  }

  if (password.length < 6) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins 6 caractères' };
  }

  return { isValid: true, error: null };
};

/**
 * Valide les credentials de login
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {{isValid: boolean, errors: Object}}
 */
export const validateLoginCredentials = (username, password) => {
  const usernameValidation = validateUsername(username);
  const passwordValidation = validatePassword(password);

  return {
    isValid: usernameValidation.isValid && passwordValidation.isValid,
    errors: {
      username: usernameValidation.error,
      password: passwordValidation.error,
    },
  };
};
