const allBackgrounds = [
    { 
        name: '默认',
        description: '一半自然风光一半现代城市，代表着技术与自然的融合。',
        style: 'linear-gradient(135deg, #2c5530 0%, #4a7c59 15%, #6b8e23 25%, #87ceeb 35%, #b0e0e6 45%, #4682b4 55%, #2f4f4f 65%, #36454f 75%, #1c1c1c 85%, #000000 100%)'
    },
    { 
        name: '极光 (Aurora)', 
        description: '静谧夜空中，绿色和紫色的光幕如丝绸般缓缓流动，形态变幻，背景星辰偶尔闪烁。',
        style: 'linear-gradient(to bottom, #000000, #1c0c3c, #4d1a69, #8c2999, #d640cc)'
    },
    { 
        name: '海边日落 (Coastal Sunset)', 
        description: '太阳缓缓沉入海平面，天空从橙黄过渡到深紫，海面上反射着太阳的余晖，随波光轻轻晃动。',
        style: 'linear-gradient(to right, #ff7e5f, #feb47b)'
    },
    { 
        name: '日出云海 (Sunrise over Sea of Clouds)',
        description: '太阳从翻涌的云海中缓缓升起，光芒四射，将云海顶端染成金色，各层云朵缓慢漂移。',
        style: 'linear-gradient(to top, #fceabb, #f8b500)'
    },
    {
        name: '暴风雪 (Blizzard)',
        description: '灰暗的天空下，密集的雪花在狂风中急速地、倾斜地划过，形成一片模糊不清的白色风暴。',
        style: 'linear-gradient(to bottom, #e0e0e0, #ffffff)'
    },
    {
        name: '雷暴 (Thunderstorm)',
        description: '乌云密布，大雨倾盆而下，一道道闪电毫无征兆地划破天际，瞬间照亮昏暗的云层。',
        style: 'linear-gradient(to bottom, #2c3e50, #4ca1af)'
    },
    {
        name: '星空银河 (Starry Sky/Milky Way)',
        description: '深邃的夜空中，一条璀璨的银河光带横贯天际，无数星辰以不同的频率和亮度安静地闪烁。',
        style: 'linear-gradient(to bottom, #020111, #3a3a52)'
    },
    {
        name: '彩虹雨 (Rainbow Rain)',
        description: '天空中下着细雨，一道色彩鲜明的彩虹弧光逐渐显现，悬挂片刻后又缓缓消散。',
        style: 'linear-gradient(to right, #ee9ca7, #ffdde1, #f4c4f3, #e6e6e6)'
    },
    {
        name: '超强台风 (Super Typhoon)',
        description: '从平静的台风眼向外望去，巨大而浓厚的云墙在四周高速旋转，展现出毁天灭地的力量。',
        style: 'linear-gradient(to bottom, #606c88, #3f4c6b)'
    },
    {
        name: '炊烟袅袅 (Wisping Cooking Smoke)',
        description: '宁静的村落背景下，一缕或几缕炊烟从屋顶缓缓升起，在空中盘旋、舒展，最终飘散。',
        style: 'linear-gradient(to bottom, #f0f2f0, #e6e9e6)'
    },
    {
        name: '珊瑚礁内 (Inside a Coral Reef)',
        description: '阳光穿透清澈的海水，形成摇曳的光柱，照亮色彩斑斓的珊瑚，几群小鱼悠闲地游过。',
        style: 'linear-gradient(to bottom, #00c6ff, #0072ff)'
    },
    {
        name: '小人王国 (Lilliput/Miniature Kingdom)',
        description: '在巨大的草叶和露珠构成的世界里，一些微小、发光的光点（小人）在其间穿梭、移动。',
        style: 'linear-gradient(to right, #d4fc79, #96e6a1)'
    },
    {
        name: '红枫落叶 (Falling Red Maple Leaves)',
        description: '背景是秋日的天空，一片片形态各异的红枫叶以打旋、摇晃的方式，缓缓从空中飘落。',
        style: 'linear-gradient(to right, #cb2d3e, #ef473a)'
    },
    {
        name: '热带雨林 (Tropical Rainforest)',
        description: '茂密的树冠遮蔽天空，阳光从叶隙中投下斑驳光点，偶尔有水滴落下，空气中弥漫着湿润的雾气。',
        style: 'linear-gradient(to bottom, #00467f, #a5cc82)'
    },
    {
        name: '赤壁丹霞 (Danxia Landform)',
        description: '连绵起伏的赤红色丹霞山脉在画面底部展开，一轮白日悬于其上，散发着柔和的光芒。',
        style: 'linear-gradient(to top, #c21500, #ffc500)'
    },
    {
        name: '海底世界 (Underwater World)',
        description: '深邃的蓝色海洋中，成串的气泡从底部缓缓上升，远处可能有巨大生物的模糊剪影缓慢游过。',
        style: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)'
    },
    {
        name: '极地冰川 (Polar Glacier)',
        description: '巨大的冰川在冷色调的光线下呈现出锐利的边缘，偶尔有小块浮冰从冰川上剥落，坠入平静的深色海水中。',
        style: 'linear-gradient(to right, #deecff, #99b4d6)'
    },
    {
        name: '流星雨 (Meteor Shower)',
        description: '在布满星辰的夜空中，流星接二连三地、从不同方向快速划过，留下短暂而明亮的轨迹。',
        style: 'linear-gradient(to bottom, #000000, #434343)'
    },
    {
        name: '球状闪电 (Ball Lightning)',
        description: '昏暗压抑的环境中，一个明亮的等离子光球在空中毫无规律地、缓慢地漂浮移动，并发出不稳定的闪光。',
        style: 'linear-gradient(45deg, #fce38a, #f38181)'
    },
    {
        name: '幻日环天顶弧 (Sun Dog/Circumzenithal Arc)',
        description: '明亮的天空中，太阳两侧出现两个对称的光斑（幻日），同时高空悬挂着一抹倒挂的、色彩纯净的彩虹弧（环天顶弧）。',
        style: 'linear-gradient(to top, #a1c4fd, #c2e9fb)'
    },
    {
        name: '蓝眼泪 (Bioluminescent Tears)',
        description: '夜晚的海浪轻轻拍打着沙滩，每一波潮水退去时，都会在湿润的沙地上留下一片梦幻般、随之明灭的蓝色荧光。',
        style: 'linear-gradient(to right, #000428, #004e92)'
    },
    {
        name: '火山闪电 (Volcanic Lightning)',
        description: '火山向天空喷出浓厚的火山灰云，在黑暗的灰云内部，电光毫无规律地、猛烈地闪烁。',
        style: 'linear-gradient(to top, #232526, #414345)'
    },
    {
        name: '盐滩天空之镜 (Salt Flat "Mirror of the Sky")',
        description: '天与地在地平线上完美交汇，天空中的云彩和光线被地面平静的水面完整反射，形成绝对对称的、移动的镜像世界。',
        style: 'linear-gradient(to bottom, #bdc3c7, #2c3e50)'
    },
    {
        name: '彩虹色沙滩 (Rainbow-colored Beach)',
        description: '海浪周期性地冲刷着沙滩，沙滩本身由多种色彩（如粉、黑、绿）的区域构成，在阳光下呈现出独特的彩色地貌。',
        style: 'linear-gradient(90deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)'
    },
    {
        name: '萤火虫之舞 (Firefly Dance)',
        description: '寂静的夏夜森林里，成百上千的萤火虫作为一个整体，进行着有节奏的、柔和的同步闪烁，同时在空中缓缓漂移。',
        style: 'linear-gradient(to bottom, #141e30, #243b55)'
    },
    {
        name: '雾凇世界 (Rime Ice World)',
        description: '万物（特别是树枝）的轮廓上都凝结着一层精巧剔透的白色冰晶，整个世界呈现象牙般的白色，偶尔有薄雾飘过。',
        style: 'linear-gradient(to bottom, #d7e1ec, #ffffff)'
    }
];

const papers = [
    {
        title: 'NOTA: Multimodal Music Notation Understanding for Visual Large Language Model (NAACL Findings 2025)',
        description: '多模态音乐记谱理解的视觉大语言模型研究',
        tags: 'NAACL 多模态 音乐AI'
    },
    {
        title: 'N-Gram Unsupervised Compoundation and Feature Injection for Better Symbolic Music Understanding (AAAI2024)',
        description: '基于音乐共现性的的符号化音乐理解',
        tags: 'AAAI 音乐AI 自然语言处理'
    }
];

const links = [
    {
        href: 'https://www.cnblogs.com/CinqueOrigin/',
        icon: 'fas fa-blog',
        text: 'Cnblog'
    },
    {
        href: 'https://github.com/ElunaMamka',
        icon: 'fab fa-github',
        text: 'GitHub'
    },
    {
        href: 'mailto:elunamamka.tjh@gmail.com',
        icon: 'fas fa-envelope',
        text: '邮箱联系'
    },
    {
        href: 'https://elunamamka.gitbook.io/algorithm/',
        icon: 'fas fa-book',
        text: '算法笔记'
    },
    {
        href: '#',
        icon: 'fas fa-plus-circle',
        text: '更多内容'
    }
];

// 示例照片数据，展示Q版地图相册效果
window.sitePhotos = [
    { src: 'static/image/g.jpg', text: '北京故宫一日游', location: '北京', date: '2024-03-15' },
    { src: 'static/image/g.jpg', text: '北京天安门广场', location: '北京', date: '2024-03-16' },
    { src: 'static/image/bg.jpg', text: '上海外滩夜景', location: '上海', date: '2024-04-10' },
    { src: 'static/image/g.jpg', text: '上海迪士尼乐园', location: '上海', date: '2024-04-11' },
    { src: 'static/image/bg.jpg', text: '杭州西湖美景', location: '杭州', date: '2024-05-20' },
    { src: 'static/image/g.jpg', text: '杭州雷峰塔', location: '杭州', date: '2024-05-21' },
    { src: 'static/image/bg.jpg', text: '成都熊猫基地', location: '成都', date: '2024-06-01' },
    { src: 'static/image/g.jpg', text: '成都宽窄巷子', location: '成都', date: '2024-06-02' },
    { src: 'static/image/bg.jpg', text: '西安兵马俑', location: '西安', date: '2024-07-10' },
    { src: 'static/image/g.jpg', text: '西安大雁塔', location: '西安', date: '2024-07-11' },
    { src: 'static/image/bg.jpg', text: '广州小蛮腰', location: '广州', date: '2024-08-15' },
    { src: 'static/image/g.jpg', text: '深圳世界之窗', location: '深圳', date: '2024-08-16' },
    { src: 'static/image/bg.jpg', text: '昆明石林风光', location: '昆明', date: '2024-09-05' },
    { src: 'static/image/g.jpg', text: '大理洱海骑行', location: '大理', date: '2024-09-06' },
    { src: 'static/image/bg.jpg', text: '乌鲁木齐天山', location: '乌鲁木齐', date: '2024-10-01' },
    { src: 'static/image/g.jpg', text: '拉萨布达拉宫', location: '拉萨', date: '2024-10-15' },
    { src: 'static/image/bg.jpg', text: '哈尔滨冰雪大世界', location: '哈尔滨', date: '2024-11-10' },
    { src: 'static/image/g.jpg', text: '长春伪满皇宫', location: '长春', date: '2024-11-11' },
    { src: 'static/image/bg.jpg', text: '沈阳故宫参观', location: '沈阳', date: '2024-11-12' },
    { src: 'static/image/g.jpg', text: '青岛栈桥海滨', location: '青岛', date: '2024-12-01' }
]; 