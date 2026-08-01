/* ═══════════════════════════════════════════════════════════
   Iurisdictio Derecho — interacciones
   Vanilla JS, sin dependencias. Todo degrada sin romper nada.
   ═══════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Año dinámico en el footer ───────────────────────── */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ── Nav: estado "pegado" + WhatsApp flotante ────────── */
  const nav = document.getElementById('nav');
  const fab = document.getElementById('fab');
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-stuck', y > 24);
    if (fab) fab.classList.toggle('is-on', y > 420);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ── Menú móvil ──────────────────────────────────────── */
  const burger = document.getElementById('burger');
  const mmenu  = document.getElementById('mobilemenu');

  const closeMenu = () => {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
    mmenu.hidden = true;
    document.body.style.overflow = '';
  };

  if (burger && mmenu) {
    burger.addEventListener('click', () => {
      if (burger.getAttribute('aria-expanded') === 'true') { closeMenu(); return; }
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Cerrar menú');
      mmenu.hidden = false;
      document.body.style.overflow = 'hidden';
    });

    mmenu.addEventListener('click', e => {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !mmenu.hidden) { closeMenu(); burger.focus(); }
    });
  }

  /* ── Reveal on scroll ────────────────────────────────── */
  const revealables = document.querySelectorAll('.reveal');

  if (reduce || !('IntersectionObserver' in window)) {
    revealables.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(el => io.observe(el));
  }

  /* ── Foliatura viva: qué hoja del expediente se está leyendo ─
     Un solo observer sobre las secciones; gana la más visible.  */
  const folio      = document.getElementById('folio');
  const folioN     = document.getElementById('folioN');
  const folioLabel = document.getElementById('folioLabel');
  const sections   = [...document.querySelectorAll('[data-folio]')];
  const navLinks   = [...document.querySelectorAll('.nav__links a')];

  // Las secciones sobre fondo oscuro necesitan el folio en claro
  const isDark = s => s.matches('.cover, .prev, .contact');

  if (folio && sections.length) {
    let current = null;

    const setFolio = section => {
      if (section === current) return;
      current = section;

      folio.classList.add('is-swapping');
      folio.style.color = isDark(section) ? '#8C8272' : '#A79E8B';

      window.setTimeout(() => {
        folioN.textContent     = section.dataset.folio;
        folioLabel.textContent = section.dataset.label;
        folio.classList.remove('is-swapping');
      }, reduce ? 0 : 180);

      const id = section.id;
      navLinks.forEach(a => {
        a.classList.toggle('is-here', Boolean(id) && a.getAttribute('href') === '#' + id);
      });
    };

    if ('IntersectionObserver' in window) {
      const seen = new Map();

      const folioIO = new IntersectionObserver(entries => {
        entries.forEach(e => seen.set(e.target, e.intersectionRatio));

        let best = null, bestRatio = 0;
        seen.forEach((ratio, el) => {
          if (ratio > bestRatio) { bestRatio = ratio; best = el; }
        });
        if (best) setFolio(best);
      }, { threshold: [0, .15, .35, .55, .75, 1] });

      sections.forEach(s => folioIO.observe(s));
    }
  }

  /* ── Acordeones: índice de áreas y consultas ─────────────
     Ambos usan <details> nativo (teclado, ARIA y fallback sin
     JS gratis por parte del navegador). Solo agregamos la regla
     de "un panel abierto a la vez" dentro de cada grupo. ── */
  const closeSiblingsOnOpen = group => {
    group.forEach(item => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        group.forEach(other => { if (other !== item) other.open = false; });
      });
    });
  };
  closeSiblingsOnOpen(document.querySelectorAll('.qa'));
  closeSiblingsOnOpen(document.querySelectorAll('.toc__det'));

  /* ── Scroll suave con foco que sigue al destino ──────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      // Sin esto, el teclado se queda arriba mientras la página baja
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
})();
