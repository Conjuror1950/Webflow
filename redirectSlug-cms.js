<script>
(function () {
  function handleManualView() {
    const params = new URLSearchParams(window.location.search);
    const isManual = params.get("manual") === "true";

    const main = document.querySelector(".cms-main-content");
    const manual = document.querySelector(".cms-manual-content");

    if (!main || !manual) return;

    if (isManual) {
      main.style.display = "none";
      manual.style.display = "block";
    } else {
      main.style.display = "block";
      manual.style.display = "none";
    }
  }

  // esegui subito
  handleManualView();

  // ripeti per Webflow AJAX
  setInterval(handleManualView, 500);
})();
</script>
