#!/usr/bin/env bash
# ─────────────────────────────────────────────
#  UHack deploy script
#  Usage:  ./deploy.sh
#          ./deploy.sh "optional commit message"
# ─────────────────────────────────────────────
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()    { echo -e "${GREEN}[✔]${NC} $1"; }
warn()    { echo -e "${YELLOW}[!]${NC} $1"; }
error()   { echo -e "${RED}[✘]${NC} $1"; exit 1; }

COMMIT_MSG="${1:-"deploy: update site $(date '+%Y-%m-%d %H:%M')"}"

echo ""
echo -e "${GREEN}══════════════════════════════════════${NC}"
echo -e "${GREEN}   🚀  UHack Deploy Script            ${NC}"
echo -e "${GREEN}══════════════════════════════════════${NC}"
echo ""

# ── 1. Make sure we're in the right folder ────────────────
cd "$(dirname "$0")"
info "Working directory: $(pwd)"

# ── 2. Install dependencies ───────────────────────────────
info "Installing dependencies..."
npm install --silent || error "npm install failed"

# ── 3. Build ─────────────────────────────────────────────
info "Building..."
npm run build || error "Build failed — fix errors above and re-run"
info "Build successful ✅"

# ── 4. Git: stage → commit → push ────────────────────────
if [[ -n $(git status --porcelain) ]]; then
  info "Committing changes: \"$COMMIT_MSG\""
  git add -A
  git commit -m "$COMMIT_MSG"
  git push
  info "Pushed to GitHub ✅"
else
  warn "Nothing new to commit — skipping git step"
fi

# ── 5. Vercel production deploy ───────────────────────────
if command -v vercel &> /dev/null; then
  info "Deploying to Vercel..."
  vercel --prod --yes
  info "Vercel deploy done ✅"
else
  warn "Vercel CLI not found. Install it with:  npm i -g vercel"
  warn "Skipping Vercel deploy (GitHub push already triggers auto-deploy if linked)"
fi

echo ""
echo -e "${GREEN}══════════════════════════════════════${NC}"
echo -e "${GREEN}   ✅  Deploy complete!               ${NC}"
echo -e "${GREEN}══════════════════════════════════════${NC}"
echo ""
