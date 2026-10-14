const links = [
  { href: "#ximending", label: "西門町" },
  { href: "#shilin", label: "士林夜市" },
  { href: "#yangmingshan", label: "陽明山" },
  { href: "#beitou", label: "北投溫泉" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-px-ink bg-px-red">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <a href="#top" className="flex items-center gap-2 text-lg text-px-white">
          <span aria-hidden className="text-px-yellow">◆</span>
          台北像素大冒險
        </a>
        <nav aria-label="景點導覽">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group text-px-white hover:text-px-yellow focus-visible:text-px-yellow"
                >
                  <span aria-hidden className="invisible group-hover:visible group-focus-visible:visible">
                    ▶
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
