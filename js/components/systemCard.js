import { el } from "../utils/dom.js";

export function createSystemCard(system, onOpen) {
  const card = el(
    "button",
    { class: "card", type: "button", "aria-label": `Open ${system.name}` },
    el("div", { class: "card__icon" }, system.icon),
    el("h3", { class: "card__title" }, system.name),
    el("p", { class: "card__text" }, system.summary),
    el("span", { class: "card__tag" }, system.category)
  );
  card.style.setProperty("--accent", system.color);
  card.addEventListener("click", () => onOpen(system));
  return card;
}