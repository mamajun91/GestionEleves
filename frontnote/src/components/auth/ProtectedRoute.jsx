import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../domain/hooks";

/**
 * Route protégée :
 * - vérifie l'authentification
 * - vérifie si le token est expiré
 * - redirige vers /login si nécessaire
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, logout } = useAuth();

  // Vérifier l'authentification (inclut la vérification d'expiration)
  if (!isAuthenticated()) {
    logout(); // Nettoyer le token expiré
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
