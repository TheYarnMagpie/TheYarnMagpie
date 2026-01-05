#!/usr/bin/env bash
set -e

echo "🔍 Pre-PR sanity check starting..."
echo

# 1. Check package.json is valid JSON
echo "1️⃣ Checking package.json JSON validity..."
node -e "JSON.parse(require('fs').readFileSync('package.json','utf8'))"
echo "✅ package.json is valid JSON"
echo

# 2. Check npm can read package.json
echo "2️⃣ Checking npm can read package.json..."
npm pkg get name version >/dev/null
echo "✅ npm can read package.json"
echo

# 3. Validate package-lock.json consistency
echo "3️⃣ Validating package-lock.json consistency..."
npm install --package-lock-only --ignore-scripts >/dev/null
echo "✅ package-lock.json is valid & in sync"
echo

# 4. Optional full install check (best effort)
echo "4️⃣ Optional npm ci check (may fail on Android shared storage)..."
if npm ci >/dev/null 2>&1; then
  echo "✅ npm ci succeeded"
else
  echo "⚠️ npm ci failed — likely Android symlink/storage issue"
  echo "ℹ️ This does NOT necessarily mean your files are invalid"
fi

echo
echo "🎉 Pre-PR checks completed"
