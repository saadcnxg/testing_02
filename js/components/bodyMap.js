import { $$ } from "../utils/dom.js";

const NS = "http://www.w3.org/2000/svg";

const PARTS = [
  { type: "rect", system: "muscular", attrs: { x: 36, y: 90, width: 28, height: 160, rx: 14 } },
  { type: "rect", system: "muscular", attrs: { x: 136, y: 90, width: 28, height: 160, rx: 14 } },
  { type: "rect", system: "skeletal", attrs: { x: 70, y: 255, width: 27, height: 125, rx: 13 } },
  { type: "rect", system: "skeletal", attrs: { x: 103, y: 255, width: 27, height: 125, rx: 13 } },
  { type: "rect", system: "digestive", attrs: { x: 68, y: 185, width: 64, height: 65, rx: 18 } },
  { type: "rect", system: "respiratory", attrs: { x: 66, y: 85, width: 68, height: 95, rx: 22 } },
  { type: "circle", system: "nervous", attrs: { cx: 100, cy: 42, r: 30 } }
];

const ORGANS = [
  { type: "circle", system: "endocrine", attrs: { cx: 100, cy: 76, r: 6 } },
  { type: "circle", system: "circulatory", attrs: { cx: 108, cy: 125, r: 11 } },
  { type: "ellipse", system: "immune", attrs: { cx: 122, cy: 198, rx: 6, ry: 9 } },
  { type: "ellipse", system: "urinary", attrs: { cx: 84, cy: 228, rx: 6, ry: 9 } },
  { type: "ellipse", system: "urinary", attrs: { cx: 116, cy: 228, rx: 6, ry: 9 } },
  { type: "rect", system: "integumentary", attrs: { x: 58, y: 80, width: 6, height: 6, rx: 3 } }
];

function create(def, cls, systems) {
  const system = systems.find((s) => s.id === def.system);
  const node = document.createElementNS(NS, def.type);
  Object.entries(def.attrs).forEach(([k, v]) => node.setAttribute(k, v));
  node.setAttribute("class", cls);
  node.setAttribute("tabindex", "0");
  node.setAttribute("role", "button");
  node.setAttribute("aria-label", system.name);
  node.dataset.system = system.id;
  node.style.setProperty("--accent", system.color);
  if (cls === "body-organ") node.setAttribute("fill", system.color);
  return node;
}

export function initBodyMap({ container, info, systems, onOpen }) {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 200 390");
  svg.setAttribute("role", "group");
  svg.setAttribute("aria-label", "Human body map");

  PARTS.forEach((p) => svg.append(create(p, "body-part", systems)));
  ORGANS.forEach((o) => svg.append(create(o, "body-organ", systems)));
  container.replaceChildren(svg);

  const byId = (id) => systems.find((s) => s.id === id);

  function show(id) {
    const system = byId(id);
    info.style.setProperty("--accent", system.color);
    info.innerHTML = "";
    const title = document.createElement("h3");
    title.textContent = `${system.icon} ${system.name}`;
    const text = document.createElement("p");
    text.textContent = system.summary;
    const hint = document.createElement("p");
    hint.textContent = "Click to learn more.";
    info.append(title, text, hint);
    $$("[data-system]", svg).forEach((n) => n.classList.toggle("is-active", n.dataset.system === id && n.classList.contains("body-part")));
  }

  svg.addEventListener("mouseover", (event) => {
    const node = event.target.closest("[data-system]");
    if (node) show(node.dataset.system);
  });
  svg.addEventListener("focusin", (event) => {
    const node = event.target.closest("[data-system]");
    if (node) show(node.dataset.system);
  });
  svg.addEventListener("click", (event) => {
    const node = event.target.closest("[data-system]");
    if (node) onOpen(byId(node.dataset.system));
  });
  svg.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const node = event.target.closest("[data-system]");
    if (!node) return;
    event.preventDefault();
    onOpen(byId(node.dataset.system));
  });
}