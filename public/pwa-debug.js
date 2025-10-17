// Script de debug PWA - Ejecutar en consola del navegador
// Copia y pega este código en DevTools -> Console

console.log('🔍 DEBUG PWA - Verificando configuración...');

// 1. Verificar que el manifest esté linkeado en el HTML
const manifestLink = document.querySelector('link[rel="manifest"]');
console.log('📄 Link al manifest:', manifestLink ? '✅ Encontrado' : '❌ No encontrado');
if (manifestLink) {
  console.log('   URL:', manifestLink.href);
}

// 2. Verificar que el manifest se pueda cargar
fetch('/manifest.webmanifest')
  .then(response => {
    console.log('🌐 Respuesta del manifest:', response.status);
    console.log('   Content-Type:', response.headers.get('content-type'));
    return response.json();
  })
  .then(manifest => {
    console.log('📱 Contenido del manifest:');
    console.log('   Name:', manifest.name);
    console.log('   Short name:', manifest.short_name);
    console.log('   Start URL:', manifest.start_url);
    console.log('   Display:', manifest.display);
    console.log('   Icons:', manifest.icons.length);
    manifest.icons.forEach((icon, i) => {
      console.log(`     ${i+1}. ${icon.sizes} (${icon.type})`);
    });
  })
  .catch(error => {
    console.error('❌ Error cargando manifest:', error);
  });

// 3. Verificar Service Worker
if ('serviceWorker' in navigator) {
  console.log('⚙️ Service Worker:', '✅ Soportado');
  navigator.serviceWorker.getRegistration()
    .then(registration => {
      if (registration) {
        console.log('   Estado:', registration.active ? '✅ Activo' : '⚠️ No activo');
        console.log('   Scope:', registration.scope);
      } else {
        console.log('   Estado:', '❌ No registrado');
      }
    });
} else {
  console.log('⚙️ Service Worker:', '❌ No soportado');
}

// 4. Verificar instalabilidad
if ('BeforeInstallPromptEvent' in window) {
  console.log('📲 Instalación PWA:', '✅ Soportada');
} else {
  console.log('📲 Instalación PWA:', '⚠️ No detectada (puede estar ya instalada)');
}

// 5. Verificar si ya está instalada
if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
  console.log('🏠 Modo PWA:', '✅ Instalada y ejecutándose como standalone');
} else {
  console.log('🏠 Modo PWA:', '🌐 Ejecutándose en navegador');
}

// 6. Verificar HTTPS
if (location.protocol === 'https:' || location.hostname === 'localhost') {
  console.log('🔒 HTTPS/Localhost:', '✅ Válido para PWA');
} else {
  console.log('🔒 HTTPS/Localhost:', '❌ Requerido para PWA');
}

console.log('✨ Debug completado. Revisa los resultados arriba.');