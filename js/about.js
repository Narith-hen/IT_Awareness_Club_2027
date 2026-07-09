/* About page: generations tabs + member cards from data/members.json */
let members = {};

const tabBar = document.querySelector('#gen-tabs');
const grid = document.querySelector('#gen-grid');

async function load() {
  const res = await fetch('data/members.json');
  members = await res.json();

  const years = Object.keys(members).sort((a, b) => b - a); // newest first
  tabBar.innerHTML = years.map((y, i) =>
    `<button class="chip ${i === 0 ? 'active' : ''}" data-year="${y}" role="tab" aria-selected="${i === 0}">Generation ${y}</button>`
  ).join('');

  renderYear(years[0]);

  tabBar.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-year]');
    if (!btn) return;
    tabBar.querySelectorAll('.chip').forEach((c) => {
      c.classList.remove('active');
      c.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    renderYear(btn.dataset.year);
  });
}

function renderYear(year) {
  const placeholder = 'assets/images/members/placeholder.svg';
  grid.innerHTML = members[year].map((m) => `
    <div class="card member-card">
      <img class="member-card__photo" src="${m.photo || placeholder}" alt="${m.name}" loading="lazy"
           onerror="this.src='${placeholder}'">
      <h3>${m.name}</h3>
      <p class="badge">${m.role}</p>
    </div>`).join('');
}

if (tabBar && grid) load();
