// 网站功能修复脚本

// 满天星瓶子管理器
const starBottleManager = {
    progress: 0,
    maxProgress: 100,
    autoIncrement: true,
    
    init() {
        this.updateDisplay();
        if (this.autoIncrement) {
            this.startAutoProgress();
        }
    },
    
    addStars() {
        this.progress += Math.random() * 15 + 5;
        if (this.progress > this.maxProgress) {
            this.progress = 0;
            this.showCompletionEffect();
        }
        this.updateDisplay();
    },
    
    startAutoProgress() {
        setInterval(() => {
            if (this.autoIncrement) {
                this.progress += Math.random() * 5 + 1;
                if (this.progress > this.maxProgress) {
                    this.progress = 0;
                    this.showCompletionEffect();
                }
                this.updateDisplay();
            }
        }, 500);
    },
    
    updateDisplay() {
        const progressBars = document.querySelectorAll('#bottle-progress');
        progressBars.forEach(bar => {
            if (bar) {
                bar.style.width = this.progress + '%';
                bar.style.background = `linear-gradient(90deg, #ffd700 0%, #ffed4e ${this.progress/2}%, #fff9c4 ${this.progress}%, transparent ${this.progress}%)`;
            }
        });
    },
    
    showCompletionEffect() {
        const bottles = document.querySelectorAll('.starry-bottle');
        bottles.forEach(bottle => {
            bottle.style.animation = 'starBurst 1s ease-out';
            setTimeout(() => bottle.style.animation = '', 1000);
        });
    }
};

// 背景切换器
const backgroundSwitcher = {
    currentBg: '自然城市渐变',
    
    init() {
        this.createSwitcherButton();
        this.createHideButton();
    },
    
    createSwitcherButton() {
        const container = document.querySelector('.starry-bottle-container');
        if (container) {
            const switcherBtn = document.createElement('button');
            switcherBtn.innerHTML = '🎨 ' + this.currentBg;
            switcherBtn.className = 'bg-switcher-btn';
            switcherBtn.title = '随机切换背景';
            switcherBtn.style.cssText = `background: rgba(0,0,0,0.3); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 15px; cursor: pointer; font-size: 12px; backdrop-filter: blur(10px); transition: all 0.3s ease;`;
            switcherBtn.onclick = () => this.switchRandomBackground();
            container.appendChild(switcherBtn);
        }
    },
    
    createHideButton() {
        const homeTab = document.querySelector('#home');
        if (homeTab) {
            const hideBtnContainer = document.createElement('div');
            hideBtnContainer.style.cssText = 'text-align: center; margin-top: 20px;';
            
            const hideBtn = document.createElement('button');
            hideBtn.innerHTML = '👁️ 沉浸式欣赏';
            hideBtn.className = 'hide-content-btn';
            hideBtn.style.cssText = `background: rgba(0,0,0,0.3); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 20px; cursor: pointer; font-size: 14px; backdrop-filter: blur(10px); transition: all 0.3s ease;`;
            hideBtn.onclick = () => this.toggleContentVisibility();
            
            hideBtnContainer.appendChild(hideBtn);
            // 将按钮添加到 home 内容区域的末尾
            homeTab.appendChild(hideBtnContainer);
        }
    },
    
    switchRandomBackground() {
        if (typeof weatherSystem !== 'undefined' && weatherSystem.weatherMap) {
            const weatherTypes = Object.keys(weatherSystem.weatherMap);
            const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
            weatherSystem.setWeather(weatherSystem.weatherMap[randomWeather]);
            this.currentBg = randomWeather;
            
            const switcherBtn = document.querySelector('.bg-switcher-btn');
            if (switcherBtn) {
                switcherBtn.innerHTML = '🎨 ' + this.currentBg;
            }
        }
    },
    
    toggleContentVisibility() {
        const contentSections = document.querySelectorAll('.content-section');
        const navContainer = document.querySelector('.nav-container');
        const hideBtn = document.querySelector('.hide-content-btn');
        const isHidden = document.body.classList.contains('content-hidden');
        
        if (isHidden) {
            navContainer.style.display = '';
            contentSections.forEach(section => {
                // 仅恢复当前活动的tab
                if (section.id === window.currentActiveSection) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            document.body.classList.remove('content-hidden');
            hideBtn.innerHTML = '👁️ 沉浸式欣赏';
        } else {
            navContainer.style.display = 'none';
            contentSections.forEach(section => {
                section.style.display = 'none';
            });
            document.body.classList.add('content-hidden');
            hideBtn.innerHTML = '👁️ 恢复视图';
            // 确保按钮自身可见，因为它在#home里，而#home被隐藏了。
            // 我们需要把它移到body下或者改变逻辑。
            // 简单的做法是只隐藏其他section
            document.querySelector('#home').style.display = 'block';
        }
    }
};

// 论文文章计数修复
function updateContentCounts() {
    const paperItems = document.querySelectorAll('.paper-item');
    const visiblePapers = Array.from(paperItems).filter(item => item.style.display !== 'none' && !item.classList.contains('hidden'));
    
    const articleItems = document.querySelectorAll('.article-item');
    const visibleArticles = Array.from(articleItems).filter(item => item.style.display !== 'none' && !item.classList.contains('hidden'));
    
    const paperCounts = document.querySelectorAll('#papers-count');
    const articleCounts = document.querySelectorAll('#articles-count');
    
    paperCounts.forEach(count => { if (count) count.textContent = visiblePapers.length; });
    articleCounts.forEach(count => { if (count) count.textContent = visibleArticles.length; });
}

// 标签过滤功能 - 更新为使用tag-filter类
function filterByTag(tag, type) {
    const items = document.querySelectorAll(`.${type}-item`);
    
    items.forEach(item => {
        if (tag === 'all') {
            item.style.display = 'block';
            item.classList.remove('hidden');
        } else {
            const itemTags = item.getAttribute('data-tags');
            if (itemTags && itemTags.includes(tag)) {
                item.style.display = 'block';
                item.classList.remove('hidden');
            } else {
                item.style.display = 'none';
                item.classList.add('hidden');
            }
        }
    });
    
    updateContentCounts();
    
    // 更新标签按钮状态 - 使用正确的选择器
    const filterClass = type === 'paper' ? 'papers-filter' : 'articles-filter';
    const tagButtons = document.querySelectorAll(`.${filterClass}`);
    tagButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tag') === tag) {
            btn.classList.add('active');
        }
    });
}

// 命令历史功能
const commandHistory = {
    history: [],
    currentIndex: -1,
    
    add(command) {
        if (command.trim() && this.history[this.history.length - 1] !== command) {
            this.history.push(command);
            if (this.history.length > 50) this.history.shift();
        }
        this.currentIndex = this.history.length;
    },
    
    getPrevious() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    },
    
    getNext() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        } else if (this.currentIndex === this.history.length - 1) {
            this.currentIndex = this.history.length;
            return '';
        }
        return null;
    }
};

// 重新定义终端输入处理函数
function handleTerminalInputNew(event) {
    const input = event.target;
    
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        const prev = commandHistory.getPrevious();
        if (prev !== null) input.value = prev;
        return;
    }
    
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        const next = commandHistory.getNext();
        if (next !== null) input.value = next;
        return;
    }
    
    if (event.key === 'Enter') {
        const inputValue = input.value.trim();
        const output = document.getElementById('terminal-output');
        
        commandHistory.add(inputValue);
        
        const userLine = document.createElement('div');
        userLine.innerHTML = `<span style="color: #27ae60;">visitor@ElunaMamka:~$</span> ${inputValue}`;
        output.appendChild(userLine);
        
        let result;
        if (typeof processSmartInput !== 'undefined') {
            result = processSmartInput(inputValue);
        } else {
            result = '命令处理系统未加载';
        }
        
        if (result === "CLEAR_TERMINAL") {
            output.innerHTML = `<div style="color: #27ae60;">终端已清空！✨</div><div style="color: #555; margin: 10px 0;">输入 'help' 查看可用命令，或直接聊天！</div>`;
        } else if (result) {
            const response = document.createElement('div');
            response.style.color = '#3498db';
            response.style.margin = '5px 0';
            response.style.whiteSpace = 'pre-wrap';
            response.textContent = result;
            output.appendChild(response);
        }
        
        input.value = '';
        output.scrollTop = output.scrollHeight;
    }
}

// 确保页面加载完成后执行所有修复和初始化
function initializeWebsiteFixes() {
    console.log("🚀 初始化网站修复脚本...");

    // 1. 初始化满天星瓶子
    starBottleManager.init();
    
    // 2. 初始化背景切换器和隐藏按钮
    backgroundSwitcher.init();

    // 3. 绑定论文和文章筛选器事件
    const paperFilters = document.querySelectorAll('.papers-filter');
    paperFilters.forEach(button => {
        button.addEventListener('click', () => filterByTag(button.dataset.tag, 'paper'));
    });
    
    const articleFilters = document.querySelectorAll('.articles-filter');
    articleFilters.forEach(button => {
        button.addEventListener('click', () => filterByTag(button.dataset.tag, 'article'));
    });

    // 4. 页面加载时更新一次计数
    updateContentCounts();

    // 5. 确保终端输入事件监听器指向新的函数
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
        // 移除旧的 onkeypress 属性，改用 addEventListener
        terminalInput.removeAttribute('onkeypress');
        terminalInput.addEventListener('keydown', handleTerminalInputNew);
        console.log("✅ 终端输入已更新为新版处理函数。");
    }
    
    // 6. 确保 star bottle 可点击
    const bottle = document.querySelector('.starry-bottle');
    if(bottle) {
        bottle.addEventListener('click', () => starBottleManager.addStars());
        console.log("✅ 满天星瓶子已启用点击功能。");
    }
    
    console.log("🛠️ 网站修复脚本初始化完成。");
}

// 添加必要的CSS样式
function addFixStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes starBurst {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); filter: brightness(1.5); }
            100% { transform: scale(1); }
        }
        .bg-switcher-btn:hover, .hide-content-btn:hover {
            background: rgba(255,255,255,0.1) !important;
            transform: scale(1.05);
        }
        .tag-filter {
            background: rgba(52, 152, 219, 0.2);
            color: #3498db;
            border: 1px solid #3498db;
            padding: 8px 15px;
            margin: 5px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-block;
            font-size: 0.9em;
        }
        .tag-filter:hover {
            background: rgba(52, 152, 219, 0.3);
            transform: scale(1.05);
        }
        .tag-filter.active {
            background: #3498db;
            color: white;
            box-shadow: 0 2px 10px rgba(52, 152, 219, 0.3);
        }
        .tag-filter-container {
            margin: 20px 0 30px 0;
            text-align: center;
        }
        .hide-content-btn-container {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1001;
        }

        body.content-hidden .hide-content-btn-container {
            position: fixed; /* 沉浸模式下固定定位 */
        }
        
        /* 修复隐藏按钮在沉浸模式下的问题 */
        body.content-hidden #home {
            display: block !important;
            padding: 0;
            min-height: auto;
        }

        body.content-hidden #home > *:not(.hide-content-btn-container) {
            display: none;
        }

        body.content-hidden .hide-content-btn-container {
            display: block !important;
        }
    `;
    document.head.appendChild(style);
}

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsiteFixes();
    addFixStyles();
});

console.log('网站修复脚本已加载'); 