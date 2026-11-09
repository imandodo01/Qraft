import { findTool, searchTools, categories } from "./app/tool-registry";
import { resolveRoute } from "./app/router";
import { renderQrGenerator } from "./tools/qr-generator";
import "./styles.css";

function getAppRoot(): HTMLDivElement {
  const root = document.querySelector<HTMLDivElement>("#app");

  if (!root) {
    throw new Error("Qraft application root was not found.");
  }

  return root;
}

const app = getAppRoot();

let activeCategory = "";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character] ?? character;
  });
}

function renderToolCards(query = ""): string {
  const visibleTools = searchTools(query, activeCategory || undefined);

  if (visibleTools.length === 0) {
    return '<p class="empty-state">No tools match that search. Try another keyword or category.</p>';
  }

  return visibleTools
    .map(
      (tool) => `
        <article class="tool-card">
          <div class="tool-card__topline">
            <span class="tool-category">${escapeHtml(tool.category)}</span>
            <span class="status ${tool.status === "available" ? "status--available" : "status--planned"}">${tool.status === "available" ? "Available" : "Coming soon"}</span>
          </div>
          <h3>${escapeHtml(tool.name)}</h3>
          <p>${escapeHtml(tool.description)}</p>
          <a class="text-link" href="#/tools/${encodeURIComponent(tool.id)}">
            ${tool.status === "available" ? "Open tool" : "Explore tool"} <span aria-hidden="true">→</span>
          </a>
        </article>
      `,
    )
    .join("");
}

function renderHome(): void {
  app.innerHTML = `
    <div class="app-layout">
      <aside class="sidebar" aria-label="Main navigation">
        <a class="brand" href="#/" aria-label="Qraft home">
          <span class="brand__mark">Q</span>
          <span>qraft<span class="brand__dot">.</span></span>
        </a>
        <p class="sidebar__label">WORKSPACE</p>
        <a class="nav-link nav-link--active" href="#/">Discover tools</a>
        <p class="sidebar__label sidebar__label--spaced">CATEGORIES</p>
        <nav class="category-nav" aria-label="Tool categories">
          <button class="category-button ${activeCategory === "" ? "is-active" : ""}" data-category="">All tools</button>
          ${categories
            .map(
              (category) => `
                <button class="category-button ${activeCategory === category ? "is-active" : ""}" data-category="${escapeHtml(category)}">
                  ${escapeHtml(category)}
                </button>
              `,
            )
            .join("")}
        </nav>
        <div class="sidebar-note">
          <span class="sidebar-note__icon" aria-hidden="true">✳</span>
          <strong>Simple tools. Less friction.</strong>
          <p>A growing collection of practical utilities, designed to work in your browser.</p>
        </div>
      </aside>

      <main class="main-content">
        <header class="topbar">
          <span class="topbar__context">Your workspace</span>
          <span class="privacy-label"><span aria-hidden="true">●</span> Local-first by design</span>
        </header>

        <section class="hero">
          <p class="eyebrow">YOUR EVERYDAY DIGITAL TOOLBOX</p>
          <h1>Small tasks, <span>made simpler.</span></h1>
          <p class="hero__description">Useful tools for creating, converting, and organizing digital information. All in one calm, focused workspace.</p>
          <label class="search-box">
            <span class="search-box__icon" aria-hidden="true">⌕</span>
            <span class="visually-hidden">Search tools</span>
            <input id="tool-search" type="search" placeholder="Search tools, e.g. QR, JSON, Base64..." autocomplete="off" />
            <kbd>/</kbd>
          </label>
          <div class="hero__meta"><span>${tools.filter((tool) => tool.status === "available").length} available</span><span>·</span><span>${tools.filter((tool) => tool.status === "planned").length} coming soon</span><span>·</span><span>${categories.length} categories</span></div>
        </section>

        <section class="tools-section" aria-labelledby="tools-heading">
          <div class="section-heading">
            <div>
              <p class="eyebrow">THE TOOLBOX</p>
              <h2 id="tools-heading">Explore tools</h2>
            </div>
            <span class="section-caption">Choose a tool to see its details</span>
          </div>
          <div id="tool-grid" class="tool-grid">${renderToolCards()}</div>
        </section>

        <footer class="footer">
          <span>Qraft <span aria-hidden="true">·</span> Your everyday digital toolbox</span>
          <span>Built for useful little moments.</span>
        </footer>
      </main>
    </div>
  `;

  const searchInput = app.querySelector<HTMLInputElement>("#tool-search");
  searchInput?.addEventListener("input", () => {
    const grid = app.querySelector<HTMLDivElement>("#tool-grid");
    if (grid) grid.innerHTML = renderToolCards(searchInput.value);
  });

  app.querySelectorAll<HTMLButtonElement>("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category ?? "";
      renderHome();
      const input = app.querySelector<HTMLInputElement>("#tool-search");
      input?.focus();
    });
  });
}

function renderToolDetail(toolId: string): void {
  const tool = findTool(toolId);
  if (!tool) {
    renderNotFound();
    return;
  }

  if (tool.id === "qr-generator" && tool.status === "available") {
    renderQrGenerator(app);
    return;
  }

  app.innerHTML = `
    <main class="detail-page">
      <a class="brand" href="#/"><span class="brand__mark">Q</span><span>qraft<span class="brand__dot">.</span></span></a>
      <a class="back-link" href="#/">← Back to all tools</a>
      <p class="eyebrow">${escapeHtml(tool.category)}</p>
      <h1>${escapeHtml(tool.name)}</h1>
      <p class="detail-description">${escapeHtml(tool.description)}</p>
      <div class="coming-panel">
        <span class="coming-panel__icon" aria-hidden="true">✳</span>
        <h2>Coming in a future milestone</h2>
        <p>This tool is in the Qraft v1.0 plan. Its implementation will arrive in a dedicated milestone.</p>
        <a class="button-link" href="#/">Explore other tools</a>
      </div>
    </main>
  `;
}

function renderNotFound(): void {
  app.innerHTML = `
    <main class="detail-page">
      <a class="brand" href="#/"><span class="brand__mark">Q</span><span>qraft<span class="brand__dot">.</span></span></a>
      <p class="eyebrow">404 · NOT FOUND</p>
      <h1>This tool doesn't exist.</h1>
      <p class="detail-description">The address may be incorrect, or the tool may no longer be listed.</p>
      <a class="button-link" href="#/">Back to Qraft</a>
    </main>
  `;
}

function handleSearchShortcut(event: KeyboardEvent): void {
  if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;

  const searchInput = app.querySelector<HTMLInputElement>("#tool-search");
  if (!searchInput) return;

  const target = event.target;
  if (target instanceof HTMLElement && (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable)) return;

  event.preventDefault();
  searchInput.focus();
}

function render(): void {
  const route = resolveRoute(window.location.hash);
  if (route.name === "home") renderHome();
  else if (route.name === "tool" && route.toolId) renderToolDetail(route.toolId);
  else renderNotFound();
}

document.addEventListener("keydown", handleSearchShortcut);
window.addEventListener("hashchange", render);
render();
