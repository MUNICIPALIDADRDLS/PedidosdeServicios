let tiempoInicio = Date.now();

function enviarFormulario(datos) {
  const tiempoEnvio = () => ((Date.now() - tiempoInicio) / 1000).toFixed(2);

  fetch("https://script.google.com/macros/s/AKfycbwDnDxp-VshOdIl60RS_1dFzFC32s0ZPU2PWpmDq0_9NDYyUpMRitqg7L4KoaemCGjT/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  })
    .then(() => {
      document.getElementById("mensaje").innerText = "✅ Trámite enviado correctamente (modo no-cors).";
      document.getElementById("miFormulario").reset();

      if (typeof registrarTramiteEnviado === 'function') {
        registrarTramiteEnviado("NO-ID-MODO-NOCORS", datos.servicio);
      }

      if (typeof gtag === 'function') {
        gtag('event', 'tiempo_envio', {
          event_category: 'Interacción',
          event_label: 'sin-id-no-cors',
          value: parseFloat(tiempoEnvio())
        });
      }
    })
    .catch(err => {
      console.error("Error en fetch:", err);
      document.getElementById("mensaje").innerText = "❌ No se pudo enviar el trámite.";

      if (typeof registrarErrorTramite === 'function') {
        registrarErrorTramite(err.message);
      }
    })
    .finally(() => {
      if (typeof window.restaurarBotonEnvio === 'function') {
        window.restaurarBotonEnvio();
      }
    });
}

// Detectar inicio de interacción en el formulario para seguimiento
const form = document.getElementById("miFormulario");
if (form) {
  const campos = form.querySelectorAll("input, select, textarea");
  campos.forEach(campo => {
    campo.addEventListener("input", () => {
      if (typeof registrarInteraccionCampo === 'function') {
        registrarInteraccionCampo(campo.name || campo.id);
      }
    }, { once: true }); // solo registra una vez por campo
  });
}