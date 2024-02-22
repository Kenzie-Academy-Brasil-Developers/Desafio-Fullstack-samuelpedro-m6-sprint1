#!/usr/bin/env bash
# Sai em caso de erro
set -o errexit

yarn start

# Instalação das dependências
yarn install

# Compilação do código TypeScript
yarn build

# Execução de comandos do Prisma

# Aplicar Migrações Pendentes:

yarn prisma migrate deploy