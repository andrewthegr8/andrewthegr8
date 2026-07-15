/* Andrew M. Jones — portfolio. Minimal vanilla JS, no dependencies. */
(function () {
  "use strict";

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Lazy YouTube facade: click/Enter loads the embed only on demand
  function loadVideo(el) {
    var id = el.getAttribute("data-yt");
    if (!id || el.dataset.loaded) return;
    el.dataset.loaded = "1";
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
    iframe.title = el.getAttribute("aria-label") || "Video";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    el.innerHTML = "";
    el.appendChild(iframe);
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-yt]"), function (el) {
    el.addEventListener("click", function () { loadVideo(el); });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); loadVideo(el); }
    });
  });

  // Theme toggle (data-theme is pre-set by the inline head script to avoid FOUC)
  var btn = document.querySelector("[data-theme-toggle]");
  if (btn) {
    var sync = function () {
      var mode = document.documentElement.getAttribute("data-theme");
      if (!mode) {
        mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      btn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
      var lbl = btn.querySelector(".tt-label");
      if (lbl) lbl.textContent = mode === "dark" ? "Light" : "Dark";
    };
    sync();
    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      if (!current) {
        current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync();
    });
  }
})();
