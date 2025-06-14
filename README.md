# ElunaMamka 个人网站

一个现代化的个人展示网站，具有动态背景、智能聊天终端和丰富的内容展示功能。

## ✨ 新功能亮点

### 🤖 智能聊天终端
- **情感识别**：自动分析用户情绪并给出相应回应
- **话题识别**：识别技术、生活、学习等不同话题
- **上下文记忆**：记录聊天历史，提供连贯对话体验
- **智能回应**：句句有回应，支持中英文混合对话
- **命令系统**：保留原有命令功能，同时支持自然语言聊天

#### 使用方法：
- 直接输入任何话语，系统会智能回应
- 使用 `chat [消息]` 命令进行聊天
- 输入 `mood` 查看当前对话氛围
- 输入 `history` 查看聊天记录
- 输入 `clear-chat` 清空聊天历史

### 🌟 神奇动态背景
- **云海飘动**：随机生成的云朵缓缓飘过
- **飘雪效果**：美丽的雪花从天空飘落
- **极光绚烂**：北极光般的色彩变幻
- **海浪涌动**：底部海浪轻柔摆动
- **星空闪烁**：满天繁星闪闪发光
- **流星划过**：偶尔有流星划过夜空
- **萤火虫舞**：温馨的萤火虫飞舞

#### 特点：
- 每30秒自动切换2-4种效果组合
- 所有动画都在背景层，不影响内容交互
- 响应式设计，适配各种屏幕尺寸

### 📖 学习文章栏
- **精美卡片设计**：每篇文章都有独特的配色和图标
- **分类标签**：技术深度、方法论、实践经验、跨领域等
- **悬停效果**：鼠标悬停时卡片会有优雅的动画效果
- **响应式布局**：自适应网格布局，移动端友好

#### 已收录文章：
- 🚀 **从GPU计算视角看Prefill和Decoding的差别** - 深度学习GPU优化
- 🤖 **AI研究方法论** - 研究方法与学术写作（即将发布）
- 💻 **编程思维与实践** - 编程技巧与最佳实践（即将发布）
- 🎵 **音乐与AI的交融** - 跨领域研究（即将发布）

## 📁 网站结构

```
ElunaMamka.github.io/
├── index.html          # 主页面文件
├── static/             # 静态资源目录
│   ├── css/           # 样式文件
│   ├── picture/       # 图片资源
│   └── image/         # 其他图像文件
├── README.md          # 项目说明文档
└── OPTIMIZATION_SUMMARY.md  # 优化总结文档
```

## 🎯 内容管理指南

### 添加新论文
在 `papers` 部分的 `<ul>` 标签内添加新的 `<li>` 元素：

```html
<li style="background: rgba(255, 255, 255, 0.1); margin: 15px 0; padding: 20px; border-radius: 10px; border-left: 4px solid #颜色;">
    <a href="论文链接" target="_blank" style="color: #颜色; text-decoration: none; font-size: 1.1em; font-weight: bold;">
        论文标题
    </a>
    <p style="color: #bbb; margin: 10px 0 0 0; font-size: 0.9em;">
        论文描述
    </p>
</li>
```

### 添加新文章
复制现有文章卡片的HTML结构，修改以下内容：

1. **选择配色方案**：
   - 蓝紫色：`rgba(52, 152, 219, 0.1)` 和 `rgba(155, 89, 182, 0.1)`
   - 绿色：`rgba(46, 204, 113, 0.1)` 和 `rgba(26, 188, 156, 0.1)`
   - 红色：`rgba(231, 76, 60, 0.1)` 和 `rgba(192, 57, 43, 0.1)`
   - 紫色：`rgba(155, 89, 182, 0.1)` 和 `rgba(142, 68, 173, 0.1)`

2. **设置图标**：选择合适的emoji图标（🚀🤖💻🎵📊🔬等）

3. **修改内容**：
   - 标题和副标题
   - 描述文字
   - 发布日期
   - 标签类型
   - 点击链接

4. **示例代码**：
```html
<div class="article-card" style="background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(155, 89, 182, 0.1)); 
                                  border: 1px solid rgba(52, 152, 219, 0.3); 
                                  border-radius: 15px; 
                                  padding: 25px; 
                                  transition: all 0.3s ease;
                                  cursor: pointer;"
     onclick="window.open('你的文章链接', '_blank')">
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <span style="font-size: 2em; margin-right: 15px;">🚀</span>
        <div>
            <h3 style="color: #3498db; margin: 0; font-size: 1.3em;">文章标题</h3>
            <p style="color: #95a5a6; margin: 5px 0 0 0; font-size: 0.9em;">分类 • 标签</p>
        </div>
    </div>
    <p style="color: #bbb; line-height: 1.6; margin-bottom: 15px;">
        文章描述内容...
    </p>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="color: #3498db; font-size: 0.9em;">📅 发布日期</span>
        <span style="background: rgba(52, 152, 219, 0.2); color: #3498db; padding: 4px 12px; border-radius: 15px; font-size: 0.8em;">
            标签名称
        </span>
    </div>
</div>
```

### 添加照片到相册
1. 将图片上传到 `static/picture/` 目录
2. 在相应的JavaScript数组中添加图片信息
3. 更新地图标记（如果需要）

### 添加地图位置
在 `mapPhotos` 对象中添加新位置：

```javascript
"新位置名称": {
    lat: 纬度,
    lng: 经度,
    photos: ["图片1.jpg", "图片2.jpg"],
    description: "位置描述"
}
```

## 🛠️ 技术特性

- **响应式设计**：完美适配桌面端和移动端
- **现代CSS**：使用CSS Grid、Flexbox和现代动画
- **JavaScript ES6+**：使用类、箭头函数等现代语法
- **性能优化**：动画使用transform和opacity，避免重排重绘
- **无障碍设计**：良好的键盘导航和屏幕阅读器支持

## 🎨 设计理念

网站采用"自由"主题的双重背景设计：
- **乡村/休闲侧**：天空蓝→浅绿→卡其→棕褐色渐变
- **城市/奢华侧**：靛蓝→深洋红→深粉→金色渐变

动态背景元素随机组合，营造神奇的自然现象氛围，象征着自由自在的生活态度。

## 🚀 部署说明

1. 确保所有文件都在正确的目录结构中
2. 图片资源放在 `static/` 目录下
3. 直接部署到GitHub Pages或其他静态网站托管服务
4. 访问网站，享受全新的交互体验！

## 📞 联系方式

- **邮箱**: elunamamka.tjh@gmail.com
- **GitHub**: ElunaMamka
- **学校**: 武汉大学 (WHU)

---

*让技术与艺术完美融合，创造属于自己的数字世界！* ✨
