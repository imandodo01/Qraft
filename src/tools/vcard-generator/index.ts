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
            <input id="vcard-website" name="website" data-field="website" type="url" autocomplete="url" placeholder="https://example.com" />
            <p class="vcard-field-hint">Use a complete HTTP or HTTPS address.</p>
          </div>

          <p class="vcard-feedback" id="vcard-feedback" role="status" aria-live="polite"></p>
          <div class="vcard-actions">
            <button class="vcard-button vcard-button--secondary" id="vcard-clear" type="reset">Clear</button>
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
          <p class="vcard-preview-note">The preview shows the contact data that will be included in your downloaded .vcf file.</p>
        </section>
      </section>
    </main>
  `;

  const form = container.querySelector<HTMLFormElement>("#vcard-form");
  const preview = container.querySelector<HTMLPreElement>("#vcard-preview");
  const feedback = container.querySelector<HTMLParagraphElement>("#vcard-feedback");
  const copyButton = container.querySelector<HTMLButtonElement>("#vcard-copy");
  const downloadButton = container.querySelector<HTMLButtonElement>("#vcard-download");
  const clearButton = container.querySelector<HTMLButtonElement>("#vcard-clear");

  if (!form || !preview || !feedback || !copyButton || !downloadButton || !clearButton) {
    throw new Error("The vCard Generator workspace could not be initialized.");
  }

  let currentVCard = "";

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

  function updatePreview(): void {
    const contact = readContact();
    const hasInput = Object.values(contact).some((value) => value.length > 0);
    const validation = validateVCardContact(contact);
    currentVCard = "";
    copyButton.disabled = true;
    downloadButton.disabled = true;

    if (!validation.valid) {
      preview.textContent = hasInput ? "Complete the required details to preview your contact file." : "Your contact file will appear here as you fill in the form.";
      setFeedback(hasInput ? validation.message : "");
      return;
    }

    try {
      currentVCard = serializeVCard(contact);
      preview.textContent = currentVCard;
      copyButton.disabled = false;
      downloadButton.disabled = false;
      setFeedback("Your vCard is ready. Contact details remain in this browser.", "success");
    } catch {
      preview.textContent = "The contact preview could not be generated.";
      setFeedback("Check the contact details and try again.", "error");
    }
  }

  form.querySelectorAll<HTMLInputElement>("input[data-field]").forEach((input) => {
    input.addEventListener("input", updatePreview);
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      currentVCard = "";
      preview.textContent = "Your contact file will appear here as you fill in the form.";
      copyButton.disabled = true;
      downloadButton.disabled = true;
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
      URL.revokeObjectURL(objectUrl);
      setFeedback("Your contact.vcf download has started.", "success");
    } catch {
      setFeedback("The VCF file could not be downloaded. Please try again.", "error");
    }
  });

  clearButton.addEventListener("click", () => {
    form.reset();
    form.querySelector<HTMLInputElement>("#vcard-formatted-name")?.focus();
  });

  updatePreview();
}
