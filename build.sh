// build.sh
#!/usr/bin/env bash
# Sai em caso de erro
set -o errexit

# Instalação das dependências
yarn

# Compilação do código TypeScript
yarn build

# Execução de comandos do Prisma

# Aplicar Migrações Pendentes:

yarn prisma migrate deploy -d dist/data-source