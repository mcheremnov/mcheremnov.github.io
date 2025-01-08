const metaLang = document.querySelector('meta[name="active_lang"]').content;
console.log(metaLang);
document.addEventListener(
  "DOMContentLoaded",
  () => {
    particlesJS.load("particles-js", "../assets/js/particles.json", function () {
      console.log("particles.js loaded - callback");
    });
  },
  false
);


