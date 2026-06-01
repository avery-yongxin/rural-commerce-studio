const storeKey = "rural-commerce-studio-v2";

const seedState = {
  page: "home",
  generating: false,
  frame: 0,
  form: {
    name: "秦岭山地猕猴桃",
    category: "时令鲜果",
    village: "陕西周至县楼观镇",
    feature: "自然成熟、酸甜均衡、果香浓",
    farmer: "楼观镇合作社",
    audience: "注重健康饮食的家庭用户",
    price: "39.9",
    logistics: "48小时冷链发货",
    value: "诚信经营、生态种植、助力农户增收",
    templateId: "tpl-fresh"
  },
  lastResult: null,
  products: [
    {
      id: "p1",
      name: "秦岭山地猕猴桃",
      village: "陕西周至县楼观镇",
      category: "时令鲜果",
      feature: "自然成熟，果香浓郁",
      farmer: "楼观镇合作社",
      price: "39.9",
      progress: 82,
      tone: "green"
    },
    {
      id: "p2",
      name: "云岭高山红米",
      village: "云南元阳梯田片区",
      category: "粮油杂粮",
      feature: "梯田种植，米香扎实",
      farmer: "哈尼梯田共富小组",
      price: "58",
      progress: 68,
      tone: "clay"
    },
    {
      id: "p3",
      name: "闽北生态笋干",
      village: "福建武夷山周边村落",
      category: "山珍干货",
      feature: "日晒风干，脆嫩耐煮",
      farmer: "竹乡妇女创业队",
      price: "46",
      progress: 74,
      tone: "gold"
    },
    {
      id: "p4",
      name: "塞上枸杞原浆",
      village: "宁夏中宁示范基地",
      category: "健康饮品",
      feature: "鲜果压榨，配料干净",
      farmer: "青年返乡创业站",
      price: "69",
      progress: 91,
      tone: "red"
    }
  ],
  templates: [
    {
      id: "tpl-fresh",
      name: "时令鲜果安心购",
      tags: ["生态", "新鲜", "家庭"],
      title: "{产地}{品名}｜自然成熟，冷链直达餐桌",
      structure: "产地信任 + 口感描述 + 物流承诺 + 助农价值",
      scene: "适合水果、蔬菜、鲜食农产品"
    },
    {
      id: "tpl-story",
      name: "产地故事短视频",
      tags: ["故事", "返乡", "共富"],
      title: "从一亩田到一张餐桌，看见乡村新力量",
      structure: "人物开场 + 劳作细节 + 品质证明 + 公益购买",
      scene: "适合短视频脚本、直播开场、品牌故事"
    },
    {
      id: "tpl-holiday",
      name: "节庆礼盒推荐",
      tags: ["礼盒", "节日", "团购"],
      title: "把来自山野的心意，送给重要的人",
      structure: "节日场景 + 包装亮点 + 产地背书 + 售后保障",
      scene: "适合礼盒、团购、企事业福利"
    }
  ],
  stories: [
    {
      title: "返乡青年直播助农",
      place: "宁夏中宁",
      text: "青年团队把枸杞采摘、筛选、压榨过程拍成短视频，让用户看见真实产地，也让合作社订单更稳定。"
    },
    {
      title: "妇女创业队共建竹乡品牌",
      place: "福建武夷山",
      text: "村民把传统晒笋工艺整理成标准化流程，页面展示工序、口感和烹饪建议，提升产品信任度。"
    },
    {
      title: "梯田红米走向城市餐桌",
      place: "云南元阳",
      text: "通过产地地图、四季耕作时间线和农户介绍，消费者理解生态种植背后的劳动价值。"
    }
  ]
};

let state = loadState();
let frameAnimationHandle = 0;

const pageMeta = {
  home: ["首页总览", "Rural Commerce Studio"],
  products: ["助农商品", "Featured Produce"],
  story: ["产地故事", "Village Stories"],
  generator: ["内容生成", "AI Copy Workshop"],
  templates: ["模板工坊", "Reusable Templates"],
  tech: ["技术架构", "Technical Architecture"],
  motion: ["动效实验", "Motion Lab"],
  pipeline: ["智能流程", "AI Pipeline"],
  impact: ["共富看板", "Impact Dashboard"]
};

function loadState() {
  try {
    const raw = localStorage.getItem(storeKey);
    if (!raw) return structuredClone(seedState);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(seedState),
      ...parsed,
      form: { ...seedState.form, ...(parsed.form || {}) }
    };
  } catch {
    return structuredClone(seedState);
  }
}

function persist() {
  localStorage.setItem(storeKey, JSON.stringify(state));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setPage(page) {
  state.page = page;
  persist();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2300);
}

function currentTemplate() {
  return state.templates.find((item) => item.id === state.form.templateId) || state.templates[0];
}

function render() {
  const [title, kicker] = pageMeta[state.page] || pageMeta.home;
  document.querySelector("#pageTitle").textContent = title;
  document.querySelector("#pageKicker").textContent = kicker;
  document.querySelectorAll("[data-page]").forEach((item) => {
    item.classList.toggle("active", item.dataset.page === state.page);
  });

  const views = {
    home: renderHome,
    products: renderProducts,
    story: renderStory,
    generator: renderGenerator,
    templates: renderTemplates,
    tech: renderTech,
    motion: renderMotion,
    pipeline: renderPipeline,
    impact: renderImpact
  };

  document.querySelector("#pageRoot").innerHTML = (views[state.page] || renderHome)();
  bindPageEvents();
  requestAnimationFrame(() => {
    revealVisible();
    startFrameScene();
  });
}

function renderHome() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">主题：乡村振兴与数字助农</p>
        <h2>让好农货被看见，让真实劳动被尊重。</h2>
        <p>
          这是一个面向乡村农产品上新的内容工作台：把商品录入、产地故事、助农文案、模板沉淀和公益成效看板整合在一起，
          用数字技术服务诚信经营、绿色发展和共同富裕。
        </p>
        <div class="hero-actions">
          <button class="primary-btn" data-action="go-generator" type="button">生成助农内容</button>
          <button class="ghost-btn" data-action="go-story" type="button">查看产地故事</button>
        </div>
      </div>
      <div class="frame-stage" aria-label="四季助农帧动画">
        <div class="sun"></div>
        <div class="ridge ridge-back"></div>
        <div class="ridge ridge-front"></div>
        <div class="field-lines"></div>
        <div class="truck"></div>
        <div class="frame-caption">
          <span id="frameLabel">春耕计划</span>
          <strong id="frameCount">01</strong>
        </div>
      </div>
    </section>

    <section class="metric-row reveal">
      ${[
        ["覆盖合作社", "36", "连结多地优质产区"],
        ["本周内容产出", "128", "短视频脚本与商品页文案"],
        ["模板复用率", "64%", "减少重复起稿时间"],
        ["公益订单转化", "18.6k", "让助农行动可被追踪"]
      ].map(([label, value, text]) => metric(label, value, text)).join("")}
    </section>

    <section class="section reveal">
      <div class="section-head">
        <p class="eyebrow">Multi Page Experience</p>
        <h2>页面体量与功能路径</h2>
      </div>
      <div class="feature-grid">
        ${[
          ["助农商品", "商品卡片、进度条、品质标签，展示农产品卖点和助农目标。", "products"],
          ["产地故事", "用时间线和故事卡讲清楚人、货、乡村建设之间的关系。", "story"],
          ["内容生成", "输入商品信息后生成标题、卖点、短视频脚本和主图提示。", "generator"],
          ["模板工坊", "沉淀可复用结构，提高内容生产效率和一致性。", "templates"],
          ["技术架构", "展示状态管理、渲染管线、组件分层与本地持久化。", "tech"],
          ["动效实验", "集中呈现帧动画、轨道动画、滚动揭示和 3D 卡片。", "motion"],
          ["智能流程", "把输入、模板匹配、内容生成、保存复用拆成可视化流程。", "pipeline"],
          ["共富看板", "通过数据可视化呈现订单、农户、生态和公益成效。", "impact"]
        ].map(([name, text, page]) => `
          <article class="feature-card tilt-card" data-action="go-page" data-target="${page}">
            <span>${name.slice(0, 1)}</span>
            <h3>${name}</h3>
            <p>${text}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function metric(label, value, text) {
  return `
    <article class="metric tilt-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${text}</p>
    </article>
  `;
}

function renderProducts() {
  return `
    <section class="section reveal">
      <div class="section-head">
        <p class="eyebrow">Origin Selected</p>
        <h2>助农商品矩阵</h2>
      </div>
      <div class="product-grid">
        ${state.products.map((product, index) => `
          <article class="product-card tilt-card ${product.tone}">
            <div class="product-art">
              <span class="orbit orbit-${index + 1}"></span>
              <strong>${product.name.slice(0, 2)}</strong>
            </div>
            <div class="product-body">
              <p class="eyebrow">${escapeHtml(product.category)}</p>
              <h3>${escapeHtml(product.name)}</h3>
              <p>${escapeHtml(product.feature)}</p>
              <dl>
                <div><dt>产地</dt><dd>${escapeHtml(product.village)}</dd></div>
                <div><dt>合作方</dt><dd>${escapeHtml(product.farmer)}</dd></div>
                <div><dt>助农价</dt><dd>¥${escapeHtml(product.price)}</dd></div>
              </dl>
              <div class="progress"><span style="width:${product.progress}%"></span></div>
              <small>本期助农目标完成 ${product.progress}%</small>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderStory() {
  return `
    <section class="section reveal">
      <div class="section-head">
        <p class="eyebrow">People Behind Produce</p>
        <h2>产地故事时间线</h2>
      </div>
      <div class="timeline">
        ${state.stories.map((story, index) => `
          <article class="story-card reveal">
            <span class="story-index">0${index + 1}</span>
            <div>
              <p class="eyebrow">${escapeHtml(story.place)}</p>
              <h3>${escapeHtml(story.title)}</h3>
              <p>${escapeHtml(story.text)}</p>
            </div>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="section values-panel reveal">
      <p class="eyebrow">社会主义核心价值观表达</p>
      <h2>把“富强、文明、和谐、诚信、友善”落到页面内容里</h2>
      <div class="value-grid">
        <span>诚信溯源</span>
        <span>生态种植</span>
        <span>劳动尊重</span>
        <span>共同富裕</span>
        <span>青年返乡</span>
        <span>公益助农</span>
      </div>
    </section>
  `;
}

function renderGenerator() {
  const templateOptions = state.templates.map((tpl) => (
    `<option value="${tpl.id}" ${tpl.id === state.form.templateId ? "selected" : ""}>${escapeHtml(tpl.name)}</option>`
  )).join("");

  return `
    <section class="generator-layout reveal">
      <form class="panel" id="productForm">
        <div class="section-head compact">
          <div>
            <p class="eyebrow">Content Generator</p>
            <h2>助农内容生成</h2>
          </div>
        </div>
        <div class="form-grid">
          ${inputField("商品名称", "name", "例如：秦岭山地猕猴桃")}
          ${inputField("类目", "category", "例如：时令鲜果")}
          ${inputField("产地", "village", "例如：陕西周至县楼观镇")}
          ${inputField("合作方", "farmer", "例如：楼观镇合作社")}
          ${inputField("核心卖点", "feature", "例如：自然成熟、酸甜均衡")}
          ${inputField("目标人群", "audience", "例如：健康饮食家庭")}
          ${inputField("价格", "price", "例如：39.9")}
          ${inputField("物流承诺", "logistics", "例如：48小时冷链发货")}
          <label class="span-2">价值表达
            <textarea name="value" placeholder="例如：诚信经营、绿色发展、助力农户增收">${escapeHtml(state.form.value)}</textarea>
          </label>
          <label class="span-2">选择内容模板
            <select name="templateId">${templateOptions}</select>
          </label>
        </div>
        <div class="button-row">
          <button class="primary-btn" data-action="generate" type="button">生成完整方案</button>
          <button class="ghost-btn" data-action="fill-sample" type="button">填入示例</button>
        </div>
      </form>

      <section class="panel result-panel">
        <p class="eyebrow">Generated Output</p>
        <h2>标题、卖点、脚本与主图提示</h2>
        ${state.generating ? renderLoading() : renderResult()}
      </section>
    </section>
  `;
}

function inputField(label, name, placeholder) {
  return `<label>${label}<input name="${name}" value="${escapeHtml(state.form[name])}" placeholder="${placeholder}" /></label>`;
}

function renderLoading() {
  return `
    <div class="loading-box">
      <div class="loader-rings"><span></span><span></span><span></span></div>
      <h3>正在组织助农传播方案</h3>
      <p>产地信息分析 → 模板匹配 → 价值表达 → 主图提示 → 短视频脚本</p>
    </div>
  `;
}

function renderResult() {
  if (!state.lastResult) {
    return `
      <div class="empty-box">
        <h3>等待生成</h3>
        <p>点击“生成完整方案”，系统会模拟生成商品页标题、卖点文案、短视频脚本和视觉提示词。</p>
      </div>
    `;
  }
  const r = state.lastResult;
  return `
    <div class="result-stack">
      <article class="poster-preview">
        <span>助农上新</span>
        <h3>${escapeHtml(r.productName)}</h3>
        <p>${escapeHtml(r.heroLine)}</p>
        <strong>¥${escapeHtml(r.price)}</strong>
      </article>
      ${copyBlock("商品标题", r.title)}
      ${copyBlock("核心卖点", r.sellingPoint)}
      ${copyBlock("短视频脚本", r.script)}
      ${copyBlock("主图提示", r.visualPrompt)}
      <div class="tag-list">${r.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      <button class="primary-btn" data-action="save-template" type="button">收藏为模板</button>
    </div>
  `;
}

function copyBlock(label, value) {
  return `<div class="copy-block"><span>${label}</span><p>${escapeHtml(value)}</p></div>`;
}

function renderTemplates() {
  return `
    <section class="section reveal">
      <div class="section-head">
        <p class="eyebrow">Reusable System</p>
        <h2>模板工坊</h2>
      </div>
      <div class="template-grid">
        ${state.templates.map((tpl) => `
          <article class="template-card tilt-card">
            <p class="eyebrow">${escapeHtml(tpl.scene)}</p>
            <h3>${escapeHtml(tpl.name)}</h3>
            <div class="copy-block"><span>标题结构</span><p>${escapeHtml(tpl.title)}</p></div>
            <div class="copy-block"><span>内容结构</span><p>${escapeHtml(tpl.structure)}</p></div>
            <div class="tag-list">${tpl.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
            <button class="mini-btn" data-action="use-template" data-id="${tpl.id}" type="button">套用模板</button>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderImpact() {
  return `
    <section class="section reveal">
      <div class="section-head">
        <p class="eyebrow">Impact Data</p>
        <h2>共富成效看板</h2>
      </div>
      <div class="metric-row">
        ${metric("服务农户", "428", "合作社和家庭农场")}
        ${metric("公益曝光", "92w", "站内内容累计触达")}
        ${metric("绿色产地", "12", "生态种植示范点")}
        ${metric("复购率", "37%", "用户信任持续提升")}
      </div>
      <div class="impact-grid">
        ${[
          ["内容质量", 88, "标题包含产地、品质、物流与价值表达"],
          ["视觉完成度", 92, "帧动画、卡片动效、响应式布局均已覆盖"],
          ["页面丰富度", 86, "7 个页面模块支撑完整叙事"],
          ["文档完整度", 90, "README 与站内说明同步解释项目"]
        ].map(([name, score, text]) => `
          <article class="score-card">
            <div class="score-ring" style="--score:${score}"><span>${score}</span></div>
            <h3>${name}</h3>
            <p>${text}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTech() {
  return `
    <section class="section reveal">
      <div class="section-head">
        <p class="eyebrow">Native SPA Architecture</p>
        <h2>技术架构可视化</h2>
      </div>
      <div class="architecture-grid">
        ${[
          ["State Core", "seedState + localStorage", "保存页面、表单、生成结果和模板，让纯静态网页具备应用级状态。"],
          ["Render Map", "pageMeta + render()", "按页面 key 映射渲染函数，形成无框架 SPA 路由。"],
          ["Motion Loop", "requestAnimationFrame", "驱动首页场景帧变化，让静态页面拥有实时动画层。"],
          ["Interaction Bus", "data-action / data-page", "统一按钮行为，减少分散事件逻辑，方便继续扩展页面。"]
        ].map(([name, code, text], index) => `
          <article class="arch-card tilt-card">
            <span class="arch-number">${String(index + 1).padStart(2, "0")}</span>
            <h3>${name}</h3>
            <code>${code}</code>
            <p>${text}</p>
          </article>
        `).join("")}
      </div>
      <div class="code-window">
        <div class="code-dots"><span></span><span></span><span></span></div>
        <pre><code>const views = {
  home: renderHome,
  products: renderProducts,
  tech: renderTech,
  motion: renderMotion,
  pipeline: renderPipeline
};

root.innerHTML = views[state.page]();</code></pre>
      </div>
    </section>
  `;
}

function renderMotion() {
  return `
    <section class="section reveal">
      <div class="section-head">
        <p class="eyebrow">Advanced Motion</p>
        <h2>动效实验室</h2>
      </div>
      <div class="motion-showcase">
        <article class="motion-card parallax-demo">
          <span class="motion-sun"></span>
          <span class="motion-hill hill-a"></span>
          <span class="motion-hill hill-b"></span>
          <h3>视差产地场景</h3>
          <p>多层背景以不同速度移动，模拟沉浸式滚动和镜头纵深。</p>
        </article>
        <article class="motion-card orbit-demo">
          <div class="core-orbit"><span></span><span></span><span></span></div>
          <h3>轨道数据动画</h3>
          <p>CSS keyframes 驱动多个节点环绕，表达商品、模板、用户、公益数据联动。</p>
        </article>
        <article class="motion-card scan-demo">
          <div class="scan-panel"></div>
          <h3>AI 扫描生成</h3>
          <p>扫描线、光带和玻璃层叠模拟智能内容生成过程，增强技术感。</p>
        </article>
      </div>
    </section>
  `;
}

function renderPipeline() {
  return `
    <section class="section reveal">
      <div class="section-head">
        <p class="eyebrow">AI Content Pipeline</p>
        <h2>智能流程中台</h2>
      </div>
      <div class="pipeline-board">
        ${[
          ["01", "商品输入", "采集名称、产地、卖点、人群、物流承诺。"],
          ["02", "语义拆解", "提取品质关键词、价值导向和可信背书。"],
          ["03", "模板匹配", "按类目选择鲜果、故事、礼盒等传播结构。"],
          ["04", "内容生成", "输出标题、卖点、短视频脚本和主图提示。"],
          ["05", "复用沉淀", "收藏为模板，进入下一轮助农上新。"]
        ].map(([step, name, text]) => `
          <article class="pipeline-step">
            <strong>${step}</strong>
            <h3>${name}</h3>
            <p>${text}</p>
          </article>
        `).join("")}
      </div>
      <div class="terminal-panel">
        <span>pipeline.log</span>
        <p>&gt; parse_product(origin="秦岭", value="生态种植")</p>
        <p>&gt; match_template(type="时令鲜果安心购")</p>
        <p>&gt; generate_copy(status="ready", trust_score=92)</p>
      </div>
    </section>
  `;
}

function buildResult() {
  const f = state.form;
  const tpl = currentTemplate();
  const tags = [f.category, f.village, "助农", "诚信", "绿色"].filter(Boolean);
  return {
    id: `result-${Date.now()}`,
    productName: f.name,
    price: f.price,
    heroLine: `${f.village}直发，${f.feature}`,
    title: `${f.village}${f.name}｜${f.feature}，${f.logistics}`,
    sellingPoint: `来自${f.farmer}的${f.name}，坚持${f.value}。适合${f.audience}，把真实产地和安心品质带到日常餐桌。`,
    script: `镜头一：清晨产地航拍，字幕“${f.village}”。镜头二：农户采摘/分拣，突出“${f.feature}”。镜头三：打包发货，强调“${f.logistics}”。结尾：购买一份好农货，也支持一份踏实劳动。`,
    visualPrompt: `暖色自然光、真实乡村产地、农户手持${f.name}、干净包装、绿色生态背景、主标题使用“${tpl.name}”结构。`,
    tags
  };
}

function bindPageEvents() {
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => setPage(button.dataset.page));
  });
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", handleAction);
  });

  const productForm = document.querySelector("#productForm");
  if (productForm) {
    productForm.addEventListener("input", () => {
      const data = new FormData(productForm);
      Object.keys(state.form).forEach((key) => {
        if (data.has(key)) state.form[key] = data.get(key);
      });
      persist();
    });
  }

  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", handleTilt);
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  const target = event.currentTarget.dataset.target;
  const routes = {
    "go-generator": "generator",
    "go-story": "story",
    "go-page": target
  };
  if (routes[action]) {
    setPage(routes[action]);
    return;
  }
  if (action === "generate") generateContent();
  if (action === "fill-sample") fillSample();
  if (action === "save-template") saveTemplate();
  if (action === "use-template") useTemplate(event.currentTarget.dataset.id);
}

function handleTilt(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  event.currentTarget.style.setProperty("--rx", `${y * -7}deg`);
  event.currentTarget.style.setProperty("--ry", `${x * 9}deg`);
}

function fillSample() {
  state.form = { ...seedState.form };
  persist();
  showToast("已填入示例助农商品");
  render();
}

function generateContent() {
  const productForm = document.querySelector("#productForm");
  if (productForm) {
    const data = new FormData(productForm);
    Object.keys(state.form).forEach((key) => {
      if (data.has(key)) state.form[key] = data.get(key);
    });
  }
  if (!state.form.name.trim() || !state.form.village.trim()) {
    showToast("请至少填写商品名称和产地");
    return;
  }
  state.generating = true;
  persist();
  render();
  window.setTimeout(() => {
    state.lastResult = buildResult();
    state.generating = false;
    persist();
    showToast("已生成完整助农传播方案");
    render();
  }, 1100);
}

function saveTemplate() {
  if (!state.lastResult) {
    showToast("请先生成内容");
    return;
  }
  state.templates.unshift({
    id: `tpl-${Date.now()}`,
    name: `${state.lastResult.productName}助农模板`,
    tags: state.lastResult.tags.slice(0, 3),
    title: state.lastResult.title,
    structure: "产地背书 + 品质卖点 + 助农价值 + 物流保障",
    scene: "由生成结果收藏"
  });
  persist();
  showToast("已收藏到模板工坊");
  render();
}

function useTemplate(id) {
  const tpl = state.templates.find((item) => item.id === id);
  if (!tpl) return;
  state.form.templateId = tpl.id;
  state.page = "generator";
  persist();
  showToast(`已套用“${tpl.name}”`);
  render();
}

function revealVisible() {
  document.querySelectorAll(".reveal").forEach((node) => {
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) node.classList.add("visible");
  });
}

function updateFrameScene() {
  const stage = document.querySelector(".frame-stage");
  if (!stage) return;
  const labels = ["春耕计划", "夏季生长", "秋收分拣", "冷链进城", "公益复购"];
  state.frame = (state.frame + 1) % 500;
  const frame = Math.floor(state.frame / 100);
  stage.style.setProperty("--frame", frame);
  document.querySelector("#frameLabel").textContent = labels[frame];
  document.querySelector("#frameCount").textContent = String(frame + 1).padStart(2, "0");
  frameAnimationHandle = requestAnimationFrame(updateFrameScene);
}

function startFrameScene() {
  window.cancelAnimationFrame(frameAnimationHandle);
  updateFrameScene();
}

function updateScrollMeter() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const progress = max > 0 ? window.scrollY / max : 0;
  document.querySelector("#scrollMeter").style.transform = `scaleX(${progress})`;
  revealVisible();
}

document.querySelector("#jumpGenerate").addEventListener("click", () => setPage("generator"));
document.querySelector("#resetDemo").addEventListener("click", () => {
  localStorage.removeItem(storeKey);
  state = structuredClone(seedState);
  showToast("演示数据已重置");
  render();
});
window.addEventListener("scroll", updateScrollMeter, { passive: true });

render();
updateScrollMeter();
