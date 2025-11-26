# Credentials de Test - GestionEleves

## Mot de passe universel pour TOUS les comptes de test

**Mot de passe : `password`**

Tous les comptes listés ci-dessous utilisent le même mot de passe : `password`

## Comptes Admin

| Username | Email | Rôle |
|----------|-------|------|
| jdupont | jean.dupont@school.fr | ADMIN |

## Comptes Enseignants (TEACHER)

| Username | Email | Nom |
|----------|-------|-----|
| smartin | sophie.martin@school.fr | Sophie Martin |
| lmoreau | luc.moreau@school.fr | Luc Moreau |
| idurand | isabelle.durand@school.fr | Isabelle Durand |
| tpetit | thomas.petit@school.fr | Thomas Petit |
| jrobert | julie.robert@school.fr | Julie Robert |
| nbernard | nicolas.bernard@school.fr | Nicolas Bernard |
| hlefevre | helene.lefevre@school.fr | Hélène Lefevre |
| pgarcia | pierre.garcia@school.fr | Pierre Garcia |
| lfaure | laura.faure@school.fr | Laura Faure |
| eblanc | emilie.blanc@school.fr | Émilie Blanc |
| orousseau | olivier.rousseau@school.fr | Olivier Rousseau |
| agermain | anne.germain@school.fr | Anne Germain |
| fdumas | francois.dumas@school.fr | François Dumas |
| cmercier | caroline.mercier@school.fr | Caroline Mercier |
| ddubois | david.dubois@school.fr | David Dubois |

## Comptes Parents (LEGAL_GUARDIAN)

| Username | Email | Nom |
|----------|-------|-----|
| stesteur | sophie.testeur@gmail.com | Sophie Testeur |
| mrenard | marc.renard@gmail.com | Marc Renard |
| fboulanger | fatima.boulanger@gmail.com | Fatima Boulanger |
| vcarpentier | vincent.carpentier@gmail.com | Vincent Carpentier |
| clegrand | claire.legrand@gmail.com | Claire Legrand |
| abenali | ahmed.benali@gmail.com | Ahmed Benali |
| nbenali | nadia.benali@gmail.com | Nadia Benali |
| cgirard | camille.girard@gmail.com | Camille Girard |
| pgirard | paul.girard@gmail.com | Paul Girard |
| llemoine | lucie.lemoine@gmail.com | Lucie Lemoine |
| smorel | stephane.morel@gmail.com | Stéphane Morel |

## Exemple d'utilisation

### Via cURL
```bash
curl -X POST http://localhost:8081/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"jdupont","password":"password"}'
```

### Via le formulaire Web
- URL : http://localhost:5173/login (ou le port de votre frontend)
- Nom d'utilisateur : `jdupont` (ou n'importe quel username ci-dessus)
- Mot de passe : `password`

## Notes importantes

1. **Tous les mots de passe sont identiques** : `password`
2. Les mots de passe sont stockés en BCrypt dans la base de données
3. Le hash BCrypt correspondant à "password" est : `$2a$10$sAZzPFV/DX7lu2JGVN7db.eoF6xtR7gItaCZ5vm68ixoHcqxZzTI2`
4. Ces credentials ne doivent être utilisés qu'en environnement de développement/test
