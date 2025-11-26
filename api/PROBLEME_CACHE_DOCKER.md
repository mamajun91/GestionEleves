# 🔧 Problème : Docker utilise une ancienne version en cache

## Date : 24 Novembre 2024 - 16h30

---

## ❌ Symptôme

La compilation échoue avec cette erreur :

```
[ERROR] /app/src/main/java/com/gestioneleves/api/entity/AppUser.java:[33,18] cannot find symbol
  symbol:   class Default
  location: @interface lombok.experimental.SuperBuilder
```

**MAIS** quand on vérifie les fichiers localement :

```bash
grep "@Builder.Default\|@SuperBuilder.Default" src/main/java/com/gestioneleves/api/entity/*.java
# Résultat : Tous les fichiers ont @Builder.Default (CORRECT!)
```

---

## 🔍 Cause racine

**Docker utilise une ancienne version des fichiers mise en cache !**

Le problème :
1. Les fichiers sources sur votre disque sont corrects (`@Builder.Default`)
2. Docker a mis en cache une **ancienne couche** avec `@SuperBuilder.Default` (incorrect)
3. Quand on fait `docker compose build --no-cache`, cela ne suffit pas toujours
4. Docker peut réutiliser des couches intermédiaires même avec `--no-cache`

---

## ✅ Solution : Forcer un rebuild COMPLET

### Option 1 : Script automatique (RECOMMANDÉ)

J'ai créé un script qui nettoie TOUT le cache Docker :

```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/api
./rebuild-force.sh
```

**Ce que fait le script :**
1. Arrête tous les conteneurs
2. Supprime le dossier `target/`
3. Supprime TOUTES les images Docker du projet (`--rmi all`)
4. Nettoie le cache de build Docker (`docker builder prune`)
5. Rebuild complet avec `--no-cache --pull` (télécharge même les images de base)
6. Démarre les conteneurs
7. Vérifie que l'API fonctionne

---

### Option 2 : Commandes manuelles

Si vous préférez exécuter les commandes une par une :

```bash
# 1. Arrêter et nettoyer complètement
sudo docker compose down -v --rmi all
rm -rf target/

# 2. Nettoyer le cache de build Docker (CRITIQUE!)
sudo docker builder prune -f

# 3. Rebuild complet
sudo docker compose build --no-cache --pull

# 4. Démarrer
sudo docker compose up -d

# 5. Vérifier les logs
sudo docker compose logs api --tail=100
```

---

## 📋 Vérification que ça a marché

### 1. Vérifier qu'il n'y a pas d'erreur de compilation

```bash
sudo docker compose logs api | grep "BUILD SUCCESS"
```

**Résultat attendu :**
```
[INFO] BUILD SUCCESS
```

### 2. Vérifier qu'il n'y a pas d'erreur @SuperBuilder.Default

```bash
sudo docker compose logs api | grep "@SuperBuilder.Default"
```

**Résultat attendu :** Aucune ligne (la commande ne renvoie rien)

### 3. Tester l'API

```bash
curl http://localhost:8081/actuator/health
```

**Résultat attendu :**
```json
{"status":"UP"}
```

---

## 🧪 Preuve que les fichiers sont corrects

Voici la vérification que les fichiers sources sont bien corrects :

```bash
cd /home/kellamkouam/Bureau/GestionEleves/GestionElevesProject-JeMaTh/api
grep -n "@Builder.Default\|@SuperBuilder.Default" \
  src/main/java/com/gestioneleves/api/entity/AppUser.java \
  src/main/java/com/gestioneleves/api/entity/Student.java
```

**Résultat :**
```
src/main/java/com/gestioneleves/api/entity/AppUser.java:33:    @Builder.Default
src/main/java/com/gestioneleves/api/entity/AppUser.java:54:    @Builder.Default
src/main/java/com/gestioneleves/api/entity/AppUser.java:61:    @Builder.Default
src/main/java/com/gestioneleves/api/entity/Student.java:43:    @Builder.Default
src/main/java/com/gestioneleves/api/entity/Student.java:48:    @Builder.Default
src/main/java/com/gestioneleves/api/entity/Student.java:53:    @Builder.Default
src/main/java/com/gestioneleves/api/entity/Student.java:62:    @Builder.Default
```

✅ Tous les fichiers ont `@Builder.Default` (correct!)
❌ Aucun fichier n'a `@SuperBuilder.Default` (l'erreur)

**Conclusion : Le problème est bien le cache Docker, pas les fichiers sources !**

---

## 🎯 Pourquoi `--no-cache` ne suffit pas ?

Docker a **plusieurs niveaux de cache** :

1. **Cache des couches d'images** : Supprimé par `--no-cache`
2. **Cache du builder BuildKit** : Supprimé par `docker builder prune`
3. **Images téléchargées** : Supprimées par `--rmi all`

Pour un nettoyage complet, il faut les 3 !

---

## 📚 Références

- [Docker BuildKit cache](https://docs.docker.com/build/cache/)
- [docker builder prune](https://docs.docker.com/engine/reference/commandline/builder_prune/)
- [docker compose build --no-cache](https://docs.docker.com/compose/reference/build/)

---

## ⚠️ Note importante

**Après avoir exécuté `rebuild-force.sh`, votre backend devrait compiler sans erreur.**

Si vous voyez encore l'erreur `@SuperBuilder.Default`, c'est que :
1. Le script n'a pas été exécuté complètement
2. Il y a un problème de permissions (utilisez `sudo` pour toutes les commandes Docker)
3. Les fichiers ont été modifiés entre-temps

**Solution :** Relancer le script et vérifier qu'il se termine avec `✅ BUILD SUCCESS`
