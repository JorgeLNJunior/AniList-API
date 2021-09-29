<div align="center" id="short-description">

<h1>Animes Review</h1>

Plataforma para avaliação de animes

</div>

<div align="center" id="badges">

[![Actions Unit](https://img.shields.io/github/workflow/status/JorgeLNJunior/animes-review-api/Unit%20Tests/master)](https://github.com/JorgeLNJunior/animes-review-api/actions/workflows/unit-tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/JorgeLNJunior/animes-review-api/badge.svg?branch=master)](https://coveralls.io/github/JorgeLNJunior/animes-review-api?branch=master)
[![License](https://img.shields.io/github/license/JorgeLNJunior/animes-review-api)](https://github.com/JorgeLNJunior/animes-review-api/blob/master/LICENSE.md)
[![Release](https://img.shields.io/github/v/release/JorgeLNJunior/animes-review-api?color=lgreen)](https://github.com/JorgeLNJunior/animes-review-api/releases)

</div>

<div align="center">

[Trello](https://trello.com/b/o7iD52J4/animes-review) |
[Front-end](https://github.com/JorgeLNJunior/animes-review)

</div>

## Tabela de Conteúdos
* [Rotas](https://github.com/JorgeLNJunior/animes-review-api#rotas)
* [Tecnologias](https://github.com/JorgeLNJunior/animes-review-api#tecnologias)
* [Instalação e configuração](https://github.com/JorgeLNJunior/animes-review-api#instala%C3%A7%C3%A3o-e-configura%C3%A7%C3%A3o)
  * [Requisitos](https://github.com/JorgeLNJunior/animes-review-api#requisitos)
  * [Opcional](https://github.com/JorgeLNJunior/animes-review-api#requisitos)
  * [Instalação](https://github.com/JorgeLNJunior/animes-review-api#instala%C3%A7%C3%A3o)
* [Licença](https://github.com/JorgeLNJunior/animes-review-api#licen%C3%A7a)

## Rotas

Informações básicas sobre as rotas da aplicação.
| HTTP   | Rota                | Descrição                           | Autenticação |
|--------|---------------------|-------------------------------------|--------------|
| GET    | /register           | registra um usuário                 | não          |
| GET    | /login              | autentica um usuário                | não          |
| GET    | /users              | retorna todos os usuários           | sim          |
| GET    | /docs               | documentação da API                 | não          |

**A fazer**

## Tecnologias
Este projeto foi construído com as seguintes tecnologias:
- [Node.js »](https://nodejs.org)
- [Nest.js »](https://nestjs.com)
- [Typescript »](https://www.typescriptlang.org)
- [Jest »](https://jestjs.io)
- [GitHub Actions »](https://github.com/features/actions)
- [Swagger »](https://swagger.io)
- [TypeORM »](https://typeorm.io)

## Instalação e configuração
### Requisitos
  - [Node.js »](https://nodejs.org/en/download) na sua versão lts
  - Um Banco de dados suportado pelo [TypeORM »](https://typeorm.io)
  - Um Banco de dados [Redis »](https://redis.io/)

### Instalação e inicialização
  1. Clone o projeto: `git clone https://github.com/JorgeLNJunior/animes-review-api.git`
  2. Instale as dependências: `npm i`
  3. Renomeie o arquivo `.env.example` para `.env`
  4. Para iniciar a aplicação execute `npm run build` e `npm start`
  5. Para os testes execute `npm test`

## Licença
Projeto sob a licença [MIT »](https://github.com/JorgeLNJunior/animes-review-api/blob/master/LICENSE.md)
