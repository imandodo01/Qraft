import QRCode from "qrcode";

export class QrGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QrGenerationError";
  }
}

export async function generateQrPng(content: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(content, {
      errorCorrectionLevel: "M",
      margin: 4,
      width: 320,
      type: "image/png",
    });

    if (!dataUrl.startsWith("data:image/png;base64,")) {
      throw new QrGenerationError("The QR image could not be prepared as a PNG.");
    }

    return dataUrl;
  } catch (error) {
    if (error instanceof QrGenerationError) throw error;
    const message = error instanceof Error ? error.message : "";

    if (/too big|capacity|overflow/i.test(message)) {
      throw new QrGenerationError("This content is too long for a QR code. Shorten it and try again.");
    }

    throw new QrGenerationError("The QR code could not be generated. Check the content and try again.");
  }
}
