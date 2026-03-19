'use client';

export type CertificateTemplate = 'classic' | 'makkah' | 'madinah' | 'modern';

interface CertificateOptions {
  visitorName: string;
  siteName: string;
  date: string;
  locale: 'ar' | 'en';
  template?: CertificateTemplate;
}

/**
 * Draws an Islamic geometric border pattern on the canvas.
 */
function drawIslamicBorder(ctx: CanvasRenderingContext2D, w: number, h: number, color: string = '#C8A45C') {
  const lightColor = color.replace(')', ', 0.3)').replace('rgb', 'rgba').replace('#', '');
  const goldLight = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.3)`;
  const borderWidth = 60;

  // Outer border
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.strokeRect(borderWidth, borderWidth, w - borderWidth * 2, h - borderWidth * 2);

  // Inner border
  ctx.lineWidth = 2;
  ctx.strokeRect(
    borderWidth + 16,
    borderWidth + 16,
    w - (borderWidth + 16) * 2,
    h - (borderWidth + 16) * 2
  );

  // Corner ornaments
  const cornerSize = 80;
  const corners = [
    { x: borderWidth, y: borderWidth },
    { x: w - borderWidth, y: borderWidth },
    { x: borderWidth, y: h - borderWidth },
    { x: w - borderWidth, y: h - borderWidth },
  ];

  corners.forEach(({ x, y }) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - cornerSize / 3);
    ctx.lineTo(x + cornerSize / 3, y);
    ctx.lineTo(x, y + cornerSize / 3);
    ctx.lineTo(x - cornerSize / 3, y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = goldLight;
    ctx.beginPath();
    ctx.moveTo(x, y - cornerSize / 5);
    ctx.lineTo(x + cornerSize / 5, y);
    ctx.lineTo(x, y + cornerSize / 5);
    ctx.lineTo(x - cornerSize / 5, y);
    ctx.closePath();
    ctx.fill();
  });

  // Top and bottom decorative bands
  const bandY = [borderWidth / 2, h - borderWidth / 2];
  bandY.forEach((by) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, by - 4, w, 8);
    const step = 60;
    for (let bx = step / 2; bx < w; bx += step) {
      ctx.fillStyle = goldLight;
      ctx.beginPath();
      ctx.moveTo(bx, by - 12);
      ctx.lineTo(bx + 8, by);
      ctx.lineTo(bx, by + 12);
      ctx.lineTo(bx - 8, by);
      ctx.closePath();
      ctx.fill();
    }
  });

  // Side decorative bands
  const bandX = [borderWidth / 2, w - borderWidth / 2];
  bandX.forEach((bx) => {
    ctx.fillStyle = color;
    ctx.fillRect(bx - 4, 0, 8, h);
    const step = 60;
    for (let by = step / 2; by < h; by += step) {
      ctx.fillStyle = goldLight;
      ctx.beginPath();
      ctx.moveTo(bx - 12, by);
      ctx.lineTo(bx, by - 8);
      ctx.lineTo(bx + 12, by);
      ctx.lineTo(bx, by + 8);
      ctx.closePath();
      ctx.fill();
    }
  });
}

/**
 * Draws a centered star ornament.
 */
function drawStarOrnament(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string = '#C8A45C'
) {
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

/**
 * Draws a decorative divider line.
 */
function drawDivider(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  color: string = '#C8A45C'
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(cx - width / 2, cy);
  ctx.lineTo(cx - 20, cy);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx + 20, cy);
  ctx.lineTo(cx + width / 2, cy);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 6);
  ctx.lineTo(cx + 10, cy);
  ctx.lineTo(cx, cy + 6);
  ctx.lineTo(cx - 10, cy);
  ctx.closePath();
  ctx.fill();
}

/**
 * Wraps text to fit within maxWidth, returning an array of lines.
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// ─── Template configs ───

interface TemplateConfig {
  bgGradientStops: [number, string][];
  glowColor: string;
  accentColor: string;
  textColor: string;
  subtitleColor: string;
  nameColor: string;
  siteColor: string;
}

const TEMPLATES: Record<CertificateTemplate, TemplateConfig> = {
  classic: {
    bgGradientStops: [[0, '#1a3a2a'], [0.3, '#0f2b1e'], [0.7, '#0f2b1e'], [1, '#1a3a2a']],
    glowColor: 'rgba(200, 164, 92, 0.08)',
    accentColor: '#C8A45C',
    textColor: '#FFFFFF',
    subtitleColor: 'rgba(255, 255, 255, 0.7)',
    nameColor: '#C8A45C',
    siteColor: '#FFFFFF',
  },
  makkah: {
    bgGradientStops: [[0, '#3D2B1A'], [0.3, '#2A1D10'], [0.7, '#2A1D10'], [1, '#3D2B1A']],
    glowColor: 'rgba(218, 165, 32, 0.1)',
    accentColor: '#DAA520',
    textColor: '#FFF8E7',
    subtitleColor: 'rgba(255, 248, 231, 0.7)',
    nameColor: '#DAA520',
    siteColor: '#FFF8E7',
  },
  madinah: {
    bgGradientStops: [[0, '#0D1B2A'], [0.3, '#091420'], [0.7, '#091420'], [1, '#0D1B2A']],
    glowColor: 'rgba(192, 192, 192, 0.08)',
    accentColor: '#C0C0C0',
    textColor: '#E8E8E8',
    subtitleColor: 'rgba(232, 232, 232, 0.7)',
    nameColor: '#C0C0C0',
    siteColor: '#E8E8E8',
  },
  modern: {
    bgGradientStops: [[0, '#FAFAFA'], [0.3, '#F5F0E8'], [0.7, '#F5F0E8'], [1, '#FAFAFA']],
    glowColor: 'rgba(200, 164, 92, 0.06)',
    accentColor: '#C8A45C',
    textColor: '#1A1410',
    subtitleColor: 'rgba(26, 20, 16, 0.6)',
    nameColor: '#C8A45C',
    siteColor: '#1A1410',
  },
};

function drawTemplate(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  config: TemplateConfig,
  options: CertificateOptions
) {
  const { visitorName, siteName, date, locale } = options;
  const isAr = locale === 'ar';

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  config.bgGradientStops.forEach(([stop, color]) => bg.addColorStop(stop, color));
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle radial glow in center
  const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 600);
  glow.addColorStop(0, config.glowColor);
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Islamic geometric border
  drawIslamicBorder(ctx, W, H, config.accentColor);

  // Center content
  const cx = W / 2;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (isAr) {
    ctx.direction = 'rtl';
  }

  let y = 280;

  // Star ornament
  drawStarOrnament(ctx, cx, y, 40, config.accentColor);
  y += 100;

  // Title
  const titleText = isAr ? 'شهادة زيارة تراثية' : 'Heritage Visit Certificate';
  ctx.fillStyle = config.accentColor;
  ctx.font = `bold 64px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  const titleLines = wrapText(ctx, titleText, W - 200);
  titleLines.forEach((line) => {
    ctx.fillText(line, cx, y);
    y += 80;
  });

  y += 20;
  drawDivider(ctx, cx, y, 400, config.accentColor);
  y += 60;

  // Subtitle
  const subtitleText = isAr ? 'يُشهد بأن' : 'This certifies that';
  ctx.fillStyle = config.subtitleColor;
  ctx.font = `36px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  ctx.fillText(subtitleText, cx, y);
  y += 80;

  // Visitor name
  ctx.fillStyle = config.nameColor;
  ctx.font = `bold 56px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  const nameLines = wrapText(ctx, visitorName, W - 200);
  nameLines.forEach((line) => {
    ctx.fillText(line, cx, y);
    y += 70;
  });
  y += 30;

  // "has visited"
  const visitedText = isAr ? 'قد زار الموقع التراثي' : 'has visited the heritage site';
  ctx.fillStyle = config.subtitleColor;
  ctx.font = `36px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  ctx.fillText(visitedText, cx, y);
  y += 80;

  // Site name
  ctx.fillStyle = config.siteColor;
  ctx.font = `bold 60px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  const siteLines = wrapText(ctx, siteName, W - 200);
  siteLines.forEach((line) => {
    ctx.fillText(line, cx, y);
    y += 76;
  });
  y += 40;

  drawDivider(ctx, cx, y, 400, config.accentColor);
  y += 60;

  // Date
  const dateLabelText = isAr ? 'تاريخ الزيارة' : 'Date of Visit';
  ctx.fillStyle = config.subtitleColor;
  ctx.font = `28px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  ctx.fillText(dateLabelText, cx, y);
  y += 50;

  ctx.fillStyle = config.accentColor;
  ctx.font = `bold 40px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  ctx.fillText(date, cx, y);
  y += 100;

  // Bottom star
  drawStarOrnament(ctx, cx, y, 30, config.accentColor);
  y += 80;

  // Branding
  const brandText = isAr ? 'منصة أثر' : 'Athar Platform';
  ctx.fillStyle = config.accentColor.replace(')', ', 0.6)').replace('rgb', 'rgba');
  // If hex, use half-opacity version
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = config.accentColor;
  ctx.font = `28px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  ctx.fillText(brandText, cx, H - 160);
  ctx.globalAlpha = 0.3;

  const tagline = isAr
    ? 'اكتشف تراث مكة والمدينة'
    : 'Discover the heritage of Makkah & Madinah';
  ctx.fillStyle = config.textColor;
  ctx.font = `22px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  ctx.fillText(tagline, cx, H - 120);
  ctx.globalAlpha = 1;
}

/**
 * Generates a heritage visit certificate as an image Blob.
 * Instagram Stories format: 1080x1920.
 * Must be called client-side only.
 */
export async function generateCertificate(
  options: CertificateOptions
): Promise<Blob> {
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
