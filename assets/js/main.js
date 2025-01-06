var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl)
})

document.addEventListener(
    "DOMContentLoaded",
    () => {
      particlesJS.load("particles-js", "assets/js/particles.json", function () {
        console.log("particles.js loaded - callback");
      });
    },
    false
  );