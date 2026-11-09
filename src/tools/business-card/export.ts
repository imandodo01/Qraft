import type { BusinessCardData } from "./types";

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function fitText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  initialSize: number,
  weight = 600,
): string {
  let size = initialSize;
  while (size > 18) {
    context.font = `${weight} ${size}px Arial, sans-serif`;
    if (context.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  return `${weight} ${size}px Arial, sans-serif`;
}

export function drawBusinessCard(
  context: CanvasRenderingContext2D,
  data: BusinessCardData,
  width = 1200,
  height = 675,
): void {
  const accent = data.accent;
  const dark = data.theme === "dark";
  const background = dark ? "#171923" : "#ffffff";
  const foreground = dark ? "#f5f6fa" : "#20252d";
  const muted = dark ? "#b6bac7" : "#737b88";

  context.clearRect(0, 0, width, height);
  context.save();
  roundedRect(context, 0, 0, width, height, 34);
  context.fillStyle = background;
  context.fill();
  context.clip();

  context.fillStyle = accent;
  context.fillRect(0, 0, 18, height);

  context.globalAlpha = dark ? 0.18 : 0.1;
  context.beginPath();
  context.arc(width - 40, 35, 270, 0, Math.PI * 2);
  context.fillStyle = accent;
  context.fill();
  context.globalAlpha = 1;

  context.fillStyle = accent;
  context.font = "700 22px Arial, sans-serif";
  context.fillText(data.organization.trim() || "PERSONAL PROFILE", 78, 92, 780);

  context.fillStyle = foreground;
  context.font = fitText(context, data.fullName.trim(), 1000, 68, 700);
  context.fillText(data.fullName.trim(), 78, 245, 1000);

  context.fillStyle = muted;
  context.font = "400 30px Arial, sans-serif";
  context.fillText(data.jobTitle.trim(), 80, 300, 950);

  if (data.tagline.trim()) {
    context.fillStyle = muted;
    context.font = "400 21px Arial, sans-serif";
    context.fillText(data.tagline.trim(), 80, 365, 950);
  }

  context.fillStyle = accent;
  context.fillRect(80, 420, 90, 5);

  const details = [data.email.trim(), data.phone.trim(), data.website.trim()].filter(Boolean);
  context.fillStyle = foreground;
  context.font = "400 22px Arial, sans-serif";
  details.slice(0, 3).forEach((detail, index) => {
    context.fillText(detail, 80, 505 + index * 42, 1000);
  });

  context.restore();
}

export async function exportBusinessCardPng(data: BusinessCardData): Promise<Blob> {
  if (typeof document === "undefined") {
    throw new Error("PNG export is only available in a browser.");
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 675;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not create the card image.");

  drawBusinessCard(context, data);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Your browser could not export the card as PNG."));
    }, "image/png");
  });
}
