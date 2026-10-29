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

  // Meritorious Student Detail Modal Trigger & Filter
  var meritModal = document.getElementById('static-merit-modal');
  document.querySelectorAll('[data-merit-card]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      if (!meritModal) return;
      document.getElementById('modal-merit-photo').setAttribute('src', el.getAttribute('data-merit-photo') || '');
      document.getElementById('modal-merit-name').textContent = el.getAttribute('data-merit-name') || '';
      document.getElementById('modal-merit-gpa').textContent = '★ ' + (el.getAttribute('data-merit-gpa') || '');
      document.getElementById('modal-merit-exam').textContent = (el.getAttribute('data-merit-exam') || '') + ' · ' + (el.getAttribute('data-merit-year') || '');
      document.getElementById('modal-merit-group').textContent = el.getAttribute('data-merit-group') || '';
      document.getElementById('modal-merit-year').textContent = (el.getAttribute('data-merit-year') || '') + ' খ্রি.';
      document.getElementById('modal-merit-inst').textContent = el.getAttribute('data-merit-inst') || 'উল্লেখ নেই';
      document.getElementById('modal-merit-achv').textContent = el.getAttribute('data-merit-achv') || '';
      meritModal.classList.remove('hidden');
    });
  });

  var meritYearBtns = document.querySelectorAll('[data-merit-year-btn]');
  var meritSearchInput = document.getElementById('merit-search-input');
  var meritItems = document.querySelectorAll('[data-merit-item-year]');
  var activeMeritYear = 'all';

  function filterMeritItems() {
    var q = meritSearchInput ? meritSearchInput.value.trim().toLowerCase() : '';
    meritItems.forEach(function(item) {
      var yr = item.getAttribute('data-merit-item-year') || '';
      var hay = (item.getAttribute('data-merit-search') || '').toLowerCase();
      var matchYear = activeMeritYear === 'all' || yr === activeMeritYear;
      var matchQuery = !q || hay.indexOf(q) !== -1;
      if (matchYear && matchQuery) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  meritYearBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      activeMeritYear = btn.getAttribute('data-merit-year-btn') || 'all';
      meritYearBtns.forEach(function(b) {
        b.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer';
      });
      btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition-colors bg-emerald-900 text-white shadow-2xs cursor-pointer';
      filterMeritItems();
    });
  });
  if (meritSearchInput) {
    meritSearchInput.addEventListener('input', filterMeritItems);
  }

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
      document.getElementById('slip-id').textContent = '3583-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
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

  // About Page Campus Showcase Slider
  var aboutSlides = document.querySelectorAll('[data-about-slide]');
  var aboutDots = document.querySelectorAll('[data-about-dot]');
  var aboutPrev = document.getElementById('about-prev-btn');
  var aboutNext = document.getElementById('about-next-btn');
  var currentAboutSlide = 0;

  function showAboutSlide(index) {
    if (!aboutSlides.length) return;
    currentAboutSlide = (index + aboutSlides.length) % aboutSlides.length;
    aboutSlides.forEach(function(sl, i) {
      if (i === currentAboutSlide) {
        sl.classList.remove('opacity-0', 'pointer-events-none');
        sl.classList.add('opacity-100', 'z-10');
      } else {
        sl.classList.remove('opacity-100', 'z-10');
        sl.classList.add('opacity-0', 'pointer-events-none');
      }
    });
    aboutDots.forEach(function(dot, i) {
      if (i === currentAboutSlide) {
        dot.className = 'h-1.5 w-5 bg-amber-400 rounded-full transition-all cursor-pointer';
      } else {
        dot.className = 'h-1.5 w-1.5 bg-white/50 rounded-full transition-all cursor-pointer';
      }
    });
  }

  if (aboutSlides.length > 1) {
    setInterval(function() {
      showAboutSlide(currentAboutSlide + 1);
    }, 5000);
    if (aboutPrev) {
      aboutPrev.addEventListener('click', function() {
        showAboutSlide(currentAboutSlide - 1);
      });
    }
    if (aboutNext) {
      aboutNext.addEventListener('click', function() {
        showAboutSlide(currentAboutSlide + 1);
      });
    }
    aboutDots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        var idx = parseInt(dot.getAttribute('data-about-dot') || '0', 10);
        showAboutSlide(idx);
      });
    });
  }

  // About Page BANBEIS Dossier 4-Tab Switcher
  var dossierTabBtns = document.querySelectorAll('[data-dossier-tab]');
  var dossierPanels = document.querySelectorAll('[data-dossier-panel]');
  dossierTabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.getAttribute('data-dossier-tab');
      dossierTabBtns.forEach(function(b) {
        if (b.getAttribute('data-dossier-tab') === target) {
          b.className = 'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#004D38] text-white shadow-2xs cursor-pointer';
        } else {
          b.className = 'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer';
        }
      });
      dossierPanels.forEach(function(panel) {
        if (panel.getAttribute('data-dossier-panel') === target) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });

  // Facilities Page Hero Photo Carousel
  var facSlides = document.querySelectorAll('[data-fac-slide]');
  var facDots = document.querySelectorAll('[data-fac-dot]');
  var facPrev = document.getElementById('fac-prev-btn');
  var facNext = document.getElementById('fac-next-btn');
  var currentFacSlide = 0;

  function showFacSlide(index) {
    if (!facSlides.length) return;
    currentFacSlide = (index + facSlides.length) % facSlides.length;
    facSlides.forEach(function(sl, i) {
      if (i === currentFacSlide) {
        sl.classList.remove('opacity-0', 'pointer-events-none');
        sl.classList.add('opacity-100', 'z-10');
      } else {
        sl.classList.remove('opacity-100', 'z-10');
        sl.classList.add('opacity-0', 'pointer-events-none');
      }
    });
    facDots.forEach(function(dot, i) {
      if (i === currentFacSlide) {
        dot.className = 'px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-400 text-slate-950 shadow-2xs transition-all cursor-pointer';
      } else {
        dot.className = 'px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/8 text-slate-300 hover:bg-white/15 hover:text-white transition-all cursor-pointer';
      }
    });
  }

  if (facSlides.length > 1) {
    setInterval(function() {
      showFacSlide(currentFacSlide + 1);
    }, 6000);
    if (facPrev) {
      facPrev.addEventListener('click', function() {
        showFacSlide(currentFacSlide - 1);
      });
    }
    if (facNext) {
      facNext.addEventListener('click', function() {
        showFacSlide(currentFacSlide + 1);
      });
    }
    facDots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        var idx = parseInt(dot.getAttribute('data-fac-dot') || '0', 10);
        showFacSlide(idx);
      });
    });
  }

  // Anti-Inspect & Source Code Protection Guard
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
  document.addEventListener('keydown', function(e) {
    var key = (e.key || '').toUpperCase();
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'J' || key === 'C')) ||
      (e.metaKey && e.altKey && (key === 'I' || key === 'J' || key === 'C' || key === 'U')) ||
      ((e.ctrlKey || e.metaKey) && (key === 'U' || key === 'S'))
    ) {
      e.preventDefault();
      return false;
    }
  });
});