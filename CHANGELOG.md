### 0.4.0 (2021-08-20)

##### Build System / Dependencies

*  verificar se o pm2 já está instalado (88ba154f)
*  usar o pm2 em produção (8f652f03)
* **deps:**  atualizar várias dependências (726cf3e0)

##### Continuous Integration

* **fix:**
  *  corrigir identação da action de testes (4386c40b)
  *  adicionar o redis a action de testes (6e475af0)
*  remover actions de build (ceb874ee)

##### Documentation Changes

*  adicionar o link do frontend no readme (4feb6ad6)

##### New Features

*  implementar filas para comprimir imagens (65075cbf)
*  retornar os top 10 animes (1d7ed2ce)
*  adicionar o parametro userUuid a query de reviews (f4835852)

##### Tests

* **fix:**  correção temporária para o módulo Bull que não encerra (9a7c5e18)
*  retornar os top 10 animes (1a12d036)
*  adicionar o parametro userUuid a query de reviews (0aa7a419)

### 0.3.0 (2021-08-09)

##### Build System / Dependencies

* **deps:**
  *  atualizar várias dependências (3415d10a)
  *  atualizar dependencias vulneráveis (c7a4a92b)

##### New Features

*  adicionar a propriedade animeUuid a review query (5b3babb2)

##### Bug Fixes

*  retornar a propriedade releaseDate dos animes (e7bd4e5e)

##### Tests

*  adicionar teste da query animeUuid (ef527bae)

### 0.2.0 (2021-08-02)

##### New Features

*  impedir mais de uma review por anime (30562faf)
*  retornar quantidade de reviews do anime (b14734b8)
*  retornar a média das notas do anime (edba7057)
* **BREAKING:**  adicionar a propriedade releaseDate aos animes (a4b93bb2)

##### Bug Fixes

*  retornar erro se o anime não existe ao criar uma review (4b11730e)

##### Tests

*  impedir mais de uma review por anime (eb1a338c)
*  adicionar a propriedade releaseDate ao anime builder (cd9b0afe)

#### 0.1.3 (2021-07-26)

##### Build System / Dependencies

*  remover valores padrão da classe Constants (dd444c07)
*  alterar o método onModuleInit para onApplicationBootstrap (b1e59bec)
* **deps:**
  *  atualizar várias dependências (c2aa6b61)
  *  atualizar várias dependências (8e4ecc81)

##### Chores

*  não gerar arquivos de teste automaticamente (5f7892aa)

##### Bug Fixes

*  corrigir inicialização do typeorm (81e15061)

##### Tests

*  ignorar alguns diretórios (31f44601)

#### 0.1.2 (2021-07-20)

##### Continuous Integration

* **actions:**  testar o build da aplicação (4ea309ab)

##### Documentation Changes

*  alterar a mensagem de nova release (34024481)

##### New Features

*  implementar alguns health checks (a9ba57a7)

##### Tests

*  alterar os valores dos health checks (9d275138)
*  implementar os testes dos health checks (8ab658ee)

#### 0.1.1 (2021-07-09)

##### Build System / Dependencies

* **dev:**
  *  corrigir o comando start do docker (27c0eda1)
  *  containerizar a aplicação (55097aa8)
*  instalar o cors (e209b151)

##### Documentation Changes

*  corrigir a badge dos testes e2e (beaf80ca)

### 0.1.0 (2021-07-06)

##### Build System / Dependencies

*  instalar o generate changelog (d809b316)
*  remover o dotenv e seus imports (17d4c528)
*  remover os arquivos do módulo app (eb8246c5)
*  implementar rate limit (0edff08e)
*  adicionar o helmet (0bb0bcee)
*  habilitar validação global (5c666c22)
*  adicionar e configurar o prisma (7407918f)
*  adicionar o config module (bdec2402)

##### Chores

*  organizar a pasta de módulos (f23c76f0)
*  commit inicial (6cdd467a)

##### Continuous Integration

*  criar a licença (161561f4)
*  adicionar o CodeQL (d2cfe26e)
*  criar uma action para rodar os testes (5c3c763a)

##### Documentation Changes

*  criar o readme (f06bbffe)
*  documentar a rota de registro (abcbac67)
*  adicionar o swagger module (d6d04bb2)
* **fix:**  corrigir o status da rota de registro (00653257)

##### New Features

*  criar um usuário administrador e definir suas permissões (57c6914d)
*  criar guarda de permissão de modificação de reviews (dbfbbe33)
*  criar a rota de deletar reviews (74c1bacd)
*  criar a rota de atualização de reviews (42f73fed)
*  criar a rota de listagem de reviews (0bdc5aa4)
*  criar a rota de criação de reviews (ee51ce00)
*  validar urls do youtube (6940f5dc)
*  definir avatar de usuário padrão (71b5fe81)
*  criar a rota de upload de animes (b4a82481)
*  criar a rota de deletar animes (57a1aa37)
*  criar a rota de atualização de animes (bd4cd947)
*  melhorar a precisão da query name da rota de usuários (4bfeaac9)
*  criar a rota de listagem de animes (92b81e05)
*  criar a rota de criação de animes (43c06f22)
*  criar a rota de upload de usuário (6ce4a6d3)
*  criar a rota de deletar usuários (828b75a8)
*  criar uma guard de permissão (a8f1c96f)
*  criar a rota de atualização de usuários (07ec89e8)
*  completar a rota get users (2073ce7f)
*  implementar a rota de login (57bdec25)
*  criar a rota de registro de usuários (478bca29)

##### Bug Fixes

*  corrigir o nome da propriedade user (b3265e30)
*  corrigir o auth module (cf700052)
*  corrigir o jwt module (06c5a6c6)

##### Refactors

*  habilitar o cascade na entidade review (e06330a5)
*  remover a propriedade isAdmin das respostas (4274564e)
*  corrigir os parâmetros da query de reviews (e975ac08)
*  renomear a guarda modifyPermission (b7f939e9)
*  reduzir o número de decorators nas rotas de usuários (b41d8cc9)
*  mover os decorator de usuário para o módulo correto (91547d0c)
*  adicionar mais validações na criação de animes (a6d8b418)
*  instalar o typeorm (6ad908b5)
*  remover o prisma (6670bd8e)

##### Code Style Changes

*  remover import não usados (8458c7cf)
*  adicionar aliases do typescript (325f1ddf)
*  adicionar o editor config (85a66bdf)
*  remover a opção --cache do eslint (4878f12e)
*  configurar o husky e lint staged (fd5f5e5d)
*  adicionar o simple import sort (7db67145)

##### Tests

*  criar mais testes (6373d123)
*  configurar o coverage e atualizar os testes (30918d64)
*  atualizar os testes da rota de reviews (bafc4ba5)
*  criar os testes da rota de deletar reviews (767fbf16)
*  criar os testes da rota de atualização de reviews (a6a7b04e)
*  criar os testes da rota de listagem de reviews (4f670e87)
*  criar os testes da rota de criação de reviews (3eaac092)
*  criar os testes da rota de deletar animes (6200c6bf)
*  atualizar os testes da rota de criação de animes (d3a567f1)
*  corrigir os erros de conexão (0af9e7ff)
*  atualizar o .env de teste (4e0be403)
*  atualizar os testes de animes com autorização (a52a4fab)
*  criar os testes da rota de atualização de animes (853c435e)
*  criar os testes da rota de listagem de usuários (c17e937a)
*  criar os testes da rota de criação de animes (fa1ae625)
*  criar os testes da rota delete users (5b85389e)
*  criar os testes da rota patch users (f6449d9f)
*  criar os testes da rota get users (203011de)
*  adicionar os testes da rota de login (b54d5e06)
*  atualizar os testes (0f12c82f)
*  criar os testes da rota de registro de usuários (2c35d070)

