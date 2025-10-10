# Configuration de Sécurité - RZ TRANSPORT

Ce document explique les mesures de sécurité mises en place pour le site web RZ TRANSPORT.

## Headers de Sécurité

### Fichiers de Configuration

Deux fichiers de configuration sont fournis selon votre hébergement :

1. **`.htaccess`** - Pour serveurs Apache
2. **`_headers`** - Pour Netlify, Cloudflare Pages, ou hébergements similaires

### Headers Configurés

#### 1. X-Frame-Options
```
X-Frame-Options: SAMEORIGIN
```
Empêche l'affichage du site dans une iframe provenant d'un autre domaine (protection contre le clickjacking).

#### 2. X-Content-Type-Options
```
X-Content-Type-Options: nosniff
```
Empêche les navigateurs de deviner le type MIME des fichiers.

#### 3. X-XSS-Protection
```
X-XSS-Protection: 1; mode=block
```
Active la protection XSS du navigateur.

#### 4. Referrer-Policy
```
Referrer-Policy: strict-origin-when-cross-origin
```
Contrôle les informations de référence envoyées lors de la navigation.

#### 5. Permissions-Policy
```
Permissions-Policy: geolocation=(), microphone=(), camera=()
```
Désactive l'accès aux APIs sensibles non utilisées par le site.

#### 6. Content-Security-Policy (CSP)
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:; connect-src 'self';
```
Définit les sources autorisées pour le contenu du site.

#### 7. Strict-Transport-Security (HSTS)
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```
Force l'utilisation de HTTPS. **À activer uniquement après le déploiement avec certificat SSL.**

## Configuration de Cache

### Images
- **Durée**: 1 an
- **Type**: Immutable
- Extensions: `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp`

### CSS et JavaScript
- **Durée**: 1 mois
- Extensions: `.css`, `.js`

### HTML
- **Durée**: Pas de cache
- Headers: `no-cache, must-revalidate`

## Activation des Headers

### Apache
1. Assurez-vous que `mod_headers` et `mod_expires` sont activés
2. Le fichier `.htaccess` est déjà configuré
3. Vérifiez que le serveur autorise les fichiers `.htaccess`

### Netlify
1. Le fichier `_headers` est automatiquement détecté
2. Aucune configuration supplémentaire nécessaire

### Nginx
Ajoutez dans votre bloc `server {}` :

```nginx
# Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';" always;

# Cache configuration
location ~* \.(jpg|jpeg|png|gif|svg|webp|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(css|js)$ {
    expires 1M;
    add_header Cache-Control "public";
}

location ~* \.(html|htm)$ {
    expires -1;
    add_header Cache-Control "no-cache, must-revalidate";
}
```

## Vérification de la Sécurité

Testez vos headers de sécurité avec :
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

## Bonnes Pratiques

1. **HTTPS Obligatoire** : Toujours utiliser HTTPS en production
2. **Mise à jour régulière** : Gardez les dépendances à jour
3. **Monitoring** : Surveillez les logs pour détecter les anomalies
4. **Backup** : Sauvegardez régulièrement le site
5. **Test** : Testez les changements avant la mise en production

## Support

Pour toute question de sécurité, contactez : contact@rztrans.com
