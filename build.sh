#!/bin/bash
set -e

echo "Building SkyBrain NeuroBank..."

# Install dependencies
npm install

# Build the application
npm run build:local

echo "Build completed successfully!"