'use client';

interface CertificateOptions {
  visitorName: string;
  siteName: string;
  date: string;
  locale: 'ar' | 'en';
}

/**
 * Draws an Islamic geometric border pattern on the canvas.
 */
function drawIslamicBorder(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const gold = '#C8A45C';
  const goldLight = 'rgba(200, 164, 92, 0.3)';
  const borderWidth = 60;

  // Outer border
  ctx.strokeStyle = gold;
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
    // Diamond shape at each corner
    ctx.fillStyle = gold;
    ctx.beginPath();
    ctx.moveTo(x, y - cornerSize / 3);
    ctx.lineTo(x + cornerSize / 3, y);
    ctx.lineTo(x, y + cornerSize / 3);
    ctx.lineTo(x - cornerSize / 3, y);
    ctx.closePath();
    ctx.fill();

    // Inner diamond
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
    ctx.fillStyle = gold;
    ctx.fillRect(0, by - 4, w, 8);
    // Small repeating diamonds along the band
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
    ctx.fillStyle = gold;
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
  size: number
) {
  const gold = '#C8A45C';
  const points = 8;
  const outerR = size;
  const innerR = size * 0.4;

  ctx.fillStyle = gold;
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
  width: number
) {
  const gold = '#C8A45C';
  ctx.strokeStyle = gold;
  ctx.lineWidth = 1.5;

  // Left line
  ctx.beginPath();
  ctx.moveTo(cx - width / 2, cy);
  ctx.lineTo(cx - 20, cy);
  ctx.stroke();

  // Right line
  ctx.beginPath();
  ctx.moveTo(cx + 20, cy);
  ctx.lineTo(cx + width / 2, cy);
  ctx.stroke();

  // Center diamond
  ctx.fillStyle = gold;
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

/**
 * Generates a heritage visit certificate as an image Blob.
 * Instagram Stories format: 1080x1920.
 * Must be called client-side only.
 */
export async function generateCertificate(
  options: CertificateOptions
): Promise<Blob> {
  const { visitorName, siteName, date, locale } = options;
  const W = 1080;
  const H = 1920;
  const isAr = locale === 'ar';

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Background - deep heritage green gradient
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#1a3a2a');
  bg.addColorStop(0.3, '#0f2b1e');
  bg.addColorStop(0.7, '#0f2b1e');
  bg.addColorStop(1, '#1a3a2a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle radial glow in center
  const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 600);
  glow.addColorStop(0, 'rgba(200, 164, 92, 0.08)');
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Islamic geometric border
  drawIslamicBorder(ctx, W, H);

  // Center content
  const cx = W / 2;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Set canvas direction for Arabic
  if (isAr) {
    ctx.direction = 'rtl';
  }

  let y = 280;

  // Star ornament
  drawStarOrnament(ctx, cx, y, 40);
  y += 100;

  // "Heritage Visit Certificate" title
  const titleText = isAr ? 'شهادة زيارة تراثية' : 'Heritage Visit Certificate';
  ctx.fillStyle = '#C8A45C';
  ctx.font = `bold 64px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  const titleLines = wrapText(ctx, titleText, W - 200);
  titleLines.forEach((line) => {
    ctx.fillText(line, cx, y);
    y += 80;
  });

  y += 20;
  drawDivider(ctx, cx, y, 400);
  y += 60;

  // "This certifies that" / subtitle
  const subtitleText = isAr ? 'يُشهد بأن' : 'This certifies that';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = `36px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  ctx.fillText(subtitleText, cx, y);
  y += 80;

  // Visitor name
  ctx.fillStyle = '#C8A45C';
  ctx.font = `bold 56px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  const nameLines = wrapText(ctx, visitorName, W - 200);
  nameLines.forEach((line) => {
    ctx.fillText(line, cx, y);
    y += 70;
  });
  y += 30;

  // "has visited the heritage site"
  const visitedText = isAr ? 'قد زار الموقع التراثي' : 'has visited the heritage site';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = `36px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  ctx.fillText(visitedText, cx, y);
  y += 80;

  // Site name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 60px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  const siteLines = wrapText(ctx, siteName, W - 200);
  siteLines.forEach((line) => {
    ctx.fillText(line, cx, y);
    y += 76;
  });
  y += 40;

  drawDivider(ctx, cx, y, 400);
  y += 60;

  // Date label
  const dateLabelText = isAr ? 'تاريخ الزيارة' : 'Date of Visit';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = `28px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  ctx.fillText(dateLabelText, cx, y);
  y += 50;

  // Date value
  ctx.fillStyle = '#C8A45C';
  ctx.font = `bold 40px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  ctx.fillText(date, cx, y);
  y += 100;

  // Bottom star ornament
  drawStarOrnament(ctx, cx, y, 30);
  y += 80;

  // Platform branding
  const brandText = isAr ? 'منصة أثر' : 'Athar Platform';
  ctx.fillStyle = 'rgba(200, 164, 92, 0.6)';
  ctx.font = `28px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  ctx.fillText(brandText, cx, H - 160);

  const tagline = isAr
    ? 'اكتشف تراث مكة والمدينة'
    : 'Discover the heritage of Makkah & Madinah';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.font = `22px ${isAr ? '"IBM Plex Sans Arabic", Arial' : 'Georgia, serif'}`;
  ctx.fillText(tagline, cx, H - 120);

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
