document.addEventListener('DOMContentLoaded', () => {
    const chinaMapContainer = document.getElementById('china-map-container');
    const skyCityContainer = document.getElementById('sky-city-container');
    const tooltip = document.getElementById('map-tooltip');
    
    // Viewer elements
    const viewerOverlay = document.getElementById('map-photo-viewer-overlay');
    const viewerImg = document.getElementById('map-viewer-img');
    const viewerCaption = document.getElementById('map-viewer-caption');
    const closeBtn = document.getElementById('map-viewer-close-btn');
    const prevBtn = document.getElementById('map-viewer-prev-btn');
    const nextBtn = document.getElementById('map-viewer-next-btn');
    const randomBtn = document.getElementById('map-viewer-random-btn');

    // Zoom elements
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const mapAlbumContainer = document.querySelector('.map-album-container');
    const mapContent = document.getElementById('map-content');
    const mapWorld = document.getElementById('map-world');

    if (!chinaMapContainer || !viewerOverlay || !mapContent) return;

    // Map state
    let scale = 1;
    // Panning and zooming disabled as per request
    let panning = false;
    let point = { x: 0, y: 0 };
    let start = { x: 0, y: 0 };

    // Viewer state
    let currentViewerPhotos = [];
    let currentViewerIndex = 0;

    // Q版省份位置布局 - 进一步增大间距，确保完全无重叠
    const provincePositions = {
        // 最北部一排 - 增大横向间距
        '黑龙江': { x: 78, y: 2 },
        '内蒙古': { x: 40, y: 3 },
        '新疆': { x: 5, y: 5 },
        
        // 第二排 - 增大纵向和横向间距
        '吉林': { x: 82, y: 14 },
        '辽宁': { x: 88, y: 26 },
        '北京': { x: 62, y: 16 },
        '天津': { x: 70, y: 20 },
        '河北': { x: 54, y: 24 },
        '甘肃': { x: 25, y: 18 },
        
        // 第三排 - 进一步分散
        '山西': { x: 46, y: 32 },
        '山东': { x: 66, y: 36 },
        '宁夏': { x: 34, y: 30 },
        '青海': { x: 15, y: 32 },
        
        // 第四排 - 更大间距
        '陕西': { x: 38, y: 42 },
        '河南': { x: 50, y: 44 },
        '江苏': { x: 74, y: 46 },
        '上海': { x: 84, y: 50 },
        '西藏': { x: 2, y: 48 },
        
        // 第五排 - 避开上排省份
        '四川': { x: 24, y: 54 },
        '湖北': { x: 54, y: 56 },
        '安徽': { x: 66, y: 58 },
        '浙江': { x: 78, y: 60 },
        
        // 第六排 - 继续增大间距
        '重庆': { x: 34, y: 66 },
        '湖南': { x: 46, y: 68 },
        '江西': { x: 62, y: 70 },
        '福建': { x: 74, y: 72 },
        '台湾': { x: 86, y: 76 },
        
        // 第七排 - 南部省份分散布局
        '贵州': { x: 30, y: 78 },
        '广西': { x: 42, y: 82 },
        '广东': { x: 54, y: 84 },
        '云南': { x: 18, y: 80 },
        
        // 最南部 - 海岛分布
        '海南': { x: 58, y: 92 },
        '香港': { x: 62, y: 88 },
        '澳门': { x: 50, y: 90 }
    };

    // Data for mapping and positioning
    const cityToProvince = {
        '北京': '北京', '上海': '上海', '天津': '天津', '重庆': '重庆',
        '哈尔滨': '黑龙江', '长春': '吉林', '沈阳': '辽宁', '石家庄': '河北',
        '济南': '山东', '南京': '江苏', '杭州': '浙江', '合肥': '安徽',
        '福州': '福建', '南昌': '江西', '郑州': '河南', '武汉': '湖北',
        '长沙': '湖南', '广州': '广东', '海口': '海南', '成都': '四川',
        '贵阳': '贵州', '昆明': '云南', '西安': '陕西', '兰州': '甘肃',
        '西宁': '青海', '太原': '山西', '呼和浩特': '内蒙古', '南宁': '广西',
        '拉萨': '西藏', '乌鲁木齐': '新疆', '银川': '宁夏', '台北': '台湾',
        '香港': '香港', '澳门': '澳门'
    };

    const provinceToDataId = {
        '黑龙江': 1, '吉林': 2, '辽宁': 3, '河北': 4, '山东': 5, '江苏': 6, '浙江': 7,
        '安徽': 8, '河南': 9, '山西': 10, '陕西': 11, '甘肃': 12, '湖北': 13, '江西': 14,
        '福建': 15, '湖南': 16, '贵州': 17, '四川': 18, '云南': 19, '青海': 20, '海南': 21,
        '上海': 22, '重庆': 23, '天津': 24, '北京': 25, '内蒙古': 26, '广西': 27, '新疆': 28,
        '西藏': 29, '广东': 30, '宁夏': 31, '香港': 32, '澳门': 33, '台湾': 34
    };

    const internationalDirections = {
        'island-north': 'north',
        'island-northeast': 'northeast',
        'island-east': 'east',
        'island-southeast': 'southeast',
        'island-south': 'south',
        'island-southwest': 'southwest',
        'island-west': 'west',
        'island-northwest': 'northwest',
        // 北方 - 俄罗斯、北欧等
        'Moscow': 'north', 'St. Petersburg': 'north', 'Helsinki': 'north', 'Stockholm': 'north',
        
        // 东北方 - 日本北部、韩国等
        'Sapporo': 'northeast', 'Seoul': 'northeast', 'Pyongyang': 'northeast',
        
        // 东方 - 日本、菲律宾等
        'Tokyo': 'east', 'Osaka': 'east', 'Manila': 'east', 'Taipei': 'east',
        
        // 东南方 - 东南亚
        'Singapore': 'southeast', 'Bangkok': 'southeast', 'Jakarta': 'southeast', 'Kuala Lumpur': 'southeast',
        
        // 南方 - 澳洲、新西兰等
        'Sydney': 'south', 'Melbourne': 'south', 'Auckland': 'south', 'Wellington': 'south',
        
        // 西南方 - 印度、斯里兰卡等
        'Mumbai': 'southwest', 'New Delhi': 'southwest', 'Colombo': 'southwest', 'Dhaka': 'southwest',
        
        // 西方 - 中东、非洲等
        'Dubai': 'west', 'Cairo': 'west', 'Istanbul': 'west', 'Tehran': 'west',
        
        // 西北方 - 欧洲、美洲等
        'Paris': 'northwest', 'London': 'northwest', 'New York': 'northwest', 'Berlin': 'northwest'
    };

    function updateTooltipPosition(e, content) {
        tooltip.innerHTML = content;
        
        const tooltipRect = tooltip.getBoundingClientRect();
        const containerRect = mapAlbumContainer.getBoundingClientRect();

        let top = e.clientY - containerRect.top + 20;
        let left = e.clientX - containerRect.left + 20;

        // Adjust if tooltip goes out of bounds
        if (left + tooltipRect.width > containerRect.width) {
            left = e.clientX - containerRect.left - tooltipRect.width - 20;
        }
        if (top + tooltipRect.height > containerRect.height) {
            top = e.clientY - containerRect.top - tooltipRect.height - 20;
        }
        if (left < 0) {
            left = 20;
        }
        if (top < 0) {
            top = 20;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.style.opacity = '1';
    }

    // --- Main Initialization ---
    async function initMapAlbum() {
        createQVersionMap();
        const photos = window.sitePhotos || [];
        distributePhotos(photos);

        // Zoom functionality disabled as per user request
        if (mapContent) {
            mapContent.style.transform = ''; // Reset any existing transform
            mapContent.style.cursor = 'default';
        }
        
        // Remove zoom event listeners and hide buttons
        if (zoomInBtn) {
            zoomInBtn.style.display = 'none';
            zoomInBtn.onclick = null;
        }
        if (zoomOutBtn) {
            zoomOutBtn.style.display = 'none';
            zoomOutBtn.onclick = null;
        }
        
        // Disable panning by removing event listeners
        if (mapAlbumContainer) {
            mapAlbumContainer.onmousedown = null;
            mapAlbumContainer.onmouseup = null;
            mapAlbumContainer.onmouseleave = null;
            mapAlbumContainer.onmousemove = null;
            mapAlbumContainer.onwheel = null; // Also disable wheel zoom
        }
    }

    // 创建Q版地图
    function createQVersionMap() {
        chinaMapContainer.innerHTML = ''; // 清空容器
        
        // 定义可用的形状类型
        const shapeTypes = ['', 'shape-circle', 'shape-rounded', 'shape-diamond', 'shape-hexagon', 'shape-star', 'shape-oval'];
        
        // 为每个省份创建Q版区块
        Object.keys(provincePositions).forEach((provinceName, index) => {
            const position = provincePositions[provinceName];
            const provinceBlock = document.createElement('div');
            
            // 随机选择形状
            const randomShape = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            provinceBlock.className = `province-block color-${(index % 12) + 1} ${randomShape}`;
            provinceBlock.dataset.province = provinceName;
            provinceBlock.style.setProperty('--province-index', index);
            
            // 设置位置（百分比）
            provinceBlock.style.left = `${position.x}%`;
            provinceBlock.style.top = `${position.y}%`;
            
            // 添加省份名称标签
            const nameLabel = document.createElement('div');
            nameLabel.className = 'province-name';
            nameLabel.textContent = provinceName;
            provinceBlock.appendChild(nameLabel);
            
            // 添加照片计数器
            const photoCount = document.createElement('div');
            photoCount.className = 'province-photo-count';
            photoCount.textContent = '0';
            photoCount.style.display = 'none'; // 初始隐藏
            provinceBlock.appendChild(photoCount);
            
            // 创建默认的hover处理函数并存储引用
            const defaultHoverHandler = (e) => {
                if (e.target === provinceBlock || e.target.classList.contains('province-name') || e.target.classList.contains('province-photo-count')) {
                    const content = `
                        <h4>🏛️ ${provinceName}</h4>
                        <p>📸 暂无照片记录</p>
                        <small>🌟 这块区域以后再来探索吧！</small>
                    `;
                    updateTooltipPosition(e, content);
                }
            };
            
            const defaultLeaveHandler = () => {
                tooltip.style.opacity = '0';
            };
            
            // 存储默认处理函数的引用
            provinceBlock._defaultHoverHandler = defaultHoverHandler;
            provinceBlock._defaultLeaveHandler = defaultLeaveHandler;
            
            // 添加默认事件监听器
            provinceBlock.addEventListener('mousemove', defaultHoverHandler);
            provinceBlock.addEventListener('mouseleave', defaultLeaveHandler);
            
            chinaMapContainer.appendChild(provinceBlock);
        });
    }

    function distributePhotos(photos) {
        if (!photos || photos.length === 0) {
            console.warn("`window.sitePhotos` is not defined or is empty. Using sample data for map album.");
            photos = [
                { src: 'static/image/g.jpg', text: '在北京', location: '北京' },
                { src: 'static/image/g.jpg', text: '在上海', location: '上海' },
                { src: 'static/image/g.jpg', text: '在新疆', location: '新疆' },
            ];
        }

        const photosInChina = [];
        const photosInternational = [];
        const photosInSky = [];

        photos.forEach(photo => {
            let placed = false;
            
            // 1. 首先检查是否强制指定了区域
            if (photo.force_region) {
                if (photo.force_region === '天空之城') {
                    photosInSky.push(photo);
                    placed = true;
                } else if (provincePositions[photo.force_region]) {
                    photosInChina.push({ ...photo, province: photo.force_region });
                    placed = true;
                }
            }
            
            // 2. 尝试根据location匹配省份
            if (!placed && photo.location) {
                const province = cityToProvince[photo.location];
                if (province && provincePositions[province]) {
                    photosInChina.push({ ...photo, province });
                    placed = true;
                }
            }

            // 3. 检查是否为国际照片
            if (!placed && photo.location && internationalDirections[photo.location]) {
                photosInternational.push(photo);
                placed = true;
            }

            // 4. 未匹配的照片随机分配到虚拟区域或天空之城
            if (!placed) {
                const virtualRegions = ['东海明珠', '南海仙境'];
                const randomChoice = Math.random();
                if (randomChoice < 0.3) {
                    photosInSky.push(photo);
                } else {
                    const randomVirtualRegion = virtualRegions[Math.floor(Math.random() * virtualRegions.length)];
                    photosInChina.push({ ...photo, province: randomVirtualRegion });
                }
            }
        });

        // 分发照片到各个区域
        placeChinaMarkers(photosInChina);
        placeInternationalMarkers(photosInternational);
        placeSkyCityMarkers(photosInSky);
    }

    function createMarker(photo) {
        const marker = document.createElement('div');
        marker.className = 'photo-marker';
        marker.innerHTML = `<img src="${photo.src}" alt="${photo.text}">`;
        
        marker.addEventListener('mousemove', (e) => {
            const content = `
                <p>${photo.text}</p>
                <small>${photo.date || '未知的时间'}</small><br>
                <small>📍 ${photo.location || '神秘之地'}</small>
            `;
            updateTooltipPosition(e, content);
        });

        marker.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });

        return marker;
    }

    function placeChinaMarkers(photos) {
        // 按省份分组照片
        const photosByProvince = photos.reduce((acc, photo) => {
            if (!acc[photo.province]) {
                acc[photo.province] = [];
            }
            acc[photo.province].push(photo);
            return acc;
        }, {});

        // 为每个有照片的省份更新显示
        for (const provinceName in photosByProvince) {
            const provinceBlock = document.querySelector(`[data-province="${provinceName}"]`);
            if (!provinceBlock) continue;
            
            const photos = photosByProvince[provinceName];
            
            // 添加样式类
            provinceBlock.classList.add('has-photos');
            if (photos.length >= 5) {
                provinceBlock.classList.add('has-many-photos');
            }
            
            // 更新照片计数
            const photoCountElement = provinceBlock.querySelector('.province-photo-count');
            if (photoCountElement) {
                photoCountElement.textContent = photos.length;
                photoCountElement.style.display = photos.length > 0 ? 'flex' : 'none';
            }
            
            // 清空现有的略缩图
            const existingThumbnails = provinceBlock.querySelectorAll('.province-thumbnail');
            existingThumbnails.forEach(thumb => thumb.remove());
            
            // 添加最多4张图片的略缩图
            const maxThumbnails = 4;
            const displayPhotos = photos.slice(0, maxThumbnails);
            
            displayPhotos.forEach((photo, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.className = 'province-thumbnail';
                thumbnail.src = photo.src;
                thumbnail.alt = photo.text;
                thumbnail.style.zIndex = index + 1;
                
                // 为略缩图添加hover效果
                thumbnail.addEventListener('mousemove', (e) => {
                    e.stopPropagation();
                    const content = `
                        <p>${photo.text}</p>
                        <small>${photo.date || '未知的时间'}</small><br>
                        <small>📍 ${photo.location || '神秘之地'}</small>
                    `;
                    updateTooltipPosition(e, content);
                });
                
                thumbnail.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                });
                
                provinceBlock.appendChild(thumbnail);
            });
            
            // 为省份区块设置点击事件
            provinceBlock.onclick = (e) => {
                e.stopPropagation();
                openPhotoViewer(photos, 0);
            };

            // 移除默认的hover事件，添加有照片省份的专用hover事件
            provinceBlock.removeEventListener('mousemove', provinceBlock._defaultHoverHandler);
            provinceBlock.removeEventListener('mouseleave', provinceBlock._defaultLeaveHandler);
            
            const photoHoverHandler = (e) => {
                if (e.target === provinceBlock || e.target.classList.contains('province-name') || e.target.classList.contains('province-photo-count')) {
                    const content = `
                        <h4>🏛️ ${provinceName}</h4>
                        <p>📸 共有 ${photos.length} 张照片</p>
                        <small>💡 点击查看所有照片</small>
                    `;
                    updateTooltipPosition(e, content);
                }
            };
            
            const photoLeaveHandler = () => {
                tooltip.style.opacity = '0';
            };
            
            provinceBlock.addEventListener('mousemove', photoHoverHandler);
            provinceBlock.addEventListener('mouseleave', photoLeaveHandler);
        }
    }

    function placeInternationalMarkers(photos) {
        const directionGroups = {};
        photos.forEach(photo => {
            const direction = photo.forced_direction || internationalDirections[photo.location] || 'east';
            if (!directionGroups[direction]) {
                directionGroups[direction] = [];
            }
            directionGroups[direction].push(photo);
        });

        for (const direction in directionGroups) {
            const island = document.getElementById(`island-${direction}`);
            if (island) {
                island.innerHTML = ''; // Clear existing
                directionGroups[direction].forEach(photo => {
                    island.appendChild(createMarker(photo));
                });
                island.onclick = () => openPhotoViewer(directionGroups[direction], 0);
            }
        }
    }

    function placeSkyCityMarkers(photos) {
        if (photos.length > 0) {
            skyCityContainer.innerHTML = ''; // Clear existing
            photos.forEach(photo => {
                skyCityContainer.appendChild(createMarker(photo));
            });
            skyCityContainer.onclick = () => openPhotoViewer(photos, 0);
            skyCityContainer.style.display = 'none';
        }
    }

    // --- Map Zoom and Pan Logic (DISABLED) ---
    function setTransform() {
        if (mapContent) {
            mapContent.style.transform = `translate(${point.x}px, ${point.y}px) scale(${scale})`;
        }
    }

    // All panning and zooming logic is disabled by removing event listeners in initMapAlbum.
    /*
    mapAlbumContainer.onmousedown = function (e) {
        e.preventDefault();
        point.y = e.clientY - start.y;
        setTransform();
    };
    */

    // --- Photo Viewer Logic ---
    function openPhotoViewer(photos, index) {
        if (!photos || photos.length === 0) return; // Do not open for empty sets
        currentViewerPhotos = photos;
        currentViewerIndex = index;
        updateViewer();
        viewerOverlay.classList.add('active');
    }

    function closePhotoViewer() {
        viewerOverlay.classList.remove('active');
    }

    function updateViewer() {
        if (currentViewerPhotos.length === 0) return;
        const photo = currentViewerPhotos[currentViewerIndex];
        viewerImg.src = photo.src;
        viewerCaption.innerHTML = `
            <p>${photo.text}</p>
            <small>${photo.date || '未知的时间'} | 📍 ${photo.location || '神秘之地'}</small>
        `;
    }

    function showNextPhoto() {
        currentViewerIndex = (currentViewerIndex + 1) % currentViewerPhotos.length;
        updateViewer();
    }

    function showPrevPhoto() {
        currentViewerIndex = (currentViewerIndex - 1 + currentViewerPhotos.length) % currentViewerPhotos.length;
        updateViewer();
    }

    function showRandomPhoto() {
        if (currentViewerPhotos.length <= 1) return;
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * currentViewerPhotos.length);
        } while (newIndex === currentViewerIndex);
        currentViewerIndex = newIndex;
        updateViewer();
    }

    // Event listeners for viewer
    closeBtn.addEventListener('click', closePhotoViewer);
    nextBtn.addEventListener('click', showNextPhoto);
    prevBtn.addEventListener('click', showPrevPhoto);
    randomBtn.addEventListener('click', showRandomPhoto);
    viewerOverlay.addEventListener('click', (e) => {
        if (e.target === viewerOverlay) {
            closePhotoViewer();
        }
    });

    initMapAlbum();
}); 