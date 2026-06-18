const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// 绘制图标
function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const s = size / 80; // 基于 80 网格缩放

  // 背景
  ctx.fillStyle = '#2d3f6b';
  ctx.fillRect(0, 0, size, size);

  // 圆角矩形函数
  function roundRect(x, y, w, h, r, color) {
    const X = x * s, Y = y * s, W = w * s, H = h * s, R = r * s;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(X + R, Y);
    ctx.arcTo(X + W, Y, X + W, Y + H, R);
    ctx.arcTo(X + W, Y + H, X, Y + H, R);
    ctx.arcTo(X, Y + H, X, Y, R);
    ctx.arcTo(X, Y, X + W, Y, R);
    ctx.closePath();
    ctx.fill();
  }

  // 三段竖条
  roundRect(20, 44, 11, 20, 2, '#7d9bd6');
  roundRect(34.5, 24, 11, 40, 2, '#aec4ee');
  roundRect(49, 36, 11, 28, 2, '#7d9bd6');

  return canvas;
}

// 生成三种尺寸
const sizes = [
  { size: 128, name: 'icon128.png' },
  { size: 48, name: 'icon48.png' },
  { size: 16, name: 'icon16.png' }
];

const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

sizes.forEach(({ size, name }) => {
  const canvas = drawIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(iconsDir, name);
  fs.writeFileSync(filePath, buffer);
  console.log(`✓ ${name} 已生成`);
});

console.log('\n✅ 所有图标已生成到 icons 目录');
