import { generateQrPng, QrGenerationError } from "../qr-generator/qr-service";
import { serializeVCard } from "../vcard-generator/serializer";
import { toVCardContact, createEmptyBusinessCard, type BusinessCardData } from "./types";
import { validateBusinessCard } from "./validation";
import { exportBusinessCardPng } from "./export";

const fieldLabels: Array<{ key: keyof Pick<BusinessCardData, "fullName" | "jobTitle" | "organization" | "email" | "phone" | "website" | "tagline">; label: string; placeholder: string; type?: string }> = [
  { key: "fullName", label: "Full name *", placeholder: "Ada Lovelace" },
  { key: "jobTitle", label: "Job title", placeholder: "Software Engineer" },
  { key: "organization", label: "Organization", placeholder: "Analytical Engines" },
  { key: "email", label: "Email", placeholder: "ada@example.com", type: "email" },
  { key: "phone", label: "Phone", placeholder: "+1 555 0100", type: "tel" },
  { key: "website", label: "Website", placeholder: "example.com", type: "url" },
  { key: "tagline", label: "Tagline", placeholder: "Building useful things with thoughtful technology" },
];

const accentLabels: Record<BusinessCardData["accent"], string> = {
  violet: "Violet",
  blue: "Blue",
  teal: "Teal",
  rose: "Rose",
  amber: "Amber",
};

export function renderBusinessCard(container: HTMLElement): void {
  container.innerHTML = `
    <main class="detail-page business-card-page">
      <a class="brand" href="#/"><span class="brand__mark">Q</span><span>qraft<span class="brand__dot">.</span></span></a>
      <a class="back-link" href="#/">← Back to all tools</a>
      <header class="business-card-intro">
        <p class="eyebrow">CONTACT STUDIO</p>
        <h1>Digital Business Card</h1>
        <p class="detail-description">Create a polished contact card you can share as an image, contact file, or QR code.</p>
      </header>
      <section class="business-card-workspace" aria-label="Digital business card workspace">
        <form class="business-card-form" id="business-card-form" novalidate>
          <div class="business-card-section-heading"><h2>Your details</h2><span>Name is required</span></div>
          <div class="business-card-fields">
            ${fieldLabels.map((field) => `
              <div class="business-card-field">
                <label for="business-card-${field.key}">${field.label}</label>
                <input id="business-card-${field.key}" data-field="${field.key}" type="${field.type ?? "text"}" placeholder="${field.placeholder}" autocomplete="off" />
              </div>
            `).join("")}
          </div>
          <div class="business-card-customize">
            <div class="business-card-field">
              <label for="business-card-theme">Theme</label>
              <select id="business-card-theme" data-option="theme">
                <option value="light">Light</option><option value="dark">Dark</option>
              </select>
            </div>
            <div class="business-card-field">
              <label for="business-card-accent">Accent color</label>
              <select id="business-card-accent" data-option="accent">
                ${Object.entries(accentLabels).map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}
              </select>
            </div>
          </div>
          <p class="business-card-feedback" id="business-card-feedback" role="status" aria-live="polite"></p>
          <div class="business-card-actions">
            <button class="business-card-button business-card-button--secondary" id="business-card-clear" type="button">Clear</button>
            <button class="business-card-button business-card-button--secondary" id="business-card-vcf" type="button" disabled>Download VCF</button>
            <button class="business-card-button business-card-button--primary" id="business-card-png" type="button" disabled>Download PNG</button>
          </div>
          <p class="business-card-privacy">● Your details stay in this browser and are not saved automatically.</p>
        </form>
        <section class="business-card-preview-panel" aria-labelledby="business-card-preview-heading">
          <div class="business-card-section-heading"><h2 id="business-card-preview-heading">Live preview</h2><span>Landscape · 1200 × 675</span></div>
          <article class="business-card-preview" id="business-card-preview" data-theme="light" data-accent="violet">
            <div class="business-card-preview__glow"></div>
            <p class="business-card-preview__organization" id="business-card-preview-org">PERSONAL PROFILE</p>
            <h2 id="business-card-preview-name">Your name</h2>
            <p class="business-card-preview__job" id="business-card-preview-job">Your role or profession</p>
            <p class="business-card-preview__tagline" id="business-card-preview-tagline">A short introduction about what you do.</p>
            <div class="business-card-preview__rule"></div>
            <div class="business-card-preview__details" id="business-card-preview-details"></div>
          </article>
          <section class="business-card-qr" aria-labelledby="business-card-qr-heading">
            <div class="business-card-section-heading"><h2 id="business-card-qr-heading">Contact QR</h2><span>vCard payload</span></div>
            <div class="business-card-qr__stage">
              <p id="business-card-qr-empty">Complete your name to generate a contact QR.</p>
              <img id="business-card-qr-image" alt="QR code containing this business card contact" hidden />
            </div>
            <p class="business-card-qr__note">The QR code contains the same contact details as the VCF file. Scanner support varies by device.</p>
            <button class="business-card-button business-card-button--secondary" id="business-card-qr-download" type="button" disabled>Download QR PNG</button>
          </section>
        </section>
      </section>
    </main>
  `;

  const form = container.querySelector<HTMLFormElement>("#business-card-form");
  const feedback = container.querySelector<HTMLParagraphElement>("#business-card-feedback");
  const preview = container.querySelector<HTMLElement>("#business-card-preview");
  const qrImage = container.querySelector<HTMLImageElement>("#business-card-qr-image");
  const qrEmpty = container.querySelector<HTMLParagraphElement>("#business-card-qr-empty");
  const pngButton = container.querySelector<HTMLButtonElement>("#business-card-png");
  const vcfButton = container.querySelector<HTMLButtonElement>("#business-card-vcf");
  const qrButton = container.querySelector<HTMLButtonElement>("#business-card-qr-download");
  const clearButton = container.querySelector<HTMLButtonElement>("#business-card-clear");

  if (!form || !feedback || !preview || !qrImage || !qrEmpty || !pngButton || !vcfButton || !qrButton || !clearButton) {
    throw new Error("Digital Business Card could not initialize its controls.");
  }

  let data = createEmptyBusinessCard();
  let currentVCard = "";
  let currentQr = "";
  let generation = 0;

  function readData(): BusinessCardData {
    const next = { ...data };
    form.querySelectorAll<HTMLInputElement>("input[data-field]").forEach((input) => {
      const key = input.dataset.field as keyof BusinessCardData;
      next[key] = input.value;
    });
    const theme = form.querySelector<HTMLSelectElement>('[data-option="theme"]')?.value;
    const accent = form.querySelector<HTMLSelectElement>('[data-option="accent"]')?.value;
    next.theme = theme === "dark" ? "dark" : "light";
    next.accent = accent === "blue" || accent === "teal" || accent === "rose" || accent === "amber" ? accent : "violet";
    return next;
  }

  function setFeedback(message: string, state: "error" | "success" | "" = ""): void {
    feedback.textContent = message;
    feedback.dataset.state = state;
  }

  function updateCardPreview(): void {
    const details = [
      data.email,
      data.phone,
      data.website,
    ].filter((value) => value.trim());
    preview.dataset.theme = data.theme;
    preview.dataset.accent = data.accent;
    container.querySelector("#business-card-preview-org")!.textContent = data.organization.trim() || "PERSONAL PROFILE";
    container.querySelector("#business-card-preview-name")!.textContent = data.fullName.trim() || "Your name";
    container.querySelector("#business-card-preview-job")!.textContent = data.jobTitle.trim() || "Your role or profession";
    container.querySelector("#business-card-preview-tagline")!.textContent = data.tagline.trim();
    const detailContainer = container.querySelector<HTMLDivElement>("#business-card-preview-details")!;
    detailContainer.replaceChildren(...details.map((value) => {
      const item = document.createElement("span");
      item.textContent = value;
      return item;
    }));
  }

  async function update(): Promise<void> {
    data = readData();
    updateCardPreview();
    const current = ++generation;
    currentVCard = "";
    currentQr = "";
    pngButton.disabled = true;
    vcfButton.disabled = true;
    qrButton.disabled = true;
    qrImage.hidden = true;
    qrImage.removeAttribute("src");
    qrEmpty.hidden = false;

    const validation = validateBusinessCard(data);
    if (!validation.valid) {
      const hasInput = Object.values(data).some((value) => typeof value === "string" && value.length > 0);
      setFeedback(hasInput ? validation.message : "", hasInput ? "error" : "");
      qrEmpty.textContent = "Complete your name to generate a contact QR.";
      return;
    }

    try {
      currentVCard = serializeVCard(toVCardContact(data));
      vcfButton.disabled = false;
      pngButton.disabled = false;
      setFeedback("Your business card is ready to export.", "success");
      qrEmpty.textContent = "Generating contact QR locally…";
      const qr = await generateQrPng(currentVCard);
      if (current !== generation) return;
      currentQr = qr;
      qrImage.src = qr;
      qrImage.hidden = false;
      qrEmpty.hidden = true;
      qrButton.disabled = false;
    } catch (error) {
      if (current !== generation) return;
      qrEmpty.textContent = "This contact is too large for a QR code. VCF and card PNG exports remain available.";
      setFeedback(error instanceof QrGenerationError ? error.message : "The contact preview could not be generated.", "error");
    }
  }

  form.addEventListener("input", () => void update());
  form.addEventListener("change", () => void update());

  clearButton.addEventListener("click", () => {
    form.reset();
    data = createEmptyBusinessCard();
    void update();
    form.querySelector<HTMLInputElement>('[data-field="fullName"]')?.focus();
  });

  vcfButton.addEventListener("click", () => {
    if (!currentVCard) return;
    const blob = new Blob([currentVCard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "business-card.vcf";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  pngButton.addEventListener("click", async () => {
    try {
      const blob = await exportBusinessCardPng(data);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "business-card.png";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setFeedback("Your business-card.png download has started.", "success");
    } catch {
      setFeedback("The card image could not be exported. Please try again.", "error");
    }
  });

  qrButton.addEventListener("click", () => {
    if (!currentQr) return;
    const link = document.createElement("a");
    link.href = currentQr;
    link.download = "business-card-qr.png";
    document.body.append(link);
    link.click();
    link.remove();
  });

  void update();
}
