// 统计数据
let stats = {
  totalSessions: 0,
  todaySessions: 0,
  streak: 0,
  dailyLog: {}
};

// 成就定义
const achievements = [
  { id: 'first', icon: '🌱', name: '初次尝试', desc: '完成首次练习', check: s => s.totalSessions >= 1 },
  { id: 'week', icon: '📅', name: '坚持7天', desc: '连续7天练习', check: s => s.streak >= 7 },
  { id: 'month', icon: '🏆', name: '满月成就', desc: '连续30天练习', check: s => s.streak >= 30 },
  { id: 'hundred', icon: '💯', name: '百炼成钢', desc: '累计100次练习', check: s => s.totalSessions >= 100 },
  { id: 'daily5', icon: '⭐', name: '勤奋之星', desc: '单日完成5次', check: s => Object.values(s.dailyLog || {}).some(v => v >= 5) },
  { id: 'streak14', icon: '🔥', name: '热情不减', desc: '连续14天练习', check: s => s.streak >= 14 }
];

// 加载统计数据
async function loadStats() {
  const result = await chrome.storage.sync.get(['stats']);
  const today = new Date().toDateString();

  if (result.stats) {
    stats = result.stats;
    document.getElementById('totalSessions').textContent = stats.totalSessions || 0;
    document.getElementById('todaySessions').textContent = stats.dailyLog?.[today] || 0;
    document.getElementById('streak').textContent = stats.streak || 0;
  } else {
    document.getElementById('totalSessions').textContent = '0';
    document.getElementById('todaySessions').textContent = '0';
    document.getElementById('streak').textContent = '0';
  }
}

// 渲染成就
function renderAchievements() {
  const grid = document.getElementById('achievementGrid');
  grid.innerHTML = '';

  achievements.forEach(achievement => {
    const unlocked = achievement.check(stats);
    const div = document.createElement('div');
    div.className = 'achievement' + (unlocked ? ' unlocked' : '');
    div.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-name">${achievement.name}</div>
      <div class="achievement-desc">${achievement.desc}</div>
    `;
    grid.appendChild(div);
  });
}

// 打开练习窗口
function openExercise() {
  chrome.windows.create({
    url: 'exercise.html',
    type: 'popup',
    width: 500,
    height: 600
  });
}

// 打开设置窗口
function openSettings() {
  chrome.windows.create({
    url: 'settings.html',
    type: 'popup',
    width: 400,
    height: 600
  });
}

// 打开帮助窗口
function openHelp() {
  chrome.windows.create({
    url: 'help.html',
    type: 'popup',
    width: 400,
    height: 600
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', async () => {
  await loadStats();
  renderAchievements();

  document.getElementById('startNow').addEventListener('click', openExercise);
  document.getElementById('helpBtn').addEventListener('click', openHelp);
  document.getElementById('settingsBtn').addEventListener('click', openSettings);
});
