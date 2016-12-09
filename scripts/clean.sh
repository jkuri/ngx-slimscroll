#!/bin/bash

find ./src -name "*.js" -type f -not -path "./node_modules/*" -delete
find ./src -name "*.js.map" -type f -not -path "./node_modules/*" -delete
find ./src -name "*.d.ts" -type f -not -path "./node_modules/*" -delete
find . -name "*.metadata.json" -type f -not -path "./node_modules/*" -delete
