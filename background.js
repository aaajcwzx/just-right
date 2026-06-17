// 默认设置
const DEFAULT_INTERVAL = 45; // 45分钟

// 初始化
chrome.runtime.onInstalled.addListener(async () => {
  const { interval = DEFAULT_INTERVAL, enabled = true } = await chrome.storage.sync.get(['interval', 'enabled']);

  if (enabled) {
    createAlarm(interval);
  }

  console.log('刚刚好插件已安装');
});

// 创建定时器
function createAlarm(intervalMinutes) {
  chrome.alarms.clear('healthReminder');
  chrome.alarms.create('healthReminder', {
    delayInMinutes: intervalMinutes,
    periodInMinutes: intervalMinutes
  });
  console.log(`定时器已设置：每${intervalMinutes}分钟提醒一次`);
}

// 监听定时器触发
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'healthReminder') {
    const { enabled } = await chrome.storage.sync.get('enabled');

    if (enabled) {
      showNotification();
    }
  }
});

// 显示通知
function showNotification() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: '健康提醒 ⏰',
    message: '该做盆底肌锻炼了！点击查看运动指导',
    priority: 2,
    requireInteraction: true
  }, (notificationId) => {
    console.log('通知已显示:', notificationId);
  });
}

// 监听通知点击
chrome.notifications.onClicked.addListener(() => {
  chrome.action.openPopup();
});

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateInterval') {
    createAlarm(request.interval);
    sendResponse({ success: true });
  } else if (request.action === 'toggleEnabled') {
    if (request.enabled) {
      chrome.storage.sync.get('interval', ({ interval = DEFAULT_INTERVAL }) => {
        createAlarm(interval);
      });
    } else {
      chrome.alarms.clear('healthReminder');
    }
    sendResponse({ success: true });
  }
  return true;
});
