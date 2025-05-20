const descripciones = {
  "Agua": "Solicite conexión o revisión del servicio de agua potable.",
  "Gas": "Gestione su pedido de conexión o inspección de gas domiciliario.",
  "Cloacas": "Solicite conexión o mantenimiento del sistema cloacal.",
  "Electricidad": "Requiere conexión o revisión de red eléctrica municipal.",
  "Alumbrado público": "Reportar luminarias apagadas o solicitar nuevas instalaciones.",
  "Camión atmosférico": "Servicio de limpieza de pozos sépticos mediante camión atmosférico.",
  "Retiro de escombros": "Solicite la recolección de restos de construcción o demolición.",
  "Retiro de árboles": "Pida el retiro o poda de árboles caídos o en mal estado."
};

const selectServicio = document.getElementById('servicioSelect');
const descripcionDiv = document.getElementById('descripcionServicio');

if (selectServicio && descripcionDiv) {
  selectServicio.addEventListener('change', function () {
    const servicio = this.value;
    const texto = descripciones[servicio];

    if (texto) {
      descripcionDiv.textContent = texto;
      descripcionDiv.style.display = 'block';
    } else {
      descripcionDiv.style.display = 'none';
    }
  });
}
