// Google Analytics external loader
(function() {
    const GA_ID = "G-R4LL8DJWM3"; // Tu ID de Google Analytics
  
    // Cargar el script de gtag.js
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  
    // Inicializar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
  
    gtag('js', new Date());
    gtag('config', GA_ID);
  })();