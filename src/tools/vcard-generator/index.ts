import { generateQrPng, QrGenerationError } from "../qr-generator/qr-service";
import { serializeVCard } from "./serializer";
import { validateVCardContact } from "./validation";
import { createEmptyContact, type VCardContact } from "./types";

export function renderVCardGenerator(container: HTMLElement): void {
  container.innerHTML = `
    <main class="detail-page vcard-page">
      <a class="brand" href="#/"><span class="brand__mark">Q</span><span>qraft<span class="brand__dot">.</span></span></a>
      <a class="back-link" href="#/">← Back to all tools</a>
      <header class="vcard-page__intro">
        <p class="eyebrow">CONTACT STUDIO</p>
        <h1>vCard Generator</h1>
        <p class="detail-description">Create a contact file you can import into your address book or share with others.</p>
      </header>

      <section class="vcard-workspace" aria-label="vCard Generator workspace">
        <form class="vcard-form-panel" id="vcard-form" novalidate>
          <div class="vcard-section-heading">
            <h2>Contact details</h2>
            <span>Required fields are marked *</span>
          </div>

          <div class="vcard-field">
            <label for="vcard-formatted-name">Full name *</label>
            <input id="vcard-formatted-name" name="formattedName" data-field="formattedName" autocomplete="name" placeholder="Ada Lovelace" required />
            <p class="vcard-field-hint">The name displayed by contact applications.</p>
          </div>

          <div class="vcard-field-grid">
            <div class="vcard-field">
              <label for="vcard-given-name">Given name</label>
              <input id="vcard-given-name" name="givenName" data-field="givenName" autocomplete="given-name" placeholder="Ada" />
            </div>
            <div class="vcard-field">
              <label for="vcard-family-name">Family name</label>
              <input id="vcard-family-name" name="familyName" data-field="familyName" autocomplete="family-name" placeholder="Lovelace" />
            </div>
          </div>

          <div class="vcard-field">
            <label for="vcard-organization">Organization</label>
            <input id="vcard-organization" name="organization" data-field="organization" autocomplete="organization" placeholder="Analytical Engines" />
          </div>

          <div class="vcard-field">
            <label for="vcard-job-title">Job title</label>
            <input id="vcard-job-title" name="jobTitle" data-field="jobTitle" autocomplete="organization-title" placeholder="Mathematician" />
          </div>

          <div class="vcard-field">
            <label for="vcard-email">Email</label>
            <input id="vcard-email" name="email" data-field="email" type="email" autocomplete="email" placeholder="ada@example.com" />
          </div>

          <div class="vcard-field">
            <label for="vcard-phone">Phone</label>
            <input id="vcard-phone" name="phone" data-field="phone" type="tel" autocomplete="tel" placeholder="+1 555 0100" />
          </div>

          <div class="vcard-field">
            <label for="vcard-website">Website</label>
            <input id="vcard-website" name="website" data-field="website" type="url" autocomplete="url" placeholder="example.com" />
            <p class="vcard-field-hint">Enter a domain or URL. HTTPS is added automatically unless you specify HTTP.</p>
          </div>

          <p class="vcard-feedback" id="vcard-feedback" role="status" aria-live="polite"></p>
          <div class="vcard-actions">
            <button class="vcard-button vcard-button--secondary" id="vcard-clear" type="button">Clear</button>
            <button class="vcard-button vcard-button--secondary" id="vcard-copy" type="button" disabled>Copy vCard</button>
            <button class="vcard-button vcard-button--primary" id="vcard-download" type="button" disabled>Download VCF</button>
          </div>
          <p class="vcard-privacy-note"><span aria-hidden="true">●</span> Contact details stay in this browser and are not saved automatically.</p>
        </form>

        <section class="vcard-preview-panel" aria-labelledby="vcard-preview-heading">
          <div class="vcard-preview-heading">
            <h2 id="vcard-preview-heading">vCard preview</h2>
            <span>VCF · vCard 3.0</span>
          </div>
          <pre class="vcard-preview" id="vcard-preview" aria-live="polite">Your contact file will appear here as you fill in the form.</pre>
          <p class="vcard-preview-note">The preview shows the contact data included in your downloaded .vcf file.</p>

          <section class="vcard-qr-section" aria-labelledby="vcard-qr-heading">
            <div class="vcard-qr-heading">
              <h2 id="vcard-qr-heading">Share as QR code</h2>
              <span>vCard payload · QR Code</span>
            </div>
            <div class="vcard-qr-stage">
              <p class="vcard-qr-empty" id="vcard-qr-empty">Complete the contact details to create a shareable QR code.</p>
              <img class="vcard-qr-image" id="vcard-qr-image" alt="QR code containing this contact's vCard data" hidden />
            </div>
            <p class="vcard-qr-note" id="vcard-qr-note">The QR code contains the same vCard data as your VCF file. Scanner behavior varies: some devices offer to save the contact, while others display the vCard text.</p>
            <button class="vcard-button vcard-button--secondary" id="vcard-qr-download" type="button" disabled>Download QR PNG</button>
            <p class="vcard-feedback" id="vcard-qr-feedback" role="status" aria-live="polite"></p>
          </section>
        </section>
      </section>
    </main>
  `;

  function requireControl<T extends HTMLElement>(selector: string): T {
    const control = container.querySelector<T>(selector);
    if (!control) {
      throw new Error("The vCard Generator control could not be initialized: " + selector);
    }
    return control;
  }

  const form = requireControl<HTMLFormElement>("#vcard-form");
  const preview = requireControl<HTMLPreElement>("#vcard-preview");
  const feedback = requireControl<HTMLParagraphElement>("#vcard-feedback");
  const copyButton = requireControl<HTMLButtonElement>("#vcard-copy");
  const downloadButton = requireControl<HTMLButtonElement>("#vcard-download");
  const clearButton = requireControl<HTMLButtonElement>("#vcard-clear");
  const qrImage = requireControl<HTMLImageElement>("#vcard-qr-image");
  const qrEmpty = requireControl<HTMLParagraphElement>("#vcard-qr-empty");
  const qrFeedback = requireControl<HTMLParagraphElement>("#vcard-qr-feedback");
  const qrDownloadButton = requireControl<HTMLButtonElement>("#vcard-qr-download");

  let currentVCard = "";
  let currentQrDataUrl = "";
  let previewGeneration = 0;

  function readContact(): VCardContact {
    const contact = createEmptyContact();
    form.querySelectorAll<HTMLInputElement>("input[data-field]").forEach((input) => {
      const field = input.dataset.field as keyof VCardContact | undefined;
      if (field) contact[field] = input.value;
    });
    return contact;
  }

  function setFeedback(message: string, state: "error" | "success" | "" = ""): void {
    feedback.textContent = message;
    feedback.dataset.state = state;
  }

  async function updatePreview(): Promise<void> {
    form.querySelectorAll<HTMLInputElement>("input[data-field]").forEach((input) => {
      input.removeAttribute("aria-invalid");
    });
    const generation = ++previewGeneration;
    currentQrDataUrl = "";
    qrDownloadButton.disabled = true;
    qrImage.hidden = true;
    qrImage.removeAttribute("src");
    qrEmpty.hidden = false;
    qrEmpty.textContent = "Generating a QR code from your vCard…";
    qrFeedback.textContent = "";
    qrFeedback.dataset.state = "";

    const contact = readContact();
    const hasInput = Object.values(contact).some((value) => value.length > 0);
    const validation = validateVCardContact(contact);
    currentVCard = "";
    copyButton.disabled = true;
    downloadButton.disabled = true;

    if (!validation.valid) {
      form.querySelector<HTMLInputElement>(`input[data-field="${validation.field}"]`)?.setAttribute("aria-invalid", "true");
      preview.textContent = hasInput ? "Complete the required details to preview your contact file." : "Your contact file will appear here as you fill in the form.";
      setFeedback(hasInput ? validation.message : "", hasInput ? "error" : "");
      qrEmpty.textContent = hasInput
        ? "Complete the required details to create a QR code."
        : "Complete the contact details to create a shareable QR code.";
      return;
    }

    try {
      currentVCard = serializeVCard(contact);
      preview.textContent = currentVCard;
      copyButton.disabled = false;
      downloadButton.disabled = false;
      setFeedback("Your vCard is ready. Contact details remain in this browser.", "success");
      qrEmpty.textContent = "Generating a QR code from your vCard…";
      qrFeedback.textContent = "Encoding the contact locally…";

      try {
        const qrDataUrl = await generateQrPng(currentVCard);
        if (generation !== previewGeneration) return;
        currentQrDataUrl = qrDataUrl;
        qrImage.src = qrDataUrl;
        qrImage.hidden = false;
        qrEmpty.hidden = true;
        qrDownloadButton.disabled = false;
        qrFeedback.textContent = "Your contact QR code is ready.";
        qrFeedback.dataset.state = "success";
      } catch (error) {
        if (generation !== previewGeneration) return;
        qrEmpty.hidden = false;
        qrEmpty.textContent = "This contact is too large to fit in a QR code. You can still download the VCF file.";
        qrFeedback.textContent = error instanceof QrGenerationError
          ? error.message
          : "The contact QR code could not be generated.";
        qrFeedback.dataset.state = "error";
      }
    } catch {
      preview.textContent = "The contact preview could not be generated.";
      setFeedback("Check the contact details and try again.", "error");
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  form.querySelectorAll<HTMLInputElement>("input[data-field]").forEach((input) => {
    input.addEventListener("input", updatePreview);
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      previewGeneration += 1;
      currentVCard = "";
      currentQrDataUrl = "";
      preview.textContent = "Your contact file will appear here as you fill in the form.";
      qrImage.hidden = true;
      qrImage.removeAttribute("src");
      qrEmpty.hidden = false;
      qrEmpty.textContent = "Complete the contact details to create a shareable QR code.";
      qrDownloadButton.disabled = true;
      qrFeedback.textContent = "";
      qrFeedback.dataset.state = "";
      copyButton.disabled = true;
      downloadButton.disabled = true;
      form.querySelectorAll<HTMLInputElement>("input[data-field]").forEach((input) => {
        input.removeAttribute("aria-invalid");
      });
      setFeedback("");
    }, 0);
  });

  copyButton.addEventListener("click", async () => {
    if (!currentVCard) return;

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard access is unavailable.");
      }
      await navigator.clipboard.writeText(currentVCard);
      setFeedback("vCard copied to your clipboard.", "success");
    } catch {
      setFeedback("Your browser could not copy the vCard. Check clipboard permissions and try again.", "error");
    }
  });

  downloadButton.addEventListener("click", () => {
    if (!currentVCard) return;

    try {
      const file = new Blob([currentVCard], { type: "text/vcard;charset=utf-8" });
      const objectUrl = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "contact.vcf";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      setFeedback("Your contact.vcf download has started.", "success");
    } catch {
      setFeedback("The VCF file could not be downloaded. Please try again.", "error");
    }
  });

  qrDownloadButton.addEventListener("click", () => {
    if (!currentQrDataUrl) return;

    try {
      const link = document.createElement("a");
      link.href = currentQrDataUrl;
      link.download = "contact-qr.png";
      document.body.append(link);
      link.click();
      link.remove();
      setFeedback("Your contact QR code download has started.", "success");
    } catch {
      qrFeedback.textContent = "The QR image could not be downloaded. Please try again.";
      qrFeedback.dataset.state = "error";
    }
  });

  clearButton.addEventListener("click", () => {
    form.reset();
    form.querySelector<HTMLInputElement>("#vcard-formatted-name")?.focus();
  });

  updatePreview();
}
