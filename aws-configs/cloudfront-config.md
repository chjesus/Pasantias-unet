# Configuración de CloudFront para PWA/SPA

## Error Pages (CRÍTICO para routing)
Configurar Custom Error Responses en CloudFront:

### Error 403 (Forbidden):
- HTTP Error Code: 403
- Response Page Path: /index.html
- HTTP Response Code: 200
- Error Caching Minimum TTL: 0

### Error 404 (Not Found):
- HTTP Error Code: 404
- Response Page Path: /index.html
- HTTP Response Code: 200
- Error Caching Minimum TTL: 0

## Cache Behaviors

### Default (*):
- Path Pattern: *
- Cache Based on Selected Request Headers: None
- Query String Forwarding: Forward all
- Cache TTL: 86400 (1 día)

### Service Worker (/sw.js):
- Path Pattern: /sw.js
- Cache Based on Selected Request Headers: None
- Cache TTL: 0 (no cache)

### HTML files (*.html):
- Path Pattern: *.html
- Cache Based on Selected Request Headers: None
- Cache TTL: 0 (no cache)

### Manifest (/manifest.webmanifest):
- Path Pattern: /manifest.webmanifest
- Cache Based on Selected Request Headers: None
- Cache TTL: 3600 (1 hora)

### Assets estáticos (/assets/*):
- Path Pattern: /assets/*
- Cache Based on Selected Request Headers: None
- Cache TTL: 31536000 (1 año)

## Headers importantes:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin