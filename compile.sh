#!/bin/bash
set -e

# Copy excalidraw map to public with .json extension
cp map.excalidraw src/generated/map.excalidraw.json

# Compile markdown posts
node scripts/make-posts.js
