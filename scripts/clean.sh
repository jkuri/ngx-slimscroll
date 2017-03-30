#!/bin/bash

find . -name "*.js" -type f -not -path "./node_modules/*" -not -path "./rollup.config.js" -not -path "./webpack/webpack.config.js" -delete
find . -name "*.js.map" -type f -not -path "./node_modules/*" -delete
find . -name "*.d.ts" -type f -not -path "./node_modules/*" -delete
find . -name "*.metadata.json" -type f -not -path "./node_modules/*" -delete
