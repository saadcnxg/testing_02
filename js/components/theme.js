import { load, save } from "../utils/storage.js";

const KEY = "anatomylab-theme";

function apply(theme, button) {
  document.documentElement.dataset.theme = theme;
  button.textContent = theme === "dark" ? "☀" : "🌙";
}

export function initTheme(button) {
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  let theme = load(KEY, preferred);
  apply(theme, button);
  button.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    save(KEY, theme);
    apply(theme, button);
  });
}