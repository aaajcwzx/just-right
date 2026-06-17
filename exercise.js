// 运动状态管理
let exerciseState = {
  isRunning: false,
  isPaused: false,
  currentPhase: 'ready', // ready, contract, relax, rest
  currentCount: 0,
  totalCount: 15,
  timeLeft: 5,
  totalProgress: 0
};

// 阶段配置
const phases = {
  contract: { duration: 5, label: '收缩盆底肌' },
  relax: { duration: 10, label: '放松休息' },
  rest: { duration: 3, label: '准备下一次' }
};

// DOM元素
const timerEl = document.getElementById('timer');
const phaseEl = document.getElementById('phase');
const counterEl = document.getElementById('counter');
const instructionEl = document.getElementById('instruction');
const progressBar = document.getElementById('progressBar');
const startBtn = document.getElementById('startBtn');
const closeBtn = document.getElementById('closeBtn');
const exerciseView = document.getElementById('exerciseView');
const completionView = document.getElementById('completionView');
const restartBtn = document.getElementById('restartBtn');
const doneBtn = document.getElementById('doneBtn');

let timer = null;

// 开始练习
startBtn.addEventListener('click', () => {
  if (!exerciseState.isRunning) {
    startExercise();
  }
});

// 关闭窗口
closeBtn.addEventListener('click', () => {
  if (confirm('确定要退出练习吗？')) {
    window.close();
  }
});

// 重新开始
restartBtn.addEventListener('click', () => {
  resetExercise();
  completionView.classList.remove('show');
  exerciseView.style.display = 'block';
  startExercise();
});

// 完成并关闭
doneBtn.addEventListener('click', () => {
  window.close();
});

// 开始运动
function startExercise() {
  exerciseState.isRunning = true;
  exerciseState.currentPhase = 'contract';
  exerciseState.currentCount = 1;
  exerciseState.timeLeft = phases.contract.duration;

  startBtn.textContent = '练习中...';
  startBtn.disabled = true;

  updateDisplay();
  runTimer();
}

// 运行计时器
function runTimer() {
  timer = setInterval(() => {
    exerciseState.timeLeft--;

    if (exerciseState.timeLeft <= 0) {
      nextPhase();
    }

    updateDisplay();
  }, 1000);
}

// 切换到下一个阶段
function nextPhase() {
  const { currentPhase, currentCount, totalCount } = exerciseState;

  if (currentPhase === 'contract') {
    // 收缩 -> 放松
    exerciseState.currentPhase = 'relax';
    exerciseState.timeLeft = phases.relax.duration;
  } else if (currentPhase === 'relax') {
    // 放松 -> 准备下一次 或 完成
    if (currentCount < totalCount) {
      exerciseState.currentPhase = 'rest';
      exerciseState.timeLeft = phases.rest.duration;
    } else {
      // 完成所有练习
      completeExercise();
      return;
    }
  } else if (currentPhase === 'rest') {
    // 准备 -> 收缩（下一组）
    exerciseState.currentCount++;
    exerciseState.currentPhase = 'contract';
    exerciseState.timeLeft = phases.contract.duration;
  }
}

// 更新显示
function updateDisplay() {
  const { currentPhase, currentCount, totalCount, timeLeft } = exerciseState;

  // 更新计时器
  timerEl.textContent = timeLeft;

  // 更新阶段文字
  if (currentPhase === 'contract') {
    phaseEl.textContent = '🔴 收缩盆底肌';
    instructionEl.textContent = '像憋尿、憋便那样收紧肛门和会阴部，保持收缩状态';
  } else if (currentPhase === 'relax') {
    phaseEl.textContent = '🟢 放松休息';
    instructionEl.textContent = '完全放松盆底肌肉，自然呼吸，休息一会';
  } else if (currentPhase === 'rest') {
    phaseEl.textContent = '⚪ 准备下一次';
    instructionEl.textContent = '调整呼吸，准备进行下一次收缩';
  }

  // 更新计数
  counterEl.textContent = `第 ${currentCount} / ${totalCount} 次`;

  // 更新进度条
  const progress = (currentCount / totalCount) * 100;
  progressBar.style.width = `${progress}%`;
}

// 完成练习
function completeExercise() {
  clearInterval(timer);
  exerciseState.isRunning = false;

  // 显示完成界面
  exerciseView.style.display = 'none';
  completionView.classList.add('show');

  // 播放完成音效（可选）
  playCompletionSound();
}

// 重置状态
function resetExercise() {
  clearInterval(timer);
  exerciseState = {
    isRunning: false,
    isPaused: false,
    currentPhase: 'ready',
    currentCount: 0,
    totalCount: 15,
    timeLeft: 5,
    totalProgress: 0
  };

  startBtn.textContent = '开始练习';
  startBtn.disabled = false;
  phaseEl.textContent = '准备开始';
  instructionEl.textContent = '点击"开始练习"按钮，跟随提示完成锻炼';
  counterEl.textContent = `第 0 / ${exerciseState.totalCount} 次`;
  timerEl.textContent = '5';
  progressBar.style.width = '0%';
}

// 播放完成音效（使用Web Audio API）
function playCompletionSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (e) {
    console.log('音效播放失败:', e);
  }
}
