#!/usr/bin/env node

import { build } from 'vite'
import { resolve } from 'path'

async function buildApp() {
  try {
    console.log('Building SkyBrain NeuroBank...')
    
    await build({
      root: process.cwd(),
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
          output: {
            manualChunks: undefined,
          },
        },
      },
      resolve: {
        alias: {
          '@': resolve(process.cwd(), './src'),
        },
      },
    })
    
    console.log('Build completed successfully!')
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

buildApp()