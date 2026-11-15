// 作品与个人信息单一维护入口。文案依据简历与素材核对，未核实的指标不写入。
// category: scene=场景作品, art=模型/角色/IP, game=游戏项目, sculpt=ZBrush 雕刻

const PROFILE = {
  alias: '旧缨宫',
  name: '袁莉茹',
  direction: '3D 场景美术',
  tagline: '一境一叙事，一光一世界。',
  education: '成都东软学院 · 数字媒体技术（本科），2024.9 – 2028.6',
  gpa: 'GPA 3.9（专业第二）；国家励志奖学金；校级二等 / 三等奖学金；三好学生；优秀班干',
  skills: {
    engine: ['Unity（UGUI、相机系统、材质与光照）', 'AI 辅助 C# 脚本', 'UE 白盒搭建、地形、资产摆放、材质光照氛围'],
    art: ['PBR 流程 · BRDF · ORM 贴图 · 法线 / AO 烘焙', 'Maya 硬表面资产 · 拆分 UV', 'ZBrush 硬表面雕刻', 'Photoshop']
  },
  awards: [
    '2026 东方设计奖 · 全国三等奖',
    '香港当代设计奖 · 银奖',
    '日本概念艺术大赛 · 铜奖',
    '国青杯全国高校艺术设计作品大赛 · 二等奖',
    '作品入选《艺韵中国》',
    '学院奖营销策划赛道 · 入围奖',
    '国家级大创项目立项；英语四级；PS 专项职业能力认证'
  ],
  campus: [
    '芯核游戏工作室 · 3D 场景美术成员（2026.9 – 至今）：美术规范、3D 资产制作、Git 资源管理、配合程序校验引擎渲染表现',
    '校团委宣传部 · 视觉干事：海报与配图物料设计、按需求迭代',
    '班级组织委员：日常事务与活动组织、师生协调'
  ],
  contact: {
    email: '3894270937@qq.com',
    phone: '195-0675-2883',
    location: '四川 · 成都'
  },
  aboutPhoto: 'assets/media/about-photo.jpg',
  aboutIntro: [
    '注重游戏里的情感表达、叙事方式和空间体验，探索互动如何影响玩家的情绪与思考。',
    '擅长基于 Unity 与 Unreal Engine 制作 2D / 3D 游戏，用空间、节奏和交互来传递情绪与想法。',
    '相信游戏不仅是娱乐，也是理解自己、看见世界的一种方式。',
    '将“游玩”视为一种主动的感知过程——在行动反馈中感受情绪，让虚构空间与真实情感产生连接。'
  ]
};

const PROJECTS = [
  {
    id: 'blue-sea-fortlet',
    category: 'scene',
    title: '蓝海小堡',
    titleEn: 'Blue Sea Fortlet',
    role: '场景搭建 · 构件建模 · 材质与日光光影调试（个人课程实践）',
    stack: ['Maya'],
    cover: 'assets/media/fort-3.png',
    media: ['fort-1.png', 'fort-2.png', 'fort-3.png', 'fort-4.png', 'fort-5.png', 'fort-board.png'],
    summary: '风格化海上城堡场景：完成核心城堡、水上栈道、瞭望塔楼等基础建筑构件建模与多构件布局拼装；调整建筑、植被、海面材质，调试白天自然光效与水体通透、波光质感，并归档场景资源。',
    highlights: ['城堡 / 栈桥 / 塔楼建模与拼装', '植被与海面材质调整', '日光氛围与水体波光调试', '场景资源归档，面向引擎落地的前置实践'],
    course: '《三维软件基础》课程作品',
    links: {}
  },
  {
    id: 'cha-zhan-zhan',
    category: 'art',
    title: '茶盏盏 · 茶文化原创 IP',
    titleEn: 'CHA ZHAN ZHAN',
    role: '角色设计 · Maya 建模贴图渲染 · 表情动作与衍生设计',
    stack: ['Maya', 'Photoshop'],
    cover: 'assets/media/cha-1.png',
    media: ['cha-1.png', 'cha-2.png', 'cha-3.png', 'cha-4.png'],
    summary: '以缠枝纹玉盏为原型的 Q 版茶文化 IP；完成平面造型到 3D 建模、贴图渲染，并延展服装造型、文创盲盒与场景搭配。',
    highlights: ['2026 东方设计奖 · 全国三等奖', '三视图 / 表情 / 动作延展', '平面 → 3D → 周边的全链路设计'],
    links: {}
  },
  {
    id: 'interceptor',
    category: 'art',
    title: 'Interceptor 科幻飞船',
    titleEn: 'Interceptor',
    role: '硬表面建模 · 结构拆分与组装渲染',
    stack: ['Maya'],
    cover: 'assets/media/ship-1.png',
    media: ['ship-1.png', 'ship-2.png', 'ship-3.png', 'ship-4.png'],
    summary: '蓝青色科幻截击机硬表面建模：双翼翼片、环形能量核心与起落架结构拆分、组装与渲染。',
    highlights: ['硬表面结构拆分', '机械起落架细节', '多角度成品渲染'],
    links: {}
  },
  {
    id: 'catgirl',
    category: 'art',
    title: 'Catgirl Q 版角色',
    titleEn: 'Catgirl',
    role: '角色建模 · 布线 · 白模与成品渲染',
    stack: ['Maya', 'ZBrush'],
    cover: 'assets/media/cat-1.png',
    media: ['cat-1.png', 'cat-2.png', 'cat-3.png', 'cat-4.png'],
    summary: '薄荷绿短发猫耳 Q 版角色；完成头部与全身四视图布线、T 台三视图、白模与成品渲染。',
    highlights: ['四视图拓扑布线', 'T 台姿态三视图', '白模到成品渲染'],
    links: {}
  },
  {
    id: 'tree-rock-sculpt',
    category: 'sculpt',
    title: '枯树缠岩 · ZBrush 雕刻',
    titleEn: 'Tree & Rock',
    role: 'ZBrush 高模雕刻 · 树根走势与岩石块面造型（课程实践）',
    stack: ['ZBrush'],
    cover: 'assets/media/zbrush-1.jpg',
    media: ['zbrush-1.jpg', 'zbrush-2.jpg', 'zbrush-3.jpg'],
    summary: '数字空间建构课程练习：在 ZBrush 中雕刻枯树与岩石组合造型，刻画扭曲树干与缠绕根系的走势、树皮褶皱纹理，以及岩石的块面起伏与底座形态。',
    highlights: ['树干与根系走势雕刻', '树皮褶皱与岩石块面细节', '多角度白模展示'],
    course: '《数字空间建构》课程作品',
    links: {}
  },
  {
    id: 'the-other',
    category: 'game',
    title: 'The Other · 3D 解谜游戏',
    titleEn: 'THEOTHER',
    role: '3D 场景美术：Unity 场景搭建、3D 建模、资产摆放整合、材质与光照；辅助 UGUI、相机系统、图钉交互逻辑',
    stack: ['Unity', 'C#（辅助）'],
    cover: 'assets/media/other-1.jpg',
    media: ['other-1.jpg'],
    summary: 'TapTap 21 天限时游戏制作挑战，与程序、策划协作在周期内完成一款 3D 解谜游戏 Demo，按时提交可体验成片。项目设定：旧钥匙打不开家门，屋里的纸条却处处透着熟悉——有人送来饭菜，有人留下提醒，也有人似乎一直生活在这里。',
    highlights: ['限时交付可玩 Demo', 'TapTap 获得不错反响', '进入数字媒体科技与创意竞赛省赛'],
    links: { taptap: 'https://www.taptap.cn/app/983867?share_id=65e64d43dd9c' }
  },
  {
    id: 'tiiger-run',
    category: 'game',
    title: 'TIIGER RUN · 2D 跑酷 Demo',
    titleEn: 'The Tigger',
    role: '美术素材绘制 + 程序落地：UGUI、相机系统、2D 动画、基础 C#',
    stack: ['Aseprite', 'Unity', 'C#'],
    cover: 'assets/media/tigger-board.jpg',
    media: ['tigger-board.jpg'],
    summary: '复古像素 2D 洞穴跑酷；从 0 到 1 打通“美术 + 程序”完整流程，产出可完整游玩的原创小游戏。',
    highlights: ['Aseprite 独立绘制游戏素材', 'UGUI / 相机 / 2D 动画落地', '2D 资源 + 引擎落地 + 基础代码复合能力'],
    course: '《游戏程序设计》课程作品',
    links: {}
  }
];

const CATEGORY_LABEL = {
  scene: '场景作品',
  art: '模型 / 角色 / IP',
  game: '游戏项目',
  sculpt: 'ZBrush 雕刻'
};
