/* Zhe Ren portfolio — nav, lightbox, video facades */
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && window.innerWidth <= 860) {
        // allow dropdown parent taps to expand without closing
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Video facades (click to load) ---------- */
  document.querySelectorAll(".video-embed").forEach(function (el) {
    el.addEventListener("click", function () {
      if (el.dataset.loaded) return;
      var src = el.getAttribute("data-embed");
      if (!src) return;
      var iframe = document.createElement("iframe");
      iframe.src = src + (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=1";
      iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("title", el.getAttribute("aria-label") || "Video");
      el.innerHTML = "";
      el.appendChild(iframe);
      el.dataset.loaded = "1";
    });
  });

  /* ---------- Lightbox ---------- */
  var figures = Array.prototype.slice.call(document.querySelectorAll(".gallery figure[data-full]"));
  if (!figures.length) return;

  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.innerHTML =
    '<span class="lb-count"></span>' +
    '<button class="lb-btn lb-close" aria-label="Close">&times;</button>' +
    '<button class="lb-btn lb-prev" aria-label="Previous">&#8249;</button>' +
    '<button class="lb-btn lb-next" aria-label="Next">&#8250;</button>' +
    '<img alt="">' +
    '<div class="lb-cap"></div>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector(".lb-cap");
  var lbCount = lb.querySelector(".lb-count");
  var current = 0;

  function buildCaption(fig) {
    var title = fig.getAttribute("data-title") || "";
    var bits = [];
    ["data-year", "data-medium", "data-dimensions"].forEach(function (a) {
      if (fig.getAttribute(a)) bits.push(fig.getAttribute(a));
    });
    var html = "";
    if (title) html += '<span class="t">' + title + "</span>";
    if (bits.length) html += '<span class="m">' + bits.join(" &middot; ") + "</span>";
    return html;
  }

  function show(i) {
    current = (i + figures.length) % figures.length;
    var fig = figures[current];
    lbImg.src = fig.getAttribute("data-full");
    lbImg.alt = fig.getAttribute("data-title") || "Artwork by Zhe Ren";
    lbCap.innerHTML = buildCaption(fig);
    lbCount.textContent = (current + 1) + " / " + figures.length;
  }

  function open(i) { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
  function close() { lb.classList.remove("open"); document.body.style.overflow = ""; lbImg.src = ""; }

  figures.forEach(function (fig, i) {
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.addEventListener("click", function () { open(i); });
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
    });
  });

  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });
})();
