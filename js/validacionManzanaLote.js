let manzanas = [];

window.addEventListener('DOMContentLoaded', () => {
    fetch('/data/manzanas.json')
    .then(res => res.json())
    .then(data => {
      manzanas = data;
      iniciarAutocompletado();
    })
    .catch(err => {
      console.error('❌ Error al cargar manzanas:', err);
      mostrarAlerta('No se pudieron cargar las manzanas. Intente más tarde.');
    });
});

function iniciarAutocompletado() {
  const inputManzana = document.querySelector('input[name="manzana"]');
  const inputLote = document.querySelector('input[name="lote"]');

  const sugerenciasDiv = document.createElement('div');
  sugerenciasDiv.style.position = 'absolute';
  sugerenciasDiv.style.background = 'white';
  sugerenciasDiv.style.border = '1px solid #ccc';
  sugerenciasDiv.style.zIndex = '9999';
  sugerenciasDiv.style.width = '100%';
  sugerenciasDiv.style.maxHeight = '150px';
  sugerenciasDiv.style.overflowY = 'auto';
  sugerenciasDiv.style.display = 'none';
  inputManzana.parentElement.style.position = 'relative';
  inputManzana.parentElement.appendChild(sugerenciasDiv);

  inputManzana.addEventListener('input', () => {
    const valor = inputManzana.value.trim().toUpperCase();
    sugerenciasDiv.innerHTML = '';
    inputManzana.style.backgroundColor = '';

    if (!valor) {
      sugerenciasDiv.style.display = 'none';
      return;
    }

    const coincidencias = manzanas
      .filter(m => m.id.includes(valor))
      .slice(0, 5);

    if (coincidencias.length > 0) {
      coincidencias.forEach(m => {
        const opcion = document.createElement('div');
        opcion.textContent = m.id;
        opcion.style.padding = '6px';
        opcion.style.cursor = 'pointer';
        opcion.addEventListener('click', () => {
          inputManzana.value = m.id;
          cargarLotes(m);
          sugerenciasDiv.style.display = 'none';
          ocultarAlerta();
          inputManzana.style.backgroundColor = '';
        });
        sugerenciasDiv.appendChild(opcion);
      });
      sugerenciasDiv.style.display = 'block';
    } else {
      sugerenciasDiv.style.display = 'none';
      mostrarAlerta('⚠️ No se encontró la manzana. Puede continuar, pero verifique.');
      inputManzana.style.backgroundColor = '#fff3cd';
    }
  });

  inputManzana.addEventListener('blur', () => {
    setTimeout(() => sugerenciasDiv.style.display = 'none', 200);
  });

  function cargarLotes(manzana) {
    const datalistId = 'datalist-lotes';
    let datalist = document.getElementById(datalistId);
    if (!datalist) {
      datalist = document.createElement('datalist');
      datalist.id = datalistId;
      document.body.appendChild(datalist);
    }
    datalist.innerHTML = '';
    manzana.lotes.forEach(l => {
      const option = document.createElement('option');
      option.value = l.id;
      option.text = l.nombre;
      datalist.appendChild(option);
    });

    inputLote.setAttribute('list', datalistId);
    inputLote.value = '';
    inputLote.style.backgroundColor = '';
  }

  inputLote.addEventListener('change', () => {
    const manzanaSeleccionada = manzanas.find(m => m.id === inputManzana.value.trim().toUpperCase());
    if (manzanaSeleccionada) {
      const encontrado = manzanaSeleccionada.lotes.some(l => l.id === inputLote.value.trim().toUpperCase());
      if (!encontrado) {
        inputLote.style.backgroundColor = '#fff3cd';
        mostrarAlerta('⚠️ No se encontró el lote. Puede continuar, pero verifique.');
      } else {
        inputLote.style.backgroundColor = '';
        ocultarAlerta();
      }
    }
  });
}

function mostrarAlerta(mensaje) {
  let div = document.getElementById('cartelAlerta');
  if (!div) {
    div = document.createElement('div');
    div.id = 'cartelAlerta';
    div.style.background = '#fff3cd';
    div.style.color = '#856404';
    div.style.border = '1px solid #ffeeba';
    div.style.padding = '10px';
    div.style.borderRadius = '8px';
    div.style.marginTop = '12px';
    div.style.fontSize = '14px';
    div.style.fontWeight = 'bold';
    document.querySelector('form').prepend(div);
  }
  div.textContent = mensaje;
}

function ocultarAlerta() {
  const alerta = document.getElementById('cartelAlerta');
  if (alerta) alerta.remove();
}
