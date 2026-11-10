const mockStats = {
  totalUsers: 312,
  totalPlays: 2847,
  totalSeeds: 15689,
  totalCompletions: 841
};

const mockLevels = [
  { name: 'Level 1: Say Hello', completions: 248, total: 312 },
  { name: 'Level 2: Variables', completions: 195, total: 312 },
  { name: 'Level 3: Math', completions: 162, total: 312 },
  { name: 'Level 4: If Statements', completions: 118, total: 312 },
  { name: 'Level 5: Loops', completions: 76, total: 312 },
  { name: 'Level 6: Functions', completions: 42, total: 312 }
];

const mockActivity = [
  { user: 'GreenTurtle22', action: 'completed Level 3: Math', time: '2 min ago' },
  { user: 'CodeSeed', action: 'planted 5 flowers in garden', time: '12 min ago' },
  { user: 'PythonNewbie', action: 'joined the garden!', time: '32 min ago' },
  { user: 'PixelCoder', action: 'earned "First Loop" badge', time: '1 hr ago' },
  { user: 'SunflowerDev', action: 'purchased mushroom decoration', time: '2 hr ago' }
];

function animateCounter(el, end, duration = 1500) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * end).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function renderKPIs() {
  animateCounter(document.getElementById('val-users'), mockStats.totalUsers);
  animateCounter(document.getElementById('val-plays'), mockStats.totalPlays);
  animateCounter(document.getElementById('val-seeds'), mockStats.totalSeeds);
  animateCounter(document.getElementById('val-completions'), mockStats.totalCompletions);
}

function renderLevelBars() {
  const container = document.getElementById('per-level');
  container.innerHTML = '';

  mockLevels.forEach(level => {
    const pct = Math.round((level.completions / level.total) * 100);
    container.innerHTML += `
      <div class="bar-item">
        <div class="bar-label">
          <span>${level.name}</span>
          <span>${level.completions}/${level.total} (${pct}%)</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" data-pct="${pct}"></div>
        </div>
      </div>
    `;
  });

  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
  }, 300);
}

function renderActivity() {
  const container = document.getElementById('recent-activity');
  container.innerHTML = mockActivity.map(item => `
    <li class="activity-item">
      <strong>${item.user}</strong> — ${item.action}
      <div class="activity-time">${item.time}</div>
    </li>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderKPIs();
  renderLevelBars();
  renderActivity();
});
