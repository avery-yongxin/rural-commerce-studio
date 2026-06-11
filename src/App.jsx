import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Leaf, MapPin, Package, BookOpen, ShieldCheck, TrendingUp, Info } from 'lucide-react';

const storeKey = "rural-brand-gallery-v4";

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
  ["秦岭周至", "山地猕猴桃", "北纬 34° 的昼夜温差，让果香更集中。富含维生素C，酸甜适口，肉质细嫩。", "果园风貌", "./assets/images/qinling-kiwi.png"],
  ["元阳梯田", "高山红米", "梯田水系与传统耕作保留谷物本味。红米含有丰富的微量元素，米香浓郁，口感扎实。", "梯田俯瞰", "./assets/images/yuanyang-rice.png"],
  ["武夷竹乡", "生态笋干", "日晒风干，脆嫩耐煮，带着山林清香。采用传统工艺，不添加任何防腐剂，保留自然纯粹。", "竹林采收", "./assets/images/wuyi-bamboo.png"],
  ["宁夏中宁", "塞上枸杞", "黄河水灌溉，光照充足，果实饱满，药食同源。鲜果原浆零添加，保留枸杞完整营养。", "枸杞基地", "./assets/images/R.png"]
];

const productsData = [
  ["秦岭山地猕猴桃", "自然成熟 / 酸甜均衡", "Fresh Fruit", "./assets/images/qinling_zhonghua_mihoutao.png", "在树上自然熟成到最佳甜度，手工采摘。每颗果实都经过严格的外观和糖度筛选。"],
  ["云岭高山红米", "梯田种植 / 米香扎实", "Grain", "./assets/images/hongmi.png", "源自世界文化遗产哈尼梯田，引山泉水灌溉，一年仅一季，产量稀少。"],
  ["闽北生态笋干", "日晒风干 / 脆嫩耐煮", "Bamboo Shoot", "./assets/images/sungan.png", "精选春季新笋，古法炭焙，自然日晒。泡发后肉质肥厚，是炖汤炒菜的绝佳搭档。"],
  ["塞上枸杞原浆", "鲜果压榨 / 配料干净", "Goji Drink", "./assets/images/gouqiyuanjiang.jpg", "采摘后6小时内物理冷榨，不加一滴水，百分百纯果浆，锁住新鲜营养。"]
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

const ImageSlot = ({ title, label, image, aspect = "aspect-[3/4]", objectFit = "object-cover", className="" }) => (
  <div className={`relative overflow-hidden bg-[var(--bg-alt)] ${aspect} ${className} group`}>
    {image && (
      <img 
        src={image} 
        alt={title} 
        className={`w-full h-full ${objectFit} transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105`}
        loading="lazy"
      />
    )}
    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white flex flex-col z-10 pointer-events-none">
      <span className="text-[11px] tracking-[2px] uppercase opacity-80 mb-2">{label}</span>
      <strong className="font-serif text-2xl font-normal">{title}</strong>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
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

      <main className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
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
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 md:px-20 max-w-[1600px] mx-auto py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="z-10">
            <FadeIn>
              <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-6">乡村振兴 · 数字助农</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[1.2] mb-8">
                <span className="whitespace-nowrap">把山野里的好东西，</span><br/>
                <span className="whitespace-nowrap">带到更多人的餐桌。</span>
              </h2>
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] mb-8 leading-relaxed">
                乡野共富精选来自秦岭、云岭、武夷与塞上的农产品，用稳定的品质、清晰的产地故事和温暖的品牌表达，让每一份山野好物都被认真看见。这不仅仅是一次购买，更是一次与大地的深度连接。
              </p>
              <div className="bg-[var(--bg-alt)] p-6 mb-12 max-w-[600px] border-l-2 border-[var(--line-dark)]">
                <strong className="block text-sm mb-2 font-serif">当季推荐：秦岭高山猕猴桃与武夷鲜竹笋</strong>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  新鲜下架，从枝头到舌尖不超过72小时。我们联合当地数十个核心合作社，去除所有中间环节，将大自然最真实的馈赠直达您的餐桌，让健康与美味不再奢侈。
                </p>
              </div>
              <div className="flex flex-wrap gap-5">
                <button onClick={() => setPage('products')} className="h-14 px-10 bg-[var(--text-main)] text-white text-sm tracking-[1.5px] uppercase hover:bg-[var(--accent)] transition-colors">
                  探索产品
                </button>
                <button onClick={() => setPage('origins')} className="h-14 px-10 border border-[var(--line-dark)] text-[var(--text-main)] text-sm tracking-[1.5px] uppercase hover:border-[var(--text-main)] transition-colors">
                  查看产地
                </button>
              </div>
              <div className="mt-16 flex gap-10 pt-10 border-t border-[var(--line)]">
                <div><strong className="block font-serif text-3xl mb-1">4</strong><span className="text-xs text-[var(--text-muted)] uppercase tracking-[1px]">核心产区</span></div>
                <div><strong className="block font-serif text-3xl mb-1">36+</strong><span className="text-xs text-[var(--text-muted)] uppercase tracking-[1px]">合作村落</span></div>
                <div><strong className="block font-serif text-3xl mb-1">100%</strong><span className="text-xs text-[var(--text-muted)] uppercase tracking-[1px]">产地直发</span></div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[75vh]">
            <div className="w-full h-full bg-[var(--bg-alt)] overflow-hidden group">
               <img src="./assets/images/R.png" alt="山野好物" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
            </div>
          </FadeIn>
        </div>
        
      </section>

      <div className="px-6 md:px-20 max-w-[1600px] mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[var(--line)] border border-[var(--line)] mb-32">
          <ImageSlot title="产地原貌" label="秦岭果园" image="./assets/images/R.png" />
          <ImageSlot title="农产品展示" label="山野好物" image="./assets/images/product-still-life.png" />
          <ImageSlot title="合作社日常" label="分拣现场" image="./assets/images/cooperative-work.png" />
        </section>

        <section className="pt-20 border-t border-[var(--line)] pb-32">
          <FadeIn>
            <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">3 Reasons</p>
            <h2 className="font-serif text-3xl lg:text-5xl mb-16">选择乡野共富的三个理由</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              ["真实产地", "每个产品都有清晰产区、合作方和采收故事。我们深入大山，直接与农户建立联系，确保源头可追溯。"],
              ["稳定品质", "从采摘、分拣、包装到发货，建立统一的品质标准。拒绝以次充好，坚持高标准品控体系。"],
              ["温暖共富", "让优质农货获得更稳定的市场，也让消费者买得安心。每一笔订单，都在为乡村振兴贡献一份力量。"]
            ].map(([t, desc], i) => (
              <FadeIn key={i} delay={i * 0.1} className="flex flex-col">
                <span className="font-sans text-sm font-medium border-b border-[var(--line-dark)] pb-3 mb-6">0{i + 1}.</span>
                <h3 className="font-serif text-2xl mb-4">{t}</h3>
                <p className="text-[var(--text-muted)] text-[15px] leading-relaxed">{desc}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="pt-20 border-t border-[var(--line)] pb-32">
          <FadeIn>
            <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">Voice of Customers</p>
            <h2 className="font-serif text-3xl lg:text-5xl mb-16">来自餐桌的真实反馈</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              ["张女士 / 深圳", "一直在寻找有小时候味道的红米，乡野共富的元阳红米煮出来的饭又香又弹，家里老人都说好。"],
              ["王先生 / 北京", "猕猴桃包装得非常用心，收到的时候没有一颗坏果，酸甜度刚好，已经推荐给同事了。"],
              ["李女士 / 上海", "看了产地故事之后买的武夷笋干，能吃出来是没有硫熏过的自然味道，炖肉特别解腻。"],
              ["刘先生 / 杭州", "枸杞原浆配料表很干净，每天早上喝一包，感觉精神状态好了很多，支持真实助农产品！"]
            ].map(([author, quote], i) => (
              <FadeIn key={i} delay={i * 0.1} className="bg-[var(--bg-alt)] p-8 relative">
                <div className="text-4xl font-serif text-[var(--line-dark)] absolute top-6 left-6">"</div>
                <p className="text-[var(--text-muted)] text-[15px] leading-relaxed relative z-10 mt-6 mb-8">{quote}</p>
                <div className="font-sans text-sm font-medium pt-4 border-t border-[var(--line-dark)]">{author}</div>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function OriginsView() {
  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 md:px-20 max-w-[1600px] mx-auto py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
          <div className="z-10">
            <FadeIn>
              <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">Selected Origins</p>
              <h1 className="font-serif text-5xl md:text-[6rem] leading-[1.05] tracking-tight mb-8">产地精选</h1>
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] leading-relaxed mb-8">
                我们把页面的主角交给真实乡村：山地、梯田、竹林、合作社和采收现场，共同组成品牌的第一层可信度。跨越经纬度，只为寻觅最纯粹的自然馈赠。
              </p>
              <div className="flex gap-4 mb-12">
                <img src="./assets/images/wuyi-bamboo.png" className="w-24 h-24 object-cover border border-[var(--line)]" alt="产区"/>
                <img src="./assets/images/yuanyang-rice.png" className="w-24 h-24 object-cover border border-[var(--line)]" alt="产区"/>
                <img src="./assets/images/qinling-kiwi.png" className="w-24 h-24 object-cover border border-[var(--line)]" alt="产区"/>
              </div>
              <div className="mt-12 flex flex-col gap-4">
                <div className="flex items-center gap-3"><MapPin size={18} className="text-[var(--text-main)]"/> <span className="text-[var(--text-muted)]">跨越北纬21°至39°的核心农业带</span></div>
                <div className="flex items-center gap-3"><MapPin size={18} className="text-[var(--text-main)]"/> <span className="text-[var(--text-muted)]">坚持原产地直采，拒绝异地贴牌</span></div>
                <div className="flex items-center gap-3"><MapPin size={18} className="text-[var(--text-main)]"/> <span className="text-[var(--text-muted)]">全程冷链与产地直发，新鲜触达</span></div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full">
            <div className="relative overflow-hidden group">
              <img 
                src="./assets/images/origin-map.png" 
                alt="四大产区" 
                className="w-full h-auto transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white flex flex-col z-10 pointer-events-none">
                <span className="text-[11px] tracking-[2px] uppercase opacity-80 mb-2">产区分布</span>
                <strong className="font-serif text-2xl font-normal">四大产区</strong>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
            </div>
          </FadeIn>
        </div>
        
      </section>
      
      <div className="px-6 md:px-20 max-w-[1600px] mx-auto pb-32">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20">
          {originsData.map(([place, product, text, label, image], i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <ImageSlot title={label} label={place} image={image} aspect="aspect-[4/5] mb-8" />
              <h3 className="font-serif text-2xl mb-3">{product}</h3>
              <p className="text-[var(--text-muted)] text-[15px] leading-relaxed">{text}</p>
            </FadeIn>
          ))}
        </section>

        <section className="mt-32 pt-20 border-t border-[var(--line)]">
           <FadeIn>
             <h2 className="font-serif text-3xl lg:text-5xl mb-8">为何坚持原产地？</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                  所谓“橘生淮南则为橘，生于淮北则为枳”。不同的土壤、水质、气候和日照，造就了农产品截然不同的风味物质。我们坚持只在核心产区寻找最地道的食材，不妥协于成本和便捷。
                </p>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                  这不仅仅是对食物本味的尊重，更是对世代深耕在这片土地上的农人的敬意。每一份原产地标识，都承载着一段独特的地理密码和人文故事。
                </p>
             </div>
           </FadeIn>
        </section>

        <section className="mt-32 pt-20 border-t border-[var(--line)] pb-32">
           <FadeIn>
             <h2 className="font-serif text-3xl lg:text-5xl mb-16">严苛的产地准入标准</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <h3 className="font-serif text-2xl mb-4 text-[var(--text-main)]">01 / 纯净的自然环境</h3>
                  <p className="text-base text-[var(--text-muted)] leading-relaxed">
                    我们只选择远离工业污染源的偏远山区和传统农业保留地。水源需经过抽样检测，土壤必须富含有机质，确保农产品在最纯净的环境中自然生长。
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-4 text-[var(--text-main)]">02 / 传统的耕作智慧</h3>
                  <p className="text-base text-[var(--text-muted)] leading-relaxed">
                    优先合作保留传统农耕智慧的村落。无论是哈尼族的梯田水系循环，还是武夷山民的顺应节气采收，我们尊重并保护这些生态种植法。
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-4 text-[var(--text-main)]">03 / 可靠的合作纽带</h3>
                  <p className="text-base text-[var(--text-muted)] leading-relaxed">
                    要求产地有组织良好的农民合作社或责任心强的新农人带头。建立利益共享、风险共担的合作机制，保证品控政策的真正落地。
                  </p>
                </div>
             </div>
           </FadeIn>
        </section>
      </div>
    </>
  );
}

function ProductsView() {
  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 md:px-20 max-w-[1600px] mx-auto py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center">
          <div className="z-10">
             <FadeIn>
               <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">Product Family</p>
               <h1 className="font-serif text-5xl md:text-[6rem] leading-[1.05] tracking-tight mb-8">产品矩阵</h1>
               <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] leading-relaxed mb-8">
                 四类山野好物，覆盖日常餐桌与节礼场景。以自然之名，甄选每一份食材。不论是送礼还是自留，都能感受到大山深处的质朴与诚意。
               </p>
               <div className="grid grid-cols-2 gap-6 mb-12 max-w-[600px]">
                 <div><strong className="font-serif block mb-1">0添加</strong><span className="text-sm text-[var(--text-muted)]">拒绝防腐剂与人工色素</span></div>
                 <div><strong className="font-serif block mb-1">应季采收</strong><span className="text-sm text-[var(--text-muted)]">遵循自然规律，过季不候</span></div>
                 <div><strong className="font-serif block mb-1">严选优品</strong><span className="text-sm text-[var(--text-muted)]">仅保留前20%的最优果实</span></div>
                 <div><strong className="font-serif block mb-1">手工打理</strong><span className="text-sm text-[var(--text-muted)]">保留传统农艺温度与匠心</span></div>
               </div>
               <div className="mt-12 flex flex-wrap gap-3">
                 <span className="px-5 py-2 border border-[var(--line-dark)] text-[var(--text-muted)] text-sm rounded-full">四时鲜果</span>
                 <span className="px-5 py-2 border border-[var(--line-dark)] text-[var(--text-muted)] text-sm rounded-full">高山杂粮</span>
                 <span className="px-5 py-2 border border-[var(--line-dark)] text-[var(--text-muted)] text-sm rounded-full">农家干货</span>
                 <span className="px-5 py-2 border border-[var(--line-dark)] text-[var(--text-muted)] text-sm rounded-full">健康轻饮</span>
               </div>
             </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[70vh]">
            <ImageSlot title="四时佳果" label="当季热销" image="./assets/images/product-still-life.png" aspect="h-full" />
          </FadeIn>
        </div>
        
      </section>

      <div className="px-6 md:px-20 max-w-[1600px] mx-auto pb-32">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {productsData.map(([name, desc, label, image, details], i) => (
            <FadeIn key={i} delay={i * 0.1} className="bg-[var(--bg)] border border-[var(--line)] p-8 md:p-12 flex flex-col md:flex-row gap-8 hover:bg-[var(--bg-alt)] transition-colors group">
              <div className="w-full md:w-1/2 aspect-square bg-[var(--bg-alt)] flex items-center justify-center relative overflow-hidden shrink-0">
                <img src={image} alt={name} className="w-[85%] h-[85%] object-contain transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <span className="absolute top-4 left-4 text-[10px] tracking-[1px] uppercase border border-[var(--line-dark)] px-3 py-1 rounded-full bg-[var(--bg)]">
                  {label}
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-serif text-3xl mb-3">{name}</h3>
                <span className="text-[var(--text-main)] font-sans text-sm font-medium mb-6 inline-block bg-[var(--line)] px-3 py-1 rounded-sm w-max">
                  {desc}
                </span>
                <p className="text-base text-[var(--text-muted)] leading-relaxed mb-8">
                  {details}
                </p>
              </div>
            </FadeIn>
          ))}
        </section>

        <section className="mt-32 pt-20 border-t border-[var(--line)] pb-32">
          <FadeIn>
            <h2 className="font-serif text-3xl lg:text-5xl mb-16">融入您的每一个生活场景</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-[var(--line)] p-10 hover:bg-[var(--bg-alt)] transition-colors">
                <h3 className="font-serif text-2xl mb-4">日常餐桌</h3>
                <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                  无论是清晨的一碗红米粥，还是晚餐时的一道笋干炖肉，山野的馈赠为平淡的一日三餐增添最踏实的烟火气。吃得健康，才最安心。
                </p>
                <ul className="text-sm text-[var(--text-muted)] space-y-2 list-disc list-inside">
                  <li>高山红米日常主食</li>
                  <li>生态笋干炖煮佳品</li>
                  <li>天然鲜果维C补充</li>
                </ul>
              </div>
              <div className="border border-[var(--line)] p-10 bg-[var(--bg-alt)] hover:bg-[var(--line)] transition-colors">
                <h3 className="font-serif text-2xl mb-4">节令馈赠</h3>
                <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                  精心设计的环保礼盒包装，既体面又克制。将一份带着泥土芬芳和自然温度的山野好物送给挚爱亲友，是最真诚的健康祝愿。
                </p>
                <ul className="text-sm text-[var(--text-muted)] space-y-2 list-disc list-inside">
                  <li>定制企业员工福利</li>
                  <li>长辈健康滋补礼盒</li>
                  <li>节日限量时令伴手礼</li>
                </ul>
              </div>
              <div className="border border-[var(--line)] p-10 hover:bg-[var(--bg-alt)] transition-colors">
                <h3 className="font-serif text-2xl mb-4">轻养生活</h3>
                <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                  快节奏的现代生活中，一包原汁原味的枸杞原浆，或是几颗自然熟成的猕猴桃，为您提供便捷高效的营养补给，唤醒身体活力。
                </p>
                <ul className="text-sm text-[var(--text-muted)] space-y-2 list-disc list-inside">
                  <li>办公室便捷养生</li>
                  <li>运动后能量恢复</li>
                  <li>熬夜加班护肝明目</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>
    </>
  );
}

function StoryView() {
  const stories = [
    ["返乡青年直播助农", "宁夏中宁", "青年团队把采摘、筛选、压榨过程拍成短片，让用户看见真实产地，也让合作社订单更稳定。他们用镜头记录下枸杞从枝头到瓶中的每一刻，让透明可见的生产过程成为最强大的背书。"],
    ["妇女创业队共建竹乡品牌", "福建武夷山", "村民把传统晒笋工艺整理成标准流程，用统一包装和稳定品控提升山货信任度。妇女们不仅获得了经济独立，更将祖辈流传下来的手艺发扬光大，走出大山。"],
    ["梯田红米走向城市餐桌", "云南元阳", "产地地图、四季耕作和农户介绍被放进品牌叙事里，让消费者理解生态种植背后的劳动价值。哈尼族人世世代代守护的梯田，如今以一碗碗热气腾腾的红米饭，温暖着城市的胃。"],
    ["老果农的新盼头", "陕西周至", "不再盲目追求产量，而是精细化修剪、人工除草。当猕猴桃通过冷链直达千家万户，老李第一次觉得，坚守了三十年的果园，终于迎来了最好的时代。"]
  ];
  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 md:px-20 max-w-[1600px] mx-auto py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
          <div className="z-10">
            <FadeIn>
              <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">Village Stories</p>
              <h1 className="font-serif text-5xl md:text-[6rem] leading-[1.05] tracking-tight mb-8">产地故事</h1>
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] leading-relaxed mb-8">
                好产品背后，是一群认真生活的人。我们倾听土地的声音，也倾听农人的心声。每一个村落，都有属于自己的传奇。
              </p>
              <div className="mb-12 space-y-4 max-w-[600px]">
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">在这个效率至上的时代，仍有很多人选择放慢脚步。他们可能是回到乡村的大学生，可能是世代务农的老把式，也可能是重拾传统手艺的留守妇女。</p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">正是他们的坚守，才让我们在这个飞速运转的世界里，依然能品尝到缓慢生长的、真实的自然之味。</p>
              </div>
              <blockquote className="mt-12 pl-6 border-l-2 border-[var(--text-main)] italic text-[var(--text-muted)] text-lg">
                "脚下沾有多少泥土，心中就沉淀多少真情。我们所记录的，是乡村最真实的脉搏。"
              </blockquote>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[70vh]">
            <ImageSlot title="直播助农" label="产地纪实" image="./assets/images/village-story.png" aspect="h-full" />
          </FadeIn>
        </div>
        
      </section>

      <div className="px-6 md:px-20 max-w-[1600px] mx-auto pb-32">
        <section className="mt-20 flex flex-col">
          {stories.map(([title, place, text], i) => (
            <FadeIn key={i} delay={i * 0.1} className="grid grid-cols-1 md:grid-cols-[80px_1fr] lg:grid-cols-[120px_1fr_1fr] gap-6 md:gap-10 py-16 border-t border-[var(--line)] last:border-b group">
              <span className="font-serif text-3xl md:text-5xl text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-main)]">0{i + 1}</span>
              <div>
                <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2">
                  <MapPin size={14} /> {place}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl mb-4 pr-10">{title}</h3>
              </div>
              <div>
                <p className="text-base text-[var(--text-muted)] leading-relaxed lg:mt-8">{text}</p>
              </div>
            </FadeIn>
          ))}
        </section>

        <section className="mt-20 pt-16 border-t border-[var(--line)] pb-32">
          <FadeIn className="max-w-[800px] mx-auto text-center">
            <div className="w-12 h-[2px] bg-[var(--text-main)] mx-auto mb-10"></div>
            <h2 className="font-serif text-3xl mb-8">农业，始终是关于“人”的事业</h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">
              在机械化和工业化大行其道的今天，我们依然着迷于那些带有“人情味”的农产品。那里面藏着农人对天气的敬畏，对土地的眷恋，以及对手艺的执着。
            </p>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">
              我们记录这些故事，不只是为了营销，更是为了留存一份档案。让城市里的人知道，在遥远的大山深处，有这样一群人，正在用最笨拙也最真诚的方式，守护着我们的餐桌安全。
            </p>
          </FadeIn>
        </section>
      </div>
    </>
  );
}

function QualityView() {
  const points = [
    ["01. 产地筛选", "优先选择有稳定合作基础的产区，实地考察土壤、水源及生态环境，从源头把控品质。"],
    ["02. 采收标准", "严格遵循农事节气，只在农产品风味最佳的窗口期进行人工采摘。"],
    ["03. 分级包装", "引入光电分选设备与人工复检，按成熟度、外观和规格建立严苛的分拣标准。"],
    ["04. 冷链发货", "鲜食产品优先使用冷链或时效物流，确保从枝头到舌尖的新鲜度。"],
    ["05. 抽样检测", "每批次产品均需通过第三方独立实验室的农残及重金属抽样检测。"],
    ["06. 售后承诺", "明确坏果、破损、延误等处理规则，提供闪电理赔，让购买无后顾之忧。"]
  ];
  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 md:px-20 max-w-[1600px] mx-auto py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center">
          <div className="z-10">
            <FadeIn>
              <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">Quality System</p>
              <h1 className="font-serif text-5xl md:text-[6rem] leading-[1.05] tracking-tight mb-8">品质保障</h1>
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] leading-relaxed mb-8">
                从山野到餐桌，每一步都要清楚、稳定、可信。我们建立了一套涵盖全链路的品控体系，用数据和标准捍卫自然本味。
              </p>
              <ul className="mb-12 space-y-3 max-w-[600px] text-[var(--text-muted)] text-sm">
                <li className="flex gap-3 items-start"><div className="w-1.5 h-1.5 rounded-full bg-[var(--text-main)] mt-1.5 shrink-0"></div> <span>所有鲜果采摘后48小时内必须完成分拣、打包与冷链发车，最大程度锁住新鲜。</span></li>
                <li className="flex gap-3 items-start"><div className="w-1.5 h-1.5 rounded-full bg-[var(--text-main)] mt-1.5 shrink-0"></div> <span>干货类产品入库前需接受水分、杂质双重检测，不达标坚决退回。</span></li>
                <li className="flex gap-3 items-start"><div className="w-1.5 h-1.5 rounded-full bg-[var(--text-main)] mt-1.5 shrink-0"></div> <span>设立专属客服通道，遇到任何品质问题，承诺24小时内提供闪电理赔。</span></li>
              </ul>
              <div className="mt-12 flex flex-wrap gap-8">
                <div className="flex flex-col gap-2"><ShieldCheck size={28} className="text-[var(--text-main)]" /><span className="text-sm text-[var(--text-muted)] font-medium">第三方检测</span></div>
                <div className="flex flex-col gap-2"><Leaf size={28} className="text-[var(--text-main)]" /><span className="text-sm text-[var(--text-muted)] font-medium">无农残承诺</span></div>
                <div className="flex flex-col gap-2"><Package size={28} className="text-[var(--text-main)]" /><span className="text-sm text-[var(--text-muted)] font-medium">环保纸包装</span></div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[70vh]">
             <ImageSlot title="严选标准" label="品控现场" image="./assets/images/cooperative-work.png" aspect="h-full" />
          </FadeIn>
        </div>
        
      </section>

      <div className="px-6 md:px-20 max-w-[1600px] mx-auto pb-32">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 mt-20 pt-20 border-t border-[var(--line)]">
          {points.map(([t, desc], i) => (
            <FadeIn key={i} delay={i * 0.1} className="relative pl-6 border-l-2 border-[var(--line-dark)] hover:border-[var(--text-main)] transition-colors">
              <h3 className="font-serif text-2xl mb-4 text-[var(--text-main)]">{t}</h3>
              <p className="text-[var(--text-muted)] text-base leading-relaxed">{desc}</p>
            </FadeIn>
          ))}
        </section>

        <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 pt-20 border-t border-[var(--line)] pb-32">
          <FadeIn>
            <h3 className="font-serif text-3xl mb-6">透明溯源体系</h3>
            <p className="text-[var(--text-muted)] leading-relaxed text-lg mb-4">
              我们深知信任的建立需要打破信息黑盒。每一份发出的山野好物，都配备了专属的溯源码。
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed text-lg">
              扫码即可查看该批次产品的采收时间、分拣负责人、检测报告以及农园的实时日记。我们把所有流程毫无保留地展示在您面前，因为我们相信，真实是最高级的背书。
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h3 className="font-serif text-3xl mb-6">环保包装承诺</h3>
            <p className="text-[var(--text-muted)] leading-relaxed text-lg mb-4">
              取之于自然，也要爱护自然。我们在保证产品运输安全的前提下，实行“过度包装”零容忍。
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed text-lg">
              全面使用FSC认证的环保纸箱、可降解缓冲材料和无毒水性油墨。去掉了不必要的华丽外观，把更多的成本投入到提升农产品本身的品质上。
            </p>
          </FadeIn>
        </section>
      </div>
    </>
  );
}

function ImpactView() {
  const metrics = [
    ["36", "合作社产地", "遍布全国8个省份"],
    ["2,450", "受益农户", "户均增收显著"],
    ["18.6k", "公益订单转化", "让爱心变成实际收益"],
    ["37%", "用户复购率", "品质带来持久信任"]
  ];
  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 md:px-20 max-w-[1600px] mx-auto py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
          <div className="z-10">
            <FadeIn>
              <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">Shared Prosperity</p>
              <h1 className="font-serif text-5xl md:text-[6rem] leading-[1.05] tracking-tight mb-8">共富成效</h1>
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] leading-relaxed mb-8">
                让助农成效被看见，也让每次购买更有方向。商业不仅是交易，更是创造社会价值的引擎。
              </p>
              <div className="flex flex-col gap-4 mb-12">
                 <div className="flex items-center gap-4 border-b border-[var(--line)] pb-4">
                   <div className="text-3xl font-serif text-[var(--text-main)]">15%</div>
                   <div className="text-sm text-[var(--text-muted)] max-w-[300px]">品牌溢价利润，直接返还给源头村集体用于基础设施建设。</div>
                 </div>
                 <div className="flex items-center gap-4 pt-2">
                   <div className="text-3xl font-serif text-[var(--text-main)]">100+</div>
                   <div className="text-sm text-[var(--text-muted)] max-w-[300px]">开展了超过一百场线下原产地培训，传授现代生态农耕知识。</div>
                 </div>
              </div>
              <div className="mt-12 p-6 bg-[var(--bg-alt)] border-l-4 border-[var(--text-main)] max-w-[500px]">
                <strong className="block text-sm text-[var(--text-main)] uppercase tracking-[2px] mb-3">年度里程碑目标</strong>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">帮助新增 50 个偏远村落建立标准化农产品分拣中心，通过产业支持，带动至少 1000 名乡村妇女实现家门口就业。</p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[70vh]">
            <ImageSlot title="乡村笑脸" label="共富纪实" image="./assets/images/smile.png" aspect="h-full" />
          </FadeIn>
        </div>
        
      </section>

      <div className="px-6 md:px-20 max-w-[1600px] mx-auto pb-32">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-[var(--line)] border border-[var(--line)] mt-16">
          {metrics.map(([val, label, sub], i) => (
            <FadeIn key={i} delay={i * 0.1} className="bg-[var(--bg)] p-12 lg:p-16 flex flex-col items-center justify-center text-center hover:bg-[var(--bg-alt)] transition-colors">
              <strong className="font-serif text-6xl lg:text-[5rem] font-normal mb-6 text-[var(--text-main)]">{val}</strong>
              <span className="text-[14px] font-bold text-[var(--text-main)] tracking-[2px] mb-2">{label}</span>
              <span className="text-[12px] text-[var(--text-muted)]">{sub}</span>
            </FadeIn>
          ))}
        </section>

        <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <FadeIn>
             <h2 className="font-serif text-3xl lg:text-4xl mb-6">不仅是数字，更是真切的改变。</h2>
             <p className="text-[var(--text-muted)] leading-relaxed mb-6">
               在过去的一年里，我们不仅帮助了上千个家庭解决了农产品滞销的问题，还通过品牌溢价，让农户真正尝到了“好产品卖好价格”的甜头。
             </p>
             <p className="text-[var(--text-muted)] leading-relaxed">
               越来越多的年轻人愿意回到家乡，加入到合作社中，用新知识、新技术赋能传统农业。乡村，正焕发着前所未有的生机。
             </p>
           </FadeIn>
           <FadeIn delay={0.2} className="h-full min-h-[400px]">
             <ImageSlot title="致富之路" label="乡村振兴" image="./assets/images/village-story.png" aspect="h-full" />
           </FadeIn>
        </section>

        <section className="mt-32 pt-20 border-t border-[var(--line)] pb-32">
          <FadeIn>
            <h2 className="font-serif text-3xl lg:text-5xl mb-16">共富之路，步履不停</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                ["2022.03", "启动“寻源计划”", "建立第一个红米基地，帮助50户农户解决销路问题。"],
                ["2023.08", "品控中心成立", "在原产地建立标准化仓储，将残次率控制在3%以内。"],
                ["2024.11", "突破百村合作", "合作拓展至100个村落，带动逾300名青年返乡创业。"],
                ["2025.05", "发布碳中和倡议", "联合科研机构指导农户采用生态环保的种植方式。"]
              ].map(([date, title, desc], i) => (
                <div key={i} className="border-t-2 border-[var(--text-main)] pt-6">
                  <div className="font-sans text-sm font-bold text-[var(--text-main)] tracking-[1px] mb-4">{date}</div>
                  <h4 className="font-serif text-xl mb-3">{title}</h4>
                  <p className="text-[var(--text-muted)] text-[14px] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      </div>
    </>
  );
}

function AboutView() {
  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 md:px-20 max-w-[1600px] mx-auto py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center">
          <div className="z-10">
            <FadeIn>
              <p className="text-[var(--text-muted)] font-sans text-xs font-medium tracking-[3px] uppercase mb-4">About Xiangye</p>
              <h1 className="font-serif text-5xl md:text-[6rem] leading-[1.05] tracking-tight mb-8">关于我们</h1>
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] leading-relaxed mb-8">
                乡野共富，不只是卖农货，而是重新讲述产地价值。我们希望通过数字化的品牌建设，打破城乡之间的信息壁垒。
              </p>
              <div className="mb-16 grid grid-cols-2 gap-8 max-w-[600px]">
                <div>
                  <h4 className="font-serif text-xl mb-2">我们的初心</h4>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">在这个快餐时代，寻回那些慢工出细活的纯粹美味。</p>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2">团队背景</h4>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">一群厌倦了格子间的都市青年与深耕泥土的农业专家走到了一起。</p>
                </div>
              </div>
              <div className="mt-16">
                <p className="text-xs uppercase tracking-[2px] text-[var(--text-muted)] mb-5">媒体报道与认可</p>
                <div className="flex flex-wrap gap-8 opacity-50 grayscale font-serif text-xl">
                  <span>三联生活周刊</span>
                  <span>人物 PROFILE</span>
                  <span>中国国家地理</span>
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[70vh]">
            <ImageSlot title="品牌愿景" label="乡野印象" image="./assets/images/brand-still-life.png" aspect="h-full" />
          </FadeIn>
        </div>
        
      </section>

      <div className="px-6 md:px-20 max-w-[1600px] mx-auto pb-32">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-20 border-t border-[var(--line)]">
          <FadeIn>
            <h3 className="font-serif text-3xl mb-6">我们的愿景</h3>
            <p className="text-[var(--text-muted)] leading-relaxed text-lg">
              成为连接城市餐桌与中国乡村最值得信赖的桥梁。让每一次消费都成为对美好乡村建设的投票。我们相信，最好的农产品，应该配得上最好的品牌表达。
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h3 className="font-serif text-3xl mb-6">联系我们</h3>
            <ul className="text-[var(--text-muted)] text-lg space-y-4">
              <li className="flex justify-between border-b border-[var(--line-dark)] pb-2">
                <span>商务合作</span>
                <span className="text-[var(--text-main)]">bd@xiangye.com</span>
              </li>
              <li className="flex justify-between border-b border-[var(--line-dark)] pb-2">
                <span>加入我们</span>
                <span className="text-[var(--text-main)]">hr@xiangye.com</span>
              </li>
              <li className="flex justify-between border-b border-[var(--line-dark)] pb-2">
                <span>客服热线</span>
                <span className="text-[var(--text-main)]">400-123-4567</span>
              </li>
            </ul>
          </FadeIn>
        </section>

        <section className="mt-32 pt-20 border-t border-[var(--line)] pb-32">
          <FadeIn className="bg-[var(--bg-alt)] p-12 lg:p-20 relative">
            <div className="text-6xl font-serif text-[var(--line-dark)] absolute top-10 left-10 opacity-50">"</div>
            <div className="max-w-[800px] mx-auto relative z-10 text-center">
              <h2 className="font-serif text-3xl mb-8">创始人寄语</h2>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">
                “做农业是一件需要极大耐心和敬畏心的事情。大自然不遵循互联网的快节奏，果实需要一天天成熟，信任也需要一点点积累。”
              </p>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8">
                “我们创立乡野共富的初衷很简单：把我们在山野里尝到的惊艳味道，原原本本地传递给城市里的朋友们。同时，让那些面朝黄土背朝天的农人们，能够因为他们的辛勤劳作而获得体面的生活。这不仅仅是一门生意，更是一种社会责任。”
              </p>
              <div className="font-sans font-medium text-[var(--text-main)] tracking-[2px] uppercase">
                —— 乡野共富团队
              </div>
            </div>
          </FadeIn>
        </section>
      </div>
    </>
  );
}
