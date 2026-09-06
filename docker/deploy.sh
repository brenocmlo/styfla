#!/usr/bin/env bash
set -e

echo "🥋 STYFLA — Iniciando Script de Deploy no VPS HostGator (Modo Docker Direto)..."

# Ir para o diretório raiz do repositório
cd "$(dirname "$0")/.."

echo "📥 Baixando atualizações do Git..."
git pull origin main || echo "⚠️ Aviso: Repositório local sem upstream configurado ou alterações não commitadas."

echo "🐳 Subindo/Atualizando container da aplicação e do PostgreSQL..."
docker compose -f docker/docker-compose.yml up -d --build

echo "🗄️ Executando migrações do banco de dados (Prisma)..."
docker compose -f docker/docker-compose.yml exec -T app pnpm --filter @styfla/database db:push

echo "🧹 Limpando imagens Docker antigas não utilizadas..."
docker image prune -f

echo "✅ DEPLOY CONCLUÍDO COM SUCESSO!"
echo "📍 Aplicação rodando no VPS HostGator diretamente via Dockerfile na porta 80 / 3030."
