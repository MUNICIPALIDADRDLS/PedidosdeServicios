document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("miFormulario");
  
    if (!formulario) return;
  
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const datos = Object.fromEntries(new FormData(formulario));
  
      // Validaciones personalizadas
      if (!/^[0-9]{11}$/.test(datos.cuit)) {
        mostrarMensaje("❌ CUIT inválido. Debe tener 11 dígitos numéricos.", true);
        return;
      }
  
      if (!/^[0-9\s\-]+$/.test(datos.telefono)) {
        mostrarMensaje("❌ Teléfono inválido. Solo se permiten números, guiones y espacios.", true);
        return;
      }
  
      if (!datos.nombre || !datos.apellido || !datos.servicio) {
        mostrarMensaje("❌ Por favor completá todos los campos obligatorios.", true);
        return;
      }
  
      // Si pasa validaciones, llama a la API
      enviarFormulario(datos);
    });
  
    // Funciones de ayuda
    window.mostrarAyuda = function () {
      document.getElementById("mensajeAyuda")?.classList.toggle("oculto");
    };
  
    window.mostrarTextoTerminos = function () {
      document.getElementById("textoTerminos")?.classList.remove("oculto");
      document.getElementById("fondoModal")?.classList.remove("oculto");
    };
  
    window.cerrarTerminos = function () {
      document.getElementById("textoTerminos")?.classList.add("oculto");
      document.getElementById("fondoModal")?.classList.add("oculto");
    };
  
    function mostrarMensaje(mensaje, esError = false) {
      const contenedor = document.getElementById("mensaje");
      if (contenedor) {
        contenedor.innerText = mensaje;
        contenedor.style.color = esError ? "crimson" : "#00c98d";
      }
    }
  });
  