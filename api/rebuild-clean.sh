#!/bin/bash

# Script pour reconstruire le backend avec nettoyage complet du cache Docker
# Ce script résout les problèmes de cache et recompile tout

set -e  # Arrêter en cas d'erreur

echo "================================================"
echo "🔧 Reconstruction complète avec nettoyage cache"
echo "================================================"
echo ""

echo "1️⃣  Arrêt des conteneurs..."
docker compose down 2>/dev/null || true

echo ""
echo "2️⃣  Nettoyage des fichiers générés..."
rm -rf target/
echo "   ✓ Dossier target/ supprimé"

echo ""
echo "3️⃣  Suppression complète des images Docker (pour forcer rebuild)..."
docker compose down -v --rmi all 2>/dev/null || true
echo "   ✓ Images Docker supprimées"

echo ""
echo "4️⃣  Nettoyage du cache de build Docker..."
docker builder prune -f
echo "   ✓ Cache de build nettoyé"

echo ""
echo "5️⃣  Reconstruction de l'image Docker (sans cache)..."
docker compose build --no-cache --pull

echo ""
echo "6️⃣  Démarrage des conteneurs..."
docker compose up -d

echo ""
echo "7️⃣  Vérification de l'état des conteneurs..."
sleep 5
docker compose ps

echo ""
echo "8️⃣  Attente du démarrage complet de l'API (30 secondes)..."
for i in {1..30}; do
    echo -n "."
    sleep 1
done
echo ""

echo ""
echo "📋 Affichage des logs récents..."
echo "================================================"
docker compose logs api --tail=50

echo ""
echo "================================================"
echo "✅ Backend reconstruit avec succès !"
echo "================================================"
echo ""
echo "🌐 URLs disponibles:"
echo "   - API: http://localhost:8081"
echo "   - Health Check: http://localhost:8081/actuator/health"
echo ""
echo "📝 Commandes utiles:"
echo "   - Voir les logs en direct: docker compose logs -f api"
echo "   - Arrêter: docker compose down"
echo "   - Redémarrer: docker compose restart api"
echo ""
