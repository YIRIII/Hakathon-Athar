'use client';

export type CertificateTemplate = 'classic' | 'makkah' | 'madinah' | 'modern';

interface CertificateOptions {
  visitorName: string;
  siteName: string;
  date: string;
  locale: 'ar' | 'en';
  template?: CertificateTemplate;
}

// ─── Helper: hex to rgba ───
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ─── Draw Islamic 8-pointed star ───
function drawStar8(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  const points = 8;
  const outerR = size;
  const innerR = size * 0.4;
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

// ─── Draw arabesque tile pattern ───
function drawArabesquePattern(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, opacity: number = 0.06) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  const size = 80;
  for (let x = 0; x < w + size; x += size) {
    for (let y = 0; y < h + size; y += size) {
      // Diamond
      ctx.beginPath();
      ctx.moveTo(x, y - size / 2);
      ctx.lineTo(x + size / 2, y);
      ctx.lineTo(x, y + size / 2);
      ctx.lineTo(x - size / 2, y);
      ctx.closePath();
      ctx.stroke();
      // Inner circle
      ctx.beginPath();
      ctx.arc(x, y, size * 0.18, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
}

// ─── Draw mashrabiya lattice border ───
function drawMashrabiyaBorder(ctx: CanvasRenderingContext2D, w: number, h: number, color: string) {
  const bw = 50; // border width
  ctx.save();

  // Outer frame
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.strokeRect(bw, bw, w - bw * 2, h - bw * 2);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(bw + 12, bw + 12, w - (bw + 12) * 2, h - (bw + 12) * 2);

  // Corner rosettes (8-pointed stars)
  const cornerPositions = [
    { x: bw, y: bw },
    { x: w - bw, y: bw },
    { x: bw, y: h - bw },
    { x: w - bw, y: h - bw },
  ];
  cornerPositions.forEach(({ x, y }) => {
    drawStar8(ctx, x, y, 28, color);
    ctx.fillStyle = hexToRgba(color, 0.3);
    drawStar8(ctx, x, y, 16, hexToRgba(color, 0.4));
  });

  // Top/bottom lattice band
  const step = 40;
  [bw / 2, h - bw / 2].forEach((by) => {
    ctx.fillStyle = hexToRgba(color, 0.15);
    ctx.fillRect(0, by - bw / 2, w, bw);
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.8;
    for (let x = step / 2; x < w; x += step) {
      // Interlocking circles
      ctx.beginPath();
      ctx.arc(x, by, 10, 0, Math.PI * 2);
      ctx.stroke();
      // Small diamond
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, by - 5);
      ctx.lineTo(x + 5, by);
      ctx.lineTo(x, by + 5);
      ctx.lineTo(x - 5, by);
      ctx.closePath();
      ctx.fill();
    }
  });

  // Side lattice bands
  [bw / 2, w - bw / 2].forEach((bx) => {
    ctx.fillStyle = hexToRgba(color, 0.15);
    ctx.fillRect(bx - bw / 2, 0, bw, h);
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.8;
    for (let y = step / 2; y < h; y += step) {
      ctx.beginPath();
      ctx.arc(bx, y, 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(bx - 5, y);
      ctx.lineTo(bx, y - 5);
      ctx.lineTo(bx + 5, y);
      ctx.lineTo(bx, y + 5);
      ctx.closePath();
      ctx.fill();
    }
  });

  ctx.restore();
}

// ─── Draw mihrab arch frame ───
function drawMihrabArch(ctx: CanvasRenderingContext2D, cx: number, topY: number, archW: number, archH: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;

  // Outer pointed arch
  ctx.beginPath();
  ctx.moveTo(cx - archW / 2, topY + archH);
  ctx.lineTo(cx - archW / 2, topY + archH * 0.4);
  ctx.quadraticCurveTo(cx - archW / 2, topY, cx, topY - 30);
  ctx.quadraticCurveTo(cx + archW / 2, topY, cx + archW / 2, topY + archH * 0.4);
  ctx.lineTo(cx + archW / 2, topY + archH);
  ctx.stroke();

  // Inner arch (thinner)
  ctx.lineWidth = 1.5;
  const inset = 16;
  ctx.beginPath();
  ctx.moveTo(cx - archW / 2 + inset, topY + archH - inset);
  ctx.lineTo(cx - archW / 2 + inset, topY + archH * 0.4);
  ctx.quadraticCurveTo(cx - archW / 2 + inset, topY + inset, cx, topY - 30 + inset);
  ctx.quadraticCurveTo(cx + archW / 2 - inset, topY + inset, cx + archW / 2 - inset, topY + archH * 0.4);
  ctx.lineTo(cx + archW / 2 - inset, topY + archH - inset);
  ctx.stroke();

  ctx.restore();
}

// ─── Draw Kaaba silhouette watermark ───
function drawKaabaSilhouette(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  const s = size;
  // Simplified Kaaba shape — cube with kiswah drape
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.4, cy - s * 0.35);
  ctx.lineTo(cx + s * 0.4, cy - s * 0.35);
  ctx.lineTo(cx + s * 0.45, cy + s * 0.4);
  ctx.lineTo(cx - s * 0.45, cy + s * 0.4);
  ctx.closePath();
  ctx.fill();
  // Gold band
  ctx.fillStyle = hexToRgba(color, 0.4);
  ctx.fillRect(cx - s * 0.42, cy - s * 0.05, s * 0.84, s * 0.08);
  // Top
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.4, cy - s * 0.35);
  ctx.lineTo(cx - s * 0.25, cy - s * 0.5);
  ctx.lineTo(cx + s * 0.25, cy - s * 0.5);
  ctx.lineTo(cx + s * 0.4, cy - s * 0.35);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// ─── Draw Green Dome silhouette ───
function drawGreenDomeSilhouette(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  const s = size;
  // Base rectangle
  ctx.fillRect(cx - s * 0.5, cy, s, s * 0.4);
  // Dome
  ctx.beginPath();
  ctx.arc(cx, cy, s * 0.4, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
  // Finial (crescent tip)
  ctx.beginPath();
  ctx.arc(cx, cy - s * 0.45, s * 0.06, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(cx - 1.5, cy - s * 0.4, 3, s * 0.08);
  // Minaret (left)
  ctx.fillRect(cx - s * 0.55, cy - s * 0.2, s * 0.06, s * 0.6);
  ctx.beginPath();
  ctx.arc(cx - s * 0.52, cy - s * 0.2, s * 0.04, Math.PI, 0);
  ctx.fill();
  // Minaret (right)
  ctx.fillRect(cx + s * 0.49, cy - s * 0.2, s * 0.06, s * 0.6);
  ctx.beginPath();
  ctx.arc(cx + s * 0.52, cy - s * 0.2, s * 0.04, Math.PI, 0);
  ctx.fill();
  ctx.restore();
}

// ─── Draw stars background ───
function drawStarsPattern(ctx: CanvasRenderingContext2D, w: number, h: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  // Deterministic star positions
  const positions = [
    [0.1, 0.05], [0.3, 0.08], [0.5, 0.03], [0.7, 0.06], [0.9, 0.04],
    [0.15, 0.15], [0.45, 0.12], [0.75, 0.18], [0.85, 0.1],
    [0.05, 0.25], [0.35, 0.22], [0.65, 0.28], [0.95, 0.2],
    [0.2, 0.85], [0.4, 0.9], [0.6, 0.87], [0.8, 0.92],
    [0.1, 0.95], [0.5, 0.93], [0.9, 0.88],
  ];
  positions.forEach(([px, py]) => {
    const x = px * w;
    const y = py * h;
    const size = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

// ─── Wrap text helper ───
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// ─── Ornate divider ───
function drawOrnateDivider(ctx: CanvasRenderingContext2D, cx: number, cy: number, width: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;

  // Left line with tapered ends
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - width / 2, cy);
  ctx.lineTo(cx - 30, cy);
  ctx.stroke();

  // Right line
  ctx.beginPath();
  ctx.moveTo(cx + 30, cy);
  ctx.lineTo(cx + width / 2, cy);
  ctx.stroke();

  // Center diamond with star
  drawStar8(ctx, cx, cy, 12, color);

  // End diamonds
  ctx.fillStyle = color;
  [-width / 2, width / 2].forEach((offset) => {
    ctx.beginPath();
    ctx.moveTo(cx + offset, cy - 4);
    ctx.lineTo(cx + offset + 4, cy);
    ctx.lineTo(cx + offset, cy + 4);
    ctx.lineTo(cx + offset - 4, cy);
    ctx.closePath();
    ctx.fill();
  });

  ctx.restore();
}

// ─── Template configs ───
interface TemplateConfig {
  bgGradientStops: [number, string][];
  accentColor: string;
  textColor: string;
  subtitleColor: string;
  nameColor: string;
  siteColor: string;
  drawBackground: (ctx: CanvasRenderingContext2D, w: number, h: number, config: TemplateConfig) => void;
}

const TEMPLATES: Record<CertificateTemplate, TemplateConfig> = {
  classic: {
    bgGradientStops: [[0, '#1a3a2a'], [0.3, '#0f2b1e'], [0.7, '#0f2b1e'], [1, '#1a3a2a']],
    accentColor: '#C8A45C',
    textColor: '#FFFFFF',
    subtitleColor: 'rgba(255, 255, 255, 0.7)',
    nameColor: '#C8A45C',
    siteColor: '#FFFFFF',
    drawBackground: (ctx, w, h, cfg) => {
      // Rich green with arabesque pattern overlay
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      cfg.bgGradientStops.forEach(([stop, color]) => bg.addColorStop(stop, color));
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      // Radial glow
      const glow = ctx.createRadialGradient(w / 2, h * 0.4, 0, w / 2, h * 0.4, 500);
      glow.addColorStop(0, 'rgba(200, 164, 92, 0.08)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      // Arabesque overlay
      drawArabesquePattern(ctx, w, h, cfg.accentColor, 0.05);
      // Mashrabiya border
      drawMashrabiyaBorder(ctx, w, h, cfg.accentColor);
    },
  },
  makkah: {
    bgGradientStops: [[0, '#2A1A0A'], [0.25, '#1C1008'], [0.5, '#110A04'], [0.75, '#1C1008'], [1, '#2A1A0A']],
    accentColor: '#DAA520',
    textColor: '#FFF8E7',
    subtitleColor: 'rgba(255, 248, 231, 0.7)',
    nameColor: '#DAA520',
    siteColor: '#FFF8E7',
    drawBackground: (ctx, w, h, cfg) => {
      // Deep brown/black gradient
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      cfg.bgGradientStops.forEach(([stop, color]) => bg.addColorStop(stop, color));
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      // Warm glow
      const glow = ctx.createRadialGradient(w / 2, h * 0.35, 0, w / 2, h * 0.35, 600);
      glow.addColorStop(0, 'rgba(218, 165, 32, 0.06)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      // Kaaba watermark (subtle)
      drawKaabaSilhouette(ctx, w / 2, h * 0.22, 200, hexToRgba(cfg.accentColor, 0.06));
      // Mihrab arch frame around content
      drawMihrabArch(ctx, w / 2, 180, w * 0.78, h * 0.72, hexToRgba(cfg.accentColor, 0.25));
      // Arabesque pattern
      drawArabesquePattern(ctx, w, h, cfg.accentColor, 0.03);
      // Sand gradient at bottom
      const sand = ctx.createLinearGradient(0, h * 0.85, 0, h);
      sand.addColorStop(0, 'rgba(218, 165, 32, 0)');
      sand.addColorStop(1, 'rgba(218, 165, 32, 0.06)');
      ctx.fillStyle = sand;
      ctx.fillRect(0, h * 0.85, w, h * 0.15);
      // Border
      drawMashrabiyaBorder(ctx, w, h, cfg.accentColor);
    },
  },
  madinah: {
    bgGradientStops: [[0, '#0A1628'], [0.3, '#06101E'], [0.7, '#06101E'], [1, '#0A1628']],
    accentColor: '#C0C0C0',
    textColor: '#E8E8E8',
    subtitleColor: 'rgba(232, 232, 232, 0.7)',
    nameColor: '#94D2A5',
    siteColor: '#E8E8E8',
    drawBackground: (ctx, w, h, cfg) => {
      // Deep midnight blue
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      cfg.bgGradientStops.forEach(([stop, color]) => bg.addColorStop(stop, color));
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      // Stars in the night sky
      drawStarsPattern(ctx, w, h, 'rgba(255, 255, 255, 0.4)');
      // Green dome watermark
      drawGreenDomeSilhouette(ctx, w / 2, h * 0.18, 180, 'rgba(76, 175, 80, 0.06)');
      // Silver glow
      const glow = ctx.createRadialGradient(w / 2, h * 0.4, 0, w / 2, h * 0.4, 500);
      glow.addColorStop(0, 'rgba(192, 192, 192, 0.06)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      // Arabesque pattern in silver
      drawArabesquePattern(ctx, w, h, cfg.accentColor, 0.04);
      // Silver filigree border
      drawMashrabiyaBorder(ctx, w, h, cfg.accentColor);
    },
  },
  modern: {
    bgGradientStops: [[0, '#FEFCF8'], [0.3, '#F7F0E3'], [0.7, '#F7F0E3'], [1, '#FEFCF8']],
    accentColor: '#C8A45C',
    textColor: '#1A1410',
    subtitleColor: 'rgba(26, 20, 16, 0.5)',
    nameColor: '#C8A45C',
    siteColor: '#1A1410',
    drawBackground: (ctx, w, h, cfg) => {
      // Clean cream/white
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      cfg.bgGradientStops.forEach(([stop, color]) => bg.addColorStop(stop, color));
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      // Subtle texture via faint arabesque
      drawArabesquePattern(ctx, w, h, cfg.accentColor, 0.025);
      // Thin geometric border (no mashrabiya — clean lines)
      ctx.strokeStyle = cfg.accentColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 60, w - 120, h - 120);
      ctx.lineWidth = 0.5;
      ctx.strokeRect(72, 72, w - 144, h - 144);
      // Corner stars only (minimal)
      [{ x: 60, y: 60 }, { x: w - 60, y: 60 }, { x: 60, y: h - 60 }, { x: w - 60, y: h - 60 }].forEach(({ x, y }) => {
        drawStar8(ctx, x, y, 14, hexToRgba(cfg.accentColor, 0.5));
      });
    },
  },
};

// ─── Main draw function ───
function drawTemplate(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  config: TemplateConfig,
  options: CertificateOptions
) {
  const { visitorName, siteName, date, locale } = options;
  const isAr = locale === 'ar';
  const fontFamily = isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif';
  const cx = W / 2;

  // Draw background (template-specific)
  config.drawBackground(ctx, W, H, config);

  // Setup text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (isAr) ctx.direction = 'rtl';

  let y = 300;

  // Top star ornament
  drawStar8(ctx, cx, y, 35, config.accentColor);
  y += 90;

  // Bismillah or title header
  const headerText = isAr ? '﷽' : '❖';
  ctx.fillStyle = hexToRgba(config.accentColor, 0.6);
  ctx.font = isAr ? `48px ${fontFamily}` : `32px ${fontFamily}`;
  ctx.fillText(headerText, cx, y);
  y += 70;

  // Title
  const titleText = isAr ? 'شهادة زيارة تراثية' : 'Heritage Visit Certificate';
  ctx.fillStyle = config.accentColor;
  ctx.font = `bold 58px ${fontFamily}`;
  const titleLines = wrapText(ctx, titleText, W - 200);
  titleLines.forEach((line) => {
    ctx.fillText(line, cx, y);
    y += 76;
  });

  y += 20;
  drawOrnateDivider(ctx, cx, y, 500, config.accentColor);
  y += 70;

  // "This certifies that"
  ctx.fillStyle = config.subtitleColor;
  ctx.font = `34px ${fontFamily}`;
  ctx.fillText(isAr ? 'يُشهد بأن' : 'This certifies that', cx, y);
  y += 80;

  // Visitor name (large, prominent)
  ctx.fillStyle = config.nameColor;
  ctx.font = `bold 54px ${fontFamily}`;
  const nameLines = wrapText(ctx, visitorName, W - 200);
  nameLines.forEach((line) => {
    ctx.fillText(line, cx, y);
    y += 68;
  });
  y += 30;

  // "has visited"
  ctx.fillStyle = config.subtitleColor;
  ctx.font = `34px ${fontFamily}`;
  ctx.fillText(isAr ? 'قد زار الموقع التراثي' : 'has visited the heritage site', cx, y);
  y += 80;

  // Site name (bold, slightly larger)
  ctx.fillStyle = config.siteColor;
  ctx.font = `bold 56px ${fontFamily}`;
  const siteLines = wrapText(ctx, siteName, W - 200);
  siteLines.forEach((line) => {
    ctx.fillText(line, cx, y);
    y += 72;
  });
  y += 40;

  drawOrnateDivider(ctx, cx, y, 500, config.accentColor);
  y += 60;

  // Date of Visit
  ctx.fillStyle = config.subtitleColor;
  ctx.font = `28px ${fontFamily}`;
  ctx.fillText(isAr ? 'تاريخ الزيارة' : 'Date of Visit', cx, y);
  y += 48;

  ctx.fillStyle = config.accentColor;
  ctx.font = `bold 38px ${fontFamily}`;
  ctx.fillText(date, cx, y);
  y += 90;

  // Bottom star
  drawStar8(ctx, cx, y, 24, config.accentColor);

  // Branding footer
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = config.accentColor;
  ctx.font = `26px ${fontFamily}`;
  ctx.fillText(isAr ? 'منصة أثر' : 'Athar Platform', cx, H - 160);
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = config.textColor;
  ctx.font = `20px ${fontFamily}`;
  ctx.fillText(
    isAr ? 'اكتشف تراث مكة والمدينة' : 'Discover the heritage of Makkah & Madinah',
    cx, H - 120
  );
  ctx.restore();
}

/**
 * Generates a heritage visit certificate as an image Blob.
 * Instagram Stories format: 1080x1920.
 * Must be called client-side only.
 */
export async function generateCertificate(options: CertificateOptions): Promise<Blob> {
  const W = 1080;
  const H = 1920;
  const template = options.template ?? 'classic';

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const config = TEMPLATES[template];
  drawTemplate(ctx, W, H, config, options);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to generate certificate image'));
      },
      'image/png',
      1.0
    );
  });
}
