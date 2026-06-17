# 刚刚好 (Just Right)

> 一款专为久坐办公人员设计的健康提醒浏览器插件，定时提醒进行盆底肌锻炼（提肛运动）。

A browser extension that reminds sedentary office workers to do pelvic floor exercises (Kegel exercises) at regular intervals.

## 功能特点

- ⏰ **定时提醒**：可自定义提醒间隔（30分钟 - 2小时）
- 🎯 **运动指导**：详细的提肛运动步骤说明
- 💪 **互动练习**：内置计时器，引导完成15次标准练习
- 📊 **进度追踪**：实时显示练习进度和完成情况
- 🔔 **通知提醒**：浏览器原生通知，不会错过提醒

## 健康益处

- 改善盆底肌功能，预防尿失禁
- 促进局部血液循环
- 缓解久坐带来的不适
- 改善性功能
- 预防痔疮等肛肠疾病

## 安装方法

### Chrome / Edge 浏览器

1. 下载本插件所有文件到本地文件夹
2. 打开浏览器，进入扩展程序页面：
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. 开启右上角的「开发者模式」
4. 点击「加载已解压的扩展程序」
5. 选择本插件的文件夹
6. 安装完成！

### 图标文件

本插件需要以下图标文件（放在 `icons` 目录下）：
- `icon16.png` (16x16 像素)
- `icon48.png` (48x48 像素)
- `icon128.png` (128x128 像素)

**快速生成图标**：
你可以使用任何图片编辑工具创建简单的图标，推荐使用 💪 表情符号或健康相关的图标。

## 使用说明

### 基本设置

1. 点击浏览器工具栏中的插件图标
2. 在弹出窗口中设置：
   - 启用/禁用提醒
   - 选择提醒间隔时间

### 开始练习

**方式一：点击通知**
- 当提醒通知弹出时，点击通知即可查看运动指南

**方式二：主动练习**
- 点击插件图标
- 点击「立即开始练习」按钮
- 跟随页面指引完成练习

### 运动步骤

1. **准备姿势**：坐直或平躺，全身放松
2. **收缩盆底肌**：像憋尿、憋便那样收紧，保持5秒
3. **放松休息**：完全放松，休息10秒
4. **重复**：完成15次为一组

## 文件结构

```
刚刚好/
├── manifest.json          # 插件配置文件
├── background.js          # 后台服务脚本
├── popup.html             # 弹出窗口页面
├── popup.css              # 弹出窗口样式
├── popup.js               # 弹出窗口逻辑
├── exercise.html          # 运动指导页面
├── exercise.js            # 运动计时器逻辑
├── icons/                 # 图标目录
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # 说明文档
```

## 技术实现

- **Manifest V3**：使用最新的浏览器插件标准
- **Chrome Alarms API**：实现精确的定时提醒
- **Notifications API**：发送系统级通知
- **Storage API**：保存用户设置
- **纯原生实现**：无需任何外部依赖

## 建议使用频率

- 每天练习 3-5 组
- 每组 10-15 次
- 建议间隔 45-60 分钟
- 持之以恒效果更佳

## 注意事项

⚠️ **重要提示**：
- 本插件仅提供运动提醒和指导，不构成医疗建议
- 如有相关疾病，请咨询医生后再进行练习
- 孕期、产后等特殊时期请遵医嘱

## 开源协议

MIT License - 欢迎使用和修改

## 反馈建议

如有问题或建议，欢迎提交 Issue 或 Pull Request。

---

## English

**Just Right** is a browser extension designed for office workers who sit for extended periods. It provides timed reminders to perform pelvic floor muscle exercises (Kegel exercises), helping improve health and prevent issues related to prolonged sitting.

### Features
- ⏰ Customizable reminder intervals (30 min - 2 hours)
- 💪 Guided 15-rep exercise routine with timer
- 📊 Real-time progress tracking
- 🔔 Native browser notifications

### Repository
Recommended repository name: **just-right** or **just-right-health-reminder**

---

💪 **关爱健康，从现在开始！Stay healthy, starting now!**
