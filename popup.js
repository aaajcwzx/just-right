// DOM元素
const enableToggle = document.getElementById('enableToggle');
const intervalSelect = document.getElementById('intervalSelect');
const repsSelect = document.getElementById('repsSelect');
const contractSelect = document.getElementById('contractSelect');
const relaxSelect = document.getElementById('relaxSelect');
const startTimeSelect = document.getElementById('startTimeSelect');
const endTimeSelect = document.getElementById('endTimeSelect');
const soundToggle = document.getElementById('soundToggle');
const startNowButton = document.getElementById('startNow');
const totalSessionsEl = document.getElementById('totalSessions');
const todaySessionsEl = document.getElementById('todaySessions');
const streakEl = document.getElementById('streak');

// 初始化：加载保存的设置
async function loadSettings() {
  const settings = await chrome.storage.sync.get([
    'interval', 'enabled', 'reps', 'contractDuration', 'relaxDuration',
    'startTime', 'endTime', 'soundEnabled'
  ]);

  enableToggle.checked = settings.enabled ?? true;
  intervalSelect.value = settings.interval || 45;
  repsSelect.value = settings.reps || 15;
  contractSelect.value = settings.contractDuration || 5;
  relaxSelect.value = settings.relaxDuration || 10;
  startTimeSelect.value = settings.startTime || 9;
  endTimeSelect.value = settings.endTime || 18;
  soundToggle.checked = settings.soundEnabled ?? false;

  // 加载统计数据
  await loadStats();
}

// 加载统计数据
async function loadStats() {
  const { stats } = await chrome.storage.sync.get(['stats']);
  const today = new Date().toDateString();

  if (stats) {
    totalSessionsEl.textContent = stats.totalSessions || 0;
    todaySessionsEl.textContent = stats.dailyLog?.[today] || 0;
    streakEl.textContent = stats.streak || 0;
  }
}

// 保存设置
async function saveSettings(key, value) {
  await chrome.storage.sync.set({ [key]: value });
}

// 启用/禁用提醒
enableToggle.addEventListener('change', async (e) => {
  const enabled = e.target.checked;
  await saveSettings('enabled', enabled);

  chrome.runtime.sendMessage({
    action: 'toggleEnabled',
    enabled: enabled
  });

  showFeedback(enabled ? '提醒已启用 ✓' : '提醒已关闭');
});

// 修改提醒间隔
intervalSelect.addEventListener('change', async (e) => {
  const interval = parseInt(e.target.value);
  await saveSettings('interval', interval);

  if (enableToggle.checked) {
    chrome.runtime.sendMessage({
      action: 'updateInterval',
      interval: interval
    });
  }

  showFeedback(`提醒间隔已设置为${interval}分钟 ✓`);
});

// 练习参数设置
repsSelect.addEventListener('change', async (e) => {
  await saveSettings('reps', parseInt(e.target.value));
  showFeedback('练习次数已更新 ✓');
});

contractSelect.addEventListener('change', async (e) => {
  await saveSettings('contractDuration', parseInt(e.target.value));
  showFeedback('收缩时长已更新 ✓');
});

relaxSelect.addEventListener('change', async (e) => {
  await saveSettings('relaxDuration', parseInt(e.target.value));
  showFeedback('放松时长已更新 ✓');
});

// 工作时段设置
startTimeSelect.addEventListener('change', async (e) => {
  await saveSettings('startTime', parseInt(e.target.value));
  showFeedback('工作时段已更新 ✓');
});

endTimeSelect.addEventListener('change', async (e) => {
  await saveSettings('endTime', parseInt(e.target.value));
  showFeedback('工作时段已更新 ✓');
});

// 音效开关
soundToggle.addEventListener('change', async (e) => {
  const enabled = e.target.checked;
  await saveSettings('soundEnabled', enabled);
  showFeedback(enabled ? '音效已启用 ✓' : '音效已关闭');
});

// 立即开始练习按钮
startNowButton.addEventListener('click', () => {
  startExercise();
});

// 开始练习流程
function startExercise() {
  const exerciseWindow = window.open('exercise.html', 'exercise', 'width=500,height=600');

  if (!exerciseWindow) {
    alert('请允许弹出窗口以开始练习');
  }
}

// 显示反馈信息
function showFeedback(message) {
  // 创建临时提示
  const feedback = document.createElement('div');
  feedback.textContent = message;
  feedback.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #4caf50;
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 1000;
    animation: slideDown 0.3s ease-out;
  `;

  document.body.appendChild(feedback);

  setTimeout(() => {
    feedback.style.animation = 'slideUp 0.3s ease-out';
    setTimeout(() => feedback.remove(), 300);
  }, 2000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
  }
`;
document.head.appendChild(style);

// 页面加载时初始化
loadSettings();
