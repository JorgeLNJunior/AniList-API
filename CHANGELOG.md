#### 0.8.3 (2022-02-05)

##### Build System / Dependencies

- **fix:** corrigir o build (45748385)

#### 0.8.2 (2022-02-05)

##### Build System / Dependencies

- **deps:** atualizar algumas dependências (ef0ef2ec)

##### Chores

- **seeds:** adicionar gênero aos animes (a78a5a39)

##### Continuous Integration

- **actions:** adicionar o script de build as actions (3eaf5d98)

##### Documentation Changes

- adicionar gênero aos animes (6c89c7a3)

##### New Features

- adicionar gênero aos animes (7cd7958f)

##### Bug Fixes

- **build:** sincronizar o package lock (0549591a)

##### Tests

- **unit:**
  - adicionar o gênero a query de animes (bf78c1e8)
  - adicionar gênero aos animes (fef428ae)

#### 0.8.1 (2022-02-05)

##### Build System / Dependencies

- **deps:** atualizar algumas dependências (ef0ef2ec)

##### Chores

- **seeds:** adicionar gênero aos animes (a78a5a39)

##### Continuous Integration

- **actions:** adicionar o script de build as actions (3eaf5d98)

##### Documentation Changes

- adicionar gênero aos animes (6c89c7a3)

##### New Features

- adicionar gênero aos animes (7cd7958f)

##### Bug Fixes

- **build:** sincronizar o package lock (0549591a)

##### Tests

- **unit:**
  - adicionar o gênero a query de animes (bf78c1e8)
  - adicionar gênero aos animes (fef428ae)

### 0.8.0 (2022-01-14)

##### Build System / Dependencies

- **deps:**
  - atualizar algumas dependências (e0cd1d75)
  - atualizar algumas dependências (8e397116)
- **docker:** remover o compose e reescrever a imagem (a78fa5bb)

##### Chores

- atualizar o anime seed (da8d3134)

##### Documentation Changes

- atualizar o readme (d8d8482b)

##### New Features

- adicionar a temporada dos animes (6f64cd43)

##### Bug Fixes

- corrigir validação do config service (cecb39c5)

##### Refactors

- retornar erro correto na função getStorage (180b968c)

##### Tests

- **unit:** adicionar a temporada dos animes (45238b02)

#### 0.7.6 (2021-12-03)

##### Build System / Dependencies

- especificar a versão do node (61f22e07)
- **deps:** atualizar algumas dependências (561bff9f)

#### 0.7.5 (2021-11-29)

##### Build System / Dependencies

- **deps:** atualizar algumas dependências (0795660e)

##### Code Style Changes

- remover o standard (49d8050c)

#### 0.7.4 (2021-10-21)

##### Build System / Dependencies

- **deps:** atualizar algumas dependências (dacb414d)
- aumentar o limite de requests para 200/min (0a784dcb)

##### Refactors

- alterar nomes de funções (43c08f3c)

##### Tests

- organizar a pasta de testes (fb6097e7)
- **unit:**
  - testar o sendgrid mail service (c39f5033)
  - adicionar teste do mail service (34a82680)
  - testar os consumers (3dc9e440)

#### 0.7.3 (2021-10-05)

##### Documentation Changes

- alterar o logo (6b6c75ae)
- adicionar o logo (a9ba45a9)

#### 0.7.2 (2021-10-04)

##### Build System / Dependencies

- alterar a url do avatar padrão (83427c95)

##### Documentation Changes

- documentar a rota de votos (934c5da2)

#### 0.7.1 (2021-09-30)

##### Build System / Dependencies

- retirar o cluster mode do pm2 (9a6ac44f)
- reconfigurar o pm2 (20875dde)
- adicionar o password na conexão do bull module (e9e289c8)
- **deps:** mover o faker para produção (92c9d382)
- **heroku:** adicionar o Procfile (f8320d01)

##### Chores

- atualizar o CHANGELOG.md (16db7c2a)

#### 0.7.1 (2021-09-30)

##### Build System / Dependencies

- retirar o cluster mode do pm2 (9a6ac44f)
- reconfigurar o pm2 (20875dde)
- adicionar o password na conexão do bull module (e9e289c8)
- **deps:** mover o faker para produção (92c9d382)
- **heroku:** adicionar o Procfile (f8320d01)

### 0.7.0 (2021-09-29)

##### Build System / Dependencies

- **deps:** atualizar várias dependências (42e5f0f6)
- aumentar o limite de requests para 70 (274991ac)

##### Chores

- deletar o update-vote dto (5e94fc06)
- deixar o socket público (95c1a5e2)

##### Documentation Changes

- atualizar o readme (585d6da4)
- atualizar a resposta da rota create vote (6bdba87d)
- adicionar as colunas timestamp nas respostas (bb46da73)

##### New Features

- criar rota para deletar votos (370b34a6)
- criar rota para retornar votos (e5dd2090)
- criar rota para criação de votos (662b1da8)
- implementar o soft delete (68193c5c)
- criar seeders (f8d33cca)
- adicionar colunas de timestamp (0406ea96)
- **BEAKING:** alterar o formato das respostas (d71df530)
- **BREAKING:** retornar dados de paginação (1d80b352)

##### Bug Fixes

- retornar as colunas timestamp de animes (df4a6ac4)
- corrigir mensagens do websocket (2ee971e5)

##### Refactors

- alterar o método create do vote service (db6f1cdf)
- retornar o uuid do usuário no websocket (ae6636b4)
- injetar repositórios no review service (6dd1bd4a)
- remover o método findByEmail (4045e8ed)

##### Code Style Changes

- adicionar o prettier (c55f0e8e)
- corrigir erros de lint (ba105af0)
- alterar o style guide (5967a4ed)
- remover console log (cad3cb6d)

##### Tests

- **unit:**
  - criar rota para deletar votos (a4d0a976)
  - criar rota para retornar votos (581427a5)
  - testar o método create do vote controller (3a7988d1)
  - alterar o método create do vote service (9e7503ea)
  - criar rota para criação de votos (503b3d34)
  - corrigir os testes (bd04b6fc)
  - implementar o soft delete (b25549f1)
  - retornar dados de paginação (8888acc6)
- remover os tests e2e (f22cf6e5)
- remover os seeds do coverage (2fe1ced0)
- mover os fakes para um único arquivo (82da511e)
- atualizar os testes do chat gateway (db1c8337)
- mover os mocks para uma pasta (7f20c69c)

#### 0.6.1 (2021-09-11)

##### Continuous Integration

- corrigir o coverage report (26589904)

### 0.6.0 (2021-09-11)

##### Build System / Dependencies

- **deps:** atualizar algumas dependências (92d26bbc)
- remover o health module (3e37aa73)
- mover o queue module (cd80f469)
- recriar o package-lock (e40d42ba)
- organizar os arquivos em seus módulos (59b51f17)
- validar variáveis de ambiente (9ce4b319)
- instalar o @sendgrid/mail (3d7a0859)

##### Chores

- remover tipo de retorno não usado (c22b4747)
- atualizar os arquivos .env (12220bbd)
- **vscode:** usar a versão do typescript no package.json (440325de)

##### Continuous Integration

- coletar o coverage dos testes unitários (e612fdad)
- adicionar opções ao container redis (c4f2f995)
- **actions:** adicionar uma action para testes unitários (cddeba1e)

##### Documentation Changes

- adicionar a badge de unit test ao readme (65082238)

##### New Features

- impedir login se o email não estiver confirmado (d878dc7d)
- criar rota de confirmação de email (2116d5af)
- transformar o envio de email em uma fila (d063557a)
- enviar email de confirmação (f0457e9f)

##### Bug Fixes

- importar os módulos necessários no email module (fe71d355)
- retornar o status na rota user upload (f645c04c)
- retornar o status na rota anime upload (a90c4b62)
- corrigir resposta da rota create review (d76d1d9a)
- retornar o status da requisição (fead3a79)
- corrigir erro com o fake mail service (8cecc906)
- corrigir as migrations (690ff958)
- corrigir confirmação de email (fa2404b6)

##### Refactors

- injetar as dependências do mail service (f1386377)
- injetar repositório no decorator (9fe21905)
- alterar a review modify guard (bb07090b)
- nao mais deletar a propriedade isAdmin (d80c38c5)
- retirar repositório desnecessário (d6a2dac9)
- alterar o mail service (19a21579)
- alterar os storages de anime (c632eba8)
- alterar os storages de usuário (dc6d029b)
- alterar o decorator para verificar letras maiúsculas e minúsculas (a0a1fec6)
- alterar mensagem de erro (e3c46880)
- alterar parâmetros de upload de avatar (6499e1cf)
- alterar o nome de alguns métodos (7fdc4e34)
- alterar as classes de storage (eef8ee21)
- passar o caminho do arquivo para o anime service (9654c058)
- reconfigurar os storages (3f087449)
- reconfigurar os módulos JWT (6d73dd76)
- mover os módulos no nest (76e0c9e7)

##### Code Style Changes

- remover import desnecessário (111ea743)
- adicionar o eslint-plugin-jest (c34b989a)

##### Tests

- **e2e:** corrigir os testes (27359e65)
- **unit:**
  - testar o mail service (e467bb93)
  - testar as funcões de upload (9e4eeb2c)
  - testar o websocket auth guard (1dbcdcf3)
  - testar o chat gateway (6ffef8cc)
  - testar o isUserAlreadyExistDecorator (09e18736)
  - adicionar teste com query do user service (692ce2cd)
  - testar a review modify guard (77c09e2a)
  - testar o review controller (b50d6881)
  - corrigir o erro esperado (c9994c97)
  - testar o review service (0e339366)
  - testar o is email confirmed guard (a86b234f)
  - testar o auth controller (f7bbbe8d)
  - testar o auth service (0283b9fc)
  - testar os storages de usuário (f637fdd0)
  - testar o is forbidden name decorator (a9cc7b95)
  - testar o user controller (b5634ce8)
  - testar o user service (20883e27)
  - testar algumas funções do anime controller (9b6f5c06)
  - criar os testes do anime service (acb4bbd8)
- retirar alguns diretórios do coverage (634072ca)
- remover as entidades do coverage (ab652f31)
- testar os storages de anime (dd47e59d)
- testar o user modify permission guard (28a72563)
- testar o bcrypt service (e300ff48)
- alterar os diretórios de coverage (d54803ad)
- testar a IsAdminUser guard (73bc9ddf)
- remover opções desnecessárias do database helper (7b68fd2e)
- mockar o bull e queue module (bdad0889)
- **fix:** corrigir os testes (1059dcab)

### 0.5.0 (2021-08-27)

##### Build System / Dependencies

- **deps:** atualizar algumas dependências (2361a7ec)
- alterar nome da guarda de autenticação para websockets (bb491551)
- criar diretórios necessário ao iniciar a aplicação (9ea62d7b)
- setar a porta por variável de ambiente (534a371f)
- **dev:** atualizar os container docker (75865e76)

##### Chores

- deletar arquivos substituídos (3a636a43)
- retornar erro no websocket se não estiver autenticado (c0352f9e)
- deletar arquivos temporários (1046d290)
- **log:** criar log básico para queues e jobs (71e4906f)

##### New Features

- criar chat em tempo real (0a7507c6)

##### Refactors

- mover o queue module para shared (83f3e76c)
- renomear o módulo job para queue (deb5b34e)
- habilitar o cors diretamente pelo nest (31c7ab20)

### 0.4.0 (2021-08-20)

##### Build System / Dependencies

- verificar se o pm2 já está instalado (88ba154f)
- usar o pm2 em produção (8f652f03)
- **deps:** atualizar várias dependências (726cf3e0)

##### Continuous Integration

- **fix:**
  - corrigir identação da action de testes (4386c40b)
  - adicionar o redis a action de testes (6e475af0)
- remover actions de build (ceb874ee)

##### Documentation Changes

- adicionar o link do frontend no readme (4feb6ad6)

##### New Features

- implementar filas para comprimir imagens (65075cbf)
- retornar os top 10 animes (1d7ed2ce)
- adicionar o parametro userUuid a query de reviews (f4835852)

##### Tests

- **fix:** correção temporária para o módulo Bull que não encerra (9a7c5e18)
- retornar os top 10 animes (1a12d036)
- adicionar o parametro userUuid a query de reviews (0aa7a419)

### 0.3.0 (2021-08-09)

##### Build System / Dependencies

- **deps:**
  - atualizar várias dependências (3415d10a)
  - atualizar dependencias vulneráveis (c7a4a92b)

##### New Features

- adicionar a propriedade animeUuid a review query (5b3babb2)

##### Bug Fixes

- retornar a propriedade releaseDate dos animes (e7bd4e5e)

##### Tests

- adicionar teste da query animeUuid (ef527bae)

### 0.2.0 (2021-08-02)

##### New Features

- impedir mais de uma review por anime (30562faf)
- retornar quantidade de reviews do anime (b14734b8)
- retornar a média das notas do anime (edba7057)
- **BREAKING:** adicionar a propriedade releaseDate aos animes (a4b93bb2)

##### Bug Fixes

- retornar erro se o anime não existe ao criar uma review (4b11730e)

##### Tests

- impedir mais de uma review por anime (eb1a338c)
- adicionar a propriedade releaseDate ao anime builder (cd9b0afe)

#### 0.1.3 (2021-07-26)

##### Build System / Dependencies

- remover valores padrão da classe Constants (dd444c07)
- alterar o método onModuleInit para onApplicationBootstrap (b1e59bec)
- **deps:**
  - atualizar várias dependências (c2aa6b61)
  - atualizar várias dependências (8e4ecc81)

##### Chores

- não gerar arquivos de teste automaticamente (5f7892aa)

##### Bug Fixes

- corrigir inicialização do typeorm (81e15061)

##### Tests

- ignorar alguns diretórios (31f44601)

#### 0.1.2 (2021-07-20)

##### Continuous Integration

- **actions:** testar o build da aplicação (4ea309ab)

##### Documentation Changes

- alterar a mensagem de nova release (34024481)

##### New Features

- implementar alguns health checks (a9ba57a7)

##### Tests

- alterar os valores dos health checks (9d275138)
- implementar os testes dos health checks (8ab658ee)

#### 0.1.1 (2021-07-09)

##### Build System / Dependencies

- **dev:**
  - corrigir o comando start do docker (27c0eda1)
  - containerizar a aplicação (55097aa8)
- instalar o cors (e209b151)

##### Documentation Changes

- corrigir a badge dos testes e2e (beaf80ca)

### 0.1.0 (2021-07-06)

##### Build System / Dependencies

- instalar o generate changelog (d809b316)
- remover o dotenv e seus imports (17d4c528)
- remover os arquivos do módulo app (eb8246c5)
- implementar rate limit (0edff08e)
- adicionar o helmet (0bb0bcee)
- habilitar validação global (5c666c22)
- adicionar e configurar o prisma (7407918f)
- adicionar o config module (bdec2402)

##### Chores

- organizar a pasta de módulos (f23c76f0)
- commit inicial (6cdd467a)

##### Continuous Integration

- criar a licença (161561f4)
- adicionar o CodeQL (d2cfe26e)
- criar uma action para rodar os testes (5c3c763a)

##### Documentation Changes

- criar o readme (f06bbffe)
- documentar a rota de registro (abcbac67)
- adicionar o swagger module (d6d04bb2)
- **fix:** corrigir o status da rota de registro (00653257)

##### New Features

- criar um usuário administrador e definir suas permissões (57c6914d)
- criar guarda de permissão de modificação de reviews (dbfbbe33)
- criar a rota de deletar reviews (74c1bacd)
- criar a rota de atualização de reviews (42f73fed)
- criar a rota de listagem de reviews (0bdc5aa4)
- criar a rota de criação de reviews (ee51ce00)
- validar urls do youtube (6940f5dc)
- definir avatar de usuário padrão (71b5fe81)
- criar a rota de upload de animes (b4a82481)
- criar a rota de deletar animes (57a1aa37)
- criar a rota de atualização de animes (bd4cd947)
- melhorar a precisão da query name da rota de usuários (4bfeaac9)
- criar a rota de listagem de animes (92b81e05)
- criar a rota de criação de animes (43c06f22)
- criar a rota de upload de usuário (6ce4a6d3)
- criar a rota de deletar usuários (828b75a8)
- criar uma guard de permissão (a8f1c96f)
- criar a rota de atualização de usuários (07ec89e8)
- completar a rota get users (2073ce7f)
- implementar a rota de login (57bdec25)
- criar a rota de registro de usuários (478bca29)

##### Bug Fixes

- corrigir o nome da propriedade user (b3265e30)
- corrigir o auth module (cf700052)
- corrigir o jwt module (06c5a6c6)

##### Refactors

- habilitar o cascade na entidade review (e06330a5)
- remover a propriedade isAdmin das respostas (4274564e)
- corrigir os parâmetros da query de reviews (e975ac08)
- renomear a guarda modifyPermission (b7f939e9)
- reduzir o número de decorators nas rotas de usuários (b41d8cc9)
- mover os decorator de usuário para o módulo correto (91547d0c)
- adicionar mais validações na criação de animes (a6d8b418)
- instalar o typeorm (6ad908b5)
- remover o prisma (6670bd8e)

##### Code Style Changes

- remover import não usados (8458c7cf)
- adicionar aliases do typescript (325f1ddf)
- adicionar o editor config (85a66bdf)
- remover a opção --cache do eslint (4878f12e)
- configurar o husky e lint staged (fd5f5e5d)
- adicionar o simple import sort (7db67145)

##### Tests

- criar mais testes (6373d123)
- configurar o coverage e atualizar os testes (30918d64)
- atualizar os testes da rota de reviews (bafc4ba5)
- criar os testes da rota de deletar reviews (767fbf16)
- criar os testes da rota de atualização de reviews (a6a7b04e)
- criar os testes da rota de listagem de reviews (4f670e87)
- criar os testes da rota de criação de reviews (3eaac092)
- criar os testes da rota de deletar animes (6200c6bf)
- atualizar os testes da rota de criação de animes (d3a567f1)
- corrigir os erros de conexão (0af9e7ff)
- atualizar o .env de teste (4e0be403)
- atualizar os testes de animes com autorização (a52a4fab)
- criar os testes da rota de atualização de animes (853c435e)
- criar os testes da rota de listagem de usuários (c17e937a)
- criar os testes da rota de criação de animes (fa1ae625)
- criar os testes da rota delete users (5b85389e)
- criar os testes da rota patch users (f6449d9f)
- criar os testes da rota get users (203011de)
- adicionar os testes da rota de login (b54d5e06)
- atualizar os testes (0f12c82f)
- criar os testes da rota de registro de usuários (2c35d070)
