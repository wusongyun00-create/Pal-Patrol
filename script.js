(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const toast = document.querySelector('#toast');
  let toastTimer;

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
  };

  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    navLinks.classList.toggle('open', !expanded);
  });
  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation');
  }));

  document.querySelector('#product-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const pet = new FormData(event.currentTarget).get('pet');
    showToast(`${pet}'s Pal Patrol is ready for the cart. Checkout is a placeholder in this preview.`);
  });

  document.querySelector('#email-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email') || document.querySelector('#email').value;
    showToast(`Thanks! We’ll send Pal Patrol notes to ${email}.`);
    event.currentTarget.reset();
  });

  document.querySelectorAll('.faq-list details').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) document.querySelectorAll('.faq-list details').forEach((other) => {
        if (other !== detail) other.open = false;
      });
    });
  });
})();
