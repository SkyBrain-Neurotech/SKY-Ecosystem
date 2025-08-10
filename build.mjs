import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('Starting SkyBrain NeuroBank build...');

try {
  // Try different approaches to run Vite
  const approaches = [
    'npx vite build',
    'node node_modules/vite/bin/vite.js build',
    'node_modules/.bin/vite build'
  ];

  let buildSuccess = false;

  for (const approach of approaches) {
    try {
      console.log(`Trying: ${approach}`);
      execSync(approach, { 
        stdio: 'inherit', 
        cwd: process.cwd(),
        env: { ...process.env, NODE_ENV: 'production' }
      });
      buildSuccess = true;
      console.log(`✅ Build successful with: ${approach}`);
      break;
    } catch (error) {
      console.log(`❌ Failed with: ${approach}`);
      continue;
    }
  }

  if (!buildSuccess) {
    console.error('All build approaches failed');
    process.exit(1);
  }

  // Verify dist directory was created
  if (existsSync(join(process.cwd(), 'dist'))) {
    console.log('✅ Build output verified in dist/ directory');
  } else {
    console.error('❌ Build output not found');
    process.exit(1);
  }

} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}