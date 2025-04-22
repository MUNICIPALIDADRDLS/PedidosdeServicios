// Google Analytics external loader + eventos personalizados
(function() {
    const GA_ID = "G-BSW1YTB00G"; // Tu ID real de GA4
  
    // Cargar gtag.js dinámicamente
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  
    // Inicialización estándar
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
  
    gtag('js', new Date());
    gtag('config', GA_ID);
  
    // Evento: Trámite enviado exitosamente
    window.registrarTramiteEnviado = function(idTramite, servicio) {
      gtag('event', 'tramite_enviado', {
        event_category: 'Formulario',
        event_label: idTramite,
        value: 1,
        servicio: servicio || 'No especificado'
      });
    };
  
    // Evento: Error al enviar trámite
    window.registrarErrorTramite = function(mensaje) {
      gtag('event', 'tramite_error', {
        event_category: 'Formulario',
        event_label: mensaje || 'Error desconocido'
      });
    };
  
    // Evento: Tiempo que tardó el usuario en enviar
    window.registrarTiempoEnvio = function(idTramite, segundos) {
      gtag('event', 'tiempo_envio', {
        event_category: 'Interacción',
        event_label: idTramite,
        value: parseFloat(segundos)
      });
    };
  
    // Evento: Campo con el que interactuó el usuario
    window.registrarInteraccionCampo = function(nombreCampo) {
      gtag('event', 'interaccion_formulario', {
        event_category: 'Formulario',
        event_label: nombreCampo
      });
    };
  
    // Evento: Abandono (salida de la página sin enviar)
    window.addEventListener('beforeunload', function () {
      if (!window.formularioEnviado) {
        gtag('event', 'abandono_formulario', {
          event_category: 'Formulario',
          event_label: 'Salida sin enviar'
        });
      }
    });
  })();