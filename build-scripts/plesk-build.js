#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Plesk-optimized build...');

// Clean previous build
console.log('🧹 Cleaning previous build...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

try {
  // Run production build
  console.log('📦 Building for production...');
  execSync('npm run build', { stdio: 'inherit' });

  // Copy additional files for Plesk
  console.log('📁 Copying Plesk-specific files...');
  
  // Copy .htaccess
  if (fs.existsSync('public/.htaccess')) {
    fs.copyFileSync('public/.htaccess', 'dist/.htaccess');
    console.log('✅ Copied .htaccess');
  }

  // Create a simple health check endpoint
  const healthCheck = `<!DOCTYPE html>
<html>
<head>
    <title>Health Check</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>✅ App is running</h1>
    <p>Build time: ${new Date().toISOString()}</p>
    <p>Status: OK</p>
    <script>
        console.log('Health check loaded');
        document.body.style.fontFamily = 'Arial, sans-serif';
        document.body.style.textAlign = 'center';
        document.body.style.padding = '2rem';
    </script>
</body>
</html>`;
  
  fs.writeFileSync('dist/health.html', healthCheck);
  console.log('✅ Created health check endpoint');

  // Create deployment verification
  const verifyScript = `
<!DOCTYPE html>
<html>
<head>
    <title>Deployment Verification</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .status { padding: 10px; margin: 10px 0; border-radius: 5px; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .info { background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; }
    </style>
</head>
<body>
    <h1>🔍 Deployment Verification</h1>
    <div id="results"></div>
    
    <script>
        const results = document.getElementById('results');
        
        function addResult(message, type = 'info') {
            const div = document.createElement('div');
            div.className = 'status ' + type;
            div.innerHTML = message;
            results.appendChild(div);
        }
        
        // Check basic functionality
        addResult('✅ HTML loaded successfully', 'success');
        addResult('✅ JavaScript executing', 'success');
        
        // Check if main app files exist
        const checks = [
            { file: '/assets/', name: 'Assets directory' },
            { file: '/index.html', name: 'Main HTML file' },
            { file: '/.htaccess', name: 'Server configuration' }
        ];
        
        checks.forEach(check => {
            fetch(check.file)
                .then(response => {
                    if (response.ok) {
                        addResult('✅ ' + check.name + ' accessible', 'success');
                    } else {
                        addResult('❌ ' + check.name + ' not found (status: ' + response.status + ')', 'error');
                    }
                })
                .catch(error => {
                    addResult('❌ ' + check.name + ' check failed: ' + error.message, 'error');
                });
        });
        
        // Environment info
        addResult('🌍 Host: ' + window.location.host, 'info');
        addResult('📍 Path: ' + window.location.pathname, 'info');
        addResult('🔗 Full URL: ' + window.location.href, 'info');
        addResult('👤 User Agent: ' + navigator.userAgent, 'info');
        addResult('📅 Check time: ' + new Date().toISOString(), 'info');
    </script>
</body>
</html>`;
  
  fs.writeFileSync('dist/verify.html', verifyScript);
  console.log('✅ Created deployment verification page');

  // Analyze build
  console.log('📊 Analyzing build...');
  const distPath = path.resolve('dist');
  const files = [];
  
  function scanDirectory(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(basePath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath, relativePath);
      } else {
        files.push({
          path: relativePath,
          size: stat.size,
          sizeKB: Math.round(stat.size / 1024 * 100) / 100
        });
      }
    });
  }
  
  scanDirectory(distPath);
  
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const totalSizeKB = Math.round(totalSize / 1024 * 100) / 100;
  
  console.log('📁 Build complete!');
  console.log('📊 Files:', files.length);
  console.log('📦 Total size:', totalSizeKB, 'KB');
  
  // Create deployment guide
  const deploymentGuide = `# 🚀 Plesk Deployment Guide

## Build Information
- Build time: ${new Date().toISOString()}
- Total files: ${files.length}
- Total size: ${totalSizeKB} KB

## Deployment Steps

### 1. Upload Files
Upload all files from the \`dist/\` directory to your Plesk domain's public folder:
\`\`\`
${files.map(f => f.path).join('\n')}
\`\`\`

### 2. Verify Deployment
After uploading, visit these URLs to verify:
- Main site: https://yourdomain.com/
- Health check: https://yourdomain.com/health.html
- Verification: https://yourdomain.com/verify.html

### 3. Troubleshooting
If you see a blank page:
1. Check browser console for JavaScript errors
2. Verify .htaccess file is uploaded and working
3. Check that all asset files are accessible
4. Ensure Plesk Apache has mod_rewrite enabled

### 4. Common Issues
- **Blank page**: Usually routing or asset path issues
- **404 on refresh**: .htaccess not working or mod_rewrite disabled
- **Assets not loading**: Check file permissions and paths

## Files in this build:
${files.map(f => `- ${f.path} (${f.sizeKB} KB)`).join('\n')}

## Support
If issues persist, check the browser console and network tab for specific errors.
`;

  fs.writeFileSync('dist/DEPLOYMENT.md', deploymentGuide);
  console.log('✅ Created deployment guide');

  console.log('\n🎉 Build complete! Ready for Plesk deployment.');
  console.log('📁 All files are in the dist/ directory');
  console.log('📋 See dist/DEPLOYMENT.md for upload instructions');
  console.log('🔍 Use dist/verify.html to check deployment after upload');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}