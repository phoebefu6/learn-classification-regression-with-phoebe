/* algo-live.js - the live decision-boundary explorer for
   learn-classification-regression-with-phoebe.

   Drop <div class="algo-live" data-tool="boundary"></div> on any page.
   Optional: data-algo="logistic|knn|tree|rbf" preselects an algorithm,
             data-data="lumen|lab" preselects a dataset.

   Everything runs in the browser: logistic regression is fit by gradient
   descent, kNN is brute-force, the tree is real CART with gini, and RBF is
   kernel logistic regression - all on a fixed 70/30 train/test split so the
   train-vs-test gap (the overfitting tell) is always on display.

   The "Lumen real" dataset is a 300-point balanced sample of real generator
   output (150 converters + 150 non-converters, seed 42), features
   prior_30d_spend x pages_viewed, standardized. The "Lab" dataset is a
   stylized two-moons set for geometry intuition - labelled as such. */

(function () {
  "use strict";

  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  function palette() {
    return {
      classA: cssVar("--indigo", "#D6336C"),      /* magenta = converted */
      classB: cssVar("--amber", "#0CA4B8"),       /* cyan = did not convert */
      ink: cssVar("--ink", "#1C2233"),
      muted: cssVar("--muted", "#636D85"),
      faint: cssVar("--faint", "#C9CEDD"),
      tint: cssVar("--indigo-50", "#FDEEF4")
    };
  }
  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function svgEl(tag, attrs) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  /* ---------- datasets ---------- */
  var LUMEN = [[0.41,-1.69,1],[0.37,0.97,1],[-0.56,0.44,1],[-1.1,-0.09,1],[1.41,-0.62,1],[-1.27,0.44,1],[0.05,-0.09,1],[-0.38,-1.69,1],[0.39,-0.09,1],[0.57,-1.16,1],[1.14,1.5,1],[-0.12,0.44,1],[1.99,-0.09,1],[0.11,-0.09,1],[-0.89,0.44,1],[1.13,-0.09,1],[2.43,0.97,1],[0.2,-0.09,1],[0.2,-0.62,1],[-0.21,1.5,1],[-0.83,-0.09,1],[1.32,-0.62,1],[-0.78,-1.16,1],[-0.31,-1.16,1],[-0.09,-0.09,1],[0.17,-0.62,1],[-1.33,-0.09,1],[0.95,-0.09,1],[0.3,0.97,1],[1.2,-0.62,1],[0.02,-0.09,1],[1.88,2.04,1],[-0.18,-0.09,1],[-0.54,0.44,1],[2.04,-0.09,1],[-0.63,-1.16,1],[0.81,0.44,1],[2.61,-0.62,1],[-0.88,0.97,1],[-0.75,-1.16,1],[0.18,-0.09,1],[-1.13,-0.62,1],[0.34,-0.09,1],[0.38,-1.16,1],[-0.11,-0.09,1],[1.45,-0.09,1],[-0.01,0.97,1],[0.38,-1.69,1],[-0.26,-0.09,1],[-0.07,0.97,1],[0.85,-0.09,1],[-1.23,0.97,1],[-0.32,-1.69,1],[0.08,0.44,1],[0.14,0.97,1],[-0.1,0.44,1],[-0.35,2.04,1],[-1.09,0.44,1],[0.1,-0.09,1],[-1.23,-1.69,1],[-0.87,-0.09,1],[-0.56,0.97,1],[-1.17,1.5,1],[0.09,-0.09,1],[-1.0,3.1,1],[1.87,-0.09,1],[-0.8,0.97,1],[0.6,0.44,1],[0.49,-2.22,1],[-0.69,-0.09,1],[-0.84,-0.62,1],[0.55,-0.09,1],[0.42,1.5,1],[4.49,-0.09,1],[-0.62,0.97,1],[-1.01,-0.09,1],[-1.05,-0.09,1],[-1.21,0.44,1],[1.9,0.44,1],[0.1,-0.09,1],[3.67,-1.69,1],[0.34,1.5,1],[-0.52,-0.09,1],[-0.77,1.5,1],[-0.03,-0.62,1],[-0.3,-0.09,1],[1.23,1.5,1],[0.01,-0.62,1],[-0.28,-1.69,1],[-0.04,-0.62,1],[0.04,-0.09,1],[-1.17,0.97,1],[-0.81,-1.16,1],[1.27,-1.69,1],[-1.09,-1.16,1],[-1.33,-0.09,1],[1.29,0.97,1],[0.78,0.97,1],[-0.59,-1.69,1],[0.56,0.44,1],[-0.25,0.97,1],[-0.63,0.97,1],[1.51,0.44,1],[0.2,0.44,1],[0.27,0.44,1],[-1.09,-0.62,1],[-0.81,0.97,1],[0.95,1.5,1],[-0.33,1.5,1],[1.36,-1.69,1],[-0.39,-0.09,1],[0.15,2.04,1],[-0.36,2.04,1],[-0.78,-0.09,1],[0.61,-0.09,1],[-0.77,2.57,1],[-0.04,-1.16,1],[0.41,-0.09,1],[-0.83,0.44,1],[-0.19,0.44,1],[-0.56,0.97,1],[-1.08,-1.69,1],[0.58,0.44,1],[-1.05,-0.09,1],[-0.57,0.44,1],[1.04,-0.62,1],[-1.25,-0.09,1],[0.36,0.44,1],[-0.27,-1.16,1],[-0.8,-0.09,1],[1.08,-1.69,1],[2.54,-0.09,1],[-1.19,-0.09,1],[0.57,-0.62,1],[1.12,0.97,1],[-0.85,-2.22,1],[0.08,0.44,1],[-0.6,-0.09,1],[-0.34,-1.16,1],[-0.39,-0.62,1],[-0.07,-0.09,1],[0.57,0.44,1],[1.92,-1.16,1],[0.03,0.97,1],[0.06,0.44,1],[0.61,0.44,1],[-0.71,0.44,1],[-0.32,0.44,1],[-0.32,-0.62,1],[2.18,0.97,1],[-0.82,-0.09,0],[1.37,-0.62,0],[-0.37,0.44,0],[-1.36,1.5,0],[0.05,-0.09,0],[-1.43,0.44,0],[-0.75,-0.09,0],[-0.96,-1.16,0],[-0.22,-0.09,0],[1.49,-1.16,0],[0.09,-0.62,0],[-0.23,-1.16,0],[1.12,-0.62,0],[-0.79,-0.62,0],[-1.18,-1.16,0],[-1.02,-0.09,0],[-0.26,-0.09,0],[0.28,0.44,0],[1.21,0.44,0],[-0.9,0.97,0],[-1.01,0.97,0],[-0.96,0.44,0],[2.1,-1.69,0],[-0.55,-0.62,0],[-0.04,0.97,0],[-0.99,-1.16,0],[-0.33,-0.62,0],[-0.27,0.97,0],[0.76,0.44,0],[-0.27,0.44,0],[-1.34,0.44,0],[-0.2,0.97,0],[-0.31,-0.09,0],[0.68,-0.09,0],[-0.46,-0.09,0],[-0.69,-1.16,0],[-1.36,-0.62,0],[-0.46,-0.62,0],[0.53,-1.69,0],[0.91,-1.16,0],[-0.51,1.5,0],[3.1,-0.62,0],[2.26,0.44,0],[2.62,2.57,0],[-0.2,0.44,0],[-0.01,-1.16,0],[0.49,0.44,0],[-0.32,-1.16,0],[-0.36,0.44,0],[-0.71,0.44,0],[0.91,-0.09,0],[-1.03,-0.09,0],[-0.7,-0.62,0],[-0.85,0.97,0],[0.5,0.44,0],[1.03,-1.69,0],[-0.4,-0.09,0],[-0.34,-0.09,0],[-1.04,0.97,0],[-1.37,0.97,0],[-0.08,-0.09,0],[-0.31,-0.62,0],[-0.25,-0.62,0],[-0.96,0.44,0],[1.79,-0.62,0],[0.35,0.44,0],[-0.43,-0.62,0],[-0.42,-0.09,0],[-0.77,-0.09,0],[-1.3,0.44,0],[0.2,0.44,0],[-1.03,-0.09,0],[-1.16,-1.16,0],[0.58,-0.62,0],[0.12,-0.09,0],[2.34,-0.09,0],[-0.5,-1.16,0],[-0.8,-0.62,0],[-0.56,3.1,0],[-0.5,-0.62,0],[0.91,-0.62,0],[-0.23,0.97,0],[0.52,0.97,0],[3.38,-1.16,0],[0.43,-1.16,0],[0.61,-1.69,0],[-1.44,-0.09,0],[-0.3,-0.62,0],[1.44,0.97,0],[0.32,0.97,0],[0.2,0.44,0],[-0.88,1.5,0],[0.39,1.5,0],[-0.69,2.04,0],[0.6,-0.62,0],[0.43,1.5,0],[2.83,-1.16,0],[-0.92,-0.62,0],[-1.04,-0.62,0],[0.69,0.44,0],[-1.02,-0.09,0],[0.14,-0.09,0],[-1.42,0.44,0],[-0.55,0.44,0],[-1.11,-0.62,0],[-0.78,1.5,0],[0.99,-1.69,0],[-1.11,-0.09,0],[1.2,-0.09,0],[-0.38,-0.62,0],[-0.5,-0.09,0],[0.14,-1.16,0],[-0.58,-1.16,0],[0.55,-1.16,0],[-0.87,-0.09,0],[-1.34,-1.16,0],[-0.11,0.44,0],[0.28,-0.09,0],[-0.83,0.44,0],[-1.3,1.5,0],[0.24,-1.69,0],[0.87,-0.09,0],[-0.99,2.57,0],[-0.77,-1.16,0],[-0.35,2.57,0],[-0.33,0.97,0],[-1.09,0.44,0],[-0.83,-0.62,0],[0.21,-0.09,0],[0.07,-0.62,0],[-0.02,0.97,0],[1.9,1.5,0],[-0.98,0.97,0],[0.01,-0.62,0],[0.83,-0.62,0],[-1.42,-0.09,0],[-0.85,-0.09,0],[0.29,2.57,0],[0.33,0.44,0],[-0.87,-1.16,0],[0.44,-1.16,0],[0.19,-1.69,0],[-0.44,-1.69,0],[-0.6,0.44,0],[2.11,-2.22,0],[0.31,-1.16,0],[0.06,0.97,0],[-0.77,-1.69,0],[-0.31,2.04,0],[0.47,-0.62,0]];

  function twoMoons() {
    var r = rng(7), pts = [], i, t, n = 0.22;
    function g() { /* Box-Muller */
      var u = Math.max(r(), 1e-9), v = r();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }
    for (i = 0; i < 150; i++) {
      t = Math.PI * r();
      pts.push([Math.cos(t) - 0.5 + g() * n, Math.sin(t) - 0.25 + g() * n, 1]);
    }
    for (i = 0; i < 150; i++) {
      t = Math.PI * r();
      pts.push([0.5 - Math.cos(t) + g() * n, 0.25 - Math.sin(t) + g() * n, 0]);
    }
    return pts;
  }

  function splitData(pts) {
    var r = rng(42), tr = [], te = [];
    pts.forEach(function (p) { (r() < 0.3 ? te : tr).push(p); });
    return { tr: tr, te: te };
  }

  /* ---------- models: each returns f(x, y) -> P(class 1) ---------- */

  function fitLogistic(tr) {
    var w0 = 0, w1 = 0, b = 0, it, i, z, p, g0, g1, gb, n = tr.length;
    for (it = 0; it < 400; it++) {
      g0 = 0; g1 = 0; gb = 0;
      for (i = 0; i < n; i++) {
        z = w0 * tr[i][0] + w1 * tr[i][1] + b;
        p = 1 / (1 + Math.exp(-z)) - tr[i][2];
        g0 += p * tr[i][0]; g1 += p * tr[i][1]; gb += p;
      }
      w0 -= 0.5 * g0 / n; w1 -= 0.5 * g1 / n; b -= 0.5 * gb / n;
    }
    return function (x, y) { return 1 / (1 + Math.exp(-(w0 * x + w1 * y + b))); };
  }

  function fitKnn(tr, k) {
    return function (x, y) {
      var d = tr.map(function (p) {
        return [(p[0] - x) * (p[0] - x) + (p[1] - y) * (p[1] - y), p[2]];
      });
      d.sort(function (a, b) { return a[0] - b[0]; });
      var s = 0, i, kk = Math.min(k, d.length);
      for (i = 0; i < kk; i++) s += d[i][1];
      return s / kk;
    };
  }

  function gini(c1, n) {
    if (!n) return 0;
    var p = c1 / n;
    return 2 * p * (1 - p);
  }
  function fitTree(tr, maxDepth) {
    function grow(idx, depth) {
      var n = idx.length, c1 = 0, i;
      for (i = 0; i < n; i++) c1 += tr[idx[i]][2];
      var node = { p: n ? c1 / n : 0.5 };
      if (depth >= maxDepth || n < 6 || c1 === 0 || c1 === n) return node;
      var best = { g: gini(c1, n) - 1e-9 };
      [0, 1].forEach(function (f) {
        var sorted = idx.slice().sort(function (a, b) { return tr[a][f] - tr[b][f]; });
        var lc = 0, j;
        for (j = 1; j < n; j++) {
          lc += tr[sorted[j - 1]][2];
          if (tr[sorted[j]][f] === tr[sorted[j - 1]][f]) continue;
          var g = (j * gini(lc, j) + (n - j) * gini(c1 - lc, n - j)) / n;
          if (g < best.g) best = { g: g, f: f, thr: (tr[sorted[j]][f] + tr[sorted[j - 1]][f]) / 2 };
        }
      });
      if (best.f == null) return node;
      var L = [], R = [];
      idx.forEach(function (ii) { (tr[ii][best.f] < best.thr ? L : R).push(ii); });
      if (!L.length || !R.length) return node;
      node.f = best.f; node.thr = best.thr;
      node.L = grow(L, depth + 1); node.R = grow(R, depth + 1);
      return node;
    }
    var root = grow(tr.map(function (_, i) { return i; }), 0);
    return function (x, y) {
      var nd = root, v;
      while (nd.f != null) { v = nd.f === 0 ? x : y; nd = v < nd.thr ? nd.L : nd.R; }
      return nd.p;
    };
  }

  function fitRbf(tr, gamma) {
    /* kernel logistic regression: one weight per training point */
    var n = tr.length, K = [], i, j, d0, d1;
    for (i = 0; i < n; i++) {
      K.push(new Float64Array(n));
      for (j = 0; j < n; j++) {
        d0 = tr[i][0] - tr[j][0]; d1 = tr[i][1] - tr[j][1];
        K[i][j] = Math.exp(-gamma * (d0 * d0 + d1 * d1));
      }
    }
    var a = new Float64Array(n), b = 0, it, z, p, gb, g;
    for (it = 0; it < 120; it++) {
      var err = new Float64Array(n);
      gb = 0;
      for (i = 0; i < n; i++) {
        z = b;
        for (j = 0; j < n; j++) z += a[j] * K[i][j];
        p = 1 / (1 + Math.exp(-z)) - tr[i][2];
        err[i] = p; gb += p;
      }
      for (j = 0; j < n; j++) {
        g = 0;
        for (i = 0; i < n; i++) g += err[i] * K[i][j];
        a[j] -= 1.2 * g / n + 0.002 * a[j];
      }
      b -= 1.2 * gb / n;
    }
    return function (x, y) {
      var z = b, dd;
      for (var jj = 0; jj < n; jj++) {
        dd = (tr[jj][0] - x) * (tr[jj][0] - x) + (tr[jj][1] - y) * (tr[jj][1] - y);
        z += a[jj] * Math.exp(-gamma * dd);
      }
      return 1 / (1 + Math.exp(-z));
    };
  }

  function accuracy(f, pts) {
    var ok = 0;
    pts.forEach(function (p) { if ((f(p[0], p[1]) >= 0.5 ? 1 : 0) === p[2]) ok++; });
    return ok / pts.length;
  }

  /* ---------- the widget ---------- */

  var ALGOS = {
    logistic: { name: "Logistic regression", knob: null,
      note: "No knob - logistic regression IS a straight line (in these 2 features). Watch it stay calm on both datasets." },
    knn: { name: "k-nearest neighbors", knob: { label: "k (neighbors)", min: 1, max: 75, step: 2, val: 15 },
      note: "k=1 memorizes every point (train acc ~100%, test acc drops). Big k smooths toward the majority. The gap between the two accuracies is the overfitting tell." },
    tree: { name: "Decision tree", knob: { label: "max_depth", min: 1, max: 12, step: 1, val: 3 },
      note: "Trees cut axis-parallel rectangles - real CART with gini, fit live. Crank depth and watch it carve one box per training point." },
    rbf: { name: "RBF kernel (kernel logistic)", knob: { label: "gamma", min: 0.1, max: 8, step: 0.1, val: 0.5 },
      note: "gamma = how far one point's influence reaches. Small gamma ~ almost linear; big gamma wraps a wiggly boundary around individual points - overfitting in slow motion." }
  };

  function buildBoundary(root) {
    var P = palette();
    var dataMode = root.getAttribute("data-data") || "lumen";
    var algoKey = root.getAttribute("data-algo") || "logistic";
    var knobVal = null;

    root.appendChild(el("div", "al-title", "🧪 Live boundary explorer - real models, fit in your browser"));
    var bar = el("div", "al-bar");
    root.appendChild(bar);

    var dataSel = el("select", "al-sel");
    dataSel.innerHTML = '<option value="lumen">Lumen real (spend x pages, standardized)</option>' +
      '<option value="lab">Lab: two moons (stylized, NOT Lumen data)</option>';
    dataSel.value = dataMode;
    bar.appendChild(dataSel);

    var algoSel = el("select", "al-sel");
    Object.keys(ALGOS).forEach(function (k) {
      var o = document.createElement("option");
      o.value = k; o.textContent = ALGOS[k].name;
      algoSel.appendChild(o);
    });
    algoSel.value = algoKey;
    bar.appendChild(algoSel);

    var knobWrap = el("span", "al-knob");
    var knobLabel = el("label", "al-klabel");
    var knob = document.createElement("input");
    knob.type = "range";
    knobWrap.appendChild(knobLabel); knobWrap.appendChild(knob);
    bar.appendChild(knobWrap);

    var W = 560, H = 380, pad = 8;
    var svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, "class": "al-svg", role: "img",
      "aria-label": "Decision boundary of the selected algorithm on a 2D dataset" });
    root.appendChild(svg);
    var read = el("div", "al-read");
    root.appendChild(read);
    var note = el("p", "al-note");
    root.appendChild(note);

    var CX = 56, CY = 38; /* grid cells */
    var cells = [];
    (function () {
      var g = svgEl("g", {});
      for (var j = 0; j < CY; j++) for (var i = 0; i < CX; i++) {
        var r = svgEl("rect", {
          x: pad + i * (W - 2 * pad) / CX, y: pad + j * (H - 2 * pad) / CY,
          width: (W - 2 * pad) / CX + 0.5, height: (H - 2 * pad) / CY + 0.5, fill: "#fff"
        });
        g.appendChild(r); cells.push(r);
      }
      svg.appendChild(g);
    })();
    var ptsG = svgEl("g", {});
    svg.appendChild(ptsG);

    var data, split, bounds;
    function setData() {
      data = dataMode === "lumen" ? LUMEN : twoMoons();
      split = splitData(data);
      var xs = data.map(function (p) { return p[0]; }), ys = data.map(function (p) { return p[1]; });
      bounds = {
        x0: Math.min.apply(null, xs) - 0.3, x1: Math.max.apply(null, xs) + 0.3,
        y0: Math.min.apply(null, ys) - 0.3, y1: Math.max.apply(null, ys) + 0.3
      };
      ptsG.innerHTML = "";
      data.forEach(function (p) {
        ptsG.appendChild(svgEl("circle", {
          cx: sx(p[0]), cy: sy(p[1]), r: 3.2,
          fill: p[2] ? P.classA : P.classB, "fill-opacity": 0.85,
          stroke: "#fff", "stroke-width": 0.8
        }));
      });
    }
    function sx(x) { return pad + (x - bounds.x0) / (bounds.x1 - bounds.x0) * (W - 2 * pad); }
    function sy(y) { return H - pad - (y - bounds.y0) / (bounds.y1 - bounds.y0) * (H - 2 * pad); }

    function hexToRgb(h) {
      return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    }
    var A = hexToRgb(P.classA), B = hexToRgb(P.classB);

    function refresh() {
      var cfg = ALGOS[algoSel.value], f;
      if (cfg.knob) {
        knobWrap.style.display = "";
        knob.min = cfg.knob.min; knob.max = cfg.knob.max; knob.step = cfg.knob.step;
        if (knobVal == null) knob.value = cfg.knob.val;
        knobVal = +knob.value;
        knobLabel.textContent = cfg.knob.label + " = " + knobVal;
      } else { knobWrap.style.display = "none"; }

      if (algoSel.value === "logistic") f = fitLogistic(split.tr);
      else if (algoSel.value === "knn") f = fitKnn(split.tr, knobVal);
      else if (algoSel.value === "tree") f = fitTree(split.tr, knobVal);
      else f = fitRbf(split.tr, knobVal);

      var k = 0;
      for (var j = 0; j < CY; j++) for (var i = 0; i < CX; i++) {
        var x = bounds.x0 + (i + 0.5) / CX * (bounds.x1 - bounds.x0);
        var y = bounds.y1 - (j + 0.5) / CY * (bounds.y1 - bounds.y0);
        var p = f(x, y);
        var c = p >= 0.5 ? A : B, op = 0.08 + 0.30 * Math.abs(p - 0.5) * 2;
        cells[k].setAttribute("fill", "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")");
        cells[k].setAttribute("fill-opacity", op.toFixed(2));
        k++;
      }
      var atr = accuracy(f, split.tr), ate = accuracy(f, split.te);
      var gap = atr - ate;
      var verdict = gap > 0.12 ? "⚠ big train-test gap - memorizing, not learning"
        : (ate < 0.55 && dataMode === "lumen" ? "real data whispers - weak but honest signal"
          : "healthy - train and test agree");
      read.innerHTML =
        '<span class="al-acc">train acc <b>' + (atr * 100).toFixed(0) + "%</b></span>" +
        '<span class="al-acc">test acc <b>' + (ate * 100).toFixed(0) + "%</b></span>" +
        '<span class="al-verdict">' + verdict + "</span>";
      note.textContent = cfg.note;
    }

    dataSel.addEventListener("change", function () { dataMode = dataSel.value; setData(); refresh(); });
    algoSel.addEventListener("change", function () { knobVal = null; refresh(); });
    knob.addEventListener("input", function () { knobVal = +knob.value; refresh(); });

    setData();
    refresh();
  }

  /* ---------- styles ---------- */
  var css = document.createElement("style");
  css.textContent =
    ".algo-live{border:1.5px solid var(--hairline,#E8EBF3);border-radius:16px;padding:18px 20px;margin:22px 0;background:#fff}" +
    ".al-title{font-weight:800;font-size:.95rem;color:var(--ink,#1C2233);margin-bottom:10px}" +
    ".al-bar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:12px}" +
    ".al-sel{font:600 .85rem Inter,sans-serif;padding:7px 10px;border:1.5px solid var(--hairline,#E8EBF3);border-radius:10px;color:var(--ink,#1C2233);background:#fff}" +
    ".al-knob{display:inline-flex;gap:8px;align-items:center}" +
    ".al-klabel{font:700 .8rem Inter,sans-serif;color:var(--muted,#636D85);min-width:110px}" +
    ".al-knob input{accent-color:var(--indigo,#D6336C);width:150px}" +
    ".al-svg{width:100%;height:auto;border:1px solid var(--hairline,#E8EBF3);border-radius:12px}" +
    ".al-read{display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin-top:10px}" +
    ".al-acc{font:600 .85rem Inter,sans-serif;color:var(--ink,#1C2233);background:var(--indigo-50,#FDEEF4);padding:5px 12px;border-radius:999px}" +
    ".al-acc b{font-weight:800}" +
    ".al-verdict{font:600 .8rem Inter,sans-serif;color:var(--muted,#636D85)}" +
    ".al-note{font-size:.86rem;color:var(--muted,#636D85);margin:10px 0 0;line-height:1.7}";
  document.head.appendChild(css);

  document.querySelectorAll(".algo-live").forEach(function (root) {
    if ((root.getAttribute("data-tool") || "boundary") === "boundary") buildBoundary(root);
  });
})();
