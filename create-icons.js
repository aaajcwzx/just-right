const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// 如果没有canvas库，使用纯HTML方式
console.log('请在浏览器中打开 generate-icons.html 来生成图标');
console.log('或者使用以下备用方案：');
console.log('\n1. 访问 https://www.favicon-generator.org/');
console.log('2. 上传任意图片（建议使用💪表情或健康图标）');
console.log('3. 生成并下载 icon16.png, icon48.png, icon128.png');
console.log('4. 将文件放入 icons 目录\n');
