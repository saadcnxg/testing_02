import { $$ } from "../utils/dom.js";
import { createSystemCard } from "./systemCard.js";

function matches(system, query, filter) {
  const inFilter = filter === "all" || system.category === filter;
  if (!inFilter) return false;
  if (!query) return true;
  const haystack = [system.name, system.summary, ...system.organs.map((o) => o.name)].join(" ").toLowerCase();
  return haystack.includes(query);
}

export function initSystemsGrid({ systems, grid, searchInput, filterWrap, emptyEl, onOpen }) {
  let query = "";
  let filter = "all";

  function render() {
    const list = systems.filter((s) => matches(s, query, filter));
    grid.replaceChildren(...list.map((s) => createSystemCard(s, onOpen)));
    emptyEl.hidden = list.length > 0;
  }

  searchInput.addEventListener("input", () => {
    query = searchInput.value.trim().toLowerCase();
    render();
  });

  filterWrap.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-filter]");
    if (!chip) return;
    filter = chip.dataset.filter;
    $$(".chip", filterWrap).forEach((c) => c.classList.toggle("is-active", c === chip));
    render();
  });

  render();
}