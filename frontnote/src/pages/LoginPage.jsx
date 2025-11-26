import "./LoginPage.css";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../domain/hooks";
import { USER_ROLES } from "../core/constants";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error: authError } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Connexion via le nouveau hook useAuth
      const user = await login(username, password);
      console.log("Connexion réussie !", user);

      // Redirection selon le rôle
      switch (user.role) {
        case USER_ROLES.LEGAL_GUARDIAN:
          console.log("Redirection vers /parent");
          navigate("/parent");
          break;

        case USER_ROLES.TEACHER:
          console.log("Redirection vers /classes/1");
          navigate("/classes/1");
          break;

        case USER_ROLES.ADMIN:
          console.log("Redirection vers /admin");
          navigate("/admin");
          break;

        case USER_ROLES.STUDENT:
          console.log("Redirection vers /student/dashboard");
          navigate("/student/dashboard");
          break;

        default:
          console.warn(`Rôle non reconnu : "${user.role}", redirection par défaut`);
          navigate("/dashboard");
      }

    } catch (err) {
      console.error("Erreur connexion:", err);
      setError(authError || err.message || "Identifiants incorrects");
    }
  };

  return (
    <div className="page-container">
      {/* Header global */}
      <Header />

      {/* Barre de navigation globale */}
      <Navigation />

      {/* Contenu principal */}
      <div className="content-wrapper">
        {/* Bloc centré */}
        <div className="login-center-box">
          
          {/* Logo */}
          <div className="logo-zone">
            <h1>FRONTNOTE</h1>
            <p>Connexion à votre compte</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={onSubmit} className="form-zone">

            <div className="field">
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="votre.nom"
                required
              />
            </div>

            <div className="field">
              <label>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Box erreur */}
            {error && (
              <div className="error-message" style={{
                backgroundColor: "#fee",
                border: "2px solid #fcc",
                padding: "12px",
                borderRadius: "8px",
                color: "#c33",
                marginBottom: "16px"
              }}>
                {error}
              </div>
            )}

            {/* Bouton de connexion */}
            <button type="submit" disabled={isLoading} className="login-btn">
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {/* Mot de passe oublié */}
          <div className="forgot-zone">
            <a href="#">Mot de passe oublié ?</a>
          </div>

        </div>
      </div>
    </div>
  );
}

