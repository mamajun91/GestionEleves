# 🔧 Résolution des problèmes Backend

## Problème : Erreurs de permission sur le dossier `target/`

### Symptômes
```
Failed to delete /path/to/target/generated-sources/...
Permission denied
```

### Cause
Les fichiers dans `target/` ont été créés par Docker avec les permissions root.

### Solution

**Option 1 : Script automatique (recommandé)**
```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/api
./rebuild.sh
```

**Option 2 : Commandes manuelles**
```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/api

# 1. Arrêter les conteneurs
docker compose down

# 2. Nettoyer le dossier target avec sudo
sudo rm -rf target/

# 3. Reconstruire l'image Docker
docker compose build --no-cache

# 4. Redémarrer
docker compose up -d

# 5. Voir les logs
docker compose logs api -f
```

---

## Problème : L'API ne démarre pas

### Vérifier les logs
```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/api
docker compose logs api --tail=100
```

### Vérifier que les conteneurs tournent
```bash
docker compose ps
```

### Redémarrer proprement
```bash
docker compose restart api
```

---

## Problème : Erreurs de compilation MapStruct/Lombok

### Symptômes
```
cannot find symbol: method builder()
```

### Solution
Les fichiers générés par MapStruct sont peut-être corrompus.

```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/api

# Arrêter et nettoyer complètement
docker compose down -v
sudo rm -rf target/

# Reconstruire from scratch
docker compose build --no-cache
docker compose up -d
```

---

## Problème : Base de données PostgreSQL ne se connecte pas

### Vérifier que PostgreSQL tourne
```bash
docker compose ps db
```

### Voir les logs de PostgreSQL
```bash
docker compose logs db --tail=50
```

### Réinitialiser complètement la base de données
```bash
# ⚠️ ATTENTION : Ceci supprime toutes les données !
docker compose down -v
docker compose up -d
```

---

## Problème : Port 8081 déjà utilisé

### Trouver quel processus utilise le port
```bash
sudo lsof -i :8081
```

### Arrêter le processus
```bash
# Si c'est Docker
docker compose down

# Si c'est un autre processus
sudo kill -9 <PID>
```

---

## Problème : CORS errors depuis le frontend

### Vérifier la configuration CORS
Le fichier `src/main/java/com/gestioneleves/api/security/SecurityConfiguration.java` doit contenir :

```java
.cors(cors -> cors.configurationSource(request -> {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("http://localhost:5173"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);
    return config;
}))
```

---

## Commandes utiles

### Voir tous les conteneurs
```bash
docker compose ps -a
```

### Voir les logs en temps réel
```bash
docker compose logs -f api
```

### Accéder au shell du conteneur API
```bash
docker compose exec api /bin/bash
```

### Accéder à PostgreSQL
```bash
docker compose exec db psql -U postgres -d gestion_eleves
```

### Rebuild complet sans cache
```bash
docker compose down -v
sudo rm -rf target/
docker compose build --no-cache
docker compose up -d
```

### Vérifier l'état de santé de l'API
```bash
curl http://localhost:8081/actuator/health
```

---

## Checklist de démarrage

Avant de commencer le développement, vérifiez :

- [ ] Docker est démarré : `docker ps`
- [ ] Les conteneurs tournent : `docker compose ps`
- [ ] L'API répond : `curl http://localhost:8081/actuator/health`
- [ ] La base de données est accessible : `docker compose exec db psql -U postgres -d gestion_eleves -c "SELECT 1;"`
- [ ] Pas d'erreurs dans les logs : `docker compose logs api --tail=20`

---

## Ressources

- [Docker Compose documentation](https://docs.docker.com/compose/)
- [Spring Boot documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [MapStruct documentation](https://mapstruct.org/)
- [Lombok documentation](https://projectlombok.org/)
