export interface TransformMode {
  value: string;
  label: string;
}

export interface TransformToolOptions {
  id: string;
  category: string;
  title: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  outputLabel: string;
  actionLabel: string;
  modes: TransformMode[];
  initialMode?: string;
  transform: (input: string, mode: string) => string;
}

function copyText(value: string): boolean {
  const fallback = (): boolean => {
    const temporary = document.createElement("textarea");
    temporary.value = value;
    temporary.setAttribute("readonly", "");
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";
    document.body.append(temporary);
    temporary.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    temporary.remove();
    return copied;
  };

  if (!navigator.clipboard?.writeText) return fallback();
  void navigator.clipboard.writeText(value).catch(() => {
    fallback();
  });
  return true;
}

export function renderTransformTool(container: HTMLElement, options: TransformToolOptions): void {
  const modeControl = options.modes.length > 1
    ? `<label class="utility-label" for="${options.id}-mode">Action</label>
       <select class="utility-select" id="${options.id}-mode">
         ${options.modes.map((mode) => `<option value="${mode.value}">${mode.label}</option>`).join("")}
       </select>`
    : "";

  container.innerHTML = `
    <main class="detail-page utility-page">
      <a class="brand" href="#/"><span class="brand__mark">Q</span><span>qraft<span class="brand__dot">.</span></span></a>
      <a class="back-link" href="#/">← Back to all tools</a>
      <header class="utility-intro">
        <p class="eyebrow">${options.category.toUpperCase()}</p>
        <h1>${options.title}</h1>
        <p class="detail-description">${options.description}</p>
      </header>
      <section class="utility-workspace" aria-label="${options.title} workspace">
        <div class="utility-panel">
          ${modeControl}
          <label class="utility-label" for="${options.id}-input">${options.inputLabel}</label>
          <textarea class="utility-textarea" id="${options.id}-input" rows="10" spellcheck="false" autocomplete="off" placeholder="${options.inputPlaceholder}"></textarea>
          <div class="utility-actions">
            <button class="utility-button utility-button--primary" id="${options.id}-run" type="button">${options.actionLabel}</button>
            <button class="utility-button utility-button--secondary" id="${options.id}-clear" type="button">Clear</button>
          </div>
        </div>
        <div class="utility-panel">
          <label class="utility-label" for="${options.id}-output">${options.outputLabel}</label>
          <textarea class="utility-textarea utility-textarea--output" id="${options.id}-output" rows="10" readonly aria-label="${options.outputLabel}" placeholder="Your result will appear here."></textarea>
          <div class="utility-actions">
            <button class="utility-button utility-button--secondary" id="${options.id}-copy" type="button" disabled>Copy output</button>
          </div>
          <p class="utility-feedback" id="${options.id}-feedback" role="status" aria-live="polite"></p>
        </div>
      </section>
      <p class="utility-privacy">● Input is processed locally in this browser. Nothing is uploaded.</p>
    </main>
  `;

  const input = container.querySelector<HTMLTextAreaElement>(`#${options.id}-input`);
  const output = container.querySelector<HTMLTextAreaElement>(`#${options.id}-output`);
  const feedback = container.querySelector<HTMLParagraphElement>(`#${options.id}-feedback`);
  const runButton = container.querySelector<HTMLButtonElement>(`#${options.id}-run`);
  const clearButton = container.querySelector<HTMLButtonElement>(`#${options.id}-clear`);
  const copyButton = container.querySelector<HTMLButtonElement>(`#${options.id}-copy`);
  const modeSelect = container.querySelector<HTMLSelectElement>(`#${options.id}-mode`);

  if (!input || !output || !feedback || !runButton || !clearButton || !copyButton) {
    throw new Error(`${options.title} could not initialize its controls.`);
  }

  if (modeSelect && options.initialMode) modeSelect.value = options.initialMode;

  runButton.addEventListener("click", () => {
    const mode = modeSelect?.value ?? options.modes[0]?.value ?? "";
    try {
      const result = options.transform(input.value, mode);
      output.value = result;
      copyButton.disabled = result.length === 0;
      feedback.textContent = "Done. Your input is unchanged.";
      feedback.dataset.state = "success";
    } catch (error) {
      feedback.textContent = error instanceof Error ? error.message : "This input could not be processed.";
      feedback.dataset.state = "error";
    }
  });

  clearButton.addEventListener("click", () => {
    input.value = "";
    output.value = "";
    copyButton.disabled = true;
    feedback.textContent = "";
    feedback.dataset.state = "";
    input.focus();
  });

  copyButton.addEventListener("click", () => {
    if (!output.value) return;
    const copied = copyText(output.value);
    feedback.textContent = copied ? "Output copied to clipboard." : "Clipboard access is unavailable in this browser.";
    feedback.dataset.state = copied ? "success" : "error";
  });
}
