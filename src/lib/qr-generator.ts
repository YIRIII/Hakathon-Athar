import type QRCodeStyling from 'qr-code-styling';

export interface QRGeneratorOptions {
  url: string;
  size?: number;
  /** Site name shown beneath the QR (optional) */
  label?: string;
}

const HERITAGE_GOLD = '#C8A45C';
const HERITAGE_DARK = '#1A0F00';
const HERITAGE_BG = '#FFF9F0';

/**
 * Creates a heritage-branded QR code using qr-code-styling.
 * Must be called client-side only (uses canvas / DOM).
 */
export async function createHeritageQR(
  options: QRGeneratorOptions
): Promise<QRCodeStyling> {
  const { default: QRCodeStylingClass } = await import('qr-code-styling');

  const size = options.size ?? 300;

  const qr = new QRCodeStylingClass({
    width: size,
    height: size,
    type: 'canvas',
    data: options.url,
    dotsOptions: {
      color: HERITAGE_GOLD,
      type: 'rounded',
    },
    cornersSquareOptions: {
      color: HERITAGE_DARK,
      type: 'extra-rounded',
    },
    cornersDotOptions: {
      color: HERITAGE_GOLD,
      type: 'dot',
    },
    backgroundOptions: {
      color: HERITAGE_BG,
    },
    qrOptions: {
      errorCorrectionLevel: 'H',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 4,
    },
  });

  return qr;
}

/**
 * Renders the QR code into a given container element.
 */
export async function renderQRToElement(
  container: HTMLElement,
  options: QRGeneratorOptions
): Promise<QRCodeStyling> {
  const qr = await createHeritageQR(options);
  // Clear previous children
  container.innerHTML = '';
  qr.append(container);
  return qr;
}

/**
 * Downloads the QR code as a PNG blob.
 */
export async function downloadQR(
  qr: QRCodeStyling,
  filename: string,
  size?: number
): Promise<void> {
  if (size) {
    // Re-create at the requested resolution for print
    qr.update({ width: size, height: size });
    // Small delay to let canvas re-render
    await new Promise((r) => setTimeout(r, 100));
  }
  await qr.download({ name: filename, extension: 'png' });
}
