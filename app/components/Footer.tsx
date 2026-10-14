export default function Footer() {
  return (
    <footer className="border-t-4 border-px-ink bg-px-steel">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center">
        <p className="text-px-yellow">
          GAME CLEAR!<span className="animate-blink">_</span>
        </p>
        <p className="text-sm text-px-silver">感謝遊玩，下一站的冒險由你決定。</p>
        <a href="#top" className="pixel-btn mt-2 bg-px-blue px-4 py-2 text-sm text-px-white hover:bg-px-sky">
          ▲ 回到起點
        </a>
        <p className="mt-4 text-xs text-px-silver">
          © 2026 台北像素大冒險 · 寶可夢圖片版權屬於 Nintendo / Creatures / GAME FREAK
        </p>
      </div>
    </footer>
  );
}
