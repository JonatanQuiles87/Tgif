document.addEventListener("DOMContentLoaded", function() {
    var content = document.querySelector(".content");
    var toggleLink = document.querySelector(".toggle-link");
  
    // Ocultar el contenido al inicio
    content.style.display = "none";
  
    // Agregar evento de clic al enlace "Read More"
    toggleLink.addEventListener("click", function(event) {
      event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
  
      if (content.style.display === "none") {
        content.style.display = "block";
        toggleLink.innerHTML = "Read Less";
      } else {
        content.style.display = "none";
        toggleLink.innerHTML = "Read More";
      }
    });
  });
  