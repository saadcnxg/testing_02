import { $ } from "./utils/dom.js";
import { systems } from "./data/index.js";
import { questions } from "./data/quiz.js";
import { stats } from "./data/stats.js";
import { initTheme } from "./components/theme.js";
import { initNavbar } from "./components/navbar.js";
import { initModal, openModal } from "./components/modal.js";
import { initSystemsGrid } from "./components/systemsGrid.js";
import { initBodyMap } from "./components/bodyMap.js";
import { initCounters } from "./components/counters.js";
import { initQuiz } from "./components/quiz.js";

initTheme($("#theme-toggle"));
initNavbar($("#nav"), $("#nav-toggle"));
initModal($("#modal"), $("#modal-content"));

initCounters($("#stats"), stats);

initBodyMap({
  container: $("#body-map"),
  info: $("#map-info"),
  systems,
  onOpen: openModal
});

initSystemsGrid({
  systems,
  grid: $("#systems-grid"),
  searchInput: $("#system-search"),
  filterWrap: $("#filters"),
  emptyEl: $("#systems-empty"),
  onOpen: openModal
});

initQuiz($("#quiz-box"), questions);

$("#year").textContent = new Date().getFullYear();