function enviarFormulario(datos) {
    fetch("https://script.google.com/macros/s/AKfycby7vv_l_o4IuanKDh-x-H0_IiTb2-kyhTcuqGYwXLR2cByW_8XwV4eX_pqIfP91fhEb/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    })
      .then(res => {
        if (res.ok) {
          document.getElementById("mensaje").innerText = "✅ Trámite enviado correctamente.";
          document.getElementById("miFormulario").reset();
        } else {
          throw new Error("Error en el servidor");
        }
      })
      .catch(err => {
        console.error(err);
        document.getElementById("mensaje").innerText = "❌ No se pudo enviar el trámite.";
      });
  }
  