// =============================================
// Lessons / Levels Manager — Python Garden Admin
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌿 Lessons Manager Ready');

  // Data Store
  let chapters = [];
  let levels = [];
  let editingLevelId = null;

  // DOM Elements
  const chapterListEl = document.getElementById('chapter-list');
  const chapterSelectEl = document.getElementById('f-chapter');
  const lessonForm = document.getElementById('lesson-form');
  const chapterForm = document.getElementById('chapter-form');
  const formTitle = document.getElementById('form-title');
  const btnNew = document.getElementById('btn-new');

  // ─── Helpers ───
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ─── Render Chapter Dropdown ───
  function renderChapterOptions() {
    chapterSelectEl.innerHTML = '<option value="">— Pick a chapter —</option>';
    chapters.forEach(chap => {
      const opt = document.createElement('option');
      opt.value = chap.id;
      opt.textContent = chap.title;
      chapterSelectEl.appendChild(opt);
    });
  }

  // ─── Render Sidebar ───
  function renderChapterList() {
    chapterListEl.innerHTML = '';

    if (chapters.length === 0) {
      chapterListEl.innerHTML = `
        <h3>🌿 Your Garden</h3>
        <p class="muted empty-hint">No chapters yet. Start your first chapter below!</p>
      `;
      return;
    }

    chapters.forEach(chap => {
      const chapterLevels = levels.filter(l => l.chapterId === chap.id);
      const el = document.createElement('div');
      el.className = 'chapter-item';
      el.dataset.chapterId = chap.id;

      el.innerHTML = `
        <div class="chapter-header">
          <span class="chapter-title">${escapeHtml(chap.title)}</span>
          <span class="chapter-meta">${chapterLevels.length} level${chapterLevels.length !== 1 ? 's' : ''}</span>
        </div>
        <p class="muted" style="font-size:0.8rem;margin-bottom:0.5rem;">${escapeHtml(chap.blurb || '')}</p>
        <div class="chapter-levels">
          ${chapterLevels.length === 0
            ? '<p class="muted" style="font-size:0.85rem;">No levels yet — add one below!</p>'
            : chapterLevels
                .sort((a, b) => a.order - b.order)
                .map(l => `
                  <div class="level-item" data-id="${l.id}">
                    <span class="level-number">${l.order}.</span>
                    ${escapeHtml(l.title)}
                  </div>
                `).join('')
          }
        </div>
      `;

      // Click level to edit
      el.addEventListener('click', (e) => {
        const levelItem = e.target.closest('.level-item');
        if (levelItem) {
          loadLevelForEdit(levelItem.dataset.id);
        }
      });

      chapterListEl.appendChild(el);
    });
  }

  // ─── Load Level into Form for Editing ───
  function loadLevelForEdit(levelId) {
    const level = levels.find(l => l.id === levelId);
    if (!level) return;

    editingLevelId = levelId;
    formTitle.innerHTML = '✏️ Edit Quest Level';

    document.getElementById('f-id').value = level.id;
    document.getElementById('f-chapter').value = level.chapterId;
    document.getElementById('f-order').value = level.order;
    document.getElementById('f-title').value = level.title;
    document.getElementById('f-concept').value = level.concept;
    document.getElementById('f-goals').value = level.goals;
    document.getElementById('f-starter').value = level.starter;
    document.getElementById('f-expected').value = level.expected;
    document.getElementById('f-must').value = level.mustContain;
    document.getElementById('f-hint').value = level.hint;
    document.getElementById('f-seeds').value = level.seeds;
    document.getElementById('f-xp').value = level.xp;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─── Reset Form to New Level ───
  function resetForm() {
    editingLevelId = null;
    formTitle.innerHTML = '🌻 New Quest Level';
    lessonForm.reset();
    document.getElementById('f-id').value = '';
    document.getElementById('f-order').value = '1';
    document.getElementById('f-seeds').value = '10';
    document.getElementById('f-xp').value = '25';
  }

  // ─── Add Chapter ───
  chapterForm.addEventListener('submit', e => {
    e.preventDefault();

    chapters.push({
      id: 'chap_' + Date.now(),
      title: document.getElementById('c-title').value.trim(),
      slug: document.getElementById('c-slug').value.trim(),
      order: parseInt(document.getElementById('c-order').value) || 1,
      blurb: document.getElementById('c-blurb').value.trim()
    });

    chapterForm.reset();
    renderChapterList();
    renderChapterOptions();
    alert('✅ Chapter planted!');
  });

  // ─── Save/Update Level ───
  lessonForm.addEventListener('submit', e => {
    e.preventDefault();

    const levelData = {
      id: document.getElementById('f-id').value || 'level_' + Date.now(),
      chapterId: document.getElementById('f-chapter').value,
      order: parseInt(document.getElementById('f-order').value) || 0,
      title: document.getElementById('f-title').value.trim(),
      concept: document.getElementById('f-concept').value.trim(),
      goals: document.getElementById('f-goals').value.trim(),
      starter: document.getElementById('f-starter').value.trim(),
      expected: document.getElementById('f-expected').value.trim(),
      mustContain: document.getElementById('f-must').value.trim(),
      hint: document.getElementById('f-hint').value.trim(),
      seeds: parseInt(document.getElementById('f-seeds').value) || 0,
      xp: parseInt(document.getElementById('f-xp').value) || 0
    };

    if (editingLevelId) {
      // Update existing
      const idx = levels.findIndex(l => l.id === editingLevelId);
      if (idx !== -1) levels[idx] = levelData;
      alert('✅ Level updated!');
    } else {
      // Add new
      levels.push(levelData);
      alert('✅ Level saved!');
    }

    resetForm();
    renderChapterList();
  });

  // ─── New Level Button ───
  btnNew.addEventListener('click', resetForm);

  // ─── Initial Render ───
  renderChapterList();
  renderChapterOptions();
});
