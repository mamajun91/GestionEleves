import "./LoginPage.css";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import authService from "../services/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Appel API login
      const data = await authAPI.login(username, password);
      console.log("Connexion réussie !", data);

      // 2. Récupérer les infos depuis le token
      const rawRole = authService.getRole();        
      const cleanRole = rawRole?.replace("ROLE_", ""); 
      const currentUsername = authService.getUsername();

      console.log("Utilisateur:", currentUsername);
      console.log("Rôle brut:", rawRole);
      console.log("Rôle normalisé:", cleanRole);

      if (!cleanRole) {
        throw new Error("Impossible d'extraire le rôle depuis le token");
      }

      // 3. Redirection selon le rôle
      switch (cleanRole) {
        case "LEGAL_GUARDIAN":
          console.log("Redirection vers /parent");
          navigate("/parent");
          break;

        case "TEACHER":
          console.log("Redirection vers /classes/1");
          navigate("/classes/1");
          break;

        case "ADMIN":
          console.log("Redirection vers /admin");
          navigate("/admin");
          break;

        case "STUDENT":
          console.log("Redirection vers /student/dashboard");
          navigate("/student/dashboard");
          break;

        default:
          console.warn(`Rôle non reconnu : "${cleanRole}", redirection par défaut`);
          navigate("/dashboard");
      }

    } catch (err) {
      console.error("Erreur connexion:", err);
      setError(err.message || "Identifiants incorrects");
    } finally {
      setLoading(false);
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
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? "Connexion..." : "Se connecter"}
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

