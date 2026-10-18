import { el } from "../utils/dom.js";

let modal;
let content;
let lastFocus;

function build(system) {
  return el(
    "div",
    {},
    el(
      "div",
      { class: "modal__head" },
      el("span", { class: "modal__icon" }, system.icon),
      el("h3", { class: "modal__title", id: "modal-title" }, system.name)
    ),
    el("p", { class: "modal__summary" }, system.overview),
    el("h4", {}, "Key organs & structures"),
    el(
      "div",
      {},
      system.organs.map((o) => el("div", { class: "organ" }, el("strong", {}, o.name), el("span", {}, o.role)))
    ),
    el("h4", {}, "Did you know?"),
    el("ul", { class: "facts" }, system.facts.map((f) => el("li", {}, f)))
  );
}

export function openModal(system) {
  lastFocus = document.activeElement;
  content.replaceChildren(build(system));
  modal.querySelector(".modal__panel").style.setProperty("--accent", system.color);
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal__close").focus();
}

export function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  if (lastFocus) lastFocus.focus();
}

export function initModal(modalEl, contentEl) {
  modal = modalEl;
  content = contentEl;
  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
}