# 🩺 Troubleshooting Plesk Deployment

## Quick Diagnosis

### 1. Check if App is Running
Visit: `https://yourdomain.com/health.html`
- ✅ Should show "App is running"
- ❌ If 404: Upload issue or wrong directory

### 2. Verify Deployment
Visit: `https://yourdomain.com/verify.html`
- Shows detailed deployment status
- Checks if assets are accessible
- Displays environment information

### 3. Enable Debug Mode
Visit: `https://yourdomain.com/?debug`
- Shows debug info in bottom-right corner
- Displays routing and build information

## Common Issues & Solutions

### 🔴 Blank White Page
**Symptoms:** Page loads but shows nothing, favicon visible

**Causes & Solutions:**
1. **JavaScript Error:**
   - Open browser console (F12)
   - Look for red error messages
   - Common: Path issues, missing assets

2. **Asset Loading Issues:**
   - Check Network tab in browser DevTools
   - Look for 404 errors on CSS/JS files
   - Verify all files from `dist/` were uploaded

3. **Routing Configuration:**
   - Ensure `.htaccess` file is uploaded
   - Check if Apache mod_rewrite is enabled in Plesk
   - Verify file permissions (644 for files, 755 for directories)

### 🔴 404 on Page Refresh
**Symptoms:** Direct URLs or page refresh shows 404

**Solution:**
- Upload `.htaccess` file to document root
- Enable Apache mod_rewrite in Plesk:
  - Go to Plesk → Domains → Your Domain → Apache & nginx Settings
  - Enable "mod_rewrite"

### 🔴 CSS/Styles Not Loading
**Symptoms:** Page loads but no styling

**Solutions:**
1. Check MIME types in Plesk:
   - Go to MIME Types in Plesk
   - Ensure `.css` = `text/css`
   - Ensure `.js` = `application/javascript`

2. Verify file uploads:
   - Check `assets/` directory exists
   - Verify CSS files are in `assets/`

### 🔴 Images Not Loading
**Solutions:**
- Check image paths in browser DevTools
- Verify images uploaded to correct location
- Check file permissions

## Plesk-Specific Configuration

### Apache Settings
Required modules:
- ✅ mod_rewrite
- ✅ mod_headers  
- ✅ mod_deflate
- ✅ mod_mime

### File Permissions
- Files: `644`
- Directories: `755`
- .htaccess: `644`

### PHP Settings (if applicable)
Not needed for this static React app.

## Manual Debugging Steps

### 1. Browser Console Check
```javascript
// Run in browser console
console.log('Location:', window.location);
console.log('Base:', document.querySelector('base'));
console.log('Scripts:', document.querySelectorAll('script').length);
console.log('Stylesheets:', document.querySelectorAll('link[rel="stylesheet"]').length);
```

### 2. Network Tab Analysis
1. Open DevTools → Network
2. Refresh page
3. Look for:
   - Red entries (404/500 errors)
   - Large file sizes
   - Slow loading times

### 3. File Structure Verification
Your Plesk document root should contain:
```
/
├── index.html
├── .htaccess
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [various assets]
├── health.html
├── verify.html
└── robots.txt
```

## Getting Help

### Information to Collect
1. **URL where it's deployed**
2. **Browser console errors** (screenshot)
3. **Network tab errors** (screenshot)  
4. **Plesk Apache/PHP version**
5. **File permissions** (`ls -la` output)

### Quick Tests
1. Visit `/health.html` - should work
2. Visit `/verify.html` - shows detailed status
3. Check browser console for errors
4. Verify .htaccess is uploaded and working

## Build Commands Reference

```bash
# Standard build
npm run build

# Plesk-optimized build with debugging
npm run build:plesk-optimized

# Deploy to Plesk (uploads files)
npm run build:plesk
```

## Emergency Fallback

If nothing works, try uploading just these essential files first:
1. `index.html`
2. `assets/` directory (entire folder)
3. `.htaccess`

Then test basic functionality before uploading additional files.