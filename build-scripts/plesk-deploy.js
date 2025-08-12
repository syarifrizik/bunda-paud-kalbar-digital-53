#!/usr/bin/env node

/**
 * Plesk Deployment Script
 * Optimizes build for Plesk hosting environment
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const DIST_DIR = 'dist';
const BUILD_INFO_FILE = 'build-info.json';

console.log('🚀 Starting Plesk deployment build...');

// 1. Clean previous build
if (fs.existsSync(DIST_DIR)) {
    console.log('🧹 Cleaning previous build...');
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
}

// 2. Run production build
console.log('📦 Building for production...');
try {
    execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}

// 3. Copy .htaccess to dist
console.log('📋 Copying .htaccess...');
const htaccessSource = path.join('public', '.htaccess');
const htaccessDest = path.join(DIST_DIR, '.htaccess');

if (fs.existsSync(htaccessSource)) {
    fs.copyFileSync(htaccessSource, htaccessDest);
    console.log('✅ .htaccess copied successfully');
} else {
    console.warn('⚠️  .htaccess not found in public folder');
}

// 4. Generate build info
const buildInfo = {
    buildTime: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: 'production',
    platform: 'plesk',
    files: []
};

// 5. Analyze build output
console.log('📊 Analyzing build output...');
function analyzeDirectory(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(basePath, item);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
            analyzeDirectory(fullPath, relativePath);
        } else {
            buildInfo.files.push({
                path: relativePath.replace(/\\/g, '/'),
                size: stats.size,
                sizeKB: Math.round(stats.size / 1024 * 100) / 100
            });
        }
    }
}

analyzeDirectory(DIST_DIR);

// 6. Calculate total size
const totalSize = buildInfo.files.reduce((sum, file) => sum + file.size, 0);
buildInfo.totalSize = totalSize;
buildInfo.totalSizeKB = Math.round(totalSize / 1024 * 100) / 100;
buildInfo.totalSizeMB = Math.round(totalSize / 1024 / 1024 * 100) / 100;

// 7. Save build info
fs.writeFileSync(
    path.join(DIST_DIR, BUILD_INFO_FILE), 
    JSON.stringify(buildInfo, null, 2)
);

// 8. Create deployment checklist
const checklist = `
# Plesk Deployment Checklist

## Pre-deployment
- [ ] Build completed successfully
- [ ] .htaccess file present
- [ ] All assets optimized
- [ ] Total build size: ${buildInfo.totalSizeMB}MB

## Deployment Steps
1. [ ] Upload entire 'dist' folder contents to public_html
2. [ ] Verify .htaccess is in root directory
3. [ ] Test homepage loads correctly
4. [ ] Test navigation between pages
5. [ ] Check browser console for errors
6. [ ] Verify SSL certificate is active

## Post-deployment Testing
- [ ] Homepage: https://yourdomain.com/
- [ ] Navigation: https://yourdomain.com/visi-misi
- [ ] Images loading correctly
- [ ] Mobile responsive
- [ ] Performance acceptable

## Files to Upload (${buildInfo.files.length} total):
${buildInfo.files.map(file => `- ${file.path} (${file.sizeKB}KB)`).join('\n')}

Generated: ${buildInfo.buildTime}
`;

fs.writeFileSync(path.join(DIST_DIR, 'deployment-checklist.md'), checklist);

// 9. Success message
console.log('\n✅ Plesk build completed successfully!');
console.log(`📁 Files ready in: ${DIST_DIR}/`);
console.log(`📋 Total files: ${buildInfo.files.length}`);
console.log(`📦 Total size: ${buildInfo.totalSizeMB}MB`);
console.log('\n📖 Next steps:');
console.log('1. Upload contents of dist/ folder to your Plesk public_html');
console.log('2. Follow deployment-checklist.md for verification');
console.log('3. Test your site thoroughly');

// 10. Generate upload command examples
console.log('\n📤 Upload commands:');
console.log('Via FTP/SFTP:');
console.log('  Upload all files from dist/ to public_html/');
console.log('\nVia File Manager:');
console.log('  1. Zip the dist folder contents');
console.log('  2. Upload zip to public_html');
console.log('  3. Extract in place');