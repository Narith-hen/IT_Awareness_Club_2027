/* Achievements page: render + filter the timeline from data/achievements.json */
let achievements = [];
let activeCategory = 'All';

const timeline = document.querySelector('#timeline');
const chips = document.querySelectorAll('.chip[data-category]');

async function load() {
  const res = await fetch('data/achievements.json');
  achievements = await res.json();
  achievements.sort((a, b) => b.year - a.year); // newest first
  render();
}

function render() {
  const filtered = activeCategory === 'All'
    ? achievements
    : achievements.filter((a) => a.category === activeCategory);

  timeline.innerHTML = filtered.map((a) => `
    <div class="timeline__entry">
      <span class="badge">${a.category} · ${a.year}</span>
      <h3>${a.title}</h3>
      <p>${a.description}</p>
      ${a.image ? `<img class="lightbox-trigger" src="${a.image}" alt="${a.title}" loading="lazy" style="max-width:220px;border-radius:var(--radius-md);cursor:zoom-in;">` : ''}
    </div>`).join('');
}

chips.forEach((chip) => chip.addEventListener('click', () => {
  chips.forEach((c) => c.classList.remove('active'));
  chip.classList.add('active');
  activeCategory = chip.dataset.category;
  render();
}));

if (timeline) load();
