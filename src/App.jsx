import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Leaf, MapPin, Package, BookOpen, ShieldCheck, TrendingUp, Info } from 'lucide-react';

const storeKey = "rural-brand-gallery-v3";

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
    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white flex flex-col z-10">
      <span className="text-[11px] tracking-[2px] uppercase opacity-80 mb-2">{label}</span>
      <strong className="font-serif text-2xl font-normal">{title}</strong>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
  </div>
);

const ScrollIndicator = () => (
  <motion.div 
    animate={{ y: [0, 10, 0] }} 
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
    className="absolute bottom-10 left-6 md:left-20 flex flex-col items-center opacity-50 z-10"
  >
    <span className="text-[10px] uppercase tracking-[2px] mb-2 font-sans rotate-90 origin-left ml-4">Scroll</span>
    <div className="w-[1px] h-12 bg-[var(--text-main)]"></div>
  </motion.div>
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
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] mb-12 leading-relaxed">
                乡野共富精选来自秦岭、云岭、武夷与塞上的农产品，用稳定的品质、清晰的产地故事和温暖的品牌表达，
                让每一份山野好物都被认真看见。这不仅仅是一次购买，更是一次与大地的深度连接。
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
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[75vh]">
            <div className="w-full h-full bg-[var(--bg-alt)] overflow-hidden group">
               <img src="./assets/images/R.png" alt="山野好物" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
            </div>
          </FadeIn>
        </div>
        <ScrollIndicator />
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
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] leading-relaxed">
                我们把页面的主角交给真实乡村：山地、梯田、竹林、合作社和采收现场，共同组成品牌的第一层可信度。跨越经纬度，只为寻觅最纯粹的自然馈赠。
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[70vh]">
            <ImageSlot title="四大产区" label="产区分布" image="./assets/images/origin-map.png" aspect="h-full" />
          </FadeIn>
        </div>
        <ScrollIndicator />
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
               <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] leading-relaxed">
                 四类山野好物，覆盖日常餐桌与节礼场景。以自然之名，甄选每一份食材。不论是送礼还是自留，都能感受到大山深处的质朴与诚意。
               </p>
             </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[70vh]">
            <ImageSlot title="四时佳果" label="当季热销" image="./assets/images/product-still-life.png" aspect="h-full" />
          </FadeIn>
        </div>
        <ScrollIndicator />
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
                <button className="self-start mt-auto flex items-center gap-2 text-sm uppercase tracking-[1px] font-medium hover:text-[var(--text-muted)] transition-colors">
                  <span>了解详情</span>
                  <div className="w-6 h-[1px] bg-current transition-all group-hover:w-10"></div>
                </button>
              </div>
            </FadeIn>
          ))}
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
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] leading-relaxed">
                好产品背后，是一群认真生活的人。我们倾听土地的声音，也倾听农人的心声。每一个村落，都有属于自己的传奇。
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[70vh]">
            <ImageSlot title="直播助农" label="产地纪实" image="./assets/images/village-story.png" aspect="h-full" />
          </FadeIn>
        </div>
        <ScrollIndicator />
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
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] leading-relaxed">
                从山野到餐桌，每一步都要清楚、稳定、可信。我们建立了一套涵盖全链路的品控体系，用数据和标准捍卫自然本味。
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[70vh]">
             <ImageSlot title="严选标准" label="品控现场" image="./assets/images/cooperative-work.png" aspect="h-full" />
          </FadeIn>
        </div>
        <ScrollIndicator />
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
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] leading-relaxed">
                让助农成效被看见，也让每次购买更有方向。商业不仅是交易，更是创造社会价值的引擎。
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[70vh]">
            <ImageSlot title="乡村笑脸" label="共富纪实" image="./assets/images/R.png" aspect="h-full" />
          </FadeIn>
        </div>
        <ScrollIndicator />
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
              <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-[600px] leading-relaxed">
                乡野共富，不只是卖农货，而是重新讲述产地价值。我们希望通过数字化的品牌建设，打破城乡之间的信息壁垒。
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="w-full h-[50vh] lg:h-[70vh]">
            <ImageSlot title="品牌愿景" label="乡野印象" image="./assets/images/brand-still-life.png" aspect="h-full" />
          </FadeIn>
        </div>
        <ScrollIndicator />
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
      </div>
    </>
  );
}
