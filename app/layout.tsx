import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// 俐方體 11 號（Cubic 11）：支援繁體中文的 8-bit 像素字型
const cubic = localFont({
  src: "./fonts/Cubic_11.woff2",
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "台北像素大冒險",
  description: "用 8-bit 像素風，帶著寶可夢逛遍台北景點",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className={`${cubic.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
