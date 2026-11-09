import { generateUuidV4 } from "./index";

function copyValue(value: string): boolean {
  if (!navigator.clipboard?.writeText) return false;
  void navigator.clipboard.writeText(value).catch(() => undefined);
  return true;
}

export function renderUuidGenerator(container: HTMLElement): void {
  container.innerHTML = `
    <main class="detail-page utility-page">
      <a class="brand" href="#/"><span class="brand__mark">Q</span><span>qraft<span class="brand__dot">.</span></span></a>
      <a class="back-link" href="#/">← Back to all tools</a>
      <header class="utility-intro">
        <p class="eyebrow">DEVELOPER TOOLS</p><h1>UUID Generator</h1>
        <p class="detail-description">Generate a cryptographically random UUID version 4 in your browser.</p>
      </header>
      <section class="utility-panel utility-panel--single" aria-label="UUID Generator workspace">
        <label class="utility-label" for="uuid-output">UUID v4</label>
        <input class="utility-input utility-input--uuid" id="uuid-output" type="text" readonly spellcheck="false" placeholder="Generate a UUID…" />
        <div class="utility-actions">
          <button class="utility-button utility-button--primary" id="uuid-generate" type="button">Generate UUID</button>
          <button class="utility-button utility-button--secondary" id="uuid-copy" type="button" disabled>Copy</button>
        </div>
        <p class="utility-feedback" id="uuid-feedback" role="status" aria-live="polite"></p>
      </section>
      <p class="utility-privacy">● UUIDs are generated locally using the browser's secure random API.</p>
    </main>
  `;

  const output = container.querySelector<HTMLInputElement>("#uuid-output");
  const generate = container.querySelector<HTMLButtonElement>("#uuid-generate");
  const copy = container.querySelector<HTMLButtonElement>("#uuid-copy");
  const feedback = container.querySelector<HTMLParagraphElement>("#uuid-feedback");
  if (!output || !generate || !copy || !feedback) throw new Error("UUID Generator could not initialize.");

  generate.addEventListener("click", () => {
    try {
      output.value = generateUuidV4();
      copy.disabled = false;
      feedback.textContent = "UUID v4 generated.";
      feedback.dataset.state = "success";
    } catch (error) {
      feedback.textContent = error instanceof Error ? error.message : "Secure UUID generation is unavailable.";
      feedback.dataset.state = "error";
    }
  });

  copy.addEventListener("click", () => {
    if (!output.value) return;
    if (!copyValue(output.value)) {
      feedback.textContent = "Clipboard access is unavailable in this browser.";
      feedback.dataset.state = "error";
      return;
    }
    feedback.textContent = "UUID copied to clipboard.";
    feedback.dataset.state = "success";
  });
}
