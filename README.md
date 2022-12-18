<div align="center" id="short-description-and-logo">

<!-- <img src="https://i.ibb.co/q045V4Z/AR-Logo.png" width="300px"> -->

<h1>AniList API</h1>

Avalie e veja a opnião de outras pessoas sobre seus animes favoritos

</div>

<div align="center" id="badges">

[![Actions Build And Test](https://img.shields.io/github/actions/workflow/status/JorgeLNJunior/AniList-API/ci.yml?branch=master)](https://github.com/JorgeLNJunior/AniList-API/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/JorgeLNJunior/AniList-API/badge.svg?branch=master)](https://coveralls.io/github/JorgeLNJunior/AniList-API?branch=master)
[![License](https://img.shields.io/github/license/JorgeLNJunior/AniList-API)](https://github.com/JorgeLNJunior/AniList-API/blob/master/LICENSE.md)
[![Release](https://img.shields.io/github/v/release/JorgeLNJunior/AniList-API?color=lgreen)](https://github.com/JorgeLNJunior/AniList-API/releases)

</div>

<div align="center">

[Trello](https://trello.com/b/o7iD52J4/anilist) |
[Docs](https://api-anilist.herokuapp.com/docs)

</div>

AniList é uma plataforma inspirada no [My Anime List](https://myanimelist.net/) a qual foi contruída para aprimorar minhas habilidade em NodeJs, NestJs, APIs e código limpo, além de aprender como processar dados em filas (processamento de imagens e envio de e-mails), testes unitários e diferentes níveis de permissão e autenticação.

## Tabela de Conteúdos

- [Tecnologias](https://github.com/JorgeLNJunior/AniList-API#tecnologias)
- [Instalação e configuração](https://github.com/JorgeLNJunior/AniList-API#instala%C3%A7%C3%A3o-e-configura%C3%A7%C3%A3o)
  - [Requisitos](https://github.com/JorgeLNJunior/AniList-API#requisitos)
  - [Instalação](https://github.com/JorgeLNJunior/AniList-API#instala%C3%A7%C3%A3o)
- [Licença](https://github.com/JorgeLNJunior/AniList-API#licen%C3%A7a)

## Tecnologias

Este projeto foi construído com as seguintes tecnologias:

- [Node.js »](https://nodejs.org)
- [Nest.js »](https://nestjs.com)
- [Typescript »](https://www.typescriptlang.org)
- [Jest »](https://jestjs.io)
- [GitHub Actions »](https://github.com/features/actions)
- [Swagger »](https://swagger.io)
- [TypeORM »](https://typeorm.io)
- [Redis »](https://redis.io/)

## Instalação e configuração

### Requisitos

- [Node.js »](https://nodejs.org/en/download) na sua versão LTS
- Um Banco de dados suportado pelo [TypeORM »](https://typeorm.io)
- Um Banco de dados [Redis »](https://redis.io/)

### Instalação e inicialização

1. Clone o projeto: `git clone https://github.com/JorgeLNJunior/AniList-API.git`
2. Instale as dependências: `npm i`
3. Renomeie o arquivo `.env.example` para `.env`
4. Para iniciar a aplicação execute `npm run build` e `npm run start:prod`
5. Para iniciar um container docker execute `npm run docker:build` e `npm run docker:run`
6. Para os testes execute `npm test`

## Licença

Projeto sob a licença [MIT »](https://github.com/JorgeLNJunior/AniList-API/blob/master/LICENSE.md)
