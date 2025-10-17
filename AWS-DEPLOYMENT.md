# 🚀 Deployment PWA en AWS S3 + CloudFront

## 🔧 **Configuraciones Realizadas**

### **1. Vite PWA Config**
- ✅ `navigateFallback: '/index.html'` - Todas las rutas no encontradas van a index.html
- ✅ `navigateFallbackDenylist` - Excluye archivos estáticos del fallback
- ✅ Service Worker con cache estratégico

### **2. Archivos de Configuración**
- ✅ `public/_redirects` - Fallback para todos los paths
- ✅ `aws-configs/cloudfront-config.md` - Configuración CloudFront
- ✅ `deploy-aws.sh` - Script automatizado de deployment

## 🛠️ **Configuración de CloudFront (CRÍTICO)**

### **Error Pages - Soluciona el problema de rutas**
```
Error 403:
- Path: /index.html
- Response Code: 200
- TTL: 0

Error 404:
- Path: /index.html  
- Response Code: 200
- TTL: 0
```

### **Cache Behaviors**
```
/sw.js → TTL: 0 (no cache)
*.html → TTL: 0 (no cache) 
/manifest.webmanifest → TTL: 3600 (1 hora)
/assets/* → TTL: 31536000 (1 año)
Default (*) → TTL: 86400 (1 día)
```

## 🚀 **Pasos para Deployment**

### **1. Configurar variables en deploy-aws.sh:**
```bash
S3_BUCKET="tu-bucket-name"
CLOUDFRONT_DISTRIBUTION_ID="tu-distribution-id"
AWS_PROFILE="tu-profile"
```

### **2. Ejecutar deployment:**
```bash
./deploy-aws.sh
```

### **3. Configurar CloudFront manualmente:**
1. Ve a CloudFront Console
2. Selecciona tu distribution
3. Ve a "Error Pages"
4. Agrega las configuraciones mencionadas arriba

## 🔍 **Verificación Post-Deployment**

### **Probar rutas directas:**
```
✅ https://tu-dominio.com/app/home
✅ https://tu-dominio.com/app/cart
✅ https://tu-dominio.com/app/search
✅ https://tu-dominio.com/app/services/123
```

### **Verificar PWA:**
```
✅ https://tu-dominio.com/manifest.webmanifest
✅ https://tu-dominio.com/sw.js
✅ Instalación PWA funciona
✅ Funcionamiento offline
```

## 🐛 **Troubleshooting**

### **Problema: Rutas 403/404**
**Solución:** Verificar Error Pages en CloudFront

### **Problema: Service Worker no actualiza**
**Solución:** Headers cache correcto para sw.js (TTL: 0)

### **Problema: Manifest no carga**
**Solución:** Content-Type: application/manifest+json

### **Problema: Rutas funcionan pero PWA no instala**
**Solución:** Verificar que el dominio use HTTPS

## 📱 **URLs importantes post-deployment**

- **App:** https://tu-dominio.com
- **Manifest:** https://tu-dominio.com/manifest.webmanifest
- **Service Worker:** https://tu-dominio.com/sw.js

## ✅ **Checklist Final**

- [ ] CloudFront Error Pages configuradas
- [ ] Cache behaviors configurados
- [ ] Headers correctos para archivos PWA
- [ ] HTTPS habilitado
- [ ] Dominio personalizado configurado
- [ ] DNS apuntando a CloudFront
- [ ] Certificado SSL válido

**¡Tu PWA ahora debería funcionar perfectamente en AWS!** 🎉