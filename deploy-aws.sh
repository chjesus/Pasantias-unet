#!/bin/bash

# Script de deployment para S3 + CloudFront
# Configura las variables antes de ejecutar

# Variables (reemplaza con tus valores)
S3_BUCKET="your-bucket-name"
CLOUDFRONT_DISTRIBUTION_ID="your-distribution-id"
AWS_PROFILE="default"

echo "🚀 Iniciando deployment PWA a AWS S3 + CloudFront"
echo "=================================================="

# Verificar que AWS CLI esté configurado
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI no está instalado"
    exit 1
fi

# Build de producción
echo "🔨 Construyendo aplicación..."
pnpm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en el build"
    exit 1
fi

echo "✅ Build completado"

# Sync a S3
echo "📤 Subiendo archivos a S3..."
aws s3 sync dist/ s3://$S3_BUCKET/ \
  --delete \
  --profile $AWS_PROFILE \
  --exclude "*.map"

if [ $? -ne 0 ]; then
    echo "❌ Error subiendo a S3"
    exit 1
fi

echo "✅ Archivos subidos a S3"

# Configurar headers para archivos específicos
echo "🔧 Configurando headers..."

# Service Worker (no cache)
aws s3 cp s3://$S3_BUCKET/sw.js s3://$S3_BUCKET/sw.js \
  --metadata-directive REPLACE \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "application/javascript" \
  --profile $AWS_PROFILE

# Manifest (cache por 1 hora)
aws s3 cp s3://$S3_BUCKET/manifest.webmanifest s3://$S3_BUCKET/manifest.webmanifest \
  --metadata-directive REPLACE \
  --cache-control "max-age=3600" \
  --content-type "application/manifest+json" \
  --profile $AWS_PROFILE

# HTML files (no cache)
aws s3 cp s3://$S3_BUCKET/index.html s3://$S3_BUCKET/index.html \
  --metadata-directive REPLACE \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html" \
  --profile $AWS_PROFILE

echo "✅ Headers configurados"

# Invalidar CloudFront
echo "🔄 Invalidando cache de CloudFront..."
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
  --paths "/*" \
  --profile $AWS_PROFILE

if [ $? -ne 0 ]; then
    echo "❌ Error invalidando CloudFront"
    exit 1
fi

echo "✅ Cache de CloudFront invalidado"
echo "🎉 Deployment completado exitosamente!"
echo ""
echo "📱 Tu PWA está disponible en:"
echo "   https://your-domain.com"
echo ""
echo "🔍 Para verificar:"
echo "   1. Abre DevTools → Application → Service Workers"
echo "   2. Prueba rutas directas como /app/home"
echo "   3. Verifica funcionamiento offline"