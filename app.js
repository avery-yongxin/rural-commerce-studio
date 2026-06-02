const storeKey = "rural-brand-gallery-v1";

const state = {
  page: localStorage.getItem(storeKey) || "home"
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
  ["秦岭周至", "山地猕猴桃", "北纬 34° 的昼夜温差，让果香更集中。", "果园实景图", "assets/images/qinling-kiwi.png", "秦岭周至山地猕猴桃果园"],
  ["元阳梯田", "高山红米", "梯田水系与传统耕作保留谷物本味。", "梯田航拍图", "assets/images/yuanyang-rice.png", "云南元阳高山红米梯田"],
  ["武夷竹乡", "生态笋干", "日晒风干，脆嫩耐煮，带着山林清香。", "竹林采收图", "assets/images/wuyi-bamboo.png", "武夷竹乡竹林和新鲜竹笋"]
];

const products = [
  ["秦岭山地猕猴桃", "自然成熟 / 酸甜均衡", "Fresh Fruit", "green", "assets/images/qinling_zhonghua_mihoutao.png", "秦岭山地猕猴桃挂果特写"],
  ["云岭高山红米", "梯田种植 / 米香扎实", "Grain", "clay", "assets/images/hongmi.png", "云岭高山红米产品图"],
  ["闽北生态笋干", "日晒风干 / 脆嫩耐煮", "Bamboo Shoot", "gold", "assets/images/sungan.png", "闽北生态笋干产品图"],
  ["塞上枸杞原浆", "鲜果压榨 / 配料干净", "Goji Drink", "red", "assets/images/gouqiyuanjiang.jpg", "塞上枸杞原浆产品图"]
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
  // Brief delay to ensure DOM is updated before revealing
  setTimeout(revealVisible, 50);
}

function renderHome() {
  return `
    <section class="hero reveal">
      <div class="hero-copy">
        <p class="brand-line">乡村振兴 · 数字助农</p>
        <h2>把山野里的好东西，<br/>带到更多人的餐桌。</h2>
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
        <img src="assets/images/R.png" alt="山野好物" class="hero-image-main" loading="lazy" />
      </div>
    </section>

    <section class="image-strip">
      ${[
        ["产地实景图", "秦岭果园", "assets/images/R.png", "秦岭山地果园与远山产地实景"],
        ["农产品特写", "山野好物", "assets/images/product-still-life.png", "猕猴桃红米笋干和枸杞组成的农产品特写"],
        ["合作社劳作图", "分拣现场", "assets/images/cooperative-work.png", "合作社成员在乡村包装间分拣农产品"]
      ].map(([title, label, image, alt]) => imageSlot(title, label, "reveal", image, alt)).join("")}
    </section>

    <section class="reason-section">
      <p class="section-kicker reveal">3 Reasons</p>
      <h2 class="reveal">选择乡野共富的三个理由</h2>
      <div class="reason-grid">
        ${[
          ["真实产地", "每个产品都有清晰产区、合作方和采收故事。"],
          ["稳定品质", "从采摘、分拣、包装到发货，建立统一的品质标准。"],
          ["温暖共富", "让优质农货获得更稳定的市场，也让消费者买得安心。"]
        ].map(([title, text], index) => `
          <article class="reason-card reveal">
            <span>${String(index + 1).padStart(2, "0")}.</span>
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
      ${imageSlot("产地分布图", "四大产区", "origin-map", "assets/images/origin-map.png", "乡野共富四大产区分布示意图")}
    </section>
    <section class="origin-grid">
      ${origins.map(([place, product, text, label, image, alt]) => `
        <article class="origin-card reveal">
          ${imageSlot(label, place, "", image, alt)}
          <div class="origin-card-content">
            <p class="section-kicker">${place}</p>
            <h3>${product}</h3>
            <p>${text}</p>
          </div>
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
    <section class="product-grid">
      ${products.map(([name, desc, label, tone, image, alt]) => `
        <article class="product-card reveal">
          <div class="product-pack">
            <img src="${image}" alt="${alt}" loading="lazy" />
            <span class="product-badge">${label}</span>
          </div>
          <div class="product-info">
            <h3>${name}</h3>
            <p>${desc}</p>
          </div>
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
      ${imageSlot("产地故事图", "直播助农", "story-image-slot", "assets/images/village-story.png", "乡村合作社团队拍摄农产品直播内容")}
    </section>
    <section class="story-timeline">
      ${stories.map(([title, place, text], index) => `
        <article class="story-card reveal">
          <span class="story-number">${String(index + 1).padStart(2, "0")}</span>
          <div class="story-content">
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
    <section class="quality-section">
      <p class="section-kicker reveal">Quality System</p>
      <h2 class="reveal">从山野到餐桌，每一步都要清楚、稳定、可信。</h2>
      <div class="quality-grid">
        ${[
          ["产地筛选", "优先选择有稳定合作基础的产区。"],
          ["分级包装", "按成熟度、外观和规格建立分拣标准。"],
          ["冷链发货", "鲜食产品优先使用冷链或时效物流。"],
          ["售后承诺", "明确坏果、破损、延误等处理规则。"]
        ].map(([title, text]) => `
          <article class="quality-card reveal">
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
    <section class="metric-grid">
      ${[
        ["36", "合作社产地"],
        ["128", "本周内容产出"],
        ["18.6k", "公益订单转化"],
        ["37%", "用户复购率"]
      ].map(([value, label]) => `
        <article class="metric-card reveal">
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
      ${imageSlot("品牌形象图", "乡野共富", "", "assets/images/brand-still-life.png", "乡野共富品牌农产品静物组合")}
    </section>
  `;
}

function imageSlot(title, label, extraClass = "", image = "", alt = title) {
  return `
    <div class="image-slot ${extraClass}">
      ${image ? `<img src="${image}" alt="${alt}" loading="lazy" />` : ""}
      <div class="image-slot-overlay">
        <span>${label}</span>
        <strong>${title}</strong>
      </div>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => setPage(button.dataset.page));
  });
}

function revealVisible() {
  let currentTop = 0;
  let delay = 0;
  
  document.querySelectorAll(".reveal:not(.visible)").forEach((node) => {
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      if (Math.abs(rect.top - currentTop) < 60) {
        delay += 100;
      } else {
        currentTop = rect.top;
        delay = 0;
      }
      node.style.transitionDelay = `${delay}ms`;
      node.classList.add("visible");
    }
  });
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
