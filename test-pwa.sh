#!/bin/bash

echo "🚀 Probando PWA - Krix App"
echo "================================"

# Función para verificar comando
check_command() {
    if command -v $1 &> /dev/null; then
        echo "✅ $1 está disponible"
        return 0
    else
        echo "❌ $1 no está disponible"
        return 1
    fi
}

# Verificar dependencias
echo "📋 Verificando dependencias..."
check_command "node"
check_command "pnpm"

echo ""
echo "🔨 Compilando aplicación..."
pnpm run build

if [ $? -eq 0 ]; then
    echo "✅ Build exitoso"
else
    echo "❌ Error en build"
    exit 1
fi

echo ""
echo "📁 Verificando archivos PWA generados..."

files=("dist/manifest.webmanifest" "dist/sw.js" "dist/registerSW.js")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file no encontrado"
    fi
done

echo ""
echo "🌐 Iniciando servidor de desarrollo..."
echo "🔗 Abrir: http://localhost:5173"
echo ""
echo "📱 Pasos para probar PWA:"
echo "1. Abrir DevTools (F12)"
echo "2. Ir a Application → Service Workers"
echo "3. Verificar que el SW esté registrado"
echo "4. Probar modo offline en Network → Offline"
echo "5. Buscar el botón flotante de instalación"
echo ""
echo "🎯 Para probar instalación:"
echo "- Desktop: Buscar ícono en barra de direcciones"
echo "- Mobile: Usar botón 'Añadir a pantalla de inicio'"
echo ""

pnpm run dev