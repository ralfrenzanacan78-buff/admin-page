// Users Page Logic — Python Garden Admin
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌿 Users Manager Ready');

  // Sample data — papalitan ng tunay na API kapag handa na
  const allUsers = [
    {
      id: 'u_001',
      username: 'GreenTurtle22',
      role: 'gardener',
      progressPct: 78,
      status: 'active',
      joined: 'Oct 15, 2026'
    },
    {
      id: 'u_002',
      username: 'CodeSeed',
      role: 'gardener',
      progressPct: 45,
      status: 'active',
      joined: 'Oct 22, 2026'
    },
    {
      id: 'u_003',
      username: 'PythonNewbie',
      role: 'gardener',
      progressPct: 12,
      status: 'active',
      joined: 'Nov 3, 2026'
    },
    {
      id: 'u_004',
      username: 'PixelAdmin',
      role: 'admin',
      progressPct: 100,
      status: 'active',
      joined: 'Sep 1, 2026'
    },
    {
      id: 'u_005',
      username: 'SleepyCoder',
      role: 'gardener',
      progressPct: 30,
      status: 'inactive',
      joined: 'Oct 5, 2026'
    }
  ];

  const searchInput = document.getElementById('user-search');
  const roleFilter = document.getElementById('role-filter');
  const statusFilter = document.getElementById('status-filter');
  const userRows = document.getElementById('user-rows');
  const userCount = document.getElementById('user-count');

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function renderUsers(users) {
    userRows.innerHTML = '';

    if (users.length === 0) {
      userRows.innerHTML = `
        <tr class="empty-state">
          <td colspan="6" class="empty-cell">
            <div class="empty-content">
              <span class="empty-icon">🔍</span>
              <p>No gardeners match your search.</p>
            </div>
          </td>
        </tr>
      `;
      userCount.innerHTML = `Showing <strong>0</strong> of <strong>${allUsers.length}</strong> gardeners`;
      return;
    }

    users.forEach(u => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${escapeHtml(u.username)}</strong></td>
        <td><span class="badge badge--${u.role}">${u.role === 'admin' ? '👑 Admin' : '🌱 Gardener'}</span></td>
        <td>
          <div class="progress-cell">
            <div class="progress-bar-inline">
              <div class="progress-fill-inline" style="width: ${u.progressPct}%"></div>
            </div>
            <span class="progress-pct">${u.progressPct}%</span>
          </div>
        </td>
        <td><span class="status-dot status--${u.status}">${u.status.charAt(0).toUpperCase() + u.status.slice(1)}</span></td>
        <td class="muted">${u.joined}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-icon btn-icon--view" title="View Profile" data-id="${u.id}">👁️</button>
            <button class="btn-icon btn-icon--edit" title="Edit User" data-id="${u.id}">✏️</button>
          </div>
        </td>
      `;
      userRows.appendChild(row);
    });

    userCount.innerHTML = `Showing <strong>${users.length}</strong> of <strong>${allUsers.length}</strong> gardeners`;
  }

  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedRole = roleFilter.value;
    const selectedStatus = statusFilter.value;

    const filtered = allUsers.filter(u => {
      const matchesSearch = u.username.toLowerCase().includes(searchTerm);
      const matchesRole = selectedRole === 'all' || u.role === selectedRole;
      const matchesStatus = selectedStatus === 'all' || u.status === selectedStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });

    renderUsers(filtered);
  }

  searchInput.addEventListener('input', applyFilters);
  roleFilter.addEventListener('change', applyFilters);
  statusFilter.addEventListener('change', applyFilters);

  renderUsers(allUsers);
});
