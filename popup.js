// DOM元素
const enableToggle = document.getElementById('enableToggle');
const intervalSelect = document.getElementById('intervalSelect');
const startNowButton = document.getElementById('startNow');

// 初始化：加载保存的设置
async function loadSettings() {
  const { interval = 45, enabled = true } = await chrome.storage.sync.get(['interval', 'enabled']);

  enableToggle.checked = enabled;
  intervalSelect.value = interval;
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
