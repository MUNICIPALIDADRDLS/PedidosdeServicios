function enviarFormulario(datos) {
  fetch("https://script.google.com/macros/s/AKfycbzCxbJD6MngF9sZil9ywhZTspK1WVTxEqHCXZFnvMIAAfNs0K2c57KAkos_UqHpzOV2/exec", {
    method: "POST",
    mode: "no-cors", // ← 🔥 Esta línea evita el bloqueo
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  })
  .then(() => {
    document.getElementById("mensaje").innerText = "✅ Trámite enviado correctamente (modo no-cors).";
    document.getElementById("miFormulario").reset();
  })
  .catch(err => {
    console.error("Error en fetch:", err);
    document.getElementById("mensaje").innerText = "❌ No se pudo enviar el trámite.";
  });
}

