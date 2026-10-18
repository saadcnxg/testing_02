import { el } from "../utils/dom.js";

function animate(node, target, suffix) {
  const duration = 1200;
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    node.textContent = Math.round(target * progress).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

export function initCounters(container, stats) {
  const nodes = stats.map((stat) => {
    const value = el("div", { class: "stat__value" }, `0${stat.suffix}`);
    container.append(el("div", { class: "stat" }, value, el("div", { class: "stat__label" }, stat.label)));
    return { value, stat };
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (!entries[0].isIntersecting) return;
      nodes.forEach(({ value, stat }) => animate(value, stat.value, stat.suffix));
      obs.disconnect();
    },
    { threshold: 0.4 }
  );
  observer.observe(container);
}