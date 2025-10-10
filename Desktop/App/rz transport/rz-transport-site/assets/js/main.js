/**
 * RZ TRANSPORT - Main JavaScript Module
 * Optimized ES6+ version with error handling and performance improvements
 */
(function() {
  'use strict';

  // Cache DOM queries for performance
  const DOM = {
    get headerHost() { return document.getElementById('site-header'); },
    get footerHost() { return document.getElementById('site-footer'); },
    get yearEl() { return document.getElementById('year'); },
    get contactForm() { return document.getElementById('contact-form'); },
    get formStatus() { return document.getElementById('form-status'); }
  };

  /**
   * Set current year in footer
   */
  function setYear() {
    const yearEl = DOM.yearEl;
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /**
   * Apply configuration values to DOM elements with data-config attributes
   */
  function applyConfig() {
    const cfg = window.RZ_CONFIG || {};
    const configMap = {
      address: cfg.address,
      email: cfg.email,
      phone: cfg.phone
    };

    // Apply text content
    document.querySelectorAll('[data-config]').forEach(el => {
      const key = el.getAttribute('data-config');
      if (configMap[key]) {
        el.textContent = configMap[key];
      }
    });

    // Apply href attributes
    const emailHref = document.querySelector('[data-config="email_href"]');
    if (emailHref && cfg.email) {
      emailHref.setAttribute('href', `mailto:${cfg.email}`);
      emailHref.setAttribute('aria-label', `Envoyer un email à ${cfg.email}`);
    }

    const phoneHref = document.querySelector('[data-config="phone_href"]');
    if (phoneHref && cfg.phone) {
      const cleanPhone = cfg.phone.replace(/\s+/g, '');
      phoneHref.setAttribute('href', `tel:${cleanPhone}`);
      phoneHref.setAttribute('aria-label', `Appeler ${cfg.phone}`);
    }
  }

  /**
   * Load HTML partials (header & footer) with error handling
   */
  async function loadPartials() {
    const partials = [
      { url: 'partials/header.html', host: DOM.headerHost },
      { url: 'partials/footer.html', host: DOM.footerHost }
    ];

    try {
      const promises = partials.map(async ({ url, host }) => {
        if (!host) return;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to load ${url}: ${response.status}`);
        }

        const html = await response.text();
        host.innerHTML = html;
      });

      await Promise.all(promises);

      // Apply config and year after partials are loaded
      setYear();
      applyConfig();
    } catch (error) {
      console.error('Error loading partials:', error);
      // Fallback: show basic header/footer
      if (DOM.headerHost) {
        DOM.headerHost.innerHTML = '<div class="site-header"><div class="container"><a href="index.html" class="brand">RZ TRANSPORT</a></div></div>';
      }
    }
  }

  /**
   * Initialize contact form with validation and mailto submission
   */
  function initContactForm() {
    const form = DOM.contactForm;
    if (!form) return;

    const status = DOM.formStatus;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Validate required fields
      if (!data.name || !data.email || !data.message) {
        if (status) {
          status.textContent = 'Veuillez remplir tous les champs obligatoires.';
          status.style.color = '#dc2626';
        }
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        if (status) {
          status.textContent = 'Veuillez entrer une adresse email valide.';
          status.style.color = '#dc2626';
        }
        return;
      }

      // Success message
      if (status) {
        status.textContent = 'Merci ! Votre message est prêt à être envoyé.';
        status.style.color = '#157347';
      }

      // Prepare mailto link
      const contactEmail = window.RZ_CONFIG?.email || 'contact@rztrans.com';
      const mailto = `mailto:${contactEmail}` +
        `?subject=${encodeURIComponent('Demande via le site')}` +
        `&body=${encodeURIComponent(
          `Nom: ${data.name}\n` +
          `Email: ${data.email}\n` +
          `Téléphone: ${data.phone || 'Non renseigné'}\n\n` +
          `Message:\n${data.message}`
        )}`;

      // Open mailto and reset form
      setTimeout(() => {
        window.location.href = mailto;
        form.reset();
        if (status) {
          status.textContent = '';
        }
      }, 500);
    });

    // Real-time validation feedback
    const emailInput = form.querySelector('[name="email"]');
    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
          emailInput.setCustomValidity('Adresse email invalide');
          emailInput.reportValidity();
        } else {
          emailInput.setCustomValidity('');
        }
      });
    }
  }

  /**
   * Initialize app when DOM is ready
   */
  function init() {
    loadPartials();
    applyConfig();
    initContactForm();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded
    init();
  }
})();