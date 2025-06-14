document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Tab Switching ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // --- Bottle Toggle Functionality ---
    const bottleToggleBtn = document.getElementById('bottle-toggle-btn');
    const bottleContainer = document.querySelector('.starry-bottle-container');
    
    if (bottleToggleBtn && bottleContainer) {
        bottleToggleBtn.addEventListener('click', () => {
            bottleContainer.classList.toggle('collapsed');
        });
    }

    // --- Hide Content Functionality ---
    const hideContentBtn = document.getElementById('hide-content-btn');
    const navContainer = document.querySelector('.nav-container');
    const mainContent = document.querySelector('main');
    const footer = document.getElementById('footer');
    
    let isContentHidden = false;
    
    if (hideContentBtn) {
        hideContentBtn.addEventListener('click', () => {
            isContentHidden = !isContentHidden;
            
            if (isContentHidden) {
                // 隐藏所有内容
                navContainer.style.opacity = '0';
                navContainer.style.pointerEvents = 'none';
                bottleContainer.style.opacity = '0';
                bottleContainer.style.pointerEvents = 'none';
                mainContent.style.opacity = '0';
                mainContent.style.pointerEvents = 'none';
                footer.style.opacity = '0';
                footer.style.pointerEvents = 'none';
                
                // 更新按钮状态
                hideContentBtn.classList.add('hidden-mode');
                hideContentBtn.innerHTML = '<i class="fas fa-eye"></i>';
                hideContentBtn.title = '显示内容';
            } else {
                // 显示所有内容
                navContainer.style.opacity = '1';
                navContainer.style.pointerEvents = 'auto';
                bottleContainer.style.opacity = '1';
                bottleContainer.style.pointerEvents = 'auto';
                mainContent.style.opacity = '1';
                mainContent.style.pointerEvents = 'auto';
                footer.style.opacity = '1';
                footer.style.pointerEvents = 'auto';
                
                // 更新按钮状态
                hideContentBtn.classList.remove('hidden-mode');
                hideContentBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
                hideContentBtn.title = '隐藏内容';
            }
        });
    }

    // --- Background Switching ---
    const bgSwitchBtn = document.getElementById('bg-switch-btn');
    const bgTypeDisplay = document.getElementById('bg-type-display');

    let currentBgIndex = 0;

    function switchToRandomBackground() {
        if (typeof window.advancedBgManager !== 'undefined') {
            const bgList = window.advancedBgManager.getBackgroundList();
            if (bgList.length > 0) {
                // Generate random index different from current
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * bgList.length);
                } while (newIndex === currentBgIndex && bgList.length > 1);
                
                currentBgIndex = newIndex;
                const newBg = bgList[currentBgIndex];
                window.advancedBgManager.setBackground(newBg.name);
                bgTypeDisplay.textContent = newBg.name;
                bgTypeDisplay.title = newBg.description;
            }
        } else if (typeof allBackgrounds !== 'undefined' && allBackgrounds.length > 0) {
            // 兼容原有系统
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * allBackgrounds.length);
            } while (newIndex === currentBgIndex && allBackgrounds.length > 1);
            
            currentBgIndex = newIndex;
            const newBg = allBackgrounds[currentBgIndex];
            document.body.style.background = newBg.style;
            document.body.style.backgroundAttachment = 'fixed';
            bgTypeDisplay.textContent = newBg.name;
            bgTypeDisplay.title = newBg.description;
        }
    }

    if (bgSwitchBtn && bgTypeDisplay) {
        bgSwitchBtn.addEventListener('click', () => {
            switchToRandomBackground();
            // --- 1. 手动切换时，愿望值清空 ---
            progress = 0;
            hasAutoSwitched = false;
            if (progressFill) progressFill.style.height = '0%';
            if (progressText) progressText.textContent = '0';
        });
    }

    // --- Starry Bottle Progress ---
    const starryBottle = document.querySelector('.starry-bottle');
    const progressFill = document.querySelector('.bottle-progress');
    const progressText = document.querySelector('.progress-text span');
    
    let progress = 0;
    let hasAutoSwitched = false;

    function updateProgress(increment = 0.2) {
        progress += increment;
        if (progress > 100) {
            progress = 100;
        }
        if (progressFill) progressFill.style.height = `${progress}%`;
        if (progressText) progressText.textContent = Math.round(progress);
        
        if (progress >= 100 && !hasAutoSwitched) {
            console.log("愿望值已满！自动切换背景");
            hasAutoSwitched = true;
            // Auto switch background when progress reaches 100
            setTimeout(() => {
                switchToRandomBackground();
                // Reset progress after a short delay
                setTimeout(() => {
                    progress = 0;
                    hasAutoSwitched = false;
                    if (progressFill) progressFill.style.height = '0%';
                    if (progressText) progressText.textContent = '0';
                }, 2000);
            }, 500);
        }
    }
    
    // Click bottle to increase progress
    if (starryBottle) {
        starryBottle.addEventListener('click', () => {
            updateProgress(5);
        });
    }

    // Auto-increment progress
    setInterval(() => {
        if (progress < 100) {
            updateProgress();
        }
    }, 100);

    // Create stars in bottle
    const bottleStars = document.querySelector('.bottle-stars');
    if (bottleStars) {
        for (let i = 0; i < 15; i++) {
            const star = document.createElement('div');
            star.className = 'bottle-star';
            star.innerHTML = '✨';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            star.style.fontSize = `${Math.random() * 5 + 3}px`;
            bottleStars.appendChild(star);
        }
    }

    // --- Code Block Switching ---
    const switchBtns = document.querySelectorAll('.switch-btn');
    const codeBlocks = document.querySelectorAll('.code-block');

    switchBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            switchBtns.forEach(b => b.classList.remove('active'));
            codeBlocks.forEach(block => block.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            codeBlocks[index].classList.add('active');
        });
    });

    // Add hover effect for code blocks to highlight corresponding switch button
    codeBlocks.forEach((block, index) => {
        block.addEventListener('mouseenter', () => {
            if (!block.classList.contains('active')) {
                switchBtns[index].style.background = 'rgba(138, 43, 226, 0.6)';
                switchBtns[index].style.transform = 'scale(1.05)';
            }
        });

        block.addEventListener('mouseleave', () => {
            if (!block.classList.contains('active')) {
                switchBtns[index].style.background = '';
                switchBtns[index].style.transform = '';
            }
        });
    });

    // --- Enhanced Terminal Functionality ---
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    // Command history
    let commandHistory = [];
    let historyIndex = -1;
    let inChatMode = false;

    // Terminal data
    const posts = [
        {
            title: '从GPU计算视角看Prefill和Decoding的差别',
            url: 'https://skitter-haircut-fb0.notion.site/GPU-Prefill-Decoding-210dbce7c5fe8035a064f4d9817986c5'
        }
    ];

    function appendOutput(html) {
        if (!terminalOutput) return;
        const line = document.createElement('div');
        line.innerHTML = html;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Special effects functions
    function createFireworks() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.style.position = 'fixed';
                firework.style.left = Math.random() * window.innerWidth + 'px';
                firework.style.top = Math.random() * window.innerHeight + 'px';
                firework.style.width = '10px';
                firework.style.height = '10px';
                firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                firework.style.borderRadius = '50%';
                firework.style.zIndex = '9999';
                firework.style.animation = 'firework 2s ease-out forwards';
                document.body.appendChild(firework);
                
                setTimeout(() => {
                    if (firework.parentNode) {
                        firework.parentNode.removeChild(firework);
                    }
                }, 2000);
            }, i * 200);
        }
        
        // Add CSS animation if not exists
        if (!document.getElementById('firework-style')) {
            const style = document.createElement('style');
            style.id = 'firework-style';
            style.textContent = `
                @keyframes firework {
                    0% { transform: scale(0); opacity: 1; }
                    50% { transform: scale(3); opacity: 0.8; }
                    100% { transform: scale(6); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.style.position = 'fixed';
        meteor.style.left = Math.random() * window.innerWidth + 'px';
        meteor.style.top = '0px';
        meteor.style.width = '3px';
        meteor.style.height = '50px';
        meteor.style.background = 'linear-gradient(to bottom, transparent, #ffffff, transparent)';
        meteor.style.zIndex = '9999';
        meteor.style.animation = 'meteor 3s linear forwards';
        document.body.appendChild(meteor);
        
        setTimeout(() => {
            if (meteor.parentNode) {
                meteor.parentNode.removeChild(meteor);
            }
        }, 3000);
        
        // Add CSS animation if not exists
        if (!document.getElementById('meteor-style')) {
            const style = document.createElement('style');
            style.id = 'meteor-style';
            style.textContent = `
                @keyframes meteor {
                    0% { transform: translateY(0) rotate(45deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(100vh) rotate(45deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    function createSnow() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const snowflake = document.createElement('div');
                snowflake.innerHTML = '❄';
                snowflake.style.position = 'fixed';
                snowflake.style.left = Math.random() * window.innerWidth + 'px';
                snowflake.style.top = '-20px';
                snowflake.style.color = 'white';
                snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
                snowflake.style.zIndex = '9999';
                snowflake.style.animation = `snow ${Math.random() * 3 + 2}s linear forwards`;
                document.body.appendChild(snowflake);
                
                setTimeout(() => {
                    if (snowflake.parentNode) {
                        snowflake.parentNode.removeChild(snowflake);
                    }
                }, 5000);
            }, i * 100);
        }
        
        if (!document.getElementById('snow-style')) {
            const style = document.createElement('style');
            style.id = 'snow-style';
            style.textContent = `
                @keyframes snow {
                    0% { transform: translateY(-20px) rotate(0deg); }
                    100% { transform: translateY(100vh) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Enhanced terminal commands (30+ commands)
    const commands = {
        help: () => `🎯 可用命令列表：
<br>📚 <span style="color: #50fa7b;">信息类：</span> papers, posts, links, about, whoami, date, uptime
<br>🎨 <span style="color: #ff79c6;">特效类：</span> fireworks, meteor, snow, rainbow, matrix, heart, star
<br>🔧 <span style="color: #8be9fd;">工具类：</span> calc, sha256, md5, base64, weather, ip, ping
<br>🎮 <span style="color: #f1fa8c;">游戏类：</span> dice, coin, lottery, guess, joke, fortune
<br>🎵 <span style="color: #bd93f9;">音乐类：</span> music, piano, drum
<br>💻 <span style="color: #50fa7b;">系统类：</span> ls, pwd, ps, top, df, free, uname
<br>🎭 <span style="color: #ff5555;">彩蛋类：</span> sudo, hack, virus, 42, konami, easteregg
<br>🌈 <span style="color: #ffb86c;">其他：</span> background, clear, history, cowsay, figlet`,

        // 信息类命令
        papers: () => {
            const paperList = [
                "NOTA: Multimodal Music Notation Understanding for Visual Large Language Model (NAACL Findings 2025)",
                "N-Gram Unsupervised Compoundation and Feature Injection for Better Symbolic Music Understanding (AAAI2024)"
            ];
            return '📚 我的论文：<br>' + paperList.map(p => `&gt; ${p}`).join('<br>');
        },
        posts: () => '📝 我的文章：<br>' + posts.map(p => `&gt; <a href="${p.url}" target="_blank" style="color: #8be9fd;">${p.title}</a>`).join('<br>'),
        links: () => {
            const linkList = [
                { text: "Cnblog", href: "https://www.cnblogs.com/CinqueOrigin/" },
                { text: "GitHub", href: "https://github.com/ElunaMamka" },
                { text: "算法笔记", href: "https://elunamamka.gitbook.io/algorithm/" }
            ];
            return '🔗 相关链接：<br>' + linkList.map(l => `&gt; <a href="${l.href}" target="_blank" style="color: #8be9fd;">${l.text}</a>`).join('<br>');
        },
        about: () => '👤 关于我：<br>一名对自然语言处理和音乐AI充满热情的探索者。<br>目前专注于多模态学习领域的研究。',
        whoami: () => 'ElunaMamka - 代码诗人，AI探索者',
        date: () => `📅 当前时间：${new Date().toLocaleString('zh-CN')}`,
        uptime: () => `⏰ 系统运行时间：${Math.floor(Math.random() * 100)}天 ${Math.floor(Math.random() * 24)}小时`,

        // 特效类命令
        fireworks: () => {
            createFireworks();
            return '🎆 烟花绽放中...';
        },
        meteor: () => {
            createMeteor();
            return '☄️ 流星划过天际...';
        },
        snow: () => {
            createSnow();
            return '❄️ 雪花飘落中...';
        },
        rainbow: () => {
            document.body.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
            return '🌈 彩虹背景已启用！';
        },
        matrix: () => {
            // 简单的矩阵效果
            const chars = '01';
            let result = '';
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 50; j++) {
                    result += chars[Math.floor(Math.random() * chars.length)];
                }
                result += '<br>';
            }
            return `<span style="color: #00ff00; font-family: monospace;">${result}</span>`;
        },
        heart: () => '💖💝💗💓💕💘💞💟❤️‍🔥❤️‍🩹❣️💔❤️🧡💛💚💙💜🤎🖤🤍',
        star: () => '⭐✨🌟💫⚡🔥✴️❇️🎇🎆',

        // 工具类命令
        calc: (args) => {
            if (!args.length) return '🧮 用法：calc [表达式]，例如：calc 2+2';
            try {
                const expr = args.join(' ').replace(/[^0-9+\-*/().]/g, '');
                const result = Function('"use strict"; return (' + expr + ')')();
                return `🧮 ${args.join(' ')} = ${result}`;
            } catch (e) {
                return '❌ 计算错误，请检查表达式';
            }
        },
        sha256: (args) => {
            if (!args.length) return '🔐 用法：sha256 [文本]';
            // 简化版SHA256（实际项目中应使用真正的加密库）
            const text = args.join(' ');
            const hash = btoa(text).replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 64);
            return `🔐 SHA256: ${hash}`;
        },
        md5: (args) => {
            if (!args.length) return '🔐 用法：md5 [文本]';
            const text = args.join(' ');
            const hash = btoa(text).replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 32);
            return `🔐 MD5: ${hash}`;
        },
        base64: (args) => {
            if (!args.length) return '🔄 用法：base64 [文本]';
            const text = args.join(' ');
            return `🔄 Base64: ${btoa(text)}`;
        },
        weather: () => `🌤️ 北京天气：晴朗 26°C 微风`,
        ip: () => `🌐 IP地址：192.168.1.${Math.floor(Math.random() * 255)}`,
        ping: (args) => {
            const host = args[0] || 'google.com';
            return `🏓 PING ${host}: 64 bytes from ${host}: time=${Math.floor(Math.random() * 50)}ms`;
        },

        // 游戏类命令
        dice: () => `🎲 骰子结果：${Math.floor(Math.random() * 6) + 1}`,
        coin: () => `🪙 抛硬币结果：${Math.random() > 0.5 ? '正面' : '反面'}`,
        lottery: () => {
            const nums = Array.from({length: 6}, () => Math.floor(Math.random() * 49) + 1);
            return `🎰 彩票号码：${nums.join(' - ')}`;
        },
        guess: () => {
            const num = Math.floor(Math.random() * 100) + 1;
            return `🤔 我想了一个1-100的数字：${num}，你猜对了吗？`;
        },
        joke: () => {
            const jokes = [
                '为什么程序员喜欢黑暗？因为光明会产生bug！',
                '程序员的三大美德：懒惰、急躁和傲慢。',
                '世界上有10种人：懂二进制的和不懂二进制的。',
                '为什么程序员总是搞混万圣节和圣诞节？因为Oct 31 == Dec 25！'
            ];
            return `😄 ${jokes[Math.floor(Math.random() * jokes.length)]}`;
        },
        fortune: () => {
            const fortunes = [
                '今天是写出完美代码的好日子！',
                '你的下一个项目将会大获成功！',
                '记住：没有bug，只有未实现的功能。',
                '今天适合学习新技术！'
            ];
            return `🔮 今日运势：${fortunes[Math.floor(Math.random() * fortunes.length)]}`;
        },

        // 音乐类命令
        music: () => '🎵 ♪ ♫ ♪ ♫ ♪ 音乐响起... ♫ ♪ ♫ ♪ ♫',
        piano: () => '🎹 Do Re Mi Fa Sol La Si Do~',
        drum: () => '🥁 咚咚咚 哒哒哒 咚咚咚 哒哒哒',

        // 系统类命令
        ls: () => `📁 目录内容：<br>drwxr-xr-x  projects/<br>drwxr-xr-x  documents/<br>-rw-r--r--  README.md<br>-rw-r--r--  .gitignore`,
        pwd: () => '📍 当前目录：/home/elunamamka',
        ps: () => `🔄 进程列表：<br>PID  COMMAND<br>1    systemd<br>42   chrome<br>1337 vscode<br>9999 terminal`,
        top: () => `📊 系统监控：<br>CPU: ${Math.floor(Math.random() * 100)}%<br>内存: ${Math.floor(Math.random() * 100)}%<br>负载: ${(Math.random() * 3).toFixed(2)}`,
        df: () => `💾 磁盘使用：<br>/dev/sda1  ${Math.floor(Math.random() * 100)}% 已使用`,
        free: () => `🧠 内存信息：<br>总计: 16GB<br>已用: ${Math.floor(Math.random() * 16)}GB<br>可用: ${16 - Math.floor(Math.random() * 16)}GB`,
        uname: () => '🖥️ 系统信息：Linux ElunaMamka 5.15.0 x86_64',

        // 彩蛋类命令
        sudo: (args) => {
            const sudoCommand = args.join(' ');
            if (sudoCommand === 'rm -rf /过去的自己/*') {
                return '✅ 成功删除过去的自己，重新开始！';
            }
            if (sudoCommand === 'touch /崭新的自己/') {
                return '✅ 创建了崭新的自己！';
            }
            if (sudoCommand.includes('rm -rf /')) {
                return '⚠️ 危险操作已被阻止！请不要删除重要文件。';
            }
            return `🔐 sudo: ${args[0] || 'command'} 需要管理员权限`;
        },
        hack: () => {
            let output = '<span style="color: #00ff00;">正在入侵...</span><br>';
            output += 'Connecting to mainframe...<br>';
            output += 'Bypassing firewall...<br>';
            output += 'Accessing database...<br>';
            output += '<span style="color: #ff0000;">入侵失败：权限不足 😄</span>';
            return output;
        },
        virus: () => '🦠 病毒扫描完成：发现0个威胁。你的系统很安全！',
        42: () => '🌌 生命、宇宙以及一切的终极答案就是：42',
        konami: () => '⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️ 秘籍已激活！',
        easteregg: () => '🥚 恭喜你发现了彩蛋！这里有一只可爱的小恐龙：🦕',

        // 其他命令
        background: (args) => {
            // 使用新的高级背景系统
            if (typeof window.advancedBgManager !== 'undefined') {
                const bgList = window.advancedBgManager.getBackgroundList();
                if (args[0] === 'ls') {
                    return '🎨 可用背景：<br>' + bgList.map((bg, i) => `${i}: ${bg.name} - ${bg.description}`).join('<br>');
                }
                const bgId = parseInt(args[0]);
                if (!isNaN(bgId) && bgList[bgId]) {
                    window.advancedBgManager.setBackground(bgList[bgId].name);
                    if (bgTypeDisplay) {
                        bgTypeDisplay.textContent = bgList[bgId].name;
                        bgTypeDisplay.title = bgList[bgId].description;
                    }
                    return `🎨 背景已切换为：${bgList[bgId].name}`;
                }
                if (args[0]) {
                    const bg = bgList.find(b => b.name.includes(args[0]) || b.description.includes(args[0]));
                    if (bg) {
                        window.advancedBgManager.setBackground(bg.name);
                        if (bgTypeDisplay) {
                            bgTypeDisplay.textContent = bg.name;
                            bgTypeDisplay.title = bg.description;
                        }
                        return `🎨 背景已切换为：${bg.name}`;
                    }
                }
                return '🎨 用法：background [编号/名称] 或 background ls 查看所有背景';
            } else if (typeof allBackgrounds !== 'undefined') {
                // 兼容原有系统
                if (args[0] === 'ls') {
                    return '🎨 可用背景：<br>' + allBackgrounds.map((bg, i) => `${i}: ${bg.name}`).join('<br>');
                }
                const bgId = parseInt(args[0]);
                if (!isNaN(bgId) && allBackgrounds[bgId]) {
                    document.body.style.background = allBackgrounds[bgId].style;
                    document.body.style.backgroundAttachment = 'fixed';
                    if (bgTypeDisplay) {
                        bgTypeDisplay.textContent = allBackgrounds[bgId].name;
                    }
                    return `🎨 背景已切换为：${allBackgrounds[bgId].name}`;
                }
                return '🎨 用法：background [编号] 或 background ls 查看所有背景';
            }
            return '❌ 背景系统未加载';
        },
        clear: () => {
            showWelcomeMessage();
            return null;
        },
        history: () => {
            if (commandHistory.length === 0) return '📜 命令历史为空';
            return '📜 命令历史：<br>' + commandHistory.map((cmd, i) => `${i + 1}: ${cmd}`).join('<br>');
        },
        cowsay: (args) => {
            const text = args.join(' ') || 'Hello World!';
            return `<pre>
 ${'_'.repeat(text.length + 2)}
< ${text} >
 ${'-'.repeat(text.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
</pre>`;
        },
        figlet: (args) => {
            const text = args.join(' ') || 'ElunaMamka';
            // 简化版ASCII艺术
            return `<pre style="color: #50fa7b;">
 _____ _                   __  __                 _        
| ____| |_   _ _ __   __ _|  \\/  | __ _ _ __ ___ | | ____ _ 
|  _| | | | | | '_ \\ / _\` | |\\/| |/ _\` | '_ \` _ \\| |/ / _\` |
| |___| | |_| | | | | (_| | |  | | (_| | | | | | |   < (_| |
|_____|_|\\__,_|_| |_|\\__,_|_|  |_|\\__,_|_| |_| |_|_|\\_\\__,_|
</pre>`;
        },
        chat: () => {
            inChatMode = true;
            return `💬 已进入聊天模式。输入 'exit' 退出。\n你好，我是 Eluna，很高兴认识你！有什么可以帮助你的吗？`;
        }
    };

    function showWelcomeMessage() {
        if (!terminalOutput) return;
        terminalOutput.innerHTML = ''; // Clear first
        appendOutput("🎉 欢迎来到 ElunaMamka 的交互式终端！");
        appendOutput("💡 输入 'help' 查看所有可用命令（30+种功能等你探索）");
        appendOutput("⬆️⬇️ 使用上下箭头键浏览命令历史");
    }

    // Terminal input handling with history
    if (terminalInput) {
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                const fullCommand = this.value.trim();
                
                appendOutput(`<span class="prompt">${inChatMode ? '👤' : '>'}</span> ${fullCommand}`);

                if (inChatMode) {
                    if (fullCommand.toLowerCase() === 'exit') {
                        inChatMode = false;
                        appendOutput("💬 已退出聊天模式。");
                    } else {
                        const response = getChatResponse(fullCommand);
                        appendOutput(`<span class="prompt" style="color: #ff79c6;">🤖</span> ${response}`);
                    }
                } else {
                    const [command, ...args] = fullCommand.split(/\s+/);
                    // Add to history
                    commandHistory.push(fullCommand);
                    historyIndex = commandHistory.length;

                    if (commands[command]) {
                        const result = commands[command](args);
                        if (result) appendOutput(result);
                    } else {
                        appendOutput(`❌ 命令未找到：${command}。输入 'help' 查看可用命令。`);
                    }
                }
                
                this.value = '';

            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    this.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    this.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    this.value = '';
                }
            }
        });
    }

    function getChatResponse(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('你好') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
            return '你好呀！很高兴能和你聊天。';
        }
        if (lowerMessage.includes('你是谁')) {
            return '我是一个内置在 ElunaMamka 主页的简单聊天机器人。';
        }
        if (lowerMessage.includes('再见') || lowerMessage.includes('bye')) {
            inChatMode = false;
            return '再见！随时可以再次输入 `chat` 来找我聊天。';
        }
        if (lowerMessage.includes('天气')) {
            return '这个我可不知道哦，不过你可以试试终端里的 `weather` 命令！';
        }
        if (lowerMessage.includes('笑话')) {
            return commands.joke();
        }
        if (lowerMessage.includes('运势')) {
            return commands.fortune();
        }

        const responses = [
            '嗯...这个话题有点深奥，我需要再学习一下。',
            '你说得很有趣！可以再多说一点吗？',
            '我正在思考...让我想想。',
            '哈哈，真有意思！',
            '我不完全确定我明白了你的意思。'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // --- Paper/Article Count and Filtering ---
    // Initial count setup
    const publicationsSection = document.getElementById('publications');
    if (publicationsSection) {
        const paperItems = publicationsSection.querySelectorAll('.paper-item[data-tags]');
        const paperCountSpan = document.getElementById('paper-count');
        if (paperCountSpan) paperCountSpan.textContent = paperItems.length;
    }

    const articlesSection = document.getElementById('articles');
    if (articlesSection) {
        const articleItems = articlesSection.querySelectorAll('.paper-item[data-tags]');
        const articleCountSpan = document.getElementById('article-count');
        if (articleCountSpan) articleCountSpan.textContent = articleItems.length;
    }
    
    // Filtering logic
    const filterButtons = document.querySelectorAll('.filter-tags .tag-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            const parentSection = button.closest('.content-section');
            const items = parentSection.querySelectorAll('.paper-item[data-tags]');
            const countSpan = parentSection.querySelector('[id$="-count"]');

            // Remove active class from all filter buttons in this section
            parentSection.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            let visibleCount = 0;
            items.forEach(item => {
                if (filter === 'all' || item.dataset.tags.includes(filter)) {
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            if (countSpan) {
                countSpan.textContent = visibleCount;
            }
        });
    });

    // --- Photo Wall Functionality ---
    const sitePhotos = [
        {
            src: 'static/image/bg.jpg',
            text: '历史的尘埃与现代的交响',
            date: '2023-08-15',
            location: '北京'
        },
        {
            src: 'static/image/g.jpg',
            text: '魔都的魅力，夜上海的繁华',
            date: '2023-09-20',
            location: '上海'
        },
        {
            src: 'static/picture/002.png',
            text: '偷得浮生半日闲，在成都的茶馆里',
            date: '2022-10-01',
            location: '成都'
        },
        {
            src: 'static/picture/fish.png',
            text: '触摸古都的脉搏，梦回大唐盛世',
            date: '2023-05-10',
            location: '西安'
        },
        {
            src: 'static/image/bg.jpg',
            text: '迷失在丽江古城的石板路上',
            date: '2021-07-22',
            location: '昆明' // Mapped to Yunnan
        },
        {
            src: 'static/image/g.jpg',
            text: '西湖边的柳树，诉说着千年的故事',
            date: '2023-04-05',
            location: '杭州'
        },
        {
            src: 'static/picture/002.png',
            text: '桂林山水甲天下，阳朔风光甲桂林',
            date: '2022-08-18',
            location: '南宁' // Mapped to Guangxi
        },
        {
            src: 'static/picture/fish.png',
            text: '离天堂最近的地方，心灵的净土',
            date: '2020-09-12',
            location: '拉萨' // Mapped to Xizang
        },
        {
            src: 'static/image/bg.jpg',
            text: '红瓦绿树，碧海蓝天',
            date: '2023-07-30',
            location: '济南' // Mapped to Shandong
        },
        {
            src: 'static/image/g.jpg',
            text: '东京塔下的约定',
            date: '2019-12-25',
            location: 'Tokyo' // International
        },
        {
            src: 'static/picture/002.png',
            text: '塞纳河畔的浪漫邂逅',
            date: '2018-06-10',
            location: 'Paris' // International
        },
        {
            src: 'static/picture/fish.png',
            text: '一个无法被定位的神秘之地',
            date: '2024-01-01',
            location: '未知地点', // No match
            force_region: '天空之城' // Forcibly assign to Sky City
        },
        {
            src: 'static/image/bg.jpg',
            text: '鼓浪屿的日落',
            date: '2022-11-11',
            location: '厦门', // No city match in map
            force_region: '福建' // Forcibly assign to Fujian
        }
    ];
    window.sitePhotos = sitePhotos; // Expose to global scope for map-album.js

    let currentPhotoIndex = 0;

    const mainPhoto = document.getElementById('main-photo');
    const leftPreview = document.getElementById('left-preview-img');
    const rightPreview = document.getElementById('right-preview-img');
    const photoCounter = document.getElementById('photo-counter');
    const photoText = document.getElementById('photo-text');
    const photoDate = document.getElementById('photo-date');
    const photoLocation = document.getElementById('photo-location');
    const prevBtn = document.getElementById('prev-photo');
    const nextBtn = document.getElementById('next-photo');
    const randomBtn = document.getElementById('random-photo');

    function updatePhotoWall() {
        if (!mainPhoto || sitePhotos.length === 0) return;

        const currentPhoto = sitePhotos[currentPhotoIndex];
        
        // Update main photo
        mainPhoto.src = currentPhoto.src;
        
        // Update photo text
        if (photoText) {
            photoText.textContent = currentPhoto.text;
        }

        // Update photo date
        if (photoDate) {
            photoDate.textContent = currentPhoto.date ? `📅 ${currentPhoto.date}` : '📅 未知的时间长河';
        }

        // Update photo location
        if (photoLocation) {
            photoLocation.textContent = currentPhoto.location ? `📍 ${currentPhoto.location}` : '📍 神秘的天空之城';
        }

        // Update previews
        const prevIndex = (currentPhotoIndex - 1 + sitePhotos.length) % sitePhotos.length;
        const nextIndex = (currentPhotoIndex + 1) % sitePhotos.length;

        if (leftPreview) leftPreview.src = sitePhotos[prevIndex].src;
        if (rightPreview) rightPreview.src = sitePhotos[nextIndex].src;

        // Update counter
        if (photoCounter) {
            photoCounter.textContent = `${currentPhotoIndex + 1} / ${sitePhotos.length}`;
        }
    }

    // Photo navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex - 1 + sitePhotos.length) % sitePhotos.length;
            updatePhotoWall();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex + 1) % sitePhotos.length;
            updatePhotoWall();
        });
    }

    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * sitePhotos.length);
            } while (newIndex === currentPhotoIndex && sitePhotos.length > 1);
            currentPhotoIndex = newIndex;
            updatePhotoWall();
        });
    }

    // Initial call to set up the first photo
    updatePhotoWall();

    // --- Initialize ---
    // Initialize terminal with welcome message
    if (terminalOutput) {
        showWelcomeMessage();
    }

}); 