function enviarFormulario(datos) {
    fetch("https://script.google.com/macros/s/AKfycbzCxbJD6MngF9sZil9ywhZTspK1WVTxEqHCXZFnvMIAAfNs0K2c57KAkos_UqHpzOV2/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "ok") {
          const mensaje = `✅ Trámite enviado correctamente.\n📄 ID Trámite: ${data.idTramite}`;
          document.getElementById("mensaje").innerText = mensaje;
          document.getElementById("miFormulario").reset();
        } else {
          throw new Error(data.mensaje || "Error desconocido.");
        }
      })
      .catch(err => {
        console.error("Error en fetch:", err);
        document.getElementById("mensaje").innerText = "❌ No se pudo enviar el trámite.";
      });
  }
  