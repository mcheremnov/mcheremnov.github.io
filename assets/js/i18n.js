// Language switch for content rendered in every language (see _includes/t.html).
// The initial language is set by the inline script in _includes/head.html.
(function () {
  var supported = window.I18N_LANGS || ["en"];

  function setLang(lang) {
    if (supported.indexOf(lang) === -1) return;
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      var active = button.getAttribute("data-set-lang") === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        setLang(button.getAttribute("data-set-lang"));
      });
    });
    setLang(document.documentElement.lang);
  });
})();
