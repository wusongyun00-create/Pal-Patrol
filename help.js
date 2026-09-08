(() => {
  const searchForm = document.querySelector('#support-search');
  const searchInput = document.querySelector('#help-search');
  const searchStatus = document.querySelector('#search-status');
  const searchable = [...document.querySelectorAll('[data-search]')];

  const runSearch = (term) => {
    const query = term.trim().toLowerCase();
    let matches = 0;
    searchable.forEach((item) => {
      const found = !query || item.dataset.search.toLowerCase().includes(query) || item.textContent.toLowerCase().includes(query);
      item.classList.toggle('is-hidden', !found);
      if (found) matches += 1;
    });
    searchStatus.textContent = query ? `${matches} helpful result${matches === 1 ? '' : 's'} for “${term}”.` : '';
  };

  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    runSearch(searchInput.value);
    document.querySelector('#video-guides')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  searchInput?.addEventListener('input', () => runSearch(searchInput.value));

  document.querySelectorAll('.support-faq-list details').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) document.querySelectorAll('.support-faq-list details').forEach((other) => {
        if (other !== detail) other.open = false;
      });
    });
  });

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const fallback = document.createElement('textarea');
      fallback.value = text;
      fallback.setAttribute('readonly', '');
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand('copy');
      fallback.remove();
    }
  };

  document.querySelectorAll('.copy-response').forEach((button) => {
    button.addEventListener('click', async () => {
      const response = document.querySelector(`#${button.dataset.copy}`)?.textContent.trim();
      if (!response) return;
      await copyText(response);
      const original = button.innerHTML;
      button.textContent = 'Copied';
      setTimeout(() => { button.innerHTML = original; }, 2000);
    });
  });
})();
