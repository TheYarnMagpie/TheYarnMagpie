#!/usr/bin/env bash
set -euo pipefail

# Start dev server in background (logs to dev.log)
npm run dev &> dev.log &
PID=$!
trap 'kill $PID 2>/dev/null || true' EXIT

# Wait up to 30s for server to respond
for i in $(seq 1 30); do
  if curl -sSf http://127.0.0.1:8080 >/dev/null 2>&1; then
    echo "Server ready"
    break
  fi
  sleep 1
done

# Run a smoke request
if curl -sSf http://127.0.0.1:8080 >/dev/null 2>&1; then
  echo "Smoke test passed"
else
  echo "Smoke test failed — check dev.log for details"
  cat dev.log || true
  exit 1
fi