# GestionEleves - Système de Gestion Scolaire

Application web complète de gestion d'élèves pour établissement scolaire avec backend Spring Boot, deux frontends (React et Angular) et base de données PostgreSQL.

## Table des matières

- [Aperçu](#aperçu)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Identifiants de test](#identifiants-de-test)
- [Structure du projet](#structure-du-projet)
- [Documentation](#documentation)
- [API Endpoints](#api-endpoints)
- [Dépannage](#dépannage)
- [Contributeurs](#contributeurs)

---

## Aperçu

**GestionEleves** est une application full-stack permettant de gérer les élèves, les classes, les enseignements, les évaluations et les bulletins scolaires. Elle propose deux interfaces modernes et intuitives :
- **Frontend React** : Interface complète pour tous les rôles (admin, enseignant, parents)
- **Frontend Angular** : Interface spécialisée pour les parents/tuteurs légaux

### Captures d'écran

Consultez le dossier [UML/](GestionElevesProject-JeMaTh/UML/) pour les diagrammes :
- Diagramme de cas d'utilisation
- Diagramme de classes UML
- Diagramme de séquence

---

## Architecture

### Architecture globale

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  Frontend React │◄───┐    │                 │         │                 │
│  (Port 5173)    │    │    │                 │         │                 │
└─────────────────┘    │    │  API Spring Boot│────────►│  PostgreSQL DB  │
                       ├───►│   (Port 8081)   │   JDBC  │   (Port 5433)   │
┌─────────────────┐    │    │                 │         │                 │
│ Frontend Angular│    │    │                 │         └─────────────────┘
│  (Port 4200)    │◄───┘    └─────────────────┘
└─────────────────┘                 │
                                    ▼
                            ┌──────────────┐
                            │  Nginx       │
                            │  (Port 80)   │
                            │  File Server │
                            └──────────────┘
```

### Backend - Spring Boot (API)

**Architecture en couches :**
- **Controller** : Gestion des endpoints REST
- **Service** : Logique métier
- **Repository** : Accès aux données (JPA)
- **Entity** : Modèles de données
- **DTO** : Objets de transfert de données (MapStruct)
- **Security** : Authentification JWT + Spring Security

**Packages principaux :**
```
com.gestioneleves.api
├── controller/         # Endpoints REST
├── service/           # Logique métier
├── repository/        # Accès données (JPA)
├── entity/            # Entités JPA
├── dto/               # DTOs
└── security/          # Configuration sécurité
```

### Frontend React (Vite)

**Architecture en 3 couches :**
1. **Core** : Utilitaires, constantes, helpers
2. **Infrastructure** : API clients, repositories, storage
3. **Domain** : Hooks React, contexts, logique métier

**Structure :**
```
src/
├── core/              # Bas niveau (utils, constants)
├── infrastructure/    # API clients, repositories
├── domain/            # Hooks, contexts
├── components/        # Composants UI
└── pages/            # Pages de l'application
```

Voir [ARCHITECTURE.md](GestionElevesProject-JeMaTh/frontnote/ARCHITECTURE.md) pour plus de détails.

### Frontend Angular (SSR)

**Architecture Clean Architecture :**
1. **Infrastructure** : Configuration, routes, API config
2. **Business Logic** : Services, guards, models
3. **Data Repository** : Repositories pour l'accès aux données
4. **Use Cases** : Cas d'usage métier
5. **Presentation UI** : Composants Angular

**Structure :**
```
src/app/
├── infrastructure/       # Config, routes, API endpoints
├── business-logic/       # Services, guards, models
│   ├── services/        # Auth service, etc.
│   ├── guards/          # Role guard
│   └── models/          # Auth models
├── data-repository/     # Repositories
├── use-cases/           # Use cases (login, etc.)
└── presentation-UI/     # Composants UI
    └── components/
        ├── login/           # Page de connexion
        ├── accueil-parents/ # Accueil parents
        ├── class-group-page/# Classe de l'élève
        ├── evaluations/     # Évaluations
        └── bulletin/        # Bulletins scolaires
```

**Fonctionnalités Angular (parents uniquement) :**
- Authentification JWT avec guard de rôle
- Consultation des enfants
- Consultation des classes
- Consultation des évaluations
- Consultation des bulletins scolaires

---

## Technologies

### Backend
- **Java 21**
- **Spring Boot 3.5.6**
- **Spring Security** (JWT)
- **Spring Data JPA**
- **PostgreSQL 15**
- **MapStruct 1.6.3** (Mapping DTO ↔ Entity)
- **Lombok 1.18.36**
- **JJWT 0.12.6** (JSON Web Tokens)
- **Docker & Docker Compose**

### Frontend React
- **React 19.2.0**
- **Vite 7.2.2**
- **React Router 7.9.6**
- **TailwindCSS 3.4.18**
- **Lucide React** (Icônes)
- **ESLint** (Linting)

### Frontend Angular
- **Angular 21.0.0**
- **Angular SSR** (Server-Side Rendering)
- **TailwindCSS 4.1.12**
- **JWT Decode 4.0.0**
- **RxJS 7.8.0**
- **Express 5.1.0** (SSR server)
- **Vitest 4.0.8** (Tests)

### Infrastructure
- **Docker Compose** (Orchestration)
- **Nginx** (Serveur de fichiers)
- **Adminer** (Interface PostgreSQL)

---

## Fonctionnalités

### Gestion des utilisateurs
- Authentification JWT
- Rôles : Admin, Enseignant, Tuteur légal
- Gestion de profils

### Gestion des élèves
- CRUD complet des élèves
- Association tuteurs légaux
- Inscriptions aux classes

### Gestion des classes
- Création et gestion de groupes-classes
- Attribution d'enseignants
- Gestion des enseignements

### Évaluations et notes
- Création d'évaluations
- Saisie de notes
- Calcul automatique de moyennes

### Bulletins scolaires
- Génération automatique de bulletins
- Consultation par parents/tuteurs
- Historique des résultats

---

## Prérequis

### Logiciels requis

- **Docker** (version 20+)
- **Docker Compose** (version 2+)
- **Node.js** (version 18+)
- **npm** (version 9+)

### Ports utilisés

| Service | Port | Description |
|---------|------|-------------|
| Frontend React (Vite) | 5173 | Application React |
| Frontend Angular | 4200 | Application Angular (parents) |
| Backend (Spring Boot) | 8081 | API REST |
| PostgreSQL | 5433 | Base de données |
| Nginx | 80 | Serveur de fichiers |
| Adminer | 8082 | Interface PostgreSQL |

---

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd GestionEleves
```

### 2. Configuration Backend

Aucune configuration manuelle n'est nécessaire. Les variables d'environnement sont définies dans [docker-compose.yml](GestionElevesProject-JeMaTh/api/docker-compose.yml).

### 3. Installation Frontend React

```bash
cd GestionElevesProject-JeMaTh/frontnote
npm install
```

### 4. Installation Frontend Angular

```bash
cd GestionElevesProject-JeMaTh/angular-springboot-app
npm install
```

---

## Démarrage

### Démarrage automatique complet

#### 1. Backend (API + PostgreSQL + Nginx)

```bash
cd GestionElevesProject-JeMaTh/api
./rebuild.sh
```

Ce script effectue :
- Arrêt des conteneurs existants
- Nettoyage du dossier `target/`
- Reconstruction de l'image Docker
- Démarrage des services (API, PostgreSQL, Nginx, Adminer)

#### 2. Frontend React

```bash
cd GestionElevesProject-JeMaTh/frontnote
npm run dev
```

#### 3. Frontend Angular (optionnel)

```bash
cd GestionElevesProject-JeMaTh/angular-springboot-app
npm start
```

#### 4. Accès à l'application

- **Frontend React** : http://localhost:5173 (interface complète)
- **Frontend Angular** : http://localhost:4200 (interface parents)
- **API** : http://localhost:8081/api
- **Adminer** : http://localhost:8082

---

### Démarrage manuel

#### Backend

```bash
cd GestionElevesProject-JeMaTh/api

# Démarrer les services
docker compose up -d

# Voir les logs
docker compose logs -f api
```

#### Frontend React

```bash
cd GestionElevesProject-JeMaTh/frontnote
npm run dev
```

#### Frontend Angular

```bash
cd GestionElevesProject-JeMaTh/angular-springboot-app
npm start
```

---

## Identifiants de test

**Mot de passe universel : `password`**

### Administrateur

| Username | Email | Rôle |
|----------|-------|------|
| `jdupont` | jean.dupont@school.fr | ADMIN |

### Enseignants (TEACHER)

| Username | Nom |
|----------|-----|
| `smartin` | Sophie Martin |
| `lmoreau` | Luc Moreau |
| `idurand` | Isabelle Durand |

### Parents (LEGAL_GUARDIAN)

| Username | Nom |
|----------|-----|
| `stesteur` | Sophie Testeur |
| `mrenard` | Marc Renard |
| `fboulanger` | Fatima Boulanger |

Voir [CREDENTIALS_TEST.md](GestionElevesProject-JeMaTh/CREDENTIALS_TEST.md) pour la liste complète.

---

## Structure du projet

```
GestionEleves/
├── GestionElevesProject-JeMaTh/
│   ├── api/                          # Backend Spring Boot
│   │   ├── src/main/java/com/gestioneleves/api/
│   │   │   ├── controller/           # Endpoints REST
│   │   │   ├── service/              # Logique métier
│   │   │   ├── repository/           # Repositories JPA
│   │   │   ├── entity/               # Entités JPA
│   │   │   ├── dto/                  # Data Transfer Objects
│   │   │   └── security/             # Configuration sécurité
│   │   ├── src/main/resources/
│   │   │   └── application.properties
│   │   ├── docker-compose.yml        # Orchestration Docker
│   │   ├── dockerfile                # Image Docker API
│   │   ├── pom.xml                   # Dépendances Maven
│   │   ├── rebuild.sh                # Script de déploiement
│   │   ├── TROUBLESHOOTING.md        # Guide de dépannage
│   │   └── FIXES_APPLIED.md          # Corrections appliquées
│   │
│   ├── frontnote/                    # Frontend React (Vite)
│   │   ├── src/
│   │   │   ├── core/                 # Utilitaires, constantes
│   │   │   ├── infrastructure/       # API clients, repositories
│   │   │   ├── domain/               # Hooks, contexts
│   │   │   ├── components/           # Composants UI
│   │   │   └── pages/                # Pages
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js
│   │   ├── ARCHITECTURE.md           # Architecture frontend
│   │   └── MIGRATION.md              # Guide de migration
│   │
│   ├── angular-springboot-app/       # Frontend Angular (SSR)
│   │   ├── src/app/
│   │   │   ├── infrastructure/       # Config, routes
│   │   │   ├── business-logic/       # Services, guards
│   │   │   ├── data-repository/      # Repositories
│   │   │   ├── use-cases/            # Use cases
│   │   │   └── presentation-UI/      # Composants
│   │   │       └── components/
│   │   │           ├── login/            # Connexion
│   │   │           ├── accueil-parents/  # Accueil
│   │   │           ├── class-group-page/ # Classes
│   │   │           ├── evaluations/      # Évaluations
│   │   │           └── bulletin/         # Bulletins
│   │   ├── package.json
│   │   ├── angular.json
│   │   ├── tailwind.config.js
│   │   └── README.md
│   │
│   ├── UML/                          # Diagrammes UML
│   │   ├── Diagramme cas d'utilisation.png
│   │   ├── Diagramme de classe UML.png
│   │   └── Diagramme de séquence.pdf
│   │
│   ├── CREDENTIALS_TEST.md           # Identifiants de test
│   └── README.md                     # Ce fichier
│
└── README.md                         # Documentation racine
```

---

## Documentation

### Backend

- [TROUBLESHOOTING.md](GestionElevesProject-JeMaTh/api/TROUBLESHOOTING.md) - Guide de dépannage
- [FIXES_APPLIED.md](GestionElevesProject-JeMaTh/api/FIXES_APPLIED.md) - Corrections appliquées
- [LOMBOK_IDE_SETUP.md](GestionElevesProject-JeMaTh/api/LOMBOK_IDE_SETUP.md) - Configuration Lombok IDE
- [PROBLEME_CACHE_DOCKER.md](GestionElevesProject-JeMaTh/api/PROBLEME_CACHE_DOCKER.md) - Problèmes de cache Docker

### Frontend

- [ARCHITECTURE.md](GestionElevesProject-JeMaTh/frontnote/ARCHITECTURE.md) - Architecture en couches
- [MIGRATION.md](GestionElevesProject-JeMaTh/frontnote/MIGRATION.md) - Guide de migration

### Autres

- [CREDENTIALS_TEST.md](GestionElevesProject-JeMaTh/CREDENTIALS_TEST.md) - Identifiants de test
- [GITBRANCH.md](GestionElevesProject-JeMaTh/GITBRANCH.md) - Stratégie de branches Git

---

## API Endpoints

### Authentification

```
POST   /api/login          # Connexion utilisateur
```

### Utilisateurs

```
GET    /api/users          # Liste utilisateurs
GET    /api/users/{id}     # Détails utilisateur
POST   /api/users          # Créer utilisateur
PUT    /api/users/{id}     # Modifier utilisateur
DELETE /api/users/{id}     # Supprimer utilisateur
```

### Élèves

```
GET    /api/students              # Liste élèves
GET    /api/students/{id}         # Détails élève
POST   /api/students              # Créer élève
PUT    /api/students/{id}         # Modifier élève
DELETE /api/students/{id}         # Supprimer élève
GET    /api/students/{id}/legal-guardians  # Tuteurs d'un élève
```

### Classes

```
GET    /api/classgroups           # Liste classes
GET    /api/classgroups/{id}      # Détails classe
POST   /api/classgroups           # Créer classe
PUT    /api/classgroups/{id}      # Modifier classe
DELETE /api/classgroups/{id}      # Supprimer classe
```

### Enseignements

```
GET    /api/teachings             # Liste enseignements
GET    /api/teachings/{id}        # Détails enseignement
POST   /api/teachings             # Créer enseignement
PUT    /api/teachings/{id}        # Modifier enseignement
DELETE /api/teachings/{id}        # Supprimer enseignement
```

### Évaluations

```
GET    /api/evaluations           # Liste évaluations
GET    /api/evaluations/{id}      # Détails évaluation
POST   /api/evaluations           # Créer évaluation
PUT    /api/evaluations/{id}      # Modifier évaluation
DELETE /api/evaluations/{id}      # Supprimer évaluation
```

### Bulletins scolaires

```
GET    /api/schoolreports         # Liste bulletins
GET    /api/schoolreports/{id}    # Détails bulletin
POST   /api/schoolreports         # Créer bulletin
```

Pour tester les endpoints, utilisez le fichier [api.http](GestionElevesProject-JeMaTh/api/api.http) avec l'extension REST Client de VS Code.

---

## Dépannage

### Problèmes courants

#### 1. Erreur de permission sur `target/`

```bash
cd GestionElevesProject-JeMaTh/api
./rebuild.sh
```

#### 2. Port déjà utilisé

```bash
# Vérifier quel processus utilise le port
sudo lsof -i :8081

# Arrêter Docker Compose
cd GestionElevesProject-JeMaTh/api
docker compose down
```

#### 3. Base de données inaccessible

```bash
# Vérifier que PostgreSQL tourne
docker compose ps db

# Voir les logs
docker compose logs db

# Réinitialiser complètement
docker compose down -v
docker compose up -d
```

#### 4. Erreurs de compilation MapStruct/Lombok

```bash
cd GestionElevesProject-JeMaTh/api
docker compose down -v
sudo rm -rf target/
docker compose build --no-cache
docker compose up -d
```

#### 5. Frontend React ne démarre pas

```bash
cd GestionElevesProject-JeMaTh/frontnote
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### 6. Frontend Angular ne démarre pas

```bash
cd GestionElevesProject-JeMaTh/angular-springboot-app
rm -rf node_modules package-lock.json
npm install
npm start
```

Consultez [TROUBLESHOOTING.md](GestionElevesProject-JeMaTh/api/TROUBLESHOOTING.md) pour plus de détails.

---

## Commandes utiles

### Backend

```bash
# Voir les conteneurs
docker compose ps

# Logs en temps réel
docker compose logs -f api

# Accéder au shell du conteneur
docker compose exec api /bin/bash

# Accéder à PostgreSQL
docker compose exec db psql -U jemath -d studentgestion

# Rebuild complet
docker compose down -v
sudo rm -rf target/
docker compose build --no-cache
docker compose up -d
```

### Frontend React

```bash
# Démarrer le serveur de dev
npm run dev

# Build de production
npm run build

# Linter
npm run lint

# Preview de production
npm run preview
```

### Frontend Angular

```bash
# Démarrer le serveur de dev
npm start   # ou ng serve

# Build de production
npm run build

# Tests unitaires
npm test

# Build avec watch
npm run watch

# Serveur SSR
npm run serve:ssr:angular-springboot-app
```

---

## Corrections appliquées (24 Nov 2024)

### Backend

- Remplacement `@Builder` par `@SuperBuilder` pour l'héritage des entités
- Création du script `rebuild.sh` pour résoudre les problèmes de permissions Docker
- Documentation complète de dépannage
- Configuration CORS pour le frontend

### Frontend React

- Migration vers architecture en 3 couches (Core/Infrastructure/Domain)
- Correction de la boucle infinie dans AuthContext
- Normalisation des rôles utilisateur
- Création de hooks React personnalisés (useAuth, useTeachings, etc.)
- Implémentation de repositories et API clients

### Frontend Angular

- Architecture Clean Architecture (Infrastructure/Business/Data/UseCase/UI)
- Authentification JWT avec role guard
- Interface spécialisée pour parents/tuteurs légaux
- SSR (Server-Side Rendering) avec Express
- TailwindCSS 4 pour le styling

**Tout fonctionne maintenant !**

---

## Contributeurs

Projet développé par l'équipe JeMaTh dans le cadre d'un projet de gestion scolaire.

---

## Licence

Ce projet est à usage éducatif uniquement.

---

## Support

Pour toute question ou problème :
1. Consultez la [documentation](#documentation)
2. Vérifiez le [guide de dépannage](#dépannage)
3. Contactez l'équipe de développement
