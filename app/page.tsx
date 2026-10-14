import Header from "./components/Header";
import Footer from "./components/Footer";
import Parallax from "./components/Parallax";
import PixelSprite from "./components/PixelSprite";
import Taipei101 from "./components/Taipei101";

type Spot = {
  id: string;
  stage: string;
  name: string;
  en: string;
  description: string;
  pokemon: { name: string; src: string };
  bg: string;
  ground: [string, string];
  accent: string;
  speed: number;
};

const spots: Spot[] = [
  {
    id: "ximending",
    stage: "01",
    name: "西門町",
    en: "XIMENDING",
    description: "台北的潮流心臟，街頭表演與小吃林立，假日總是熱鬧滾滾、充滿活力。",
    pokemon: { name: "皮卡丘", src: "/images/pikachu.png" },
    bg: "bg-px-navy",
    ground: ["#566c86", "#333c57"],
    accent: "text-px-yellow",
    speed: 0.25,
  },
  {
    id: "shilin",
    stage: "02",
    name: "士林夜市",
    en: "SHILIN NIGHT MARKET",
    description: "台北最大夜市，雞排、蚵仔煎與珍奶吃不停，連卡比獸都吃到睡著。",
    pokemon: { name: "卡比獸", src: "/images/snorlax.png" },
    bg: "bg-px-plum",
    ground: ["#b13e53", "#5d275d"],
    accent: "text-px-orange",
    speed: 0.2,
  },
  {
    id: "yangmingshan",
    stage: "03",
    name: "陽明山",
    en: "YANGMINGSHAN",
    description: "火山地形孕育的國家公園，春天花季繽紛，乘著快龍俯瞰整片台北盆地。",
    pokemon: { name: "快龍", src: "/images/dragonite.png" },
    bg: "bg-px-teal",
    ground: ["#38b764", "#257179"],
    accent: "text-px-lime",
    speed: 0.35,
  },
  {
    id: "beitou",
    stage: "04",
    name: "北投溫泉",
    en: "BEITOU HOT SPRING",
    description: "日治時期留下的溫泉鄉，地熱谷白煙裊裊，泡完湯整個人都暖呼呼。",
    pokemon: { name: "傑尼龜", src: "/images/squirtle.png" },
    bg: "bg-px-steel",
    ground: ["#3b5dc9", "#29366f"],
    accent: "text-px-cyan",
    speed: 0.25,
  },
];

// 固定位置的星星，避免伺服器與瀏覽器渲染結果不同
const stars = [
  [6, 12], [14, 30], [22, 8], [31, 22], [40, 14], [48, 34], [57, 6], [64, 26],
  [72, 10], [80, 32], [88, 16], [94, 6], [10, 48], [36, 44], [68, 46], [90, 50],
];

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-64px)] flex-col overflow-hidden bg-gradient-to-b from-px-ink via-px-navy to-px-blue"
    >
      <Parallax speed={-0.4} className="pointer-events-none absolute inset-0">
        <div className="relative h-[120svh]">
          {stars.map(([x, y], i) => (
            <span
              key={i}
              className="animate-twinkle absolute block h-1 w-1 bg-px-white"
              style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 4) * 0.5}s` }}
            />
          ))}
          <svg
            viewBox="0 0 8 8"
            shapeRendering="crispEdges"
            aria-hidden
            className="absolute right-[12%] top-[10%] h-12 w-12 md:h-16 md:w-16"
          >
            <path d="M2 0h4v1h1v1h1v4h-1v1h-1v1h-4v-1h-1v-1h-1v-4h1v-1h1z" fill="#ffcd75" />
            <rect x="2" y="2" width="1" height="1" fill="#ef7d57" />
            <rect x="5" y="3" width="1" height="1" fill="#ef7d57" />
            <rect x="3" y="5" width="1" height="1" fill="#ef7d57" />
          </svg>
        </div>
      </Parallax>

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-end gap-8 px-4 pt-12 md:grid-cols-2">
        <div className="self-center pb-8 md:pb-24">
          <p className="mb-3 text-sm text-px-cyan">STAGE 00 · TAIPEI 101</p>
          <h1 className="text-4xl leading-tight text-px-white md:text-6xl">
            台北像素
            <br />
            <span className="text-px-yellow">大冒險</span>
          </h1>
          <p className="mt-6 max-w-md leading-relaxed text-px-silver">
            超夢降臨在台北 101 的頂端！跟著寶可夢一起出發，闖關台北四大人氣景點。
          </p>
          <a
            href="#ximending"
            className="pixel-btn mt-8 inline-block bg-px-red px-6 py-3 text-px-white hover:bg-px-orange"
          >
            ▶ PRESS START<span className="animate-blink">_</span>
          </a>
        </div>

        <div className="relative flex h-[420px] items-end justify-center md:h-[560px]">
          <Parallax speed={-0.15} className="h-full">
            <Taipei101 className="h-[420px] w-auto md:h-[560px]" />
          </Parallax>
          <Parallax speed={0.35} className="absolute right-0 top-4 md:right-4 md:top-8">
            <div className="animate-bob">
              <PixelSprite
                src="/images/mewtwo.png"
                alt="超夢"
                resolution={48}
                className="h-40 w-40 md:h-56 md:w-56"
              />
            </div>
          </Parallax>
        </div>
      </div>

      <div
        className="pixel-ground relative"
        style={{ "--ground-a": "#333c57", "--ground-b": "#1a1c2c" } as React.CSSProperties}
      />
    </section>
  );
}

function SpotSection({ spot, index }: { spot: Spot; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <section
      id={spot.id}
      aria-labelledby={`${spot.id}-title`}
      className={`relative overflow-hidden ${spot.bg}`}
    >
      <div
        className={`mx-auto flex min-h-[80svh] max-w-6xl flex-col items-center justify-center gap-10 px-4 py-20 md:flex-row md:gap-16 ${
          reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        <Parallax speed={spot.speed} className="shrink-0">
          <div className="animate-bob" style={{ animationDelay: `${index * 0.3}s` }}>
            <PixelSprite
              src={spot.pokemon.src}
              alt={spot.pokemon.name}
              resolution={40}
              className="h-48 w-48 md:h-64 md:w-64"
            />
          </div>
        </Parallax>

        <article className="pixel-box w-full max-w-xl p-6 md:p-8">
          <p className={`mb-2 inline-block bg-px-ink px-2 py-1 text-xs ${spot.accent}`}>
            STAGE {spot.stage}
          </p>
          <h2 id={`${spot.id}-title`} className="text-3xl md:text-4xl">
            {spot.name}
          </h2>
          <p className="mt-1 text-xs tracking-widest text-px-slate">{spot.en}</p>
          <p className="mt-5 text-lg leading-relaxed">{spot.description}</p>
          <p className="mt-6 border-t-4 border-dashed border-px-silver pt-4 text-sm text-px-red">
            ▶ 野生的{spot.pokemon.name}出現了！
          </p>
        </article>
      </div>

      <div
        className="pixel-ground"
        style={{ "--ground-a": spot.ground[0], "--ground-b": spot.ground[1] } as React.CSSProperties}
      />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        {spots.map((spot, i) => (
          <SpotSection key={spot.id} spot={spot} index={i} />
        ))}
      </main>
      <Footer />
    </>
  );
}
