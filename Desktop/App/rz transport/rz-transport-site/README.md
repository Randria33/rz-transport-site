# RZ TRANSPORT - Site Web Officiel

Site web moderne et optimisé pour RZ TRANSPORT, spécialiste du transport et de la livraison dernier kilomètre en Île-de-France.

## 🚀 Caractéristiques

- ⚡ **Performance optimale** - Chargement rapide, lazy loading, fonts optimisées
- 🔍 **SEO avancé** - Meta tags, Schema.org, sitemap.xml, Open Graph
- ♿ **Accessible** - Conformité WCAG 2.1, navigation clavier, ARIA labels
- 🔒 **Sécurisé** - Headers CSP, protection XSS, configuration Apache/Netlify
- 📱 **Responsive** - Design adaptatif pour tous les appareils

## 📋 Technologies

- HTML5 sémantique
- CSS3 moderne avec variables CSS
- JavaScript ES6+ (async/await, modules)
- Schema.org JSON-LD
- Google Fonts (Inter)

## 📁 Structure du Projet

```
rz-transport-site/
├── index.html              # Page d'accueil
├── contact.html            # Formulaire de contact
├── services.html           # Page services
├── fleet.html              # Page flotte
├── about.html              # Page à propos
├── jobs.html               # Page emploi
├── sitemap.xml             # Sitemap pour SEO
├── robots.txt              # Configuration robots
├── .htaccess               # Headers sécurité Apache
├── _headers                # Headers sécurité Netlify
├── SECURITY.md             # Documentation sécurité
├── OPTIMIZATIONS.md        # Documentation des optimisations
├── assets/
│   ├── css/
│   │   └── styles.css      # Styles principaux
│   ├── js/
│   │   ├── config.js       # Configuration
│   │   └── main.js         # JavaScript principal
│   └── img/
│       └── logo-rz.png     # Logo
└── partials/
    ├── header.html         # En-tête
    └── footer.html         # Pied de page
```

## 🛠️ Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/rz-transport-site.git
   cd rz-transport-site
   ```

2. **Ouvrir le site**
   - Méthode simple : Double-cliquer sur `index.html`
   - Avec serveur local :
     ```bash
     # Python
     python -m http.server 8000

     # Node.js
     npx serve

     # PHP
     php -S localhost:8000
     ```

3. **Accéder au site**
   ```
   http://localhost:8000
   ```

## 🚀 Déploiement

### Netlify (Recommandé)

1. Connectez votre repo GitHub
2. Configuration automatique
3. Deploy !

### Apache

1. Upload tous les fichiers via FTP
2. Le fichier `.htaccess` configure automatiquement les headers
3. Vérifier que `mod_headers` et `mod_expires` sont activés

### Nginx

Ajouter dans la configuration (voir `SECURITY.md` pour détails) :
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Content-Security-Policy "default-src 'self'..." always;
```

## 📊 Scores de Performance

### Google Lighthouse
- **Performance** : 90-95
- **SEO** : 95-100
- **Accessibility** : 95-100
- **Best Practices** : 95-100

### Sécurité
- **Security Headers** : A+
- **Mozilla Observatory** : A+

## 🔧 Configuration

### Modifier les informations de contact

Éditez `assets/js/config.js` :

```javascript
window.RZ_CONFIG = {
  company: 'RZ TRANSPORT',
  address: '122 Rue Amelot, 75011 Paris',
  email: 'contact@rztrans.com',
  phone: '+33 6 33 32 22 54'
};
```

### Modifier le domaine

Remplacez `https://www.rztrans.com` dans :
- Tous les fichiers HTML (meta tags Open Graph)
- `sitemap.xml`
- `robots.txt`

## 📚 Documentation

- **[OPTIMIZATIONS.md](OPTIMIZATIONS.md)** - Documentation complète des optimisations
- **[SECURITY.md](SECURITY.md)** - Guide de configuration sécurité

## ✅ Tests Recommandés

### Performance
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### SEO
- [Google Search Console](https://search.google.com/search-console)
- [Rich Results Test](https://search.google.com/test/rich-results)

### Accessibilité
- [WAVE](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### Sécurité
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)

## 🤝 Contribuer

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit les changements (`git commit -m 'Ajout fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📄 Licence

© 2025 RZ TRANSPORT. Tous droits réservés.

## 📞 Contact

- **Email** : contact@rztrans.com
- **Téléphone** : +33 6 33 32 22 54
- **Adresse** : 122 Rue Amelot, 75011 Paris

---

**Optimisé avec** Claude Code | **Version** 1.0.0 | **Date** 10 octobre 2025
