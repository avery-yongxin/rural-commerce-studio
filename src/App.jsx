import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Leaf, MapPin, Package, BookOpen, ShieldCheck, TrendingUp, Info } from 'lucide-react';

const storeKey = "rural-brand-gallery-v2";

const pageMeta = {
  home: { title: "山野好物品牌馆", kicker: "Rural Prosperity Goods", icon: Leaf },
  origins: { title: "产地精选", kicker: "Selected Origins", icon: MapPin },
  products: { title: "产品矩阵", kicker: "Product Family", icon: Package },
  story: { title: "产地故事", kicker: "Village Stories", icon: BookOpen },
  quality: { title: "品质保障", kicker: "Quality System", icon: ShieldCheck },
  impact: { title: "共富成效", kicker: "Shared Prosperity", icon: TrendingUp },
  about: { title: "关于我们", kicker: "About Xiangye", icon: Info }
};

const originsData = [
  ["秦岭周至", "山地猕猴桃", "北纬 34° 的昼夜温差，让果香更集中。", "果园实景图", "/assets/images/qinling-kiwi.png"],
  ["元阳梯田", "高山红米", "梯田水系与传统耕作保留谷物本味。", "梯田航拍图", "/assets/images/yuanyang-rice.png"],
  ["武夷竹乡", "生态笋干", "日晒风干，脆嫩耐煮，带着山林清香。", "竹林采收图", "/assets/images/wuyi-bamboo.png"]
];

const productsData = [
  ["秦岭山地猕猴桃", "自然成熟 / 酸甜均衡", "Fresh Fruit", "/assets/images/qinling_zhonghua_mihoutao.png"],
  ["云岭高山红米", "梯田种植 / 米香扎实", "Grain", "/assets/images/hongmi.png"],
  ["闽北生态笋干", "日晒风干 / 脆嫩耐煮", "Bamboo Shoot", "/assets/images/sungan.png"],
  ["塞上枸杞原浆", "鲜果压榨 / 配料干净", "Goji Drink", "/assets/images/gouqiyuanjiang.jpg"]
];

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ImageSlot = ({ title, label, image, aspect = "aspect-[3/4]" }) => (
  <div className={`relative overflow-hidden bg-[var(--bg-alt)] ${aspect} group`}>
    {image && (
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
        loading="lazy"
      />
    )}
    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white flex flex-col">
      <span className="text-[11px] tracking-[2px] uppercase opacity-80 mb-2">{label}</span>
      <strong className="font-serif text-2xl font-normal">{title}</strong>
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => localStorage.getItem(storeKey) || "home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    localStorage.setItem(storeKey, currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const { title, kicker } = pageMeta[currentPage] || pageMeta.home;

  const NavItem = ({ pageKey }) => {
    const isActive = currentPage === pageKey;
    const { title: pageTitle } = pageMeta[pageKey];
    return (
      <button
        onClick={() => setCurrentPage(pageKey)}
        className={`px-0 py-2 text-[13px] tracking-[1px] uppercase transition-colors duration-300 border-b ${
          isActive ? 'text-[var(--text-main)] border-[var(--text-main)]' : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-main)] hover:border-[var(--line-dark)]'
        }`}
      >
        {pageTitle}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] selection:bg-[var(--text-main)] selection:text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--text-main)] origin-left z-[100]" style={{ scaleX }} />
      
      <header className="sticky top-0 z-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-6 md:px-20 py-5 bg-white/90 backdrop-blur-md border-b border-[var(--line)] transition-all">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-4 text-left hover:opacity-80 transition-opacity">
          <div className="grid place-items-center w-9 h-9 bg-[var(--text-main)] text-white rounded-sm text-lg font-serif">
            田
          </div>
          <div>
            <strong className="block text-base font-medium tracking-[2px] uppercase mb-0.5">乡野共富</strong>
            <em className="block text-[11px] text-[var(--text-muted)] tracking-[1px] uppercase not-italic">山野好物品牌馆</em>
          </div>
        </button>
        
        <nav className="flex items-center gap-8 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {Object.keys(pageMeta).map(key => <NavItem key={key} pageKey={key} />)}
        </nav>
      </header>

      <main className="w-full max-w-[1600px] mx-auto px-6 md:px-20 pt-16 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <p className="m-0 mb-4 text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase">
              {kicker}
            </p>
            <h1 className="font-serif text-5xl md:text-[7rem] leading-[1.05] tracking-tight mb-16 md:mb-24">
              {title}
            </h1>

            {currentPage === 'home' && <HomeView setPage={setCurrentPage} />}
            {currentPage === 'origins' && <OriginsView />}
            {currentPage === 'products' && <ProductsView />}
            {currentPage === 'story' && <StoryView />}
            {currentPage === 'quality' && <QualityView />}
            {currentPage === 'impact' && <ImpactView />}
            {currentPage === 'about' && <AboutView />}
            
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function HomeView({ setPage }) {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
        <div>
          <FadeIn>
            <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-6">乡村振兴 · 数字助农</p>
            <h2 className="font-serif text-4xl lg:text-6xl leading-[1.15] mb-8">把山野里的好东西，<br/>带到更多人的餐桌。</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-[600px] mb-12 leading-relaxed">
              乡野共富精选来自秦岭、云岭、武夷与塞上的农产品，用稳定的品质、清晰的产地故事和温暖的品牌表达，
              让每一份山野好物都被认真看见。
            </p>
            <div className="flex flex-wrap gap-5">
              <button onClick={() => setPage('products')} className="h-14 px-10 bg-[var(--text-main)] text-white text-sm tracking-[1.5px] uppercase hover:bg-[var(--accent)] transition-colors">
                探索产品
              </button>
              <button onClick={() => setPage('origins')} className="h-14 px-10 border border-[var(--line-dark)] text-[var(--text-main)] text-sm tracking-[1.5px] uppercase hover:border-[var(--text-main)] transition-colors">
                查看产地
              </button>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.2}>
          <div className="w-full aspect-[4/5] bg-[var(--bg-alt)] overflow-hidden group">
             <img src="/assets/images/R.png" alt="山野好物" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
          </div>
        </FadeIn>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[var(--line)] border border-[var(--line)] mb-32">
        <ImageSlot title="产地实景图" label="秦岭果园" image="/assets/images/R.png" />
        <ImageSlot title="农产品特写" label="山野好物" image="/assets/images/product-still-life.png" />
        <ImageSlot title="合作社劳作图" label="分拣现场" image="/assets/images/cooperative-work.png" />
      </section>

      <section className="pt-20 border-t border-[var(--line)]">
        <FadeIn>
          <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">3 Reasons</p>
          <h2 className="font-serif text-3xl lg:text-5xl mb-16">选择乡野共富的三个理由</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            ["真实产地", "每个产品都有清晰产区、合作方和采收故事。"],
            ["稳定品质", "从采摘、分拣、包装到发货，建立统一的品质标准。"],
            ["温暖共富", "让优质农货获得更稳定的市场，也让消费者买得安心。"]
          ].map(([t, desc], i) => (
            <FadeIn key={i} delay={i * 0.1} className="flex flex-col">
              <span className="font-sans text-sm font-medium border-b border-[var(--line-dark)] pb-3 mb-6">0{i + 1}.</span>
              <h3 className="font-serif text-2xl mb-4">{t}</h3>
              <p className="text-[var(--text-muted)] text-[15px] leading-relaxed">{desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}

function OriginsView() {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center pt-20 border-t border-[var(--line)]">
        <FadeIn>
          <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">Selected Origins</p>
          <h2 className="font-serif text-3xl lg:text-5xl mb-8">从产地开始建立信任</h2>
          <p className="text-lg text-[var(--text-muted)] max-w-[600px] leading-relaxed">
            我们把页面的主角交给真实乡村：山地、梯田、竹林、合作社和采收现场，共同组成品牌的第一层可信度。
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <ImageSlot title="产地分布图" label="四大产区" image="/assets/images/origin-map.png" aspect="aspect-[16/9]" />
        </FadeIn>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
        {originsData.map(([place, product, text, label, image], i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <ImageSlot title={label} label={place} image={image} aspect="aspect-[4/5] mb-8" />
            <h3 className="font-serif text-2xl mb-3">{product}</h3>
            <p className="text-[var(--text-muted)] text-[15px] leading-relaxed">{text}</p>
          </FadeIn>
        ))}
      </section>
    </>
  );
}

function ProductsView() {
  return (
    <>
      <section className="pt-20 border-t border-[var(--line)]">
        <FadeIn>
          <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">Product Family</p>
          <h2 className="font-serif text-3xl lg:text-5xl mb-8">四类山野好物，覆盖日常餐桌与节礼场景。</h2>
        </FadeIn>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[var(--line)] border border-[var(--line)] mt-16">
        {productsData.map(([name, desc, label, image], i) => (
          <FadeIn key={i} delay={i * 0.1} className="bg-[var(--bg)] p-10 flex flex-col hover:bg-[var(--bg-alt)] transition-colors">
            <div className="w-full aspect-square bg-[var(--bg-alt)] mb-8 flex items-center justify-center relative overflow-hidden group">
              <img src={image} alt={name} className="w-[80%] h-[80%] object-contain transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <span className="absolute top-4 left-4 text-[10px] tracking-[1px] uppercase border border-[var(--line-dark)] px-3 py-1 rounded-full bg-[var(--bg)]">
                {label}
              </span>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-2">{name}</h3>
              <p className="text-sm text-[var(--text-muted)]">{desc}</p>
            </div>
          </FadeIn>
        ))}
      </section>
    </>
  );
}

function StoryView() {
  const stories = [
    ["返乡青年直播助农", "宁夏中宁", "青年团队把采摘、筛选、压榨过程拍成短片，让用户看见真实产地，也让合作社订单更稳定。"],
    ["妇女创业队共建竹乡品牌", "福建武夷山", "村民把传统晒笋工艺整理成标准流程，用统一包装和稳定品控提升山货信任度。"],
    ["梯田红米走向城市餐桌", "云南元阳", "产地地图、四季耕作和农户介绍被放进品牌叙事里，让消费者理解生态种植背后的劳动价值。"]
  ];
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center pt-20 border-t border-[var(--line)]">
        <FadeIn>
          <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">Village Stories</p>
          <h2 className="font-serif text-3xl lg:text-5xl mb-8">好产品背后，是一群认真生活的人。</h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <ImageSlot title="产地故事图" label="直播助农" image="/assets/images/village-story.png" aspect="aspect-[16/9]" />
        </FadeIn>
      </section>
      <section className="mt-20 flex flex-col">
        {stories.map(([title, place, text], i) => (
          <FadeIn key={i} delay={i * 0.1} className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-10 py-16 border-t border-[var(--line)] last:border-b">
            <span className="font-serif text-3xl md:text-4xl text-[var(--text-muted)]">0{i + 1}</span>
            <div>
              <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">{place}</p>
              <h3 className="font-serif text-3xl mb-4">{title}</h3>
              <p className="text-base text-[var(--text-muted)] max-w-[700px] leading-relaxed">{text}</p>
            </div>
          </FadeIn>
        ))}
      </section>
    </>
  );
}

function QualityView() {
  const points = [
    ["产地筛选", "优先选择有稳定合作基础的产区。"],
    ["分级包装", "按成熟度、外观和规格建立分拣标准。"],
    ["冷链发货", "鲜食产品优先使用冷链或时效物流。"],
    ["售后承诺", "明确坏果、破损、延误等处理规则。"]
  ];
  return (
    <section className="pt-20 border-t border-[var(--line)]">
      <FadeIn>
        <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">Quality System</p>
        <h2 className="font-serif text-3xl lg:text-5xl mb-16">从山野到餐桌，每一步都要清楚、稳定、可信。</h2>
      </FadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {points.map(([t, desc], i) => (
          <FadeIn key={i} delay={i * 0.1} className="border-t-2 border-[var(--text-main)] pt-6">
            <h3 className="font-serif text-xl mb-4">{t}</h3>
            <p className="text-[var(--text-muted)] text-[15px] leading-relaxed">{desc}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ImpactView() {
  const metrics = [
    ["36", "合作社产地"],
    ["128", "本周内容产出"],
    ["18.6k", "公益订单转化"],
    ["37%", "用户复购率"]
  ];
  return (
    <>
      <section className="pt-20 border-t border-[var(--line)]">
        <FadeIn>
          <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">Shared Prosperity</p>
          <h2 className="font-serif text-3xl lg:text-5xl mb-8">让助农成效被看见，也让每次购买更有方向。</h2>
        </FadeIn>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[var(--line)] border border-[var(--line)] mt-16">
        {metrics.map(([val, label], i) => (
          <FadeIn key={i} delay={i * 0.1} className="bg-[var(--bg)] p-16 flex flex-col items-center justify-center text-center">
            <strong className="font-serif text-5xl lg:text-[4rem] font-normal mb-4">{val}</strong>
            <span className="text-[13px] text-[var(--text-muted)] tracking-[1px] uppercase">{label}</span>
          </FadeIn>
        ))}
      </section>
    </>
  );
}

function AboutView() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center pt-20 border-t border-[var(--line)]">
      <FadeIn>
        <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">About Xiangye</p>
        <h2 className="font-serif text-3xl lg:text-5xl mb-8">乡野共富，不只是卖农货，而是重新讲述产地价值。</h2>
        <p className="text-lg text-[var(--text-muted)] max-w-[600px] leading-relaxed">
          我们希望用更清晰的品牌页面，把产地、产品、人物和品质标准组织起来，让消费者愿意了解、愿意选择，也愿意长期支持。
        </p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <ImageSlot title="品牌形象图" label="乡野共富" image="/assets/images/brand-still-life.png" aspect="aspect-[4/5]" />
      </FadeIn>
    </section>
  );
}
