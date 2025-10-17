# Configuración para AWS CloudFront/S3 SPA

## Para configurar en AWS Console:

### 1. S3 Bucket Configuration:
- **Static website hosting**: Habilitado
- **Index document**: index.html
- **Error document**: index.html

### 2. CloudFront Distribution (si se usa):
- **Error Pages**: 
  - HTTP Error Code: 403, 404
  - Error Caching Minimum TTL: 300
  - Customize Error Response: Yes
  - Response Page Path: /index.html
  - HTTP Response Code: 200

### 3. Cache Behaviors:
- **Default**: 
  - TTL: 86400 (1 day)
- **index.html**:
  - TTL: 0 (no cache)
  - Cache-Control: no-cache

## Comandos AWS CLI para configurar:

```bash
# Configurar bucket para website hosting
aws s3 website s3://krixx-app --index-document index.html --error-document index.html

# Configurar política del bucket
aws s3api put-bucket-policy --bucket krixx-app --policy file://bucket-policy.json
```