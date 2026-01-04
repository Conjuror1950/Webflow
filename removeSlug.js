document.addEventListener("DOMContentLoaded", function() {
  const redirects = {
    "/vecchia-pagina": "/nuova-pagina",
    "/it/102555": "/it-it/102555/manual",
    "/pagina-vecchia-2": "/pagina-nuova-2"
  };

  const currentPath = window.location.pathname.replace(/\/$/, "");

  if (redirects[currentPath]) {
    window.location.replace(redirects[currentPath]);
  }
});
