#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

echo "== repo root =="
pwd

echo "== install root =="
npm ci

echo "== install mobile =="
(cd mobile && npm ci)

echo "== web check =="
npm run check

echo "== mobile typecheck =="
(cd mobile && npx tsc --noEmit)

echo "== mobile dependency proof =="
(cd mobile && npm ls expo-status-bar)

echo "== git summary =="
git status -sb

echo "prepr.sh complete ✅"
