# Architecture Frontend - GestionEleves

## Vue d'ensemble

Le frontend de l'application GestionEleves suit une **architecture en couches** (Layered Architecture) avec une séparation claire des responsabilités selon trois niveaux :

1. **Core** (Niveau Bas Niveau) - Utilitaires, helpers, constantes
2. **Infrastructure** (Niveau Orchestration) - API clients, repositories, storage
3. **Domain** (Niveau Déclaratif) - Hooks React, contexts, logique métier

Cette architecture favorise la **maintenabilité**, la **testabilité** et la **réutilisabilité** du code.

---

## 📁 Structure des dossiers

```
src/
├── core/                      # Niveau Bas Niveau
│   ├── constants/             # Constantes globales
│   │   ├── api.constants.js   # URLs, endpoints API
│   │   ├── storage.constants.js # Clés de localStorage
│   │   └── roles.constants.js # Rôles utilisateurs
│   ├── helpers/               # Fonctions utilitaires
│   │   ├── jwt.helper.js      # Décodage et validation JWT
│   │   └── http.helper.js     # Utilitaires HTTP
│   ├── validators/            # Validateurs de données
│   │   └── auth.validator.js  # Validation credentials
│   └── utils/                 # Utilitaires génériques
│       └── storage.util.js    # Gestion localStorage sécurisée
│
├── infrastructure/            # Niveau Orchestration
│   ├── api/                   # Clients API
│   │   ├── http.client.js     # Client HTTP générique
│   │   ├── auth.api.js        # API authentification
│   │   ├── teaching.api.js    # API enseignements
│   │   ├── evaluation.api.js  # API évaluations
│   │   ├── classgroup.api.js  # API classes
│   │   └── parent.api.js      # API parents
│   ├── repositories/          # Couche d'abstraction API
│   │   ├── auth.repository.js
│   │   ├── teaching.repository.js
│   │   ├── evaluation.repository.js
│   │   ├── classgroup.repository.js
│   │   └── parent.repository.js
│   └── storage/               # Gestion du stockage
│       ├── token.storage.js   # Stockage token JWT
│       └── user.storage.js    # Stockage données utilisateur
│
├── domain/                    # Niveau Déclaratif
│   ├── hooks/                 # Hooks React personnalisés
│   │   ├── useAuth.js         # Hook authentification
│   │   ├── useTeachings.js    # Hook enseignements
│   │   ├── useClassGroup.js   # Hook classes
│   │   └── useParent.js       # Hook parents
│   └── contexts/              # Contexts React
│       └── AuthContext.jsx    # Context authentification global
│
├── components/                # Composants UI
│   ├── auth/                  # Composants authentification
│   ├── layout/                # Composants de layout
│   ├── parents/               # Composants parents
│   └── ui/                    # Composants UI réutilisables
│
└── pages/                     # Pages de l'application
    ├── LoginPage.jsx
    └── ClassGroupPage.jsx
```

---

## 🎯 Niveaux d'architecture

### 1. Core (Niveau Bas Niveau)

**Responsabilité** : Fournir des utilitaires, constantes et helpers réutilisables sans dépendances externes.

**Caractéristiques** :
- ✅ Pas de logique métier
- ✅ Fonctions pures (quand possible)
- ✅ Aucune dépendance React
- ✅ Testable unitairement

**Exemples** :
```javascript
// core/helpers/jwt.helper.js
export const decodeJWT = (token) => { /* ... */ }
export const isJWTExpired = (token) => { /* ... */ }

// core/constants/api.constants.js
export const API_BASE_URL = 'http://localhost:8081/api';
export const API_ENDPOINTS = { /* ... */ }

// core/validators/auth.validator.js
export const validateLoginCredentials = (username, password) => { /* ... */ }
```

---

### 2. Infrastructure (Niveau Orchestration)

**Responsabilité** : Gérer les communications externes (API, storage) et orchestrer les appels de services.

**Caractéristiques** :
- ✅ Abstraction des appels API
- ✅ Gestion des erreurs HTTP
- ✅ Gestion du localStorage
- ✅ Pattern Repository pour isoler la logique d'accès aux données

**Exemples** :
```javascript
// infrastructure/api/http.client.js
class HttpClient {
  async request(endpoint, options, token) { /* ... */ }
  async get(endpoint, token) { /* ... */ }
  async post(endpoint, data, token) { /* ... */ }
}

// infrastructure/repositories/auth.repository.js
export const authRepository = {
  authenticate: async (username, password) => {
    const loginData = await authApiClient.login(username, password);
    const tokenInfo = getJWTInfo(loginData.token);
    return { token, user, tokenInfo };
  }
}

// infrastructure/storage/token.storage.js
export const tokenStorage = {
  save: (token) => setItem(STORAGE_KEYS.AUTH_TOKEN, token),
  get: () => getItem(STORAGE_KEYS.AUTH_TOKEN),
  remove: () => removeItem(STORAGE_KEYS.AUTH_TOKEN)
}
```

---

### 3. Domain (Niveau Déclaratif)

**Responsabilité** : Exposer la logique métier aux composants React via des hooks et contexts.

**Caractéristiques** :
- ✅ Hooks React personnalisés
- ✅ Gestion d'état déclarative
- ✅ Context API pour état global
- ✅ Interface simple pour les composants UI

**Exemples** :
```javascript
// domain/hooks/useAuth.js
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (username, password) => {
    const authData = await authRepository.authenticate(username, password);
    tokenStorage.save(authData.token);
    userStorage.save(authData.user);
    return authData.user;
  }, []);

  return { login, logout, isAuthenticated, getCurrentUser, /* ... */ };
}

// domain/contexts/AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  const [user, setUser] = useState(null);

  return <AuthContext.Provider value={{ user, ...auth }}>
    {children}
  </AuthContext.Provider>;
}
```

---

## 🔄 Flux de données

### Exemple : Connexion utilisateur

```
1. Composant UI (LoginPage.jsx)
   ↓
2. Hook déclaratif (useAuth.login)
   ↓
3. Repository (authRepository.authenticate)
   ↓
4. API Client (authApiClient.login)
   ↓
5. HTTP Client (httpClient.post)
   ↓
6. Backend API (/api/login)
   ↓
7. Retour : token JWT
   ↓
8. Helper JWT (getJWTInfo) - Décodage token
   ↓
9. Storage (tokenStorage.save, userStorage.save)
   ↓
10. Mise à jour state React (useState)
   ↓
11. UI re-render avec utilisateur connecté
```

---

## 📦 Dépendances entre couches

```
┌─────────────────────────────────────┐
│         Components / Pages          │  ← Utilise uniquement domain/
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│      Domain (Hooks, Contexts)       │  ← Utilise infrastructure/ et core/
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│   Infrastructure (API, Repos)       │  ← Utilise core/ uniquement
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│   Core (Helpers, Utils, Constants)  │  ← Pas de dépendances
└─────────────────────────────────────┘
```

**Règles** :
- ❌ **Core** ne dépend de **rien**
- ✅ **Infrastructure** peut utiliser **Core**
- ✅ **Domain** peut utiliser **Infrastructure** et **Core**
- ✅ **Components** peuvent utiliser **Domain** uniquement (pas Infrastructure ni Core directement)

---

## 🛠️ Comment utiliser cette architecture

### Dans un composant React

```jsx
import { useAuth } from '../domain/hooks';

function LoginPage() {
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.message);
    }
  };

  return <form onSubmit={handleSubmit}>{ /* ... */ }</form>;
}
```

### Avec le Context d'authentification

```jsx
// App.jsx
import { AuthProvider } from './domain/contexts';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>{ /* ... */ }</Routes>
      </Router>
    </AuthProvider>
  );
}

// Dans un composant enfant
import { useAuthContext } from '../domain/contexts';

function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header>
      <span>Bonjour {user?.username}</span>
      <button onClick={logout}>Déconnexion</button>
    </header>
  );
}
```

---

## ✅ Avantages de cette architecture

1. **Séparation des préoccupations** : Chaque couche a une responsabilité claire
2. **Testabilité** : Les couches sont indépendantes et testables unitairement
3. **Maintenabilité** : Changements localisés (ex: changer d'API n'impacte que `infrastructure/api`)
4. **Réutilisabilité** : Helpers et hooks réutilisables dans toute l'application
5. **Scalabilité** : Facile d'ajouter de nouvelles fonctionnalités sans casser l'existant
6. **DRY (Don't Repeat Yourself)** : Logique centralisée, pas de duplication

---

## 🔧 Conventions de nommage

| Type | Convention | Exemple |
|------|-----------|---------|
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL`, `USER_ROLES` |
| Helpers | camelCase + .helper.js | `decodeJWT`, `isJWTExpired` |
| Validators | camelCase + .validator.js | `validateUsername` |
| API Clients | camelCase + ApiClient | `authApiClient`, `teachingApiClient` |
| Repositories | camelCase + Repository | `authRepository`, `parentRepository` |
| Storage | camelCase + Storage | `tokenStorage`, `userStorage` |
| Hooks | use + PascalCase | `useAuth`, `useTeachings` |
| Contexts | PascalCase + Context | `AuthContext`, `ThemeContext` |

---

## 📚 Migration depuis l'ancienne structure

Les anciens fichiers `services/api.js`, `services/auth.js` et `services/jwtService.js` sont maintenant remplacés par :

| Ancien fichier | Nouveau(x) fichier(s) |
|----------------|----------------------|
| `services/jwtService.js` | `core/helpers/jwt.helper.js` |
| `services/auth.js` | `infrastructure/storage/token.storage.js` + `infrastructure/storage/user.storage.js` + `domain/hooks/useAuth.js` |
| `services/api.js` | `infrastructure/api/*.api.js` + `infrastructure/repositories/*.repository.js` + `domain/hooks/*.js` |

**Prochaines étapes** :
1. Migrer les composants existants pour utiliser les nouveaux hooks
2. Supprimer les anciens fichiers `services/`
3. Mettre à jour les imports dans tous les composants

---

## 📞 Support

Pour toute question sur l'architecture, consultez ce document ou contactez l'équipe de développement.
