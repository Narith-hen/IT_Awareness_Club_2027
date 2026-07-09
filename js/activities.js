/* Activities page: render cards from data/activities.json, then search + filter */
let activities = [];
let activeCategory = 'All';
let searchTerm = '';

const grid = document.querySelector('#activity-grid');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#activity-search');
const chips = document.querySelectorAll('.chip[data-category]');
const liveRegion = document.querySelector('#results-count');

async function load() {
  const res = await fetch('data/activities.json');
  activities = await res.json();
  render();
}

function render() {
  const filtered = activities.filter((a) => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchSearch = a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  grid.innerHTML = filtered.map((a) => `
    <article class="card">
      <div class="card__image-wrap">
        <img class="card__image" src="${a.image}" alt="${a.title}" loading="lazy">
      </div>
      <div class="card__body">
        <span class="badge">${a.category}</span>
        <h3>${a.title}</h3>
        <time datetime="${a.date}">${new Date(a.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
        <p>${a.description}</p>
      </div>
    </article>`).join('');

  if (emptyState) emptyState.hidden = filtered.length > 0;
  if (liveRegion) liveRegion.textContent = `${filtered.length} activities shown`;
}

// Debounced search
let t;
if (searchInput) searchInput.addEventListener('input', (e) => {
  clearTimeout(t);
  t = setTimeout(() => { searchTerm = e.target.value; render(); }, 250);
});

chips.forEach((chip) => chip.addEventListener('click', () => {
  chips.forEach((c) => c.classList.remove('active'));
  chip.classList.add('active');
  activeCategory = chip.dataset.category;
  render();
}));

if (grid) load();
