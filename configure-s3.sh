#!/bin/bash

# Script para configurar S3 bucket para SPA/PWA
BUCKET_NAME="krixx-app"
REGION="us-east-1"

echo "🚀 Configurando S3 bucket para SPA/PWA..."

# Habilitar website hosting
echo "📡 Habilitando website hosting..."
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Aplicar política de bucket
echo "🔐 Aplicando política de bucket..."
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json

# Configurar CORS si es necesario
echo "🌐 Configurando CORS..."
cat > cors-config.json << 'EOF'
{
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "HEAD"],
            "AllowedOrigins": ["*"],
            "MaxAgeSeconds": 3000
        }
    ]
}
EOF

aws s3api put-bucket-cors --bucket $BUCKET_NAME --cors-configuration file://cors-config.json

# Configurar cache headers para archivos estáticos
echo "💾 Configurando cache headers..."
aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html --metadata-directive REPLACE --cache-control "no-cache, no-store, must-revalidate" --recursive --exclude "*" --include "*.html"

echo "✅ Configuración S3 completada!"
echo "🌐 URL del website: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

# Limpiar archivos temporales
rm -f cors-config.json