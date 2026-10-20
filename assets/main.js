document.addEventListener('DOMContentLoaded', function() {
  // 1. Up-Scroll Sticky Header (hides on scroll down, shows on scroll up)
  var siteHeader = document.getElementById('site-sticky-header');
  var lastScrollY = window.scrollY || 0;
  if (siteHeader) {
    window.addEventListener('scroll', function() {
      var currentY = window.scrollY || 0;
      if (currentY < 90) {
        siteHeader.style.transform = 'translateY(0)';
      } else if (currentY < lastScrollY - 4) {
        siteHeader.style.transform = 'translateY(0)';
      } else if (currentY > lastScrollY + 8 && currentY > 150) {
        siteHeader.style.transform = 'translateY(-100%)';
      }
      lastScrollY = currentY;
    }, { passive: true });
  }

  // 2. Mobile Menu Drawer Toggle
  var menuBtn = document.getElementById('mobile-menu-btn');
  var mobileNav = document.getElementById('mobile-nav-drawer');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('hidden');
    });
  }

  // 3. Hero Photo Slider (Auto-Carousel)
  var slides = document.querySelectorAll('[data-hero-slide]');
  var dots = document.querySelectorAll('[data-hero-dot]');
  var prevBtn = document.getElementById('hero-prev-btn');
  var nextBtn = document.getElementById('hero-next-btn');
  var currentSlide = 0;

  function showSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach(function(s, i) {
      if (i === currentSlide) {
        s.classList.remove('opacity-0', 'pointer-events-none');
        s.classList.add('opacity-100', 'z-10');
      } else {
        s.classList.remove('opacity-100', 'z-10');
        s.classList.add('opacity-0', 'pointer-events-none');
      }
    });
    dots.forEach(function(d, i) {
      if (i === currentSlide) {
        d.className = 'h-2 w-6 rounded-full bg-amber-400 transition-all cursor-pointer';
      } else {
        d.className = 'h-2 w-2 rounded-full bg-white/50 hover:bg-white transition-all cursor-pointer';
      }
    });
  }

  if (slides.length > 1) {
    setInterval(function() { showSlide(currentSlide + 1); }, 4500);
    if (prevBtn) prevBtn.addEventListener('click', function() { showSlide(currentSlide - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { showSlide(currentSlide + 1); });
    dots.forEach(function(dot, idx) {
      dot.addEventListener('click', function() { showSlide(idx); });
    });
  }

  // 4. Recent Activities Full-Page Auto Carousel
  var actSlides = document.querySelectorAll('[data-activity-slide]');
  var actMobileCaptions = document.querySelectorAll('[data-activity-mobile-caption]');
  var actDots = document.querySelectorAll('[data-activity-dot]');
  var actMobileDots = document.querySelectorAll('[data-activity-mobile-dot]');
  var actPrev = document.getElementById('act-prev-btn');
  var actNext = document.getElementById('act-next-btn');
  var currentAct = 0;

  function showActSlide(idx) {
    if (!actSlides.length) return;
    currentAct = (idx + actSlides.length) % actSlides.length;
    actSlides.forEach(function(s, i) {
      if (i === currentAct) {
        s.classList.remove('opacity-0', 'pointer-events-none');
        s.classList.add('opacity-100', 'z-10');
      } else {
        s.classList.remove('opacity-100', 'z-10');
        s.classList.add('opacity-0', 'pointer-events-none');
      }
    });
    actMobileCaptions.forEach(function(c, i) {
      if (i === currentAct) {
        c.classList.remove('hidden');
        c.classList.add('block');
      } else {
        c.classList.remove('block');
        c.classList.add('hidden');
      }
    });
    actDots.forEach(function(d, i) {
      if (i === currentAct) {
        d.className = 'h-2 w-8 rounded-full bg-amber-400 transition-all cursor-pointer';
      } else {
        d.className = 'h-2 w-2 rounded-full bg-white/45 hover:bg-white transition-all cursor-pointer';
      }
    });
    actMobileDots.forEach(function(d, i) {
      if (i === currentAct) {
        d.className = 'h-1.5 w-6 rounded-full bg-emerald-800 transition-all cursor-pointer';
      } else {
        d.className = 'h-1.5 w-1.5 rounded-full bg-slate-300 transition-all cursor-pointer';
      }
    });
  }

  if (actSlides.length > 1) {
    setInterval(function() { showActSlide(currentAct + 1); }, 4800);
    if (actPrev) actPrev.addEventListener('click', function() { showActSlide(currentAct - 1); });
    if (actNext) actNext.addEventListener('click', function() { showActSlide(currentAct + 1); });
    actDots.forEach(function(dot, idx) {
      dot.addEventListener('click', function() { showActSlide(idx); });
    });
    actMobileDots.forEach(function(dot, idx) {
      dot.addEventListener('click', function() { showActSlide(idx); });
    });
  }

  // 5. Horizontal Social Media Scroll Buttons & Live Feed Modal
  var socialTrack = document.getElementById('social-cards-track');
  var socialLeft = document.getElementById('social-scroll-left');
  var socialRight = document.getElementById('social-scroll-right');
  if (socialTrack) {
    if (socialLeft) socialLeft.addEventListener('click', function() { socialTrack.scrollBy({ left: -340, behavior: 'smooth' }); });
    if (socialRight) socialRight.addEventListener('click', function() { socialTrack.scrollBy({ left: 340, behavior: 'smooth' }); });
  }

  // Generic Modal Open/Close Triggers
  document.querySelectorAll('[data-open-modal]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = btn.getAttribute('data-open-modal');
      var modal = document.getElementById(targetId);
      if (modal) modal.classList.remove('hidden');
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var targetId = btn.getAttribute('data-close-modal');
      var modal = document.getElementById(targetId);
      if (modal) modal.classList.add('hidden');
    });
  });

  // Emergency Hotline Search inside Modal
  var hotlineSearch = document.getElementById('hotline-search-input');
  var hotlineItems = document.querySelectorAll('[data-hotline-item]');
  if (hotlineSearch) {
    hotlineSearch.addEventListener('input', function() {
      var q = hotlineSearch.value.trim().toLowerCase();
      hotlineItems.forEach(function(item) {
        var txt = (item.getAttribute('data-hotline-item') || '').toLowerCase();
        if (!q || txt.indexOf(q) !== -1) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  }

  // Notice Detail Modal Trigger
  var noticeModal = document.getElementById('static-notice-modal');
  document.querySelectorAll('[data-notice-title]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      if (!noticeModal) return;
      document.getElementById('modal-notice-title').textContent = el.getAttribute('data-notice-title') || '';
      document.getElementById('modal-notice-date').textContent = el.getAttribute('data-notice-date') || '';
      document.getElementById('modal-notice-cat').textContent = el.getAttribute('data-notice-cat-label') || '';
      document.getElementById('modal-notice-content').textContent = el.getAttribute('data-notice-content') || '';
      noticeModal.classList.remove('hidden');
    });
  });

  // Staff Detail Modal Trigger
  var staffModal = document.getElementById('static-staff-modal');
  document.querySelectorAll('[data-staff-card]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      if (!staffModal) return;
      document.getElementById('modal-staff-photo').setAttribute('src', el.getAttribute('data-staff-photo') || '');
      document.getElementById('modal-staff-name').textContent = el.getAttribute('data-staff-name') || '';
      document.getElementById('modal-staff-desig').textContent = el.getAttribute('data-staff-desig') || '';
      document.getElementById('modal-staff-subject').textContent = el.getAttribute('data-staff-subject') || '';
      document.getElementById('modal-staff-qual').textContent = el.getAttribute('data-staff-qual') || '';
      document.getElementById('modal-staff-mpo').textContent = el.getAttribute('data-staff-mpo') || '';
      document.getElementById('modal-staff-mobile').textContent = el.getAttribute('data-staff-mobile') || '';
      document.getElementById('modal-staff-bio').textContent = el.getAttribute('data-staff-bio') || '';
      staffModal.classList.remove('hidden');
    });
  });

  // Academic Page Sub-Tabs
  var acadBtns = document.querySelectorAll('[data-acad-tab-btn]');
  var acadPanels = document.querySelectorAll('[data-acad-tab-panel]');
  acadBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.getAttribute('data-acad-tab-btn');
      acadBtns.forEach(function(b) {
        b.className = 'px-3 py-1.5 rounded-md font-semibold transition-colors text-slate-600 hover:text-slate-900 cursor-pointer';
      });
      btn.className = 'px-3 py-1.5 rounded-md font-semibold transition-colors bg-white text-emerald-950 shadow-xs cursor-pointer';
      acadPanels.forEach(function(p) {
        if (p.getAttribute('data-acad-tab-panel') === target) {
          p.classList.remove('hidden');
        } else {
          p.classList.add('hidden');
        }
      });
    });
  });

  // Notice category filter on /notices/ page
  var filterBtns = document.querySelectorAll('[data-notice-filter]');
  var noticeCards = document.querySelectorAll('[data-notice-cat]');
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var cat = btn.getAttribute('data-notice-filter');
      filterBtns.forEach(function(b) {
        b.classList.remove('bg-emerald-900', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.remove('bg-white', 'text-slate-700');
      btn.classList.add('bg-emerald-900', 'text-white');

      noticeCards.forEach(function(card) {
        if (cat === 'all' || card.getAttribute('data-notice-cat') === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Staff filter on /teachers/ page
  var staffBtns = document.querySelectorAll('[data-staff-filter]');
  var staffCards = document.querySelectorAll('[data-staff-type]');
  staffBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var stype = btn.getAttribute('data-staff-filter');
      staffBtns.forEach(function(b) {
        b.classList.remove('bg-emerald-900', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.remove('bg-white', 'text-slate-700');
      btn.classList.add('bg-emerald-900', 'text-white');

      staffCards.forEach(function(card) {
        if (stype === 'all' || card.getAttribute('data-staff-type') === stype) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Admission form handler on /admission/ page
  var admForm = document.getElementById('static-admission-form');
  var admResult = document.getElementById('static-admission-slip');
  if (admForm && admResult) {
    admForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('adm-name').value;
      var grade = document.getElementById('adm-grade').value;
      var father = document.getElementById('adm-father').value;
      var mobile = document.getElementById('adm-mobile').value;
      document.getElementById('slip-id').textContent = 'CHS-' + Math.floor(100000 + Math.random() * 900000);
      document.getElementById('slip-name').textContent = name;
      document.getElementById('slip-grade').textContent = grade;
      document.getElementById('slip-father').textContent = father;
      document.getElementById('slip-mobile').textContent = mobile;
      admForm.classList.add('hidden');
      admResult.classList.remove('hidden');
    });
  }

  // Contact form handler on /contact/ page
  var contactForm = document.getElementById('static-contact-form');
  var contactSuccess = document.getElementById('static-contact-success');
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      contactForm.classList.add('hidden');
      contactSuccess.classList.remove('hidden');
    });
  }
});