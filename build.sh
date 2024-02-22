// build.sh
#!/usr/bin/env bash
# Sai em caso de erro
set -o errexit

# Instalação das dependências
npm install

# Compilação do código TypeScript
yarn build

# Execução de comandos do Prisma

# Aplicar Migrações Pendentes:

npx prisma migrate deploy -d dist/data-source