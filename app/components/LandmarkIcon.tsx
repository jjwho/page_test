/** 字元對應 Sweetie 16 調色盤，「.」代表透明 */
const PALETTE: Record<string, string> = {
  k: "#1a1c2c", // ink
  p: "#5d275d", // plum
  r: "#b13e53", // red
  o: "#ef7d57", // orange
  y: "#ffcd75", // yellow
  l: "#a7f070", // lime
  g: "#38b764", // green
  G: "#257179", // teal
  B: "#3b5dc9", // blue
  c: "#73eff7", // cyan
  w: "#f4f4f4", // white
  s: "#94b0c2", // silver
  S: "#566c86", // slate
};

type Landmark = { label: string; rows: string[] };

/** 每張圖都是 16×16 的點陣，一個字元就是一格像素 */
const LANDMARKS: Record<string, Landmark> = {
  // 西門紅樓：八角形紅磚樓、白色腰線與拱窗
  ximending: {
    label: "像素風的西門紅樓",
    rows: [
      "................",
      ".......kk.......",
      "......kyyk......",
      ".....kkkkkk.....",
      "....kSssssSk....",
      "...kSssssssSk...",
      "..kkkkkkkkkkkk..",
      "..kwwwwwwwwwwk..",
      "..krrrrrrrrrrk..",
      "..krkkrrrrkkrk..",
      "..kryyrrrryyrk..",
      "..kryyrrrryyrk..",
      "..kwwwwwwwwwwk..",
      "..krrrrkkrrrrk..",
      "..krrrkyykrrrk..",
      "kkkkkkkkkkkkkkkk",
    ],
  },
  // 夜市攤位：紅白遮雨棚、燈籠、雞排與珍奶
  shilin: {
    label: "像素風的夜市攤位，有雞排和珍珠奶茶",
    rows: [
      "................",
      "..kkkkkkkkkkkk..",
      ".krwrwrwrwrwrwk.",
      "kwrwrwrwrwrwrwrk",
      "kkkkkkkkkkkkkkkk",
      ".k.kk......k..k.",
      ".k.rr......k..k.",
      ".k.kk....kkkk.k.",
      ".k..kkkk.kook.k.",
      ".k.koyoykkook.k.",
      ".k.kyoyokkkok.k.",
      ".k..kkkk.kkkk.k.",
      "kkkkkkkkkkkkkkkk",
      "krrrrrrrrrrrrrrk",
      "krrrrrrrrrrrrrrk",
      "kkkkkkkkkkkkkkkk",
    ],
  },
  // 火山與花季：山頂冒著硫磺白煙，山腳開滿花
  yangmingshan: {
    label: "像素風的陽明山，山頂冒煙、山腳開花",
    rows: [
      "................",
      ".........w......",
      "........w.w.....",
      ".........w......",
      ".......kkk......",
      "......klggk.....",
      ".....klggggk....",
      "....klggggggk...",
      "...klggggggggk..",
      "..klggggggggggk.",
      ".klggggggggggggk",
      "klgggggggggggggk",
      "kgrgygrggyggrggk",
      "kgygrgggrgygrggk",
      "kggggggggggggggk",
      "kkkkkkkkkkkkkkkk",
    ],
  },
  // 溫泉池：石頭圍起的池子，熱氣往上飄
  beitou: {
    label: "像素風的北投溫泉池，冒著熱氣",
    rows: [
      "................",
      "....w...w...w...",
      "...w...w...w....",
      "...w...w...w....",
      "....w...w...w...",
      "....w...w...w...",
      "...w...w...w....",
      "................",
      "....kkkkkkkk....",
      "..kkSssSSssSkk..",
      ".kSsccccccccsSk.",
      "kSsBccwcccBccsSk",
      "kSsBBccccBBccsSk",
      ".kSsBBBBBBBBsSk.",
      "..kkSSssssSSkk..",
      "....kkkkkkkk....",
    ],
  },
};

type Rect = { x: number; y: number; w: number; fill: string };

/** 把同一列連續同色的格子併成一個長方形，減少 SVG 元素數量 */
function toRects(rows: string[]): Rect[] {
  const rects: Rect[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === ch) end++;
      if (ch !== ".") rects.push({ x, y, w: end - x, fill: PALETTE[ch] });
      x = end;
    }
  });
  return rects;
}

export default function LandmarkIcon({ id, className }: { id: string; className?: string }) {
  const landmark = LANDMARKS[id];
  if (!landmark) return null;
  return (
    <svg
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={className}
      role="img"
      aria-label={landmark.label}
    >
      {toRects(landmark.rows).map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
}
