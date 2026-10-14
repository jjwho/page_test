type Rect = { x: number; y: number; w: number; h: number; fill: string };

const GLASS = "#38b764";
const GLASS_LIGHT = "#a7f070";
const GLASS_DARK = "#257179";
const INK = "#1a1c2c";
const WINDOW = "#ffcd75";

/** 以 1 單位 = 1 像素的格子拼出台北 101 */
function buildTower(): Rect[] {
  const rects: Rect[] = [];
  const add = (x: number, y: number, w: number, h: number, fill: string) =>
    rects.push({ x, y, w, h, fill });

  // 底座裙樓
  add(5, 86, 22, 10, INK);
  add(6, 87, 20, 9, GLASS_DARK);
  for (let x = 8; x < 25; x += 3) add(x, 89, 1, 2, WINDOW);
  add(14, 92, 4, 4, INK);

  // 頸部
  add(10, 82, 12, 4, INK);
  add(11, 82, 10, 4, GLASS_DARK);

  // 8 節向外展開的塔身（像竹節、也像倒過來的花斗）
  for (let k = 0; k < 8; k++) {
    const bottom = 82 - k * 8;
    const rows: [number, number][] = [
      [11, 10], [11, 10], [10, 12], [10, 12], [10, 12], [9, 14], [9, 14], [8, 16],
    ];
    rows.forEach(([x, w], r) => {
      const y = bottom - 1 - r;
      add(x - 1, y, w + 2, 1, INK);
      add(x, y, w, 1, GLASS);
      add(x, y, 2, 1, GLASS_LIGHT);
      add(x + w - 2, y, 2, 1, GLASS_DARK);
    });
    // 每節頂端的分隔線與窗光
    add(8, bottom - 8, 16, 1, INK);
    for (let x = 13; x < 19; x += 2) add(x, bottom - 4, 1, 1, WINDOW);
  }

  // 收尖的頂部與天線
  add(12, 10, 8, 8, INK);
  add(13, 10, 6, 8, GLASS);
  add(13, 10, 2, 8, GLASS_LIGHT);
  add(14, 6, 4, 4, INK);
  add(15, 6, 2, 4, GLASS_DARK);
  add(15, 1, 2, 5, "#94b0c2");
  return rects;
}

const tower = buildTower();

export default function Taipei101({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 96"
      shapeRendering="crispEdges"
      className={className}
      role="img"
      aria-label="像素風的台北 101"
    >
      {tower.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} />
      ))}
      {/* 塔頂閃爍的航空警示燈 */}
      <rect x={15} y={0} width={2} height={1} fill="#b13e53" className="animate-blink" />
    </svg>
  );
}
