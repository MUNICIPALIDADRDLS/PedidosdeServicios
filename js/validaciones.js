document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("miFormulario");
  const boton = formulario?.querySelector("button[type='submit']");

  if (!formulario) return;

  formulario.addEventListener("submit", async function (e) {
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

    // Desactivar botón y mostrar spinner
    if (boton) {
      boton.disabled = true;
      const textoOriginal = boton.innerHTML;
      boton.innerHTML = `<span class="spinner"></span> Enviando...`;

      // Guardar función para restaurar
      window.restaurarBotonEnvio = () => {
        boton.disabled = false;
        boton.innerHTML = textoOriginal;
        window.formularioEnviado = true;
      };
    }

    // Verificar si ya existe el trámite con mismo CUIT y servicio
    try {
      const consulta = await fetch(`https://script.google.com/macros/s/AKfycbzLwOcKW-vYEjpS6aAsOR1l1wE5YN1ibTiCJhVmQWv81-0wA7itGkHasQJ9dYMzjYVN/exec?cuit=${encodeURIComponent(datos.cuit)}&servicio=${encodeURIComponent(datos.servicio)}`);
      const respuesta = await consulta.text();

      if (respuesta === "duplicado") {
        mostrarMensaje("⚠️ Ya existe un trámite con ese CUIT y servicio.", true);
        if (typeof window.restaurarBotonEnvio === 'function') {
          window.restaurarBotonEnvio();
        }
        return;
      }
    } catch (error) {
      mostrarMensaje("⚠️ No se pudo verificar si el trámite ya existe.", true);
      if (typeof window.restaurarBotonEnvio === 'function') {
        window.restaurarBotonEnvio();
      }
      return;
    }

    // Si pasa validaciones y no es duplicado, llama a la API
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
