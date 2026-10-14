"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  /** 縮小後的像素解析度，數字越小顆粒越粗 */
  resolution?: number;
  className?: string;
};

const OUTLINE = [26, 28, 44]; // px-ink

/**
 * 把高解析度圖片縮成低解析度，再放大顯示，做出 8-bit 點陣圖效果：
 * 減色（posterize）、透明度二值化、加上一圈深色描邊。
 */
export default function PixelSprite({ src, alt, resolution = 48, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;

    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const size = resolution;
      ctx.clearRect(0, 0, size, size);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, size, size);

      const image = ctx.getImageData(0, 0, size, size);
      const p = image.data;
      const solid = new Uint8Array(size * size);

      for (let i = 0; i < size * size; i++) {
        const o = i * 4;
        if (p[o + 3] > 110) {
          solid[i] = 1;
          p[o + 3] = 255;
          for (let c = 0; c < 3; c++) p[o + c] = Math.min(255, Math.round(p[o + c] / 51) * 51);
        } else {
          p[o + 3] = 0;
        }
      }

      // 描邊：透明像素若緊鄰實心像素，就塗成深色
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const i = y * size + x;
          if (solid[i]) continue;
          const near =
            (x > 0 && solid[i - 1]) ||
            (x < size - 1 && solid[i + 1]) ||
            (y > 0 && solid[i - size]) ||
            (y < size - 1 && solid[i + size]);
          if (near) {
            const o = i * 4;
            p[o] = OUTLINE[0];
            p[o + 1] = OUTLINE[1];
            p[o + 2] = OUTLINE[2];
            p[o + 3] = 255;
          }
        }
      }

      ctx.putImageData(image, 0, 0);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src, resolution]);

  return (
    <canvas
      ref={canvasRef}
      width={resolution}
      height={resolution}
      role="img"
      aria-label={alt}
      className={`pixelated ${className ?? ""}`}
    />
  );
}
