/******/ (() => { // webpackBootstrap
(() => {
  var t, e, n, a, o;

  function u() {
    t.paused || window.requestAnimationFrame(u), a = new Uint8Array(n.frequencyBinCount), n.getByteFrequencyData(a), a[0] / 160 > 1 && a[0] / 160 < 1.4 ? o.transform = "scale(" + (a[0] / 160).toString() + ")" : o.transform = "scale(1)";
  }

  o = document.getElementById("logo").style, t = document.getElementById("audio"), button = document.getElementById("button"), button.onclick = function () {
    e || (e = new AudioContext(), n = e.createAnalyser(), e.createMediaElementSource(t).connect(n), n.connect(e.destination), u()), t.paused ? (t.play(), u(), button.value = "Stop a Magic") : (t.pause(), button.value = "Start a Magic");
  };
})();
/******/ })()
;