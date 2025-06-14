// 高级动态背景系统
const advancedBackgrounds = [
    {
        name: "极光",
        description: "静谧夜空中的绿色和紫色光幕",
        type: "aurora",
        baseStyle: "radial-gradient(ellipse at center, #001122 0%, #000511 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            this.createAurora();
        },
        createAurora: function() {
            const container = document.createElement('div');
            container.className = 'aurora-container';
            container.innerHTML = `
                <div class="aurora-layer aurora-1"></div>
                <div class="aurora-layer aurora-2"></div>
                <div class="aurora-layer aurora-3"></div>
                <div class="stars-field"></div>
            `;
            
            // 创建星星
            const starsField = container.querySelector('.stars-field');
            for (let i = 0; i < 200; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                star.style.animationDuration = (Math.random() * 2 + 1) + 's';
                starsField.appendChild(star);
            }
            
            this.addStyles(`
                .aurora-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                }
                .aurora-layer {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    opacity: 0.7;
                    animation: aurora-wave 8s ease-in-out infinite;
                }
                .aurora-1 {
                    background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 127, 0.3) 50%, transparent 70%);
                    animation-delay: 0s;
                }
                .aurora-2 {
                    background: linear-gradient(-45deg, transparent 20%, rgba(138, 43, 226, 0.4) 60%, transparent 80%);
                    animation-delay: 2s;
                }
                .aurora-3 {
                    background: linear-gradient(90deg, transparent 40%, rgba(0, 191, 255, 0.2) 50%, transparent 60%);
                    animation-delay: 4s;
                }
                .stars-field {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .star {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: white;
                    border-radius: 50%;
                    animation: twinkle linear infinite;
                }
                @keyframes aurora-wave {
                    0%, 100% { transform: translateY(0) scaleY(1); }
                    50% { transform: translateY(-20px) scaleY(1.1); }
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "海边日落",
        description: "太阳沉入海平面的壮丽景象",
        type: "coastal-sunset",
        baseStyle: "linear-gradient(to bottom, #ff7e5f 0%, #feb47b 50%, #ff6b6b 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            const { container, destroy } = this.createSunset();
            
            let animationFrameId;
            const sunEl = container.querySelector('.sun');
            const reflectionEl = container.querySelector('.sun-reflection');
            const horizonY = window.innerHeight * 0.6;

            const animate = () => {
                if (!container.isConnected) { // Stop if element is removed
                    destroy();
                    return;
                }
                const sunRect = sunEl.getBoundingClientRect();
                if (sunRect.top > 0 && sunRect.top < horizonY) {
                    const reflectionOpacity = Math.min(1, (horizonY - sunRect.top) / (horizonY * 0.5)) * 0.8;
                    reflectionEl.style.opacity = reflectionOpacity;
                } else {
                    reflectionEl.style.opacity = '0';
                }
                animationFrameId = requestAnimationFrame(animate);
            };
            animate();

            const customDestroy = () => {
                cancelAnimationFrame(animationFrameId);
            };

            return { container, destroy: customDestroy };
        },
        createSunset: function() {
            const container = document.createElement('div');
            container.className = 'sunset-container';
            container.innerHTML = `
                <div class="sky sky-night"></div>
                <div class="sky sky-day"></div>
                <div class="sun"></div>
                <div class="ocean-surface"></div>
                <div class="sun-reflection"></div>
                <div class="waves"></div>
                <div class="birds"></div>
            `;
            
            const birds = container.querySelector('.birds');
            for(let i=0; i<3; i++){
                const bird = document.createElement('div');
                bird.className = 'bird';
                bird.style.setProperty('--i', i);
                birds.appendChild(bird);
            }

            this.addStyles(`
                .sunset-container {
                    position: fixed; top: 0; left: 0;
                    width: 100%; height: 100%;
                    pointer-events: none;
                    z-index: -1;
                    overflow: hidden;
                }
                .sky {
                    position: absolute;
                    width: 100%; height: 100%;
                    transition: opacity 10s linear;
                }
                .sky-day {
                     background: linear-gradient(to bottom, #87CEEB 0%, #ff7e5f 50%, #feb47b 100%);
                     animation: day-fade-out 20s linear infinite;
                }
                 .sky-night {
                    background: linear-gradient(to bottom, #000 0%, #111 100%);
                    opacity: 1;
                }
                .sun {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    background: radial-gradient(circle, #ffeb3b 0%, #ff9800 70%, #ff5722 100%);
                    border-radius: 50%;
                    left: 50%;
                    top: 50%;
                    transform: translateX(-50%);
                    box-shadow: 0 0 50px rgba(255, 235, 59, 0.8);
                    animation: sun-set-animation 20s linear infinite;
                }
                .ocean-surface {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 40%;
                    background: linear-gradient(to bottom, rgba(30, 60, 114, 0.8) 0%, rgba(0, 4, 40, 0.9) 100%);
                }
                .sun-reflection {
                    position: absolute;
                    bottom: 40%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 250px;
                    height: 150px;
                    background: linear-gradient(to top, rgba(255, 152, 0, 0.6) 0%, transparent 70%);
                    clip-path: polygon(25% 0, 75% 0, 100% 100%, 0% 100%);
                    opacity: 0;
                    animation: reflection-shimmer 2s ease-in-out infinite;
                }
                .waves {
                    position: absolute;
                    bottom: 0;
                    width: 200%;
                    height: 40%;
                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><path d="M0 10 Q 25 20, 50 10 T 100 10" stroke="rgba(255,255,255,0.1)" fill="none"/></svg>') repeat-x;
                    background-size: 100px 20px;
                    animation: wave-motion 5s linear infinite;
                }
                .bird {
                    position: absolute;
                    width: 20px;
                    height: 2px;
                    background: #333;
                    top: 30%;
                    animation: fly-across 15s linear infinite;
                    animation-delay: calc(var(--i) * 3s);
                }
                .bird::before, .bird::after {
                    content: '';
                    position: absolute;
                    width: 10px;
                    height: 2px;
                    background: #333;
                    animation: flap-wings 0.5s linear infinite;
                }
                .bird::before { transform-origin: right; left: -10px; }
                .bird::after { transform-origin: left; left: 10px; }

                @keyframes sun-set-animation {
                    0% { top: 30%; opacity: 1; }
                    80% { top: 58%; opacity: 1; }
                    100% { top: 65%; opacity: 0; }
                }
                @keyframes day-fade-out {
                    0% { opacity: 1; }
                    80% { opacity: 0; }
                    100% { opacity: 0; }
                }
                @keyframes reflection-shimmer {
                    0%, 100% { transform: translateX(-50%) scaleY(1); }
                    50% { transform: translateX(-50%) scaleY(1.05); }
                }
                @keyframes wave-motion {
                    0% { background-position: 0 0; }
                    100% { background-position: -100px 0; }
                }
                @keyframes fly-across {
                    0% { left: -5%; }
                    100% { left: 105%; }
                }
                @keyframes flap-wings {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(-30deg); }
                }
            `);
            
            document.body.appendChild(container);
            
            const destroy = () => {
                 cancelAnimationFrame(animationFrameId);
            };

            return { container, destroy };
        }
    },
    
    {
        name: "日出云海",
        description: "太阳从翻涌的云海中升起",
        type: "sunrise-clouds",
        baseStyle: "linear-gradient(to bottom, #3a3a5e 0%, #ff9a9e 50%, #fecfef 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            const container = this.createSunriseClouds();
            
            let animationFrameId;
            const sunEl = container.querySelector('.rising-sun');
            const sunGlow = container.querySelector('.sun-glow-reflection');
            const cloudTopY = window.innerHeight * 0.5;

            const animate = () => {
                const sunRect = sunEl.getBoundingClientRect();
                 if (sunRect.bottom < cloudTopY) {
                    const intensity = Math.max(0, 1 - (sunRect.bottom / cloudTopY));
                    sunGlow.style.opacity = intensity * 0.7;
                } else {
                    sunGlow.style.opacity = '0';
                }
                animationFrameId = requestAnimationFrame(animate);
            };
            animate();

            const destroy = () => {
                cancelAnimationFrame(animationFrameId);
            };

            return { container, destroy };
        },
        createSunriseClouds: function() {
            const container = document.createElement('div');
            container.className = 'sunrise-clouds-container';
            container.innerHTML = `
                <div class="sky-background"></div>
                <div class="sun-glow-reflection"></div>
                <div class="rising-sun"></div>
                <div class="cloud-sea cloud-sea-back"></div>
                <div class="cloud-sea cloud-sea-mid"></div>
                <div class="cloud-sea cloud-sea-front"></div>
                <div class="sun-rays"></div>
            `;
            
            ['.cloud-sea-front', '.cloud-sea-mid', '.cloud-sea-back'].forEach((selector, index) => {
                const cloudSea = container.querySelector(selector);
                for (let i = 0; i < 10; i++) {
                    const cloud = document.createElement('div');
                    cloud.className = 'sea-cloud';
                    cloud.style.left = Math.random() * 120 - 10 + '%';
                    cloud.style.bottom = (Math.random() * 20 + index * 10) + '%';
                    cloud.style.animationDelay = Math.random() * 8 + 's';
                    cloud.style.animationDuration = (Math.random() * 10 + 20 + index * 5) + 's';
                    cloudSea.appendChild(cloud);
                }
            });
            
            const sunRays = container.querySelector('.sun-rays');
            for (let i = 0; i < 12; i++) {
                const ray = document.createElement('div');
                ray.className = 'sun-ray';
                ray.style.transform = `rotate(${i * 30}deg)`;
                ray.style.animationDelay = (i * 0.2) + 's';
                sunRays.appendChild(ray);
            }
            
            this.addStyles(`
                .sunrise-clouds-container {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none; z-index: -1; overflow: hidden;
                }
                .sky-background {
                    position: absolute; width: 100%; height: 100%;
                    background: linear-gradient(to bottom, #3a3a5e 0%, #ff9a9e 50%, #fecfef 100%);
                    animation: sky-brighten 15s linear infinite;
                }
                .rising-sun {
                    position: absolute;
                    width: 100px; height: 100px;
                    background: radial-gradient(circle, #ffeb3b 0%, #ff9800 100%);
                    border-radius: 50%; left: 50%;
                    transform: translateX(-50%);
                    box-shadow: 0 0 80px rgba(255, 235, 59, 0.9);
                    animation: sun-rise-animation 15s ease-out infinite;
                }
                .sun-glow-reflection {
                    position: absolute;
                    top: 0; width: 100%; height: 60%;
                    background: radial-gradient(ellipse at 50% 100%, rgba(255,165,0,0.4) 0%, transparent 50%);
                    opacity: 0;
                }
                .cloud-sea { position: absolute; width: 100%; height: 100%; }
                .cloud-sea-front { z-index: 3; }
                .cloud-sea-mid { z-index: 2; filter: brightness(0.9); }
                .cloud-sea-back { z-index: 1; filter: brightness(0.8); }

                .sea-cloud {
                    position: absolute;
                    width: 250px; height: 100px;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 100px;
                    animation: cloud-float linear infinite;
                }
                .sea-cloud::before {
                    content: ''; position: absolute;
                    width: 150px; height: 150px;
                    background: rgba(255, 255, 255, 0.85);
                    border-radius: 50%; top: -75px; left: 50px;
                }
                .sun-rays {
                    position: absolute; left: 50%; top: 0; width: 100%; height: 100%;
                    animation: rays-appear 15s ease-out infinite;
                    opacity: 0;
                    transform-origin: center;
                }
                .sun-ray {
                    position: absolute;
                    width: 2px;
                    height: 150%;
                    background: linear-gradient(to top, rgba(255, 235, 59, 0.5) 0%, transparent 30%);
                    left: 50%;
                    top: 50%;
                    transform-origin: 0 0;
                }
                @keyframes sun-rise-animation {
                    0% { top: 60%; opacity: 0.5; }
                    80%, 100% { top: 35%; opacity: 1; }
                }
                 @keyframes rays-appear {
                    0%, 40% { opacity: 0; transform: scale(0.8); }
                    80%, 100% { opacity: 1; transform: scale(1); }
                }
                @keyframes sky-brighten {
                    0% { filter: brightness(0.7); }
                    80%, 100% { filter: brightness(1); }
                }
                @keyframes cloud-float {
                    0% { transform: translateX(-250px); }
                    100% { transform: translateX(calc(100vw + 250px)); }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "暴风雪",
        description: "狂风中的密集雪花",
        type: "blizzard",
        baseStyle: "linear-gradient(to bottom, #606c88 0%, #3f4c6b 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createBlizzard();
        },
        createBlizzard: function() {
            const container = document.createElement('div');
            container.className = 'blizzard-container';
            
            // 创建雪花
            for (let i = 0; i < 300; i++) {
                const snowflake = document.createElement('div');
                snowflake.className = 'blizzard-snow';
                snowflake.innerHTML = '❄';
                snowflake.style.left = Math.random() * 100 + '%';
                snowflake.style.animationDelay = Math.random() * 5 + 's';
                snowflake.style.animationDuration = (Math.random() * 2 + 1) + 's';
                snowflake.style.fontSize = (Math.random() * 10 + 8) + 'px';
                snowflake.style.opacity = Math.random() * 0.8 + 0.2;
                container.appendChild(snowflake);
            }
            
            this.addStyles(`
                .blizzard-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                    overflow: hidden;
                }
                .blizzard-snow {
                    position: absolute;
                    color: white;
                    animation: blizzard-fall linear infinite;
                    transform: rotate(45deg);
                }
                @keyframes blizzard-fall {
                    0% {
                        transform: translateY(-100px) translateX(-50px) rotate(45deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) translateX(50px) rotate(45deg);
                        opacity: 0;
                    }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "雷暴",
        description: "乌云密布的雷电风暴",
        type: "thunderstorm",
        baseStyle: "linear-gradient(to bottom, #232526 0%, #414345 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createThunderstorm();
        },
        createThunderstorm: function() {
            const container = document.createElement('div');
            container.className = 'thunderstorm-container';
            container.innerHTML = `
                <div class="storm-clouds"></div>
                <div class="rain-layer"></div>
                <div class="lightning-layer"></div>
                <div class="tornado-layer"></div>
            `;
            
            // 创建雨滴
            const rainLayer = container.querySelector('.rain-layer');
            for (let i = 0; i < 200; i++) {
                const raindrop = document.createElement('div');
                raindrop.className = 'raindrop';
                raindrop.style.left = Math.random() * 100 + '%';
                raindrop.style.animationDelay = Math.random() * 2 + 's';
                raindrop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
                rainLayer.appendChild(raindrop);
            }
            
            // 创建更多闪电
            const lightningLayer = container.querySelector('.lightning-layer');
            for (let i = 0; i < 5; i++) {
                const lightning = document.createElement('div');
                lightning.className = 'lightning';
                lightning.style.left = Math.random() * 100 + '%';
                lightning.style.animationDelay = Math.random() * 5 + 's';
                lightningLayer.appendChild(lightning);
            }
            
            // 创建龙卷风
            const tornadoLayer = container.querySelector('.tornado-layer');
            for (let i = 0; i < 2; i++) {
                const tornado = document.createElement('div');
                tornado.className = 'tornado';
                tornado.style.left = (20 + i * 60) + '%';
                tornado.style.animationDelay = (i * 3) + 's';
                tornadoLayer.appendChild(tornado);
            }
            
            this.addStyles(`
                .thunderstorm-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                }
                .storm-clouds {
                    position: absolute;
                    width: 100%;
                    height: 40%;
                    background: linear-gradient(to bottom, rgba(35, 37, 38, 0.9) 0%, rgba(65, 67, 69, 0.7) 100%);
                    animation: cloud-movement 8s ease-in-out infinite;
                }
                .rain-layer {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .raindrop {
                    position: absolute;
                    width: 2px;
                    height: 20px;
                    background: linear-gradient(to bottom, rgba(173, 216, 230, 0.8) 0%, transparent 100%);
                    animation: rain-fall linear infinite;
                }
                .lightning-layer {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .lightning {
                    position: absolute;
                    width: 3px;
                    height: 60%;
                    background: linear-gradient(to bottom, #ffffff 0%, #87ceeb 50%, transparent 100%);
                    animation: lightning-flash 6s ease-in-out infinite;
                    opacity: 0;
                    box-shadow: 0 0 20px #ffffff, 0 0 40px #87ceeb;
                }
                .tornado-layer {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .tornado {
                    position: absolute;
                    bottom: 0;
                    width: 60px;
                    height: 80%;
                    background: conic-gradient(from 0deg, rgba(100, 100, 100, 0.6), rgba(150, 150, 150, 0.8), rgba(100, 100, 100, 0.6));
                    border-radius: 50% 50% 50% 50% / 0% 0% 100% 100%;
                    animation: tornado-spin 4s linear infinite, tornado-sway 8s ease-in-out infinite;
                    opacity: 0.7;
                }
                .tornado::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, rgba(80, 80, 80, 0.8), transparent);
                    border-radius: 50%;
                }
                @keyframes cloud-movement {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(20px); }
                }
                @keyframes rain-fall {
                    0% { transform: translateY(-100px); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                @keyframes lightning-flash {
                    0%, 90%, 100% { opacity: 0; }
                    91%, 93%, 95% { opacity: 1; }
                    92%, 94% { opacity: 0.3; }
                }
                @keyframes tornado-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes tornado-sway {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(30px); }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "星空银河",
        description: "璀璨银河横贯夜空",
        type: "milky-way",
        baseStyle: "radial-gradient(ellipse at center, #0c0c0c 0%, #000000 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createMilkyWay();
        },
        createMilkyWay: function() {
            const container = document.createElement('div');
            container.className = 'milky-way-container';
            container.innerHTML = `
                <div class="galaxy-band"></div>
                <div class="stars-field"></div>
                <div class="nebula-clouds"></div>
            `;
            
            // 创建星星
            const starsField = container.querySelector('.stars-field');
            for (let i = 0; i < 500; i++) {
                const star = document.createElement('div');
                star.className = 'galaxy-star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 5 + 's';
                star.style.animationDuration = (Math.random() * 3 + 2) + 's';
                const size = Math.random() * 3 + 1;
                star.style.width = size + 'px';
                star.style.height = size + 'px';
                starsField.appendChild(star);
            }
            
            this.addStyles(`
                .milky-way-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                }
                .galaxy-band {
                    position: absolute;
                    width: 120%;
                    height: 30%;
                    top: 35%;
                    left: -10%;
                    background: linear-gradient(to right, 
                        transparent 0%, 
                        rgba(255, 255, 255, 0.1) 20%, 
                        rgba(135, 206, 235, 0.3) 40%, 
                        rgba(255, 255, 255, 0.4) 50%, 
                        rgba(138, 43, 226, 0.3) 60%, 
                        rgba(255, 255, 255, 0.1) 80%, 
                        transparent 100%);
                    transform: rotate(-15deg);
                    animation: galaxy-drift 20s linear infinite;
                }
                .stars-field {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .galaxy-star {
                    position: absolute;
                    background: white;
                    border-radius: 50%;
                    animation: star-twinkle ease-in-out infinite;
                }
                .nebula-clouds {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(ellipse at 30% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
                                radial-gradient(ellipse at 70% 80%, rgba(255, 20, 147, 0.1) 0%, transparent 50%);
                    animation: nebula-glow 15s ease-in-out infinite;
                }
                @keyframes galaxy-drift {
                    0% { transform: rotate(-15deg) translateX(0); }
                    100% { transform: rotate(-15deg) translateX(-50px); }
                }
                @keyframes star-twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                @keyframes nebula-glow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "红枫落叶",
        description: "秋日天空下红枫叶片片飘落",
        type: "falling-maple-leaves",
        baseStyle: "linear-gradient(to bottom, #ff9a56 0%, #ffad56 50%, #ff6b35 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createFallingMapleLeaves();
        },
        createFallingMapleLeaves: function() {
            const container = document.createElement('div');
            container.className = 'maple-leaves-container';
            
            // 创建枫叶
            for (let i = 0; i < 50; i++) {
                const leaf = document.createElement('div');
                leaf.className = 'maple-leaf';
                leaf.innerHTML = '🍁';
                leaf.style.left = Math.random() * 100 + '%';
                leaf.style.animationDelay = Math.random() * 5 + 's';
                leaf.style.animationDuration = (Math.random() * 3 + 3) + 's';
                leaf.style.fontSize = (Math.random() * 15 + 20) + 'px';
                leaf.style.color = ['#ff4500', '#ff6347', '#dc143c', '#b22222', '#8b0000'][Math.floor(Math.random() * 5)];
                container.appendChild(leaf);
            }
            
            this.addStyles(`
                .maple-leaves-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                }
                .maple-leaf {
                    position: absolute;
                    animation: leaf-fall linear infinite;
                }
                @keyframes leaf-fall {
                    0% { 
                        transform: translateY(-100px) rotate(0deg); 
                        opacity: 0; 
                    }
                    10% { 
                        opacity: 1; 
                    }
                    25% { 
                        transform: translateY(25vh) rotate(90deg) translateX(20px); 
                    }
                    50% { 
                        transform: translateY(50vh) rotate(180deg) translateX(-30px); 
                    }
                    75% { 
                        transform: translateY(75vh) rotate(270deg) translateX(40px); 
                    }
                    90% { 
                        opacity: 1; 
                    }
                    100% { 
                        transform: translateY(100vh) rotate(360deg); 
                        opacity: 0; 
                    }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "热带雨林",
        description: "茂密树冠下的斑驳光影和雨雾",
        type: "tropical-rainforest",
        baseStyle: "linear-gradient(to bottom, #1e3c72 0%, #2a5298 30%, #1a252f 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createTropicalRainforest();
        },
        createTropicalRainforest: function() {
            const container = document.createElement('div');
            container.className = 'rainforest-container';
            container.innerHTML = `
                <div class="canopy-layer canopy-back"></div>
                <div class="canopy-layer canopy-mid"></div>
                <div class="mist-fog"></div>
                <div class="light-shafts"></div>
                <div class="fauna-layer"></div>
                <div class="canopy-layer canopy-front"></div>
                <div class="water-drops"></div>
            `;
            
            // Create canopy layers
            ['.canopy-front', '.canopy-mid', '.canopy-back'].forEach((selector, layerIndex) => {
                const canopyLayer = container.querySelector(selector);
                for (let i = 0; i < 8; i++) {
                    const branch = document.createElement('div');
                    branch.className = 'canopy-branch';
                    branch.style.left = (Math.random() * 120 - 10) + '%';
                    branch.style.top = (Math.random() * 30 + layerIndex * 10) + '%';
                    branch.style.transform = `scale(${1 - layerIndex * 0.2}) rotate(${Math.random()*20-10}deg)`;
                    branch.style.animationDelay = Math.random() * 3 + 's';
                    canopyLayer.appendChild(branch);
                }
            });
            
            // Light shafts
            const lightShafts = container.querySelector('.light-shafts');
            for (let i = 0; i < 8; i++) {
                const shaft = document.createElement('div');
                shaft.className = 'light-shaft';
                shaft.style.left = Math.random() * 100 + '%';
                shaft.style.animationDelay = Math.random() * 4 + 's';
                lightShafts.appendChild(shaft);
            }
            
            // Fauna
            const faunaLayer = container.querySelector('.fauna-layer');
            for (let i = 0; i < 15; i++) {
                const butterfly = document.createElement('div');
                butterfly.className = 'butterfly';
                butterfly.style.left = Math.random() * 100 + '%';
                butterfly.style.top = Math.random() * 80 + 10 +'%';
                butterfly.style.setProperty('--hue', Math.random()*360);
                butterfly.style.animationDelay = Math.random() * 5 + 's';
                butterfly.style.animationDuration = (Math.random() * 5 + 5) + 's';
                faunaLayer.appendChild(butterfly);
            }
             const monkey = document.createElement('div');
             monkey.className = 'monkey-silhouette';
             faunaLayer.appendChild(monkey);

            this.addStyles(`
                .rainforest-container {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none; z-index: -1; overflow: hidden;
                }
                .canopy-layer { position: absolute; width: 100%; height: 100%; }
                .canopy-front { z-index: 5; }
                .canopy-mid { z-index: 2; filter: brightness(0.8); }
                .canopy-back { z-index: 1; filter: brightness(0.6); }
                
                .canopy-branch {
                    position: absolute;
                    width: 250px; height: 150px;
                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><path d="M50,0 C80,0 100,20 100,50 C100,55 80,60 50,60 C20,60 0,55 0,50 C0,20 20,0 50,0 Z" fill="rgba(20, 80, 30, 0.85)" /></svg>') no-repeat;
                    background-size: contain;
                    animation: canopy-sway 8s ease-in-out infinite;
                }
                .light-shaft {
                    position: absolute;
                    width: 60px; height: 110%; top: -5%;
                    background: linear-gradient(to bottom, rgba(255, 255, 220, 0.2) 0%, transparent 80%);
                    transform: skewX(-15deg);
                    animation: light-dance 10s ease-in-out infinite;
                }
                .mist-fog {
                    position: absolute; width: 100%; height: 100%;
                    background: radial-gradient(ellipse at center, rgba(200, 220, 210, 0.2) 0%, transparent 70%);
                    animation: mist-drift 12s ease-in-out infinite; z-index: 3;
                }
                .butterfly {
                    position: absolute;
                    width: 15px; height: 15px;
                    animation: butterfly-flutter both infinite;
                }
                .butterfly::before, .butterfly::after {
                    content: ''; position: absolute;
                    width: 100%; height: 100%;
                    background: hsl(var(--hue), 100%, 70%);
                    border-radius: 40% 0;
                }
                .butterfly::before { transform-origin: 100% 100%; animation: wing-flutter-left 0.3s linear infinite; }
                .butterfly::after { transform-origin: 0% 100%; animation: wing-flutter-right 0.3s linear infinite; }
                
                .monkey-silhouette {
                    position: absolute;
                    width: 80px; height: 60px;
                    background: rgba(0,0,0,0.2);
                    clip-path: polygon(50% 0, 60% 30%, 80% 40%, 75% 60%, 90% 90%, 70% 85%, 50% 100%, 30% 85%, 10% 90%, 25% 60%, 20% 40%, 40% 30%);
                    animation: monkey-peek 25s ease-in-out infinite 5s;
                    opacity: 0;
                }

                @keyframes canopy-sway {
                    0%, 100% { transform: translate(0, 0) rotate(${Math.random()*20-10}deg); }
                    50% { transform: translate(10px, 5px) rotate(${Math.random()*20-10+2}deg); }
                }
                @keyframes light-dance {
                    0%, 100% { opacity: 0.4; transform: skewX(-15deg) translateX(0); }
                    50% { opacity: 0.7; transform: skewX(-15deg) translateX(40px); }
                }
                @keyframes mist-drift {
                    0%, 100% { opacity: 0.2; } 50% { opacity: 0.4; }
                }
                @keyframes butterfly-flutter {
                    0% { transform: translate(0,0); }
                    50% { transform: translate(30px, -20px); }
                    100% { transform: translate(0, 0); }
                }
                @keyframes wing-flutter-left { 
                    0%,100% {transform: rotateZ(20deg) rotateY(0deg);} 
                    50% {transform: rotateZ(10deg) rotateY(60deg);}
                }
                @keyframes wing-flutter-right {
                    0%,100% {transform: rotateZ(-20deg) rotateY(0deg);}
                    50% {transform: rotateZ(-10deg) rotateY(-60deg);}
                }
                @keyframes monkey-peek {
                    0%, 20%, 100% { opacity: 0; transform: translate(80vw, 20vh); }
                    5% { opacity: 1; transform: translate(70vw, 25vh) rotate(10deg); }
                    15% { opacity: 1; transform: translate(68vw, 26vh) rotate(-5deg); }
                }
            `);
            
            // Re-add water drops from original implementation if needed
            const waterDrops = container.querySelector('.water-drops');
            for (let i = 0; i < 30; i++) {
                const drop = document.createElement('div');
                drop.className = 'water-drop';
                drop.style.left = Math.random() * 100 + '%';
                drop.style.animationDelay = Math.random() * 4 + 's';
                drop.style.animationDuration = (Math.random()*1 + 1) + 's';
                waterDrops.appendChild(drop);
            }
             this.addStyles(`
                .water-drop {
                    position: absolute;
                    width: 3px; height: 10px; z-index: 6;
                    background: linear-gradient(to bottom, rgba(173, 216, 230, 0.8) 0%, transparent 100%);
                    animation: drop-fall linear infinite;
                }
                 @keyframes drop-fall {
                    0% { transform: translateY(-50px); opacity: 0; }
                    10% { opacity: 0.8; }
                    90% { opacity: 0.8; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
            `);


            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "赤壁丹霞",
        description: "赤红沙漠、骆驼商队与落日",
        type: "danxia-landform",
        baseStyle: "linear-gradient(to bottom, #ffaf7b 0%, #d76d77 50%, #3a1c71 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createDanxiaLandform();
        },
        createDanxiaLandform: function() {
            const container = document.createElement('div');
            container.className = 'danxia-desert-container';
            container.innerHTML = `
                <div class="desert-sky"></div>
                <div class="desert-sun"></div>
                <div class="dunes dunes-back"></div>
                <div class="dunes dunes-mid"></div>
                <div class="camel-caravan"></div>
                <div class="dunes dunes-front"></div>
            `;
            
            // Create dunes
            const frontDunes = container.querySelector('.dunes-front');
            for(let i=0; i<3; i++) {
                const dune = document.createElement('div');
                dune.className = 'dune';
                dune.style.setProperty('--i', i);
                frontDunes.appendChild(dune);
            }

            // Create camel caravan
            const caravan = container.querySelector('.camel-caravan');
            for(let i=0; i<4; i++) {
                const camel = document.createElement('div');
                camel.className = 'camel';
                camel.style.left = (40 + i * 8) + '%';
                camel.style.animationDelay = (i * 0.1) + 's';
                caravan.appendChild(camel);
            }
            
            this.addStyles(`
                .danxia-desert-container {
                    position: fixed; top: 0; left: 0;
                    width: 100%; height: 100%;
                    pointer-events: none; z-index: -1; overflow: hidden;
                }
                .desert-sky {
                     position: absolute; width: 100%; height: 100%;
                     background: linear-gradient(to bottom, #ffaf7b 0%, #d76d77 50%, #3a1c71 100%);
                }
                .desert-sun {
                    position: absolute;
                    width: 100px; height: 100px;
                    background: radial-gradient(circle, #fde6a8 0%, #f57c51 100%);
                    border-radius: 50%;
                    left: 20%; top: 40%;
                    box-shadow: 0 0 100px #f57c51;
                    animation: desert-sun-set 20s linear infinite;
                }
                .dunes { position: absolute; bottom: 0; width: 100%; height: 50%; }
                .dunes-front {
                    background: linear-gradient(to top, #6b2a32 0%, #a0404d 100%);
                    clip-path: polygon(0 100%, 0 40%, 30% 60%, 60% 35%, 80% 55%, 100% 30%, 100% 100%);
                    z-index: 3;
                }
                .dunes-mid {
                    background: linear-gradient(to top, #502026 0%, #853540 100%);
                    clip-path: polygon(0 100%, 0 50%, 25% 65%, 50% 50%, 75% 70%, 100% 55%, 100% 100%);
                    transform: translateY(10px);
                    z-index: 1;
                }
                .camel-caravan {
                    position: absolute;
                    width: 100%;
                    bottom: 33%;
                    height: 50px;
                    z-index: 2;
                    animation: caravan-move 30s linear infinite;
                }
                .camel {
                    position: absolute;
                    width: 40px;
                    height: 30px;
                    background: #221a15;
                    clip-path: polygon(0% 100%, 0% 40%, 10% 20%, 30% 20%, 35% 0%, 45% 20%, 60% 25%, 70% 50%, 70% 80%, 65% 100%);
                    animation: camel-walk 1s linear infinite;
                }
                @keyframes desert-sun-set {
                    0% { transform: translateY(0) scale(1); }
                    100% { transform: translateY(100px) scale(0.9); }
                }
                @keyframes caravan-move {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(20%); }
                }
                @keyframes camel-walk {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "海底世界",
        description: "深邃蓝色海洋中的气泡和巨大生物",
        type: "underwater-world",
        baseStyle: "radial-gradient(ellipse at center, #006994 0%, #003d5b 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createUnderwaterWorld();
        },
        createUnderwaterWorld: function() {
            const container = document.createElement('div');
            container.className = 'underwater-container';
            container.innerHTML = `
                <div class="water-currents"></div>
                <div class="bubble-streams"></div>
                <div class="fauna-layer"></div>
                <div class="whale-silhouette"></div>
                <div class="light-caustics"></div>
            `;
            
            // Create bubbles
            const bubbleStreams = container.querySelector('.bubble-streams');
            for (let i = 0; i < 50; i++) {
                const bubble = document.createElement('div');
                bubble.className = 'sea-bubble';
                bubble.style.left = Math.random() * 100 + '%';
                bubble.style.animationDelay = Math.random() * 8 + 's';
                bubble.style.animationDuration = (Math.random() * 5 + 5) + 's';
                bubbleStreams.appendChild(bubble);
            }
            
            // Create Jellyfish
            const faunaLayer = container.querySelector('.fauna-layer');
            for (let i = 0; i < 7; i++) {
                const jellyfish = document.createElement('div');
                jellyfish.className = 'jellyfish';
                jellyfish.style.left = Math.random() * 100 + '%';
                jellyfish.style.animationDelay = Math.random() * 10 + 's';
                jellyfish.style.animationDuration = (Math.random() * 10 + 10) + 's';
                faunaLayer.appendChild(jellyfish);
            }
            
            this.addStyles(`
                .underwater-container {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none; z-index: -1; overflow: hidden;
                    background: radial-gradient(ellipse at center, #006994 0%, #003d5b 100%);
                }
                .light-caustics {
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                    background: 
                        linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                        linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%);
                    background-size: 40px 40px;
                    animation: caustics-flow 15s linear infinite;
                }
                .sea-bubble {
                    position: absolute;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: bubble-rise linear infinite;
                    width: 15px; height: 15px;
                    bottom: -20px;
                }
                .jellyfish {
                    position: absolute;
                    width: 50px; height: 100px;
                    animation: jellyfish-swim ease-in-out infinite;
                }
                .jellyfish::before { /* Bell */
                    content: ''; position: absolute;
                    width: 50px; height: 40px;
                    background: rgba(255, 105, 180, 0.5);
                    border-radius: 50% 50% 20% 20%;
                    box-shadow: 0 0 15px rgba(255, 105, 180, 0.7);
                    animation: jellyfish-pulse 4s ease-in-out infinite;
                }
                .jellyfish::after { /* Tentacles */
                    content: ''; position: absolute;
                    width: 4px; height: 60px;
                    background: rgba(255, 105, 180, 0.4);
                    top: 40px; left: 23px;
                    box-shadow: -10px 0 0 rgba(255,105,180,0.4), 10px 0 0 rgba(255,105,180,0.4);
                    animation: tentacles-sway 2s ease-in-out infinite;
                }
                .whale-silhouette {
                    position: absolute;
                    width: 600px; height: 200px;
                    left: -600px; top: 20%;
                    background: rgba(0,0,10,0.3);
                    clip-path: polygon(0% 40%, 15% 30%, 40% 25%, 70% 35%, 90% 45%, 98% 55%, 100% 60%, 95% 70%, 80% 65%, 70% 75%, 40% 80%, 15% 70%, 0% 60%);
                    animation: whale-swim 60s linear infinite 5s;
                }

                @keyframes caustics-flow {
                    0% { background-position: 0 0; }
                    100% { background-position: 80px 40px; }
                }
                @keyframes bubble-rise {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(-110vh); opacity: 0; }
                }
                @keyframes jellyfish-swim {
                    0%, 100% { transform: translateY(0) rotate(0); }
                    50% { transform: translateY(-40px) rotate(5deg); }
                }
                @keyframes jellyfish-pulse {
                     0%, 100% { transform: scale(1, 1); }
                     50% { transform: scale(1.1, 0.9); }
                }
                @keyframes tentacles-sway {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(10deg); }
                }
                @keyframes whale-swim {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(100vw + 600px)); }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "极地冰川",
        description: "巨大冰川下冰块剥落入海，企鹅点缀其间",
        type: "polar-glacier",
        baseStyle: "linear-gradient(to bottom, #b3d9ff 0%, #87ceeb 50%, #4682b4 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createPolarGlacier();
        },
        createPolarGlacier: function() {
            const container = document.createElement('div');
            container.className = 'glacier-container';
            container.innerHTML = `
                <div class="glacier-wall"></div>
                <div class="ice-chunks"></div>
                <div class="cold-wind"></div>
                <div class="arctic-water"></div>
                <div class="penguin-colony"></div>
            `;
            
            // Create ice chunks
            const iceChunks = container.querySelector('.ice-chunks');
            for (let i = 0; i < 8; i++) {
                const chunk = document.createElement('div');
                chunk.className = 'ice-chunk';
                chunk.style.left = (Math.random() * 40 + 30) + '%';
                chunk.style.animationDelay = Math.random() * 8 + 's';
                iceChunks.appendChild(chunk);
            }

            // Create penguins
            const colony = container.querySelector('.penguin-colony');
            for(let i=0; i<5; i++){
                const penguin = document.createElement('div');
                penguin.className = 'penguin';
                penguin.style.left = (20 + i*10 + Math.random()*5) + '%';
                penguin.style.bottom = (30 + Math.random()*10) + '%';
                penguin.style.animationDelay = Math.random() * 3 + 's';
                colony.appendChild(penguin);
            }
            
            this.addStyles(`
                .glacier-container {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none; z-index: -1; overflow: hidden;
                }
                .glacier-wall {
                    position: absolute;
                    width: 100%; height: 70%; bottom: 25%;
                    background: linear-gradient(to top, #e0f6ff 0%, #b3d9ff 50%, #87ceeb 100%);
                    clip-path: polygon(0 100%, 0 40%, 15% 35%, 25% 45%, 40% 30%, 55% 45%, 70% 30%, 85% 40%, 100% 25%, 100% 100%);
                    animation: glacier-shift 25s ease-in-out infinite; z-index: 2;
                }
                .ice-chunk {
                    position: absolute;
                    width: 30px; height: 30px;
                    background: linear-gradient(135deg, #ffffff 0%, #e0f6ff 100%);
                    border-radius: 20%;
                    animation: chunk-fall 3s ease-in infinite;
                    top: 50%; z-index: 3;
                }
                .arctic-water {
                    position: absolute; bottom: 0;
                    width: 100%; height: 26%;
                    background: linear-gradient(to bottom, #4682b4 0%, #003d5b 100%);
                    animation: water-ripple 4s ease-in-out infinite; z-index: 1;
                }
                .penguin-colony {
                    position: absolute; width: 100%; height: 100%; z-index: 3;
                }
                .penguin {
                    position: absolute;
                    width: 15px; height: 25px;
                    background: #111;
                    border-radius: 40% 40% 20% 20%;
                    animation: penguin-waddle 3s ease-in-out infinite;
                }
                .penguin::before { /* White belly */
                    content: ''; position: absolute;
                    width: 10px; height: 18px;
                    background: #fff;
                    border-radius: 40%;
                    top: 2px; left: 2.5px;
                }
                .penguin::after { /* Beak */
                     content: ''; position: absolute;
                     width: 0; height: 0;
                     border-style: solid;
                     border-width: 3px 0 3px 5px;
                     border-color: transparent transparent transparent #f9a602;
                     top: 4px; right: -4px;
                }
                @keyframes glacier-shift {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(10px); }
                }
                @keyframes chunk-fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(30vh) rotate(180deg); opacity: 0; }
                }
                @keyframes water-ripple {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(1.02); }
                }
                @keyframes penguin-waddle {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(5deg); }
                    75% { transform: rotate(-5deg); }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "球状闪电",
        description: "昏暗环境中明亮等离子光球的漂浮",
        type: "ball-lightning",
        baseStyle: "linear-gradient(to bottom, #2c3e50 0%, #34495e 100%)",
        
        init: function() {
            const { container, destroy } = this.createBallLightning();

            const balls = [...container.querySelectorAll('.lightning-ball')];
            const explosions = container.querySelector('.explosions');
            let animationFrameId;

            const checkCollisions = () => {
                for (let i = 0; i < balls.length; i++) {
                    for (let j = i + 1; j < balls.length; j++) {
                        const ball1 = balls[i];
                        const ball2 = balls[j];
                        const rect1 = ball1.getBoundingClientRect();
                        const rect2 = ball2.getBoundingClientRect();

                        const dx = rect1.left + rect1.width / 2 - (rect2.left + rect2.width / 2);
                        const dy = rect1.top + rect1.height / 2 - (rect2.top + rect2.height / 2);
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < rect1.width) { // Simple radius check
                            createExplosion((rect1.left + rect2.left) / 2, (rect1.top + rect2.top) / 2);
                            // Optional: Reset ball positions or bounce them
                            ball1.style.animation = 'none';
                            void ball1.offsetWidth; // Trigger reflow
                            ball1.style.animation = '';
                            
                            ball2.style.animation = 'none';
                            void ball2.offsetWidth;
                            ball2.style.animation = '';
                        }
                    }
                }
                animationFrameId = requestAnimationFrame(checkCollisions);
            };

            const createExplosion = (x, y) => {
                const explosion = document.createElement('div');
                explosion.className = 'explosion-effect';
                explosion.style.left = x + 'px';
                explosion.style.top = y + 'px';
                explosions.appendChild(explosion);
                setTimeout(() => explosion.remove(), 500);
            };

            animationFrameId = requestAnimationFrame(checkCollisions);

            const customDestroy = () => {
                cancelAnimationFrame(animationFrameId);
            };
            
            return { container, destroy: customDestroy };
        },
        createBallLightning: function() {
            const container = document.createElement('div');
            container.className = 'ball-lightning-container';
            container.innerHTML = `<div class="explosions"></div>`;
            
            for (let i = 0; i < 3; i++) {
                const ball = document.createElement('div');
                ball.className = 'lightning-ball';
                ball.style.setProperty('--i', i);
                container.appendChild(ball);
            }
            
            this.addStyles(`
                .ball-lightning-container {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none; z-index: -1;
                }
                .lightning-ball {
                    position: absolute;
                    width: 60px; height: 60px;
                    background: radial-gradient(circle, #ffffff 0%, #87ceeb 30%, transparent 70%);
                    border-radius: 50%;
                    animation: ball-drift ease-in-out infinite;
                    animation-duration: calc(6s + var(--i) * 2s);
                    animation-delay: calc(var(--i) * 1.5s);
                    box-shadow: 0 0 50px #87ceeb, 0 0 100px #ffffff;
                }
                .lightning-ball::before {
                    content: ''; position: absolute;
                    width: 100%; height: 100%;
                    background: radial-gradient(circle, #ffffff 0%, transparent 50%);
                    border-radius: 50%;
                    animation: electric-pulse 0.3s ease-in-out infinite;
                }
                .explosions { position: absolute; width: 100%; height: 100%; }
                .explosion-effect {
                    position: absolute;
                    width: 150px; height: 150px;
                    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(135,206,235,0.5) 30%, transparent 60%);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: explosion-anim 0.5s ease-out forwards;
                }

                @keyframes ball-drift {
                    0% { left: 10%; top: 50%; opacity: 0.6; }
                    25% { left: 80%; top: 20%; opacity: 1; }
                    50% { left: 50%; top: 80%; opacity: 0.8; }
                    75% { left: 20%; top: 30%; opacity: 1; }
                    100% { left: 10%; top: 50%; opacity: 0.6; }
                }
                 /* Different animation for the second ball */
                .lightning-ball:nth-child(3) {
                     animation-name: ball-drift-2;
                }
                 @keyframes ball-drift-2 {
                    0% { left: 90%; top: 40%; opacity: 0.6; }
                    25% { left: 15%; top: 70%; opacity: 1; }
                    50% { left: 60%; top: 10%; opacity: 0.8; }
                    75% { left: 80%; top: 90%; opacity: 1; }
                    100% { left: 90%; top: 40%; opacity: 0.6; }
                }
                @keyframes electric-pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                @keyframes explosion-anim {
                    from { transform: translate(-50%,-50%) scale(0); opacity: 1; }
                    to { transform: translate(-50%,-50%) scale(1.5); opacity: 0; }
                }
            `);
            
            document.body.appendChild(container);
            return { container, destroy: () => {} }; // Return dummy destroy
        }
    },
    
    {
        name: "幻日环天顶弧",
        description: "太阳两侧的幻日和高空的倒挂彩虹弧",
        type: "sun-dog",
        baseStyle: "linear-gradient(to bottom, #87ceeb 0%, #b0e0e6 50%, #f0f8ff 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createSunDog();
        },
        createSunDog: function() {
            const container = document.createElement('div');
            container.className = 'sun-dog-container';
            container.innerHTML = `
                <div class="main-sun"></div>
                <div class="sun-dog left"></div>
                <div class="sun-dog right"></div>
                <div class="circumzenithal-arc"></div>
                <div class="ice-crystals"></div>
            `;
            
            const iceCrystals = container.querySelector('.ice-crystals');
            for (let i = 0; i < 100; i++) {
                const crystal = document.createElement('div');
                crystal.className = 'ice-crystal';
                crystal.style.left = Math.random() * 100 + '%';
                crystal.style.top = Math.random() * 100 + '%';
                crystal.style.animationDelay = Math.random() * 2 + 's';
                iceCrystals.appendChild(crystal);
            }
            
            this.addStyles(`
                .sun-dog-container {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none; z-index: -1; overflow: hidden;
                }
                .main-sun {
                    position: absolute;
                    width: 80px; height: 80px;
                    background: radial-gradient(circle, #ffeb3b 0%, #ff9800 100%);
                    border-radius: 50%; left: 50%; top: 40%;
                    transform: translateX(-50%);
                    box-shadow: 0 0 60px rgba(255, 235, 59, 0.8);
                    animation: sun-wobble 20s ease-in-out infinite;
                }
                .sun-dog {
                    position: absolute;
                    width: 60px; height: 60px;
                    background: radial-gradient(circle, rgba(255,235,59,0.8) 0%, rgba(255,152,0,0.5) 70%, transparent 100%);
                    border-radius: 50%; top: 40%;
                    box-shadow: 0 0 40px rgba(255, 235, 59, 0.6);
                    animation: sun-dog-glow 4s ease-in-out infinite;
                }
                .sun-dog.left { animation: three-body-1 20s ease-in-out infinite; }
                .sun-dog.right { animation: three-body-2 20s ease-in-out infinite; }

                .circumzenithal-arc {
                    position: absolute;
                    width: 500px; height: 250px;
                    left: 50%; top: 10%;
                    transform: translateX(-50%) rotate(180deg);
                    border: 8px solid;
                    border-color: #ff0000 #ff7f00 #ffff00 #00ff00;
                    border-radius: 50% / 100%;
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                    border-top-width: 12px;
                    animation: arc-shimmer 6s ease-in-out infinite;
                    opacity: 0.8;
                }
                .ice-crystal {
                    position: absolute;
                    width: 3px; height: 3px;
                    background: rgba(255, 255, 255, 0.8);
                    animation: crystal-sparkle 3s ease-in-out infinite;
                }

                @keyframes sun-wobble {
                    0%, 100% { transform: translate(-50%, 0); }
                    50% { transform: translate(calc(-50% + 10px), 10px); }
                }
                @keyframes three-body-1 {
                    0%, 100% { left: 20%; top: 40%; }
                    25% { left: 25%; top: 45%; }
                    50% { left: 18%; top: 50%; }
                    75% { left: 22%; top: 38%; }
                }
                 @keyframes three-body-2 {
                    0%, 100% { right: 20%; top: 40%; }
                    25% { right: 18%; top: 35%; }
                    50% { right: 25%; top: 48%; }
                    75% { right: 22%; top: 42%; }
                }

                @keyframes sun-dog-glow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
                @keyframes arc-shimmer { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
                @keyframes crystal-sparkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "火山闪电",
        description: "火山喷发中的电光闪烁",
        type: "volcanic-lightning",
        baseStyle: "linear-gradient(to bottom, #2c1810 0%, #1a0f08 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createVolcanicLightning();
        },
        createVolcanicLightning: function() {
            const container = document.createElement('div');
            container.className = 'volcanic-lightning-container';
            container.innerHTML = `
                <div class="volcano-base"></div>
                <div class="lava-flow"></div>
                <div class="ash-cloud"></div>
                <div class="volcanic-lightning-bolts"></div>
            `;
            
            // Create lightning bolts
            const lightningBolts = container.querySelector('.volcanic-lightning-bolts');
            for (let i = 0; i < 7; i++) {
                const bolt = document.createElement('div');
                bolt.className = 'lightning-bolt';
                bolt.style.left = (Math.random() * 40 + 30) + '%';
                bolt.style.top = (Math.random() * 40) + '%';
                bolt.style.animationDelay = Math.random() * 3 + 's';
                lightningBolts.appendChild(bolt);
            }

            // Create ash particles
             const ashCloud = container.querySelector('.ash-cloud');
            for (let i = 0; i < 100; i++) {
                const ash = document.createElement('div');
                ash.className = 'ash-particle';
                ash.style.left = '50%';
                ash.style.bottom = '40%';
                ash.style.animationDelay = Math.random() * 0.5 + 's';
                ash.style.setProperty('--x-end', (Math.random() * 400 - 200) + 'px');
                ash.style.setProperty('--y-end', (Math.random() * 200 + 200) + 'px');
                ashCloud.appendChild(ash);
            }
            
            this.addStyles(`
                .volcanic-lightning-container {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none; z-index: -1; overflow: hidden;
                    background: linear-gradient(to top, #2c1810 0%, #1a0f08 80%);
                }
                .volcano-base {
                    position: absolute;
                    bottom: 0; left: 50%;
                    transform: translateX(-50%);
                    width: 80vw; height: 40vh;
                    background: #3a2d27;
                    clip-path: polygon(0% 100%, 30% 100%, 50% 0, 70% 100%, 100% 100%);
                    z-index: 2;
                }
                .lava-flow {
                    position: absolute;
                    bottom: 0; left: 50%;
                    transform: translateX(-50%);
                    width: 5vw; height: 42vh;
                    background: linear-gradient(to top, #ff4500, #ff8c00);
                    clip-path: polygon(40% 0, 60% 0, 100% 100%, 0% 100%);
                    animation: lava-flow-anim 10s linear infinite;
                    z-index: 3;
                }
                .ash-cloud {
                    position: absolute;
                    width: 100%; height: 100%;
                    z-index: 4;
                }
                .ash-particle {
                    position: absolute;
                    width: 8px; height: 8px;
                    background: #333;
                    border-radius: 50%;
                    animation: ash-rise 3s ease-out infinite;
                }
                .lightning-bolt {
                    position: absolute;
                    width: 4px; height: 120px;
                    background: linear-gradient(to bottom, #ffffff 0%, #87ceeb 50%, transparent 100%);
                    animation: volcanic-flash 4s ease-in-out infinite;
                    opacity: 0;
                    transform-origin: top center;
                    z-index: 5;
                }
                .lightning-bolt::before {
                    content: ''; position: absolute;
                    width: 3px; height: 60px;
                    background: #fff; left: 10px; top: 20px;
                    transform: rotate(-30deg) skewX(20deg);
                }
                
                @keyframes ash-rise {
                    0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
                    100% { transform: translate(calc(-50% + var(--x-end)), calc(0px - var(--y-end))) scale(3); opacity: 0; }
                }
                @keyframes lava-flow-anim {
                    0% { height: 42vh; }
                    50% { height: 43vh; }
                    100% { height: 42vh; }
                }
                @keyframes volcanic-flash {
                    0%, 90%, 100% { opacity: 0; transform: scaleY(1); }
                    91%, 93%, 95% { opacity: 1; transform: scaleY(1.1); }
                    92%, 94% { opacity: 0.3; transform: scaleY(1); }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "盐滩天空之镜",
        description: "天地在地平线完美交汇的镜像世界",
        type: "salt-flat-mirror",
        baseStyle: "linear-gradient(to bottom, #87ceeb 0%, #b0e0e6 50%, #87ceeb 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createSaltFlatMirror();
        },
        createSaltFlatMirror: function() {
            const container = document.createElement('div');
            container.className = 'salt-flat-container';
            container.innerHTML = `
                <div class="sky-half">
                    <div class="floating-clouds"></div>
                </div>
                <div class="mirror-half">
                     <div class="mirror-clouds"></div>
                </div>
                <div class="horizon-line"></div>
            `;
            
            const floatingClouds = container.querySelector('.floating-clouds');
            for (let i = 0; i < 7; i++) {
                const cloud = document.createElement('div');
                cloud.className = 'sky-cloud';
                cloud.style.setProperty('--i', i);
                floatingClouds.appendChild(cloud);
            }

            const mirrorClouds = container.querySelector('.mirror-clouds');
             for (let i = 0; i < 7; i++) {
                const cloud = document.createElement('div');
                cloud.className = 'sky-cloud'; // Reuse style, container will flip it
                cloud.style.setProperty('--i', i);
                mirrorClouds.appendChild(cloud);
            }
            
            this.addStyles(`
                .salt-flat-container {
                    position: fixed; top: 0; left: 0;
                    width: 100%; height: 100%;
                    pointer-events: none; z-index: -1;
                    overflow: hidden;
                }
                .sky-half, .mirror-half {
                    position: absolute;
                    width: 100%; height: 50%;
                    background: linear-gradient(to bottom, #87ceeb 0%, #f0f8ff 100%);
                }
                .sky-half { top: 0; }
                .mirror-half { 
                    bottom: 0; 
                    transform: scaleY(-1);
                    filter: brightness(0.95);
                }
                .mirror-half::after { /* Shimmer overlay */
                    content: '';
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(95deg, transparent 48%, rgba(255,255,255,0.1) 50%, transparent 52%);
                    background-size: 200% 100%;
                    animation: mirror-shimmer 5s linear infinite;
                }
                .horizon-line {
                    position: absolute;
                    top: 50%;
                    width: 100%; height: 2px;
                    background: rgba(255, 255, 255, 0.7);
                    transform: translateY(-1px);
                    filter: blur(1px);
                }
                .floating-clouds, .mirror-clouds {
                    position: absolute;
                    width: 100%; height: 100%;
                }
                .sky-cloud {
                    position: absolute;
                    width: 200px; height: 60px;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 60px;
                    top: calc(20% + (var(--i) * 5%));
                    left: calc(10% + (var(--i) * 12%));
                    animation: cloud-drift 40s linear infinite;
                    animation-delay: calc(var(--i) * -5s);
                }
                .sky-cloud::before {
                    content: ''; position: absolute;
                    width: 120px; height: 120px;
                    background: rgba(255, 255, 255, 0.85);
                    border-radius: 50%; top: -60px; left: 40px;
                }

                @keyframes cloud-drift {
                    0% { transform: translateX(-300px); }
                    100% { transform: translateX(calc(100vw + 300px)); }
                }
                @keyframes mirror-shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    // {
    //     name: "彩虹色沙滩",
    //     description: "多彩沙滩在阳光下的绚烂色彩",
    //     type: "rainbow-beach",
    //     baseStyle: "linear-gradient(to bottom, #ff9a56 0%, #ffad56 50%, #ff6b35 100%)",
        
    //     addStyles: function(css) {
    //         const styleElement = document.createElement('style');
    //         styleElement.setAttribute('data-dynamic-bg', 'true');
    //         styleElement.textContent = css;
    //         document.head.appendChild(styleElement);
    //     },
        
    //     init: function() {
    //         return this.createRainbowBeach();
    //     },
    //     createRainbowBeach: function() {
    //         const container = document.createElement('div');
    //         container.className = 'rainbow-beach-container';
    //         container.innerHTML = `
    //             <div class="ocean-waves"></div>
    //             <div class="colorful-sand"></div>
    //             <div class="wave-foam"></div>
    //         `;
            
    //         // 创建彩色沙滩条纹
    //         const colorfulSand = container.querySelector('.colorful-sand');
    //         const beachColors = ['#ff69b4', '#000000', '#32cd32', '#ffd700', '#ff4500', '#8a2be2'];
    //         for (let i = 0; i < 6; i++) {
    //             const sandLayer = document.createElement('div');
    //             sandLayer.className = 'sand-layer';
    //             sandLayer.style.background = beachColors[i];
    //             sandLayer.style.left = (i * 16.67) + '%';
    //             sandLayer.style.animationDelay = (i * 0.2) + 's';
    //             colorfulSand.appendChild(sandLayer);
    //         }
            
    //         this.addStyles(`
    //             .rainbow-beach-container {
    //                 position: fixed;
    //                 top: 0;
    //                 left: 0;
    //                 width: 100%;
    //                 height: 100%;
    //                 pointer-events: none;
    //                 z-index: -1;
    //             }
    //             .ocean-waves {
    //                 position: absolute;
    //                 top: 0;
    //                 width: 100%;
    //                 height: 70%;
    //                 background: linear-gradient(to bottom, rgba(30, 144, 255, 0.8) 0%, rgba(0, 105, 148, 0.9) 100%);
    //                 animation: wave-movement 4s ease-in-out infinite;
    //             }
    //             .sand-layer {
    //                 position: absolute;
    //                 bottom: 0;
    //                 width: 16.67%;
    //                 height: 30%;
    //                 animation: sand-shimmer 3s ease-in-out infinite;
    //             }
    //             .wave-foam {
    //                 position: absolute;
    //                 bottom: 30%;
    //                 width: 100%;
    //                 height: 5%;
    //                 background: repeating-linear-gradient(
    //                     90deg,
    //                     rgba(255, 255, 255, 0.6) 0px,
    //                     rgba(255, 255, 255, 0.8) 10px,
    //                     rgba(255, 255, 255, 0.6) 20px
    //                 );
    //                 animation: foam-motion 2s linear infinite;
    //             }
    //             @keyframes wave-movement {
    //                 0%, 100% { transform: translateY(0); }
    //                 50% { transform: translateY(-10px); }
    //             }
    //             @keyframes sand-shimmer {
    //                 0%, 100% { opacity: 0.8; filter: brightness(1); }
    //                 50% { opacity: 1; filter: brightness(1.3); }
    //             }
    //             @keyframes foam-motion {
    //                 0% { background-position: 0 0; }
    //                 100% { background-position: 20px 0; }
    //             }
    //         `);
            
    //         document.body.appendChild(container);
    //         return container;
    //     }
    // },
    
    {
        name: "雾凇世界",
        description: "万物凝结白色冰晶的象牙世界",
        type: "rime-ice-world",
        baseStyle: "linear-gradient(to bottom, #f0f8ff 0%, #e6f3ff 50%, #ddeeff 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createRimeIceWorld();
        },
        createRimeIceWorld: function() {
            const container = document.createElement('div');
            container.className = 'rime-world-container';
            container.innerHTML = `
                <div class="frosted-trees"></div>
                <div class="ice-crystals"></div>
                <div class="mist-fog"></div>
            `;
            
            // 创建雾凇树木
            const frostedTrees = container.querySelector('.frosted-trees');
            for (let i = 0; i < 10; i++) {
                const tree = document.createElement('div');
                tree.className = 'frosted-tree';
                tree.style.left = Math.random() * 100 + '%';
                tree.style.height = (Math.random() * 100 + 150) + 'px';
                tree.style.animationDelay = Math.random() * 2 + 's';
                frostedTrees.appendChild(tree);
            }
            
            // 创建冰晶
            const iceCrystals = container.querySelector('.ice-crystals');
            for (let i = 0; i < 50; i++) {
                const crystal = document.createElement('div');
                crystal.className = 'floating-crystal';
                crystal.style.left = Math.random() * 100 + '%';
                crystal.style.top = Math.random() * 100 + '%';
                crystal.style.animationDelay = Math.random() * 3 + 's';
                iceCrystals.appendChild(crystal);
            }
            
            this.addStyles(`
                .rime-world-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                }
                .frosted-tree {
                    position: absolute;
                    bottom: 0;
                    width: 30px;
                    background: linear-gradient(to top, #d3d3d3 0%, #ffffff 100%);
                    border-radius: 50% 50% 0 0;
                    animation: tree-sway 6s ease-in-out infinite;
                    transform-origin: 50% 100%;
                }
                .frosted-tree::before {
                    content: '';
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    background: radial-gradient(circle, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
                    border-radius: 50%;
                    top: -30px;
                    left: -15px;
                }
                .floating-crystal {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.9);
                    animation: crystal-float 4s ease-in-out infinite;
                    transform: rotate(45deg);
                }
                .mist-fog {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
                    animation: fog-drift 8s ease-in-out infinite;
                }
                @keyframes tree-sway {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(2deg); }
                }
                @keyframes crystal-float {
                    0%, 100% { opacity: 0.6; transform: translateY(0) rotate(45deg); }
                    50% { opacity: 1; transform: translateY(-10px) rotate(225deg); }
                }
                @keyframes fog-drift {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "彩虹海",
        description: "黑洞深处的黄金河流和宝石遍地的愿望世界",
        type: "rainbow-sea",
        baseStyle: "radial-gradient(ellipse at center, #000000 0%, #1a1a2e 30%, #16213e 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createRainbowSea();
        },
        createRainbowSea: function() {
            const container = document.createElement('div');
            container.className = 'rainbow-sea-container';
            container.innerHTML = `
                <div class="cosmic-dust"></div>
                <div class="black-hole-vortex"></div>
                <div class="accretion-disk"></div>
                <div class="golden-rivers"></div>
                <div class="floating-gems"></div>
                <div class="rainbow-nebulae"></div>
                <div class="wish-lights"></div>
            `;
            
            // Golden Rivers
            const goldenRivers = container.querySelector('.golden-rivers');
            for (let i = 0; i < 5; i++) {
                const river = document.createElement('div');
                river.className = 'golden-river';
                river.style.animationDelay = (i * 1.5) + 's';
                river.style.setProperty('--i', i);
                goldenRivers.appendChild(river);
            }
            
            // Floating Gems
            const floatingGems = container.querySelector('.floating-gems');
            const gemColors = ['#ff4d4d', '#4dff4d', '#4d4dff', '#ffff4d', '#ff4dff', '#4dffff'];
            for (let i = 0; i < 30; i++) {
                const gem = document.createElement('div');
                gem.className = 'floating-gem';
                gem.style.left = Math.random() * 100 + '%';
                gem.style.top = Math.random() * 100 + '%';
                gem.style.setProperty('--c', gemColors[Math.floor(Math.random() * gemColors.length)]);
                gem.style.animationDelay = Math.random() * 8 + 's';
                gem.style.animationDuration = (Math.random() * 8 + 8) + 's';
                floatingGems.appendChild(gem);
            }
            
            // Rainbow Nebulae
            const rainbowNebulae = container.querySelector('.rainbow-nebulae');
             for (let i = 0; i < 5; i++) {
                const nebula = document.createElement('div');
                nebula.className = 'rainbow-nebula';
                nebula.style.setProperty('--hue', i * 72);
                nebula.style.animationDelay = i * 2 + 's';
                rainbowNebulae.appendChild(nebula);
            }
            
            // Wish Lights
            const wishLights = container.querySelector('.wish-lights');
            for (let i = 0; i < 40; i++) {
                const light = document.createElement('div');
                light.className = 'wish-light';
                light.style.left = Math.random() * 100 + '%';
                light.style.top = Math.random() * 100 + '%';
                light.style.animationDelay = Math.random() * 5 + 's';
                light.style.animationDuration = (Math.random() * 4 + 3) + 's';
                wishLights.appendChild(light);
            }
            
            // Cosmic Dust
            const cosmicDust = container.querySelector('.cosmic-dust');
            for (let i = 0; i < 200; i++) {
                const dust = document.createElement('div');
                dust.className = 'cosmic-particle';
                dust.style.left = Math.random() * 100 + '%';
                dust.style.top = Math.random() * 100 + '%';
                dust.style.animationDelay = Math.random() * 5 + 's';
                cosmicDust.appendChild(dust);
            }
            
            this.addStyles(`
                .rainbow-sea-container {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none; z-index: -1;
                    overflow: hidden;
                    background: #000;
                    animation: space-pulse 15s ease-in-out infinite;
                }
                .black-hole-vortex {
                    position: absolute; width: 250px; height: 250px;
                    left: 50%; top: 50%;
                    background: radial-gradient(circle, #000 20%, transparent 60%);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                }
                .accretion-disk {
                    position: absolute;
                    width: 300px; height: 300px;
                    left: 50%; top: 50%;
                    margin: -150px 0 0 -150px;
                    border: 2px solid #ffcc00;
                    border-radius: 50%;
                    border-left-color: #fff;
                    border-top-color: transparent;
                    box-shadow: 0 0 20px #ffcc00;
                    animation: vortex-spin 5s linear infinite;
                }
                .golden-river {
                    position: absolute;
                    width: 150%; height: 60px;
                    left: 50%; top: 50%;
                    transform-origin: center;
                    background: linear-gradient(to right, transparent 0%, rgba(255, 215, 0, 0.6) 50%, transparent 100%);
                    animation: river-flow 10s ease-in-out infinite;
                    animation-delay: calc(var(--i) * 2s);
                    transform: translateX(-50%) rotate(calc(var(--i) * 36deg));
                    filter: blur(5px);
                }
                .floating-gem {
                    position: absolute;
                    width: 12px; height: 12px;
                    background: var(--c);
                    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
                    animation: gem-float ease-in-out infinite, gem-pulse 2s ease-in-out infinite;
                     animation-delay: inherit;
                    animation-duration: inherit;
                    box-shadow: 0 0 15px var(--c), 0 0 25px #fff;
                }
                .rainbow-nebula {
                    position: absolute;
                    width: 40%; height: 40%;
                    top: 30%; left: 30%;
                    background: radial-gradient(ellipse, hsla(var(--hue), 100%, 70%, 0.3) 0%, transparent 60%);
                    animation: nebula-swirl 20s ease-in-out infinite;
                }
                .wish-light {
                    position: absolute;
                    width: 4px; height: 4px;
                    background: #fff;
                    border-radius: 50%;
                    animation: wish-twinkle ease-in-out infinite;
                    box-shadow: 0 0 10px #fff, 0 0 20px #fffacd;
                }
                .cosmic-particle {
                    position: absolute;
                    width: 2px; height: 2px;
                    background: rgba(255, 255, 255, 0.7);
                    border-radius: 50%;
                    animation: particle-drift linear infinite;
                }

                @keyframes space-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
                @keyframes vortex-spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes river-flow {
                    0%, 100% { opacity: 0.7; transform: translateX(-50%) rotate(calc(var(--i) * 36deg)) scaleX(1); }
                    50% { opacity: 1; transform: translateX(-50%) rotate(calc(var(--i) * 36deg)) scaleX(1.2); }
                }
                @keyframes gem-float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(30px) rotate(180deg); }
                    100% { transform: translateY(0px) rotate(360deg); }
                }
                @keyframes gem-pulse {
                     0%, 100% { box-shadow: 0 0 15px var(--c), 0 0 25px #fff; }
                     50% { box-shadow: 0 0 30px var(--c), 0 0 50px #fff; }
                }
                 @keyframes nebula-swirl {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.2); }
                    100% { transform: rotate(360deg) scale(1); }
                }
                @keyframes wish-twinkle {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
                @keyframes particle-drift {
                     from { transform: translateY(0px); opacity: 0.7; }
                     to { transform: translateY(-100vh); opacity: 0; }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    {
        name: "樱花城堡",
        description: "一个拥有生命的魔法画作",
        type: "painting-world",
        baseStyle: "#d3c4a3",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },

        init: function() {
            return this.createPaintingWorld();
        },
        createPaintingWorld: function() {
            const container = document.createElement('div');
            container.className = 'painting-world-container';
            container.innerHTML = `
                <div class="easel">
                    <div class="painting-frame">
                        <div class="canvas">
                            <div class="p-sky"></div>
                            <div class="p-sun"></div>
                            <div class="p-cloud"></div>
                            <div class="p-mountains"></div>
                            <div class="p-river"></div>
                        </div>
                    </div>
                </div>
            `;

            this.addStyles(`
                .painting-world-container {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none; z-index: -1;
                    display: flex; align-items: center; justify-content: center;
                    background-color: #d3c4a3;
                }
                .easel {
                    width: 45vw; height: 80vh;
                    background: #6a4a3a;
                    clip-path: polygon(45% 0, 55% 0, 65% 100%, 35% 100%);
                }
                .painting-frame {
                    position: absolute;
                    width: 50vw; height: 60vh;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    background: #4b3428;
                    border: 20px solid #4b3428;
                    border-radius: 5px;
                    box-shadow: inset 0 0 10px rgba(0,0,0,0.5), 5px 5px 15px rgba(0,0,0,0.3);
                }
                .canvas {
                    width: 100%; height: 100%;
                    background: #f0e8d0;
                    position: relative;
                    overflow: hidden;
                }
                .p-sky { height: 65%; background: #a4c8e1; }
                .p-sun {
                    position: absolute; top: 10%; right: 15%;
                    width: 50px; height: 50px; background: #f9d71c;
                    border-radius: 50%;
                    animation: p-sun-move 20s ease-in-out infinite;
                }
                .p-cloud {
                    position: absolute; top: 20%; left: -100px;
                    width: 100px; height: 40px; background: #fff;
                    border-radius: 20px;
                    box-shadow: 20px 10px 0 #fff, 45px 5px 0 #fff;
                    animation: p-cloud-drift 30s linear infinite 2s;
                }
                .p-mountains {
                    position: absolute; bottom: 0; width: 100%; height: 50%;
                    background: #7a8a9a;
                    clip-path: polygon(0 100%, 0 40%, 20% 20%, 45% 50%, 70% 30%, 100% 60%, 100% 100%);
                }
                 .p-river {
                    position: absolute; bottom: 0; width: 30%; height: 40%; left: 35%;
                    background: linear-gradient(to top, #6394c8, transparent);
                    clip-path: polygon(30% 0, 70% 0, 100% 100%, 0% 100%);
                    animation: p-river-flow 3s ease-in-out infinite;
                 }

                 @keyframes p-sun-move {
                     0%, 100% { transform: translateY(0); }
                     50% { transform: translateY(10px); }
                 }
                 @keyframes p-cloud-drift {
                     to { left: calc(100% + 100px); }
                 }
                 @keyframes p-river-flow {
                     0%, 100% { filter: brightness(1); }
                     50% { filter: brightness(1.2); }
                 }
            `);
            document.body.appendChild(container);
            return container;
        }
    },
    {
        name: "彩虹雨",
        description: "天空中下着七彩雨滴，彩虹悬挂天际",
        type: "rainbow-rain",
        baseStyle: "linear-gradient(to bottom, #87CEEB 0%, #B0C4DE 50%, #778899 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createRainbowRain();
        },
        createRainbowRain: function() {
            const container = document.createElement('div');
            container.className = 'rainbow-rain-container';
            container.innerHTML = `
                <div class="rain-drops"></div>
                <div class="rainbow-arc"></div>
                <div class="mist-layer"></div>
            `;
            
            // 创建七彩雨滴
            const rainDrops = container.querySelector('.rain-drops');
            const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
            for (let i = 0; i < 150; i++) {
                const drop = document.createElement('div');
                drop.className = 'rain-drop';
                drop.style.left = Math.random() * 100 + '%';
                drop.style.animationDelay = Math.random() * 3 + 's';
                drop.style.animationDuration = (Math.random() * 1 + 1) + 's';
                drop.style.background = `linear-gradient(to bottom, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 100%)`;
                rainDrops.appendChild(drop);
            }
            
            this.addStyles(`
                .rainbow-rain-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                }
                .rain-drop {
                    position: absolute;
                    width: 2px;
                    height: 15px;
                    animation: gentle-rain linear infinite;
                }
                .rainbow-arc {
                    position: absolute;
                    width: 400px;
                    height: 200px;
                    left: 50%;
                    top: 30%;
                    transform: translateX(-50%);
                    border: 8px solid transparent;
                    border-radius: 50%;
                    border-top: 8px solid #ff0000;
                    border-right: 8px solid #ff7f00;
                    border-bottom: 8px solid #ffff00;
                    border-left: 8px solid #00ff00;
                    animation: rainbow-appear 8s ease-in-out infinite;
                    opacity: 0;
                }
                .rainbow-arc::before {
                    content: '';
                    position: absolute;
                    top: -12px;
                    left: -12px;
                    right: -12px;
                    bottom: -12px;
                    border-radius: 50%;
                    border: 4px solid transparent;
                    border-top: 4px solid #0000ff;
                    border-right: 4px solid #4b0082;
                    border-bottom: 4px solid #9400d3;
                    border-left: 4px solid #ff1493;
                }
                .mist-layer {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
                    animation: mist-flow 6s ease-in-out infinite;
                }
                @keyframes gentle-rain {
                    0% { transform: translateY(-100px); opacity: 0; }
                    10% { opacity: 0.8; }
                    90% { opacity: 0.8; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                @keyframes rainbow-appear {
                    0%, 30% { opacity: 0; transform: translateX(-50%) scale(0.8); }
                    50%, 70% { opacity: 0.8; transform: translateX(-50%) scale(1); }
                    100% { opacity: 0; transform: translateX(-50%) scale(0.8); }
                }
                @keyframes mist-flow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "流星雨",
        description: "夜空中接连划过的流星",
        type: "meteor-shower",
        baseStyle: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createMeteorShower();
        },
        createMeteorShower: function() {
            const container = document.createElement('div');
            container.className = 'meteor-shower-container';
            container.innerHTML = `
                <div class="stars-background"></div>
                <div class="meteors-layer"></div>
            `;
            
            // 创建背景星星
            const starsBackground = container.querySelector('.stars-background');
            for (let i = 0; i < 300; i++) {
                const star = document.createElement('div');
                star.className = 'bg-star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsBackground.appendChild(star);
            }
            
            // 创建流星
            const meteorsLayer = container.querySelector('.meteors-layer');
            for (let i = 0; i < 8; i++) {
                const meteor = document.createElement('div');
                meteor.className = 'meteor';
                meteor.style.left = Math.random() * 100 + '%';
                meteor.style.animationDelay = Math.random() * 5 + 's';
                meteor.style.animationDuration = (Math.random() * 2 + 1) + 's';
                meteorsLayer.appendChild(meteor);
            }
            
            this.addStyles(`
                .meteor-shower-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                }
                .bg-star {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: white;
                    border-radius: 50%;
                    animation: star-blink ease-in-out infinite;
                }
                .meteor {
                    position: absolute;
                    width: 4px;
                    height: 80px;
                    background: linear-gradient(to bottom, #ffffff 0%, #87ceeb 30%, transparent 100%);
                    transform: rotate(45deg);
                    animation: meteor-fall linear infinite;
                    opacity: 0;
                }
                .meteor::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -2px;
                    width: 8px;
                    height: 8px;
                    background: radial-gradient(circle, #ffffff 0%, transparent 70%);
                    border-radius: 50%;
                    box-shadow: 0 0 10px #ffffff;
                }
                @keyframes star-blink {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
                @keyframes meteor-fall {
                    0% { 
                        transform: translateY(-100px) translateX(-50px) rotate(45deg); 
                        opacity: 0; 
                    }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { 
                        transform: translateY(100vh) translateX(50px) rotate(45deg); 
                        opacity: 0; 
                    }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "萤火虫之舞",
        description: "夏夜森林中的萤火虫同步闪烁",
        type: "firefly-dance",
        baseStyle: "linear-gradient(to bottom, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createFireflyDance();
        },
        createFireflyDance: function() {
            const container = document.createElement('div');
            container.className = 'firefly-dance-container';
            container.innerHTML = `
                <div class="forest-silhouette"></div>
                <div class="fireflies-layer"></div>
            `;
            
            // 创建萤火虫
            const firefliesLayer = container.querySelector('.fireflies-layer');
            for (let i = 0; i < 50; i++) {
                const firefly = document.createElement('div');
                firefly.className = 'firefly';
                firefly.style.left = Math.random() * 100 + '%';
                firefly.style.top = Math.random() * 100 + '%';
                firefly.style.animationDelay = Math.random() * 4 + 's';
                firefly.style.animationDuration = (Math.random() * 2 + 2) + 's';
                firefliesLayer.appendChild(firefly);
            }
            
            this.addStyles(`
                .firefly-dance-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                }
                .forest-silhouette {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 30%;
                    background: linear-gradient(to top, #000000 0%, transparent 100%);
                    clip-path: polygon(
                        0% 100%, 10% 60%, 15% 65%, 25% 50%, 30% 55%, 
                        40% 40%, 45% 45%, 55% 35%, 60% 40%, 70% 30%, 
                        75% 35%, 85% 25%, 90% 30%, 100% 20%, 100% 100%
                    );
                }
                .firefly {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: radial-gradient(circle, #ffff00 0%, transparent 70%);
                    border-radius: 50%;
                    animation: firefly-dance ease-in-out infinite;
                    box-shadow: 0 0 8px #ffff00;
                }
                @keyframes firefly-dance {
                    0%, 100% { 
                        opacity: 0.2; 
                        transform: translateX(0) translateY(0); 
                    }
                    25% { 
                        opacity: 1; 
                        transform: translateX(20px) translateY(-10px); 
                    }
                    50% { 
                        opacity: 0.3; 
                        transform: translateX(-10px) translateY(15px); 
                    }
                    75% { 
                        opacity: 1; 
                        transform: translateX(5px) translateY(20px); 
                    }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    }
];

// 添加更多高级背景效果
const additionalBackgrounds = [
    {
        name: "超强台风",
        description: "从平静的台风眼向外望去，巨大而浓厚的云墙在四周高速旋转",
        type: "super-typhoon",
        baseStyle: "radial-gradient(ellipse at center, #87CEEB 0%, #2c3e50 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createSuperTyphoon();
        },
        createSuperTyphoon: function() {
            const container = document.createElement('div');
            container.className = 'typhoon-container';
            container.innerHTML = `
                <div class="eye-wall"></div>
                <div class="sea-storm"></div>
            `;

            const wall = container.querySelector('.eye-wall');
            for(let i=0; i<60; i++) {
                const cloudChunk = document.createElement('div');
                cloudChunk.className = 'cloud-chunk';
                cloudChunk.style.setProperty('--i', i);
                wall.appendChild(cloudChunk);
            }

            const sea = container.querySelector('.sea-storm');
            for(let i=0; i<3; i++){
                const wave = document.createElement('div');
                wave.className = 'storm-wave';
                wave.style.setProperty('--i', i);
                sea.appendChild(wave);
            }
            
            this.addStyles(`
                .typhoon-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                    filter: blur(1px);
                    overflow: hidden;
                }
                .eye-wall {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    animation: rotate-wall 20s linear infinite;
                    transform-style: preserve-3d;
                    perspective: 1000px;
                }
                .cloud-chunk {
                    position: absolute;
                    width: 400px;
                    height: 300px;
                    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.7) 0%, rgba(200, 200, 220, 0.3) 70%, transparent 100%);
                    border-radius: 50%;
                    left: 50%;
                    top: 50%;
                    margin-left: -200px;
                    margin-top: -150px;
                    transform: rotateY(calc(var(--i) * 6deg)) translateZ(800px);
                    animation: cloud-pulse 3s ease-in-out infinite;
                    animation-delay: calc(var(--i) * 0.1s);
                }
                .sea-storm {
                    position: absolute;
                    bottom: -20%;
                    left: 0;
                    width: 100%;
                    height: 50%;
                    background: #1a2a3a;
                    transform-style: preserve-3d;
                    perspective: 300px;
                    transform: rotateX(60deg);
                }
                .storm-wave {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to top, rgba(150,200,250,0.3), transparent);
                    animation: storm-surge 5s ease-in-out infinite;
                    animation-delay: calc(var(--i) * 1.7s);
                }
                @keyframes rotate-wall {
                    from { transform: rotateY(0deg); }
                    to { transform: rotateY(360deg); }
                }
                @keyframes cloud-pulse {
                    0%, 100% { opacity: 0.8; transform: rotateY(calc(var(--i) * 6deg)) translateZ(800px) scale(1); }
                    50% { opacity: 1; transform: rotateY(calc(var(--i) * 6deg)) translateZ(780px) scale(1.1); }
                }
                @keyframes storm-surge {
                    0%, 100% { transform: translateZ(0px) scaleY(1); }
                    50% { transform: translateZ(100px) scaleY(1.5); }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    {
        name: "炊烟袅袅",
        description: "宁静的村落背景下，炊烟从屋顶缓缓升起",
        type: "wisping-smoke",
        baseStyle: "linear-gradient(to bottom, #a1c4fd 0%, #c2e9fb 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createWispingSmoke();
        },
        createWispingSmoke: function() {
            const container = document.createElement('div');
            container.className = 'smoke-container';
            container.innerHTML = `<div class="village-silhouette"></div>`;

            const village = container.querySelector('.village-silhouette');
            const housePositions = [15, 45, 75];
            housePositions.forEach((pos, index) => {
                const house = document.createElement('div');
                house.className = 'house';
                house.style.left = pos + '%';
                house.style.bottom = (Math.random() * 5 + 5) + '%';
                village.appendChild(house);

                const smokePlume = document.createElement('div');
                smokePlume.className = 'smoke-plume';
                smokePlume.style.left = (pos + 2) + '%';
                smokePlume.style.bottom = (parseInt(house.style.bottom) + 8) +'%';
                smokePlume.style.animationDelay = (index * 1.5) + 's';
                
                for(let j=0; j<15; j++) {
                    const smokeParticle = document.createElement('div');
                    smokeParticle.className = 'smoke-particle';
                    smokeParticle.style.animationDelay = (j * 0.3) + 's';
                    smokePlume.appendChild(smokeParticle);
                }
                container.appendChild(smokePlume);
            });
            
            this.addStyles(`
                .smoke-container {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none; z-index: -1;
                    background: linear-gradient(to bottom, #a1c4fd 0%, #c2e9fb 100%);
                }
                .village-silhouette {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 30%;
                    background: linear-gradient(to top, #2c5364, transparent);
                }
                .house {
                    position: absolute;
                    width: 10%; height: 10%;
                    background: #1e3c43;
                    clip-path: polygon(0% 100%, 0% 40%, 50% 0%, 100% 40%, 100% 100%);
                }
                .smoke-plume {
                    position: absolute;
                }
                .smoke-particle {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    animation: smoke-rise 10s ease-in-out infinite;
                    opacity: 0;
                }
                @keyframes smoke-rise {
                    0% { transform: translateY(0) scale(0.1) translateX(0); opacity: 0; }
                    10% { opacity: 0.5; }
                    80% { transform: translateY(-350px) scale(1.5) translateX(60px); opacity: 0.1; }
                    100% { transform: translateY(-400px) scale(2) translateX(70px); opacity: 0; }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    {
        name: "珊瑚礁内",
        description: "阳光穿透海水照亮珊瑚，鱼群游过",
        type: "coral-reef",
        baseStyle: "linear-gradient(to bottom, #00c6ff 0%, #0072ff 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createCoralReef();
        },
        createCoralReef: function() {
            const container = document.createElement('div');
            container.className = 'coral-reef-container';
            container.innerHTML = `
                <div class="light-rays"></div>
                <div class="bubbles"></div>
                <div class="corals"></div>
                <div class="fish-school"></div>
            `;
            
            // Corals
            const corals = container.querySelector('.corals');
            for(let i=0; i<8; i++) {
                const coral = document.createElement('div');
                coral.className = `coral coral-${i+1}`;
                coral.style.left = (5 + i * 12) + '%';
                coral.style.bottom = (Math.random() * 5) + '%';
                coral.style.setProperty('--h', (Math.random()*60 + 40) + 'px');
                coral.style.setProperty('--c', `hsl(${Math.random()*360}, 70%, 60%)`);
                corals.appendChild(coral);
            }

            // Bubbles
            const bubbles = container.querySelector('.bubbles');
            for(let i=0; i<30; i++) {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                bubble.style.left = Math.random() * 100 + '%';
                bubble.style.animationDelay = Math.random() * 10 + 's';
                bubble.style.animationDuration = (Math.random() * 5 + 5) + 's';
                bubbles.appendChild(bubble);
            }

            // Fish
            const fishSchool = container.querySelector('.fish-school');
            for(let i=0; i<15; i++) {
                const fish = document.createElement('div');
                fish.className = 'fish';
                fish.style.setProperty('--d', (Math.random() * 10 + 5) + 's');
                fish.style.setProperty('--y', (Math.random() * 60 + 20) + '%');
                fishSchool.appendChild(fish);
            }

            this.addStyles(`
                .coral-reef-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                    overflow: hidden;
                }
                .light-rays {
                    position: absolute;
                    top: -10%;
                    left: 0;
                    width: 100%;
                    height: 120%;
                    background: 
                        linear-gradient(100deg, rgba(255,255,255,0.3) 10%, transparent 10.5%, transparent 20%, rgba(255,255,255,0.3) 20.5%, transparent 21%, transparent 35%, rgba(255,255,255,0.3) 35.5%, transparent 36%),
                        linear-gradient(80deg, rgba(255,255,255,0.2) 5%, transparent 5.5%);
                    animation: light-caustics 10s linear infinite;
                }
                @keyframes light-caustics {
                    0% { transform: translateY(0) skewX(0deg); }
                    100% { transform: translateY(-50px) skewX(-5deg); }
                }
                .corals { position: absolute; width: 100%; height: 100%; bottom: 0;}
                .coral {
                    position: absolute;
                    bottom: 0;
                    width: 20px;
                    height: var(--h);
                    background: var(--c);
                    border-radius: 10px 10px 0 0;
                    animation: coral-sway 5s ease-in-out infinite;
                    transform-origin: bottom center;
                }
                .coral::before {
                    content: '';
                    position: absolute;
                    left: -8px;
                    top: 10px;
                    width: 20px;
                    height: calc(var(--h) * 0.5);
                    background: var(--c);
                    border-radius: 10px 10px 0 0;
                    transform: rotate(-30deg);
                }
                 @keyframes coral-sway {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(5deg); }
                }

                .bubble {
                    position: absolute;
                    bottom: -20px;
                    width: 10px;
                    height: 10px;
                    background: rgba(255,255,255,0.4);
                    border-radius: 50%;
                    animation: bubble-up linear infinite;
                }
                @keyframes bubble-up {
                    0% { transform: translateY(0) translateX(0); }
                    100% { transform: translateY(-110vh) translateX(20px); }
                }

                .fish-school { position: absolute; width: 100%; height: 100%; top: 0; }
                .fish {
                    position: absolute;
                    width: 25px;
                    height: 10px;
                    background: #ff8c00;
                    border-radius: 50%;
                    top: var(--y);
                    animation: swim-across var(--d) linear infinite;
                }
                 .fish::before, .fish::after {
                    content: '';
                    position: absolute;
                    background: #ff8c00;
                }
                .fish::before {
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 5px 0 5px 10px;
                    border-color: transparent transparent transparent #ff8c00;
                    left: -8px;
                    top: 0;
                }
                @keyframes swim-across {
                    0% { left: -30px; }
                    100% { left: 105%; }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    {
        name: "小人王国",
        description: "巨大草叶和露珠间的发光小人",
        type: "lilliput-kingdom",
        baseStyle: "radial-gradient(ellipse at bottom, #2cad5b 0%, #1e7e43 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createLilliputKingdom();
        },
        createLilliputKingdom: function() {
            const container = document.createElement('div');
            container.className = 'lilliput-container';
            
            // Blades of grass
            for (let i = 0; i < 15; i++) {
                const blade = document.createElement('div');
                blade.className = 'grass-blade';
                blade.style.left = Math.random() * 100 + '%';
                blade.style.bottom = (Math.random() * -20) + 'px';
                blade.style.height = (Math.random() * 150 + 200) + 'px';
                blade.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
                blade.style.animationDelay = Math.random() * 2 + 's';
                container.appendChild(blade);
            }

            // Dew drops
            for (let i = 0; i < 20; i++) {
                const drop = document.createElement('div');
                drop.className = 'dew-drop';
                drop.style.left = Math.random() * 100 + '%';
                drop.style.top = Math.random() * 100 + '%';
                drop.style.animationDelay = Math.random() * 5 + 's';
                container.appendChild(drop);
            }

            // Lilliputians
            for (let i = 0; i < 25; i++) {
                const lilliputian = document.createElement('div');
                lilliputian.className = 'lilliputian';
                lilliputian.style.left = Math.random() * 100 + '%';
                lilliputian.style.top = Math.random() * 100 + '%';
                lilliputian.style.animationDelay = Math.random() * 8 + 's';
                lilliputian.style.animationDuration = (Math.random() * 5 + 5) + 's';
                container.appendChild(lilliputian);
            }
            
            this.addStyles(`
                .lilliput-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                    perspective: 500px;
                }
                .grass-blade {
                    position: absolute;
                    width: 40px;
                    background: linear-gradient(to top, #38d371, #28a745);
                    border-radius: 20px 20px 0 0;
                    transform-origin: bottom center;
                    animation: grass-sway 4s ease-in-out infinite;
                }
                @keyframes grass-sway {
                    0%, 100% { transform: rotate(${Math.random() * 20 - 10}deg); }
                    50% { transform: rotate(${Math.random() * 20 - 10 + 5}deg); }
                }
                .dew-drop {
                    position: absolute;
                    width: 15px;
                    height: 15px;
                    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(200,220,255,0.5) 100%);
                    border-radius: 50%;
                    box-shadow: 0 0 5px rgba(255,255,255,0.5);
                    animation: dew-glisten 3s ease-in-out infinite;
                }
                @keyframes dew-glisten {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; transform: scale(1.1); }
                }
                .lilliputian {
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    background: #fffacd;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #fffacd, 0 0 20px #fffacd;
                    animation: lilliput-move ease-in-out infinite;
                }
                @keyframes lilliput-move {
                    0% { transform: translate(0, 0); opacity: 0.5; }
                    25% { transform: translate(15px, 5px); opacity: 1; }
                    50% { transform: translate(-10px, 10px); opacity: 0.8; }
                    75% { transform: translate(5px, -15px); opacity: 1; }
                    100% { transform: translate(0, 0); opacity: 0.5; }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    {
        name: "蓝眼泪",
        description: "夜间海浪在沙滩上留下梦幻的蓝色荧光",
        type: "bioluminescent-tears",
        baseStyle: "linear-gradient(to bottom, #020111 0%, #040320 50%, #06052f 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createBioluminescentTears();
        },
        createBioluminescentTears: function() {
            const container = document.createElement('div');
            container.className = 'bioluminescent-container';
            container.innerHTML = `<div class="beach-sand"></div>`;

            // Waves
            for (let i = 0; i < 3; i++) {
                const wave = document.createElement('div');
                wave.className = 'glowing-wave';
                wave.style.animationDelay = i * 2 + 's';
                
                const tearParticles = document.createElement('div');
                tearParticles.className = 'tear-particles';
                for(let j=0; j<80; j++) {
                    const particle = document.createElement('div');
                    particle.className = 'tear-particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.animationDelay = (Math.random() * 1) + 's';
                    particle.style.animationDuration = (Math.random() * 1 + 1) + 's';
                    tearParticles.appendChild(particle);
                }
                wave.appendChild(tearParticles);
                container.appendChild(wave);
            }
            
            this.addStyles(`
                .bioluminescent-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                    overflow: hidden;
                }
                .beach-sand {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 40%;
                    background: #1a1828;
                }
                .glowing-wave {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 50%;
                    animation: wave-recede 6s ease-out infinite;
                }
                @keyframes wave-recede {
                    0% { transform: translateY(0); height: 50%; }
                    40% { transform: translateY(-30%); height: 20%; }
                    100% { transform: translateY(100%); height: 0%; }
                }
                .tear-particles {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                }
                .tear-particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #00ffff;
                    border-radius: 50%;
                    box-shadow: 0 0 8px #00ffff, 0 0 12px #00aaff, 0 0 16px #0055ff;
                    animation: tear-fade-out linear forwards;
                }
                @keyframes tear-fade-out {
                    0% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0.5); }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    {
        name: "彩虹雨",
        description: "天空中下着七彩雨滴，彩虹悬挂天际",
        type: "rainbow-rain",
        baseStyle: "linear-gradient(to bottom, #87CEEB 0%, #B0C4DE 50%, #778899 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createRainbowRain();
        },
        createRainbowRain: function() {
            const container = document.createElement('div');
            container.className = 'rainbow-rain-container';
            container.innerHTML = `
                <div class="rain-drops"></div>
                <div class="rainbow-arc"></div>
                <div class="mist-layer"></div>
            `;
            
            // 创建七彩雨滴
            const rainDrops = container.querySelector('.rain-drops');
            const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
            for (let i = 0; i < 150; i++) {
                const drop = document.createElement('div');
                drop.className = 'rain-drop';
                drop.style.left = Math.random() * 100 + '%';
                drop.style.animationDelay = Math.random() * 3 + 's';
                drop.style.animationDuration = (Math.random() * 1 + 1) + 's';
                drop.style.background = `linear-gradient(to bottom, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 100%)`;
                rainDrops.appendChild(drop);
            }
            
            this.addStyles(`
                .rainbow-rain-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                }
                .rain-drop {
                    position: absolute;
                    width: 2px;
                    height: 15px;
                    animation: gentle-rain linear infinite;
                }
                .rainbow-arc {
                    position: absolute;
                    width: 400px;
                    height: 200px;
                    left: 50%;
                    top: 30%;
                    transform: translateX(-50%);
                    border: 8px solid transparent;
                    border-radius: 50%;
                    border-top: 8px solid #ff0000;
                    border-right: 8px solid #ff7f00;
                    border-bottom: 8px solid #ffff00;
                    border-left: 8px solid #00ff00;
                    animation: rainbow-appear 8s ease-in-out infinite;
                    opacity: 0;
                }
                .rainbow-arc::before {
                    content: '';
                    position: absolute;
                    top: -12px;
                    left: -12px;
                    right: -12px;
                    bottom: -12px;
                    border-radius: 50%;
                    border: 4px solid transparent;
                    border-top: 4px solid #0000ff;
                    border-right: 4px solid #4b0082;
                    border-bottom: 4px solid #9400d3;
                    border-left: 4px solid #ff1493;
                }
                .mist-layer {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
                    animation: mist-flow 6s ease-in-out infinite;
                }
                @keyframes gentle-rain {
                    0% { transform: translateY(-100px); opacity: 0; }
                    10% { opacity: 0.8; }
                    90% { opacity: 0.8; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                @keyframes rainbow-appear {
                    0%, 30% { opacity: 0; transform: translateX(-50%) scale(0.8); }
                    50%, 70% { opacity: 0.8; transform: translateX(-50%) scale(1); }
                    100% { opacity: 0; transform: translateX(-50%) scale(0.8); }
                }
                @keyframes mist-flow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "流星雨",
        description: "夜空中接连划过的流星",
        type: "meteor-shower",
        baseStyle: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createMeteorShower();
        },
        createMeteorShower: function() {
            const container = document.createElement('div');
            container.className = 'meteor-shower-container';
            container.innerHTML = `
                <div class="stars-background"></div>
                <div class="meteors-layer"></div>
            `;
            
            // 创建背景星星
            const starsBackground = container.querySelector('.stars-background');
            for (let i = 0; i < 300; i++) {
                const star = document.createElement('div');
                star.className = 'bg-star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsBackground.appendChild(star);
            }
            
            // 创建流星
            const meteorsLayer = container.querySelector('.meteors-layer');
            for (let i = 0; i < 8; i++) {
                const meteor = document.createElement('div');
                meteor.className = 'meteor';
                meteor.style.left = Math.random() * 100 + '%';
                meteor.style.animationDelay = Math.random() * 5 + 's';
                meteor.style.animationDuration = (Math.random() * 2 + 1) + 's';
                meteorsLayer.appendChild(meteor);
            }
            
            this.addStyles(`
                .meteor-shower-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                }
                .bg-star {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: white;
                    border-radius: 50%;
                    animation: star-blink ease-in-out infinite;
                }
                .meteor {
                    position: absolute;
                    width: 4px;
                    height: 80px;
                    background: linear-gradient(to bottom, #ffffff 0%, #87ceeb 30%, transparent 100%);
                    transform: rotate(45deg);
                    animation: meteor-fall linear infinite;
                    opacity: 0;
                }
                .meteor::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -2px;
                    width: 8px;
                    height: 8px;
                    background: radial-gradient(circle, #ffffff 0%, transparent 70%);
                    border-radius: 50%;
                    box-shadow: 0 0 10px #ffffff;
                }
                @keyframes star-blink {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
                @keyframes meteor-fall {
                    0% { 
                        transform: translateY(-100px) translateX(-50px) rotate(45deg); 
                        opacity: 0; 
                    }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { 
                        transform: translateY(100vh) translateX(50px) rotate(45deg); 
                        opacity: 0; 
                    }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    },
    
    {
        name: "萤火虫之舞",
        description: "夏夜森林中的萤火虫同步闪烁",
        type: "firefly-dance",
        baseStyle: "linear-gradient(to bottom, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        
        addStyles: function(css) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('data-dynamic-bg', 'true');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        },
        
        init: function() {
            return this.createFireflyDance();
        },
        createFireflyDance: function() {
            const container = document.createElement('div');
            container.className = 'firefly-dance-container';
            container.innerHTML = `
                <div class="forest-silhouette"></div>
                <div class="fireflies-layer"></div>
            `;
            
            // 创建萤火虫
            const firefliesLayer = container.querySelector('.fireflies-layer');
            for (let i = 0; i < 50; i++) {
                const firefly = document.createElement('div');
                firefly.className = 'firefly';
                firefly.style.left = Math.random() * 100 + '%';
                firefly.style.top = Math.random() * 100 + '%';
                firefly.style.animationDelay = Math.random() * 4 + 's';
                firefly.style.animationDuration = (Math.random() * 2 + 2) + 's';
                firefliesLayer.appendChild(firefly);
            }
            
            this.addStyles(`
                .firefly-dance-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                }
                .forest-silhouette {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 30%;
                    background: linear-gradient(to top, #000000 0%, transparent 100%);
                    clip-path: polygon(
                        0% 100%, 10% 60%, 15% 65%, 25% 50%, 30% 55%, 
                        40% 40%, 45% 45%, 55% 35%, 60% 40%, 70% 30%, 
                        75% 35%, 85% 25%, 90% 30%, 100% 20%, 100% 100%
                    );
                }
                .firefly {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: radial-gradient(circle, #ffff00 0%, transparent 70%);
                    border-radius: 50%;
                    animation: firefly-dance ease-in-out infinite;
                    box-shadow: 0 0 8px #ffff00;
                }
                @keyframes firefly-dance {
                    0%, 100% { 
                        opacity: 0.2; 
                        transform: translateX(0) translateY(0); 
                    }
                    25% { 
                        opacity: 1; 
                        transform: translateX(20px) translateY(-10px); 
                    }
                    50% { 
                        opacity: 0.3; 
                        transform: translateX(-10px) translateY(15px); 
                    }
                    75% { 
                        opacity: 1; 
                        transform: translateX(5px) translateY(20px); 
                    }
                }
            `);
            
            document.body.appendChild(container);
            return container;
        }
    }
];

// 合并所有背景
advancedBackgrounds.push(...additionalBackgrounds);

// 定义背景管理器
window.advancedBgManager = {
    currentBackground: null,
    currentContainer: null,
    currentDestroy: null,
    
    init: function() {
        // 设置默认背景
        if (advancedBackgrounds.length > 0) {
            this.setBackground(advancedBackgrounds[0].name);
        }
    },
    
    getBackgroundList: function() {
        return advancedBackgrounds;
    },
    
    setBackground: function(name) {
        // 清除当前背景
        this.clearCurrentBackground();
        
        // 查找新背景
        const bg = advancedBackgrounds.find(b => b.name === name);
        if (!bg) {
            console.warn('Background not found:', name);
            return false;
        }
        
        // 设置基础样式
        document.body.style.background = bg.baseStyle;
        document.body.style.backgroundAttachment = 'fixed';
        
        // 初始化动态效果
        if (typeof bg.init === 'function') {
            const result = bg.init.call(bg);
            if (result instanceof HTMLElement) { // Backwards compatibility
                this.currentContainer = result;
            } else {
                this.currentContainer = result.container;
                this.currentDestroy = result.destroy;
            }
            this.currentBackground = bg;
        }
        
        return true;
    },
    
    clearCurrentBackground: function() {
        // Call custom destroy function if it exists
        if (this.currentDestroy) {
            this.currentDestroy();
            this.currentDestroy = null;
        }

        // 移除当前动态背景容器
        if (this.currentContainer && this.currentContainer.parentNode) {
            this.currentContainer.parentNode.removeChild(this.currentContainer);
        }
        
        // 清除动态添加的样式
        const dynamicStyles = document.querySelectorAll('style[data-dynamic-bg]');
        dynamicStyles.forEach(style => style.remove());
        
        this.currentContainer = null;
        this.currentBackground = null;
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    if (window.advancedBgManager) {
        window.advancedBgManager.init();
    }
});

// 兼容原有系统
window.allBackgrounds = advancedBackgrounds.map((bg, index) => ({
    name: bg.name,
    description: bg.description,
    style: bg.baseStyle,
    id: index
})); 