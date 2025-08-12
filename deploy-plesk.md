# Panduan Deployment ke Plesk

## Persiapan Build untuk Production

### 1. Build Project
```bash
# Install dependencies
npm install

# Build untuk production
npm run build:plesk
```

### 2. File yang Dibutuhkan untuk Upload
Setelah build berhasil, upload folder `dist/` ke direktori public_html di Plesk:

```
dist/
├── index.html
├── assets/
│   ├── [hash].js
│   ├── [hash].css
│   └── [images/fonts]
├── .htaccess
└── robots.txt
```

## Konfigurasi di Plesk

### 1. Domain Setup
- Pastikan domain mengarah ke folder `public_html`
- Enable SSL/TLS certificate
- Set document root ke folder yang berisi file `index.html`

### 2. PHP & Apache Settings
- Enable mod_rewrite (biasanya sudah aktif)
- Enable mod_headers untuk security headers
- Enable mod_deflate untuk compression
- Minimum PHP 7.4+ (untuk compatibility, meski tidak digunakan langsung)

### 3. File Permissions
```bash
# Set permissions yang benar
chmod 644 index.html
chmod 644 .htaccess
chmod -R 644 assets/*
chmod 755 assets/
```

## Troubleshooting Common Issues

### Masalah: Halaman Blank/Putih
**Solusi:**
1. Check browser console untuk error JavaScript
2. Pastikan path assets benar dengan relative paths
3. Verify .htaccess working dengan test URL routing
4. Check file permissions (644 untuk files, 755 untuk folders)

### Masalah: 404 pada Sub-pages
**Solusi:**
1. Pastikan .htaccess di-upload ke root directory
2. Verify mod_rewrite enabled di server
3. Check RewriteBase jika app di subfolder

### Masalah: Assets Tidak Load
**Solusi:**
1. Check MIME types di .htaccess
2. Verify relative paths dalam build
3. Check compression settings

### Masalah: Performance Issues
**Solusi:**
1. Enable compression di .htaccess
2. Set proper cache headers
3. Optimize images sebelum build
4. Check CDN usage untuk assets

## Monitoring & Maintenance

### 1. Log Files
Monitor log files di Plesk untuk:
- 404 errors
- JavaScript errors
- Performance issues

### 2. Regular Updates
- Update dependencies secara berkala
- Rebuild dan redeploy setelah changes
- Monitor performance metrics

### 3. Backup Strategy
- Backup source code di repository
- Backup build files sebelum update
- Document deployment process

## Security Checklist

✅ SSL/TLS certificate active
✅ Security headers configured
✅ Sensitive files protected
✅ Error pages configured
✅ HTTPS redirect enabled
✅ File permissions set correctly

## Performance Optimization

### Build Optimization
- Code splitting implemented
- Asset optimization
- Bundle size monitoring
- Tree shaking enabled

### Server Optimization
- Compression enabled
- Caching headers set
- CDN ready configuration
- Image optimization

## Contact & Support

Jika mengalami issues:
1. Check error logs di Plesk
2. Test di local development environment
3. Compare dengan working deployment
4. Contact hosting support untuk server-specific issues