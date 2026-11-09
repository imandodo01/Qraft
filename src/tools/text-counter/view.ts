import { countText } from "./logic";

export function renderTextCounter(container: HTMLElement): void {
  container.innerHTML = `
    <main class="detail-page utility-page">
      <a class="brand" href="#/"><span class="brand__mark">Q</span><span>qraft<span class="brand__dot">.</span></span></a>
      <a class="back-link" href="#/">← Back to all tools</a>
      <header class="utility-intro">
        <p class="eyebrow">TEXT TOOLS</p><h1>Text Counter</h1>
        <p class="detail-description">Count characters, words, and lines as you type. Characters are counted as Unicode code points.</p>
      </header>
      <section class="utility-panel utility-panel--single" aria-label="Text Counter workspace">
        <label class="utility-label" for="text-counter-input">Your text</label>
        <textarea class="utility-textarea" id="text-counter-input" rows="12" placeholder="Type or paste your text here…"></textarea>
        <div class="text-count-grid" aria-live="polite">
          <div><strong id="text-count-characters">0</strong><span>Characters</span></div>
          <div><strong id="text-count-words">0</strong><span>Words</span></div>
          <div><strong id="text-count-lines">0</strong><span>Lines</span></div>
        </div>
        <button class="utility-button utility-button--secondary" id="text-counter-clear" type="button">Clear</button>
      </section>
      <p class="utility-privacy">● Text is counted locally and is not saved.</p>
    </main>
  `;

  const input = container.querySelector<HTMLTextAreaElement>("#text-counter-input");
  const characters = container.querySelector<HTMLElement>("#text-count-characters");
  const words = container.querySelector<HTMLElement>("#text-count-words");
  const lines = container.querySelector<HTMLElement>("#text-count-lines");
  const clear = container.querySelector<HTMLButtonElement>("#text-counter-clear");
  if (!input || !characters || !words || !lines || !clear) throw new Error("Text Counter could not initialize.");

  const update = (): void => {
    const counts = countText(input.value);
    characters.textContent = String(counts.characters);
    words.textContent = String(counts.words);
    lines.textContent = String(counts.lines);
  };
  input.addEventListener("input", update);
  clear.addEventListener("click", () => {
    input.value = "";
    update();
    input.focus();
  });
}
