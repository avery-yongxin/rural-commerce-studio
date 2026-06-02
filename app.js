const storeKey = "rural-brand-gallery-v1";

const state = {
  page: localStorage.getItem(storeKey) || "home",
  frame: 0
};

const pageMeta = {
  home: ["山野好物品牌馆", "Rural Prosperity Goods"],
  origins: ["产地精选", "Selected Origins"],
  products: ["产品矩阵", "Product Family"],
  story: ["产地故事", "Village Stories"],
  quality: ["品质保障", "Quality System"],
  impact: ["共富成效", "Shared Prosperity"],
  about: ["关于我们", "About Xiangye"]
};

const origins = [
  ["秦岭周至", "山地猕猴桃", "北纬 34° 的昼夜温差，让果香更集中。", "果园实景图"],
  ["元阳梯田", "高山红米", "梯田水系与传统耕作保留谷物本味。", "梯田航拍图"],
  ["武夷竹乡", "生态笋干", "日晒风干，脆嫩耐煮，带着山林清香。", "竹林采收图"]
];

const products = [
  ["秦岭山地猕猴桃", "自然成熟 / 酸甜均衡", "Fresh Fruit", "green"],
  ["云岭高山红米", "梯田种植 / 米香扎实", "Grain", "clay"],
  ["闽北生态笋干", "日晒风干 / 脆嫩耐煮", "Bamboo Shoot", "gold"],
  ["塞上枸杞原浆", "鲜果压榨 / 配料干净", "Goji Drink", "red"]
];

const stories = [
  ["返乡青年直播助农", "宁夏中宁", "青年团队把采摘、筛选、压榨过程拍成短片，让用户看见真实产地，也让合作社订单更稳定。"],
  ["妇女创业队共建竹乡品牌", "福建武夷山", "村民把传统晒笋工艺整理成标准流程，用统一包装和稳定品控提升山货信任度。"],
  ["梯田红米走向城市餐桌", "云南元阳", "产地地图、四季耕作和农户介绍被放进品牌叙事里，让消费者理解生态种植背后的劳动价值。"]
];

function setPage(page) {
  state.page = page;
  localStorage.setItem(storeKey, page);
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
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
    origins: renderOrigins,
    products: renderProducts,
    story: renderStory,
    quality: renderQuality,
    impact: renderImpact,
    about: renderAbout
  };

  document.querySelector("#pageRoot").innerHTML = (views[state.page] || renderHome)();
  bindEvents();
  revealVisible();
  startHeroScene();
}

function renderHome() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="brand-line">主题：乡村振兴与数字助农</p>
        <h2>把山野里的好东西，带到更多人的餐桌。</h2>
        <p>
          乡野共富精选来自秦岭、云岭、武夷与塞上的农产品，用稳定的品质、清晰的产地故事和温暖的品牌表达，
          让每一份山野好物都被认真看见。
        </p>
        <div class="hero-actions">
          <button class="primary-btn" data-page="products" type="button">探索产品</button>
          <button class="ghost-btn" data-page="origins" type="button">查看产地</button>
        </div>
      </div>
      <div class="hero-photo-slot">
        <div class="frame-stage" aria-label="乡野运输插画">
          <div class="sun"></div>
          <div class="ridge ridge-back"></div>
          <div class="ridge ridge-front"></div>
          <div class="field-lines"></div>
          <div class="truck"></div>
          <div class="frame-caption">
            <span id="frameLabel">产地直采</span>
            <strong id="frameCount">01</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="image-strip reveal">
      ${[
        ["产地实景图", "预留图片 01"],
        ["农产品特写", "预留图片 02"],
        ["合作社劳作图", "预留图片 03"]
      ].map(([title, label]) => imageSlot(title, label)).join("")}
    </section>

    <section class="reason-section reveal">
      <p class="section-kicker">3 Reasons to choose Xiangye</p>
      <h2>选择乡野共富的三个理由</h2>
      <div class="reason-grid">
        ${[
          ["真实产地", "每个产品都有清晰产区、合作方和采收故事。"],
          ["稳定品质", "从采摘、分拣、包装到发货，建立统一的品质标准。"],
          ["温暖共富", "让优质农货获得更稳定的市场，也让消费者买得安心。"]
        ].map(([title, text], index) => `
          <article class="reason-card">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${title}</h3>
            <p>${text}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderOrigins() {
  return `
    <section class="split-section reveal">
      <div>
        <p class="section-kicker">Selected Origins</p>
        <h2>从产地开始建立信任</h2>
        <p>我们把页面的主角交给真实乡村：山地、梯田、竹林、合作社和采收现场，共同组成品牌的第一层可信度。</p>
      </div>
      <div class="origin-map image-slot"><span>产地分布图</span></div>
    </section>
    <section class="origin-grid reveal">
      ${origins.map(([place, product, text, label]) => `
        <article class="origin-card">
          ${imageSlot(label, place)}
          <p class="section-kicker">${place}</p>
          <h3>${product}</h3>
          <p>${text}</p>
        </article>
      `).join("")}
    </section>
  `;
}

function renderProducts() {
  return `
    <section class="product-hero reveal">
      <p class="section-kicker">Product Family</p>
      <h2>四类山野好物，覆盖日常餐桌与节礼场景。</h2>
    </section>
    <section class="product-grid reveal">
      ${products.map(([name, desc, label, tone]) => `
        <article class="product-card ${tone}">
          <div class="product-pack">
            <span>${label}</span>
          </div>
          <h3>${name}</h3>
          <p>${desc}</p>
        </article>
      `).join("")}
    </section>
  `;
}

function renderStory() {
  return `
    <section class="story-intro reveal">
      <div>
        <p class="section-kicker">Village Stories</p>
        <h2>好产品背后，是一群认真生活的人。</h2>
      </div>
      <div class="story-image-slot image-slot"><span>产地故事图 2</span></div>
    </section>
    <section class="story-timeline reveal">
      ${stories.map(([title, place, text], index) => `
        <article class="story-card">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <div>
            <p class="section-kicker">${place}</p>
            <h3>${title}</h3>
            <p>${text}</p>
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderQuality() {
  return `
    <section class="quality-section reveal">
      <p class="section-kicker">Quality System</p>
      <h2>从山野到餐桌，每一步都要清楚、稳定、可信。</h2>
      <div class="quality-grid">
        ${[
          ["产地筛选", "优先选择有稳定合作基础的产区。"],
          ["分级包装", "按成熟度、外观和规格建立分拣标准。"],
          ["冷链发货", "鲜食产品优先使用冷链或时效物流。"],
          ["售后承诺", "明确坏果、破损、延误等处理规则。"]
        ].map(([title, text]) => `
          <article class="quality-card">
            <h3>${title}</h3>
            <p>${text}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderImpact() {
  return `
    <section class="impact-hero reveal">
      <p class="section-kicker">Shared Prosperity</p>
      <h2>让助农成效被看见，也让每次购买更有方向。</h2>
    </section>
    <section class="metric-grid reveal">
      ${[
        ["36", "合作社产地"],
        ["128", "本周内容产出"],
        ["18.6k", "公益订单转化"],
        ["37%", "用户复购率"]
      ].map(([value, label]) => `
        <article class="metric-card">
          <strong>${value}</strong>
          <span>${label}</span>
        </article>
      `).join("")}
    </section>
  `;
}

function renderAbout() {
  return `
    <section class="about-section reveal">
      <div>
        <p class="section-kicker">About Xiangye</p>
        <h2>乡野共富，不只是卖农货，而是重新讲述产地价值。</h2>
        <p>我们希望用更清晰的品牌页面，把产地、产品、人物和品质标准组织起来，让消费者愿意了解、愿意选择，也愿意长期支持。</p>
      </div>
      ${imageSlot("品牌形象图", "预留图片 04")}
    </section>
  `;
}

function imageSlot(title, label) {
  return `
    <div class="image-slot">
      <span>${label}</span>
      <strong>${title}</strong>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => setPage(button.dataset.page));
  });
}

function revealVisible() {
  document.querySelectorAll(".reveal").forEach((node) => {
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) node.classList.add("visible");
  });
}

function startHeroScene() {
  cancelAnimationFrame(startHeroScene.handle);
  const stage = document.querySelector(".frame-stage");
  if (!stage) return;
  const labels = ["产地直采", "分拣包装", "冷链出发", "城市餐桌"];
  const tick = () => {
    state.frame = (state.frame + 1) % 400;
    const frame = Math.floor(state.frame / 100);
    stage.style.setProperty("--frame", frame);
    document.querySelector("#frameLabel").textContent = labels[frame];
    document.querySelector("#frameCount").textContent = String(frame + 1).padStart(2, "0");
    startHeroScene.handle = requestAnimationFrame(tick);
  };
  tick();
}

function updateScrollMeter() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const progress = max > 0 ? window.scrollY / max : 0;
  document.querySelector("#scrollMeter").style.transform = `scaleX(${progress})`;
  revealVisible();
}

window.addEventListener("scroll", updateScrollMeter, { passive: true });
render();
updateScrollMeter();
