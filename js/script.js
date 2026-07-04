/* ==========================================================================
   PC SOLUCIÓN EXPRESS — script.js
   JavaScript puro, sin dependencias. Se comparte entre todas las páginas.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Menú móvil ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Cierra el menú al elegir una opción (útil en móvil)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Marca el enlace activo del menú según la página actual ---------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href').split('#')[0] || 'index.html';
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* ---------- Acordeón de preguntas frecuentes ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      // Cierra las demás preguntas abiertas (comportamiento tipo acordeón)
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Formulario de contacto -> mailto ---------- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nombre = document.getElementById('nombre').value.trim();
      var apellidos = document.getElementById('apellidos').value.trim();
      var celular = document.getElementById('celular').value.trim();
      var problema = document.getElementById('problema').value.trim();

      var asunto = 'Solicitud de servicio';
      var cuerpo =
        'Nombre: ' + nombre + '\n' +
        'Apellidos: ' + apellidos + '\n' +
        'Celular: ' + celular + '\n' +
        'Problema: ' + problema;

      var mailtoUrl =
        'mailto:pcsolucionexpress@gmail.com' +
        '?subject=' + encodeURIComponent(asunto) +
        '&body=' + encodeURIComponent(cuerpo);

      window.location.href = mailtoUrl;

      // Muestra un mensaje de confirmación visual
      var successBox = document.getElementById('form-success');
      if (successBox) {
        successBox.classList.add('show');
        setTimeout(function () {
          successBox.classList.remove('show');
        }, 6000);
      }

      contactForm.reset();
    });
  }

  /* ---------- Año automático en el footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Revelado suave al hacer scroll ---------- */
  var revealTargets = document.querySelectorAll(
    '.service-card, .why-card, .price-card, .process-step, .diff-item, .quick-contact-card'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Sombra de navbar al hacer scroll ---------- */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    var onScroll = function () {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 8px 24px rgba(14, 63, 110, 0.10)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

});
