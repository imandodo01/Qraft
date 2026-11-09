import "./styles.css";
import { generateQrPng, QrGenerationError } from "./qr-service";
import { validateQrContent, type QrContentType } from "./validation";

export function renderQrGenerator(container: HTMLElement): void {
  container.innerHTML = [
    '<main class="detail-page qr-page">',
    '  <a class="brand" href="#/"><span class="brand__mark">Q</span><span>qraft<span class="brand__dot">.</span></span></a>',
    '  <a class="back-link" href="#/">← Back to all tools</a>',
    '  <header class="qr-page__intro">',
    '    <p class="eyebrow">QR STUDIO</p>',
    '    <h1>QR Generator</h1>',
    '    <p class="detail-description">Turn a link or a piece of text into a QR code you can scan and share.</p>',
    '  </header>',
    '  <section class="qr-workspace" aria-label="QR Generator workspace">',
    '    <div class="qr-form-panel">',
    '      <label class="qr-field-label" for="qr-content-type">Content type</label>',
    '      <select class="qr-select" id="qr-content-type">',
    '        <option value="url">Website URL</option>',
    '        <option value="text">Plain text</option>',
    '      </select>',
    '      <label class="qr-field-label" for="qr-input">Your content</label>',
    '      <textarea class="qr-textarea" id="qr-input" rows="6" spellcheck="false" autocomplete="off" aria-describedby="qr-input-hint qr-feedback" placeholder="https://example.com"></textarea>',
    '      <p class="qr-input-hint" id="qr-input-hint">Enter a complete website address starting with http:// or https://.</p>',
    '      <p class="qr-feedback" id="qr-feedback" role="status" aria-live="polite"></p>',
    '      <div class="qr-actions">',
    '        <button class="qr-button qr-button--secondary" id="qr-clear" type="button">Clear</button>',
    '        <button class="qr-button qr-button--primary" id="qr-download" type="button" disabled>Download PNG</button>',
    '      </div>',
    '      <p class="qr-privacy-note"><span aria-hidden="true">●</span> Your content is processed locally in this browser.</p>',
    '    </div>',
    '    <div class="qr-preview-panel">',
    '      <div class="qr-preview-heading"><h2>Preview</h2><span>PNG · 320 × 320</span></div>',
    '      <div class="qr-preview-stage">',
    '        <p class="qr-preview-empty" id="qr-preview-empty">Your QR code will appear here.</p>',
    '        <img class="qr-preview-image" id="qr-preview-image" alt="Generated QR code for your entered content" hidden />',
    '      </div>',
    '      <p class="qr-preview-note">Point your phone camera at the code to read its content. Always check the destination before opening a link.</p>',
    '    </div>',
    '  </section>',
    '</main>',
  ].join("");

  const contentType = container.querySelector<HTMLSelectElement>("#qr-content-type");
  const input = container.querySelector<HTMLTextAreaElement>("#qr-input");
  const inputHint = container.querySelector<HTMLParagraphElement>("#qr-input-hint");
  const feedback = container.querySelector<HTMLParagraphElement>("#qr-feedback");
  const previewEmpty = container.querySelector<HTMLParagraphElement>("#qr-preview-empty");
  const previewImage = container.querySelector<HTMLImageElement>("#qr-preview-image");
  const clearButton = container.querySelector<HTMLButtonElement>("#qr-clear");
  const downloadButton = container.querySelector<HTMLButtonElement>("#qr-download");

  if (!contentType || !input || !inputHint || !feedback || !previewEmpty || !previewImage || !clearButton || !downloadButton) {
    throw new Error("QR Generator controls could not be initialized.");
  }

  let generationId = 0;
  let currentDataUrl = "";

  function setFeedback(message: string, state: "error" | "success" | "" = ""): void {
    feedback.textContent = message;
    feedback.dataset.state = state;
  }

  async function updatePreview(): Promise<void> {
    const currentGeneration = ++generationId;
    currentDataUrl = "";
    downloadButton.disabled = true;
    previewImage.hidden = true;
    previewImage.removeAttribute("src");
    previewEmpty.hidden = false;

    const selectedType = contentType.value as QrContentType;
    const validation = validateQrContent(input.value, selectedType);

    if (!validation.valid) {
      const hasInput = input.value.length > 0;
      previewEmpty.textContent = hasInput ? "Fix the content to see your QR code." : "Your QR code will appear here.";
      setFeedback(hasInput ? validation.message : "", hasInput ? "error" : "");
      return;
    }

    previewEmpty.textContent = "Generating your QR code…";
    setFeedback("Generating QR code locally…");

    try {
      const dataUrl = await generateQrPng(validation.normalizedContent);
      if (currentGeneration !== generationId) return;

      currentDataUrl = dataUrl;
      previewImage.src = dataUrl;
      previewImage.hidden = false;
      previewEmpty.hidden = true;
      downloadButton.disabled = false;
      setFeedback("QR code ready. Your content stays in this browser.", "success");
    } catch (error) {
      if (currentGeneration !== generationId) return;

      previewEmpty.textContent = "QR preview unavailable.";
      const message = error instanceof QrGenerationError
        ? error.message
        : "The QR code could not be generated. Try again with different content.";
      setFeedback(message, "error");
    }
  }

  contentType.addEventListener("change", () => {
    if (contentType.value === "url") {
      input.placeholder = "https://example.com";
      inputHint.textContent = "Enter a complete website address starting with http:// or https://.";
    } else {
      input.placeholder = "Write or paste your text here…";
      inputHint.textContent = "Text, spaces, line breaks, and Unicode characters are supported within QR capacity.";
    }
    void updatePreview();
  });

  input.addEventListener("input", () => void updatePreview());

  clearButton.addEventListener("click", () => {
    input.value = "";
    input.focus();
    void updatePreview();
  });

  downloadButton.addEventListener("click", () => {
    if (!currentDataUrl) return;

    try {
      const downloadLink = document.createElement("a");
      downloadLink.href = currentDataUrl;
      downloadLink.download = "qraft-qr.png";
      document.body.append(downloadLink);
      downloadLink.click();
      setFeedback("PNG download requested.", "success");
      downloadLink.remove();
    } catch {
      setFeedback("Your browser could not start the PNG download. Please try again.", "error");
    }
  });
}
