# Olá

Esse repositório contém o teste técnico para a vaga de Dev Front-End
Além do código para o teste, você encontrará também:

- Arquivos de documentação sobre como o app funciona
- Rascunhos e diagramas criados no processo de desenvolvimento para documentação e estudo do código e design do app
- Logs de desenvolvimento para documentar como é meu workflow

Essa é uma aplicação desenvolvida em base no framework *NextJS*, usando **AppRouter**

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 18.17 ou superior)
- pnpm (versão 8.0 ou superior)

## Para rodar o projeto

Este projeto usa o `pnpm` como gerenciador de pacotes. Para rodar localmente, execute:

```bash
git clone https://github.com/enzoenrico/uex_test
cd uex_test
pnpm i
```

### Configuração do ambiente

1. Crie um arquivo .env

```bash
touch .env
```

2. Atualize o arquivo `.env` com suas credenciais:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<"YOUR_API_KEY">

DATABASE_URL="file:./dev.db"

JWT_SECRET="super-mega-secure-jwt-token"

GOOGLE_MAP_ID=<"Your id">
```

3. Rode a build de desenvolvimento

```bash
pnpm dev
```
