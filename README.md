🛒 E-Commerce API (Back-End)

API RESTful desenvolvida em Node.js com Express e Sequelize ORM, integrada ao banco de dados relacional MySQL. O projeto adota a arquitetura MVC (Model-View-Controller), possui autenticação de rotas via JWT (JSON Web Token) e criptografia de senhas com Bcrypt.

📑 Sumário

* Visão Geral
* Tecnologias Utilizadas
* Arquitetura e Estrutura de Pastas
* Pré-requisitos
* Instalação e Passo a Passo
* Configuração de Variáveis de Ambiente
* Documentação Complementar dos Endpoints
* Tabela de Endpoints da API
* Exemplos Práticos de Requisições (JSON e cURL)
* Tabela de Códigos de Status HTTP
* Guia Passo a Passo do Git e GitHub

🎯 Visão Geral

Esta aplicação fornece a infraestrutura de back-end para um sistema de e-commerce, contemplando:

* Gestão de Usuários: Cadastro com validação de campos, verificação de duplicidade de e-mail e armazenamento de senha criptografada via bcrypt.
* Autenticação Segura: Emissão e validação de tokens JWT (Bearer) para proteção de rotas privadas (POST, PUT, DELETE).
* Gestão de Categorias: Operações de CRUD e parâmetro use_in_menu para exibição na navegação principal.
* Gestão de Produtos: CRUD completo de produtos, incluindo suporte a filtros por palavra-chave (match), seleção de atributos (fields) e paginação (limit e page).

📊 Tabela de Tecnologias Utilizadas

Tecnologia	Função / Aplicação
Node.js	Ambiente de execução JavaScript no lado do servidor
Express.js	Framework web para gerenciamento de rotas e middlewares
MySQL	Sistema de Gerenciamento de Banco de Dados Relacional (SGBD)
Sequelize ORM	Mapeamento objeto-relacional para interação com o MySQL
JWT (jsonwebtoken)	Geração e verificação de tokens de autenticação Bearer
Bcrypt	Criptografia de senhas através de hashing seguro
Dotenv	Carregamento de variáveis de ambiente a partir de arquivo .env

📁 Arquitetura e Estrutura de Pastas

A aplicação segue a divisão de responsabilidades da arquitetura MVC:

projeto-backend/
├── src/
│   ├── config/
│   │   └── database.js          # Conexão do Sequelize com o MySQL
│   ├── controllers/
│   │   ├── userController.js     # Regras de negócio de usuários e autenticação
│   │   ├── categoryController.js # Regras de negócio e CRUD de categorias
│   │   └── productController.js  # Regras de negócio e CRUD de produtos
│   ├── middleware/
│   │   └── authMiddleware.js    # Interceptador e validador do Token JWT
│   ├── models/
│   │   ├── User.js              # Modelo Sequelize de Usuários
│   │   ├── Category.js          # Modelo Sequelize de Categorias
│   │   └── Product.js           # Modelo Sequelize de Produtos
│   ├── routes/
│   │   ├── userRoutes.js         # Definição das rotas de Usuários e Login
│   │   ├── categoryRoutes.js     # Definição das rotas de Categorias
│   │   └── productRoutes.js      # Definição das rotas de Produtos
│   ├── app.js                   # Configuração das rotas e middlewares do Express
│   └── server.js                # Inicialização do servidor e sincronização com MySQL
├── .env.example                 # Modelo das variáveis de ambiente
├── .gitignore                   # Lista de arquivos ignorados pelo Git
├── package.json                 # Manifesto de dependências e scripts Node.js
└── README.md                    # Documentação principal do projeto


📌 Pré-requisitos

Para rodar este projeto localmente, você precisará dos seguintes softwares instalados:

1. Node.js (versão 18.x ou superior)
2. npm (Gerenciador de pacotes, incluído junto ao Node.js)
3. MySQL Server (ou via XAMPP / WAMP na porta 3306)
4. Git
5. Cliente HTTP (Opcional, para testes): Postman, Insomnia ou extensão Thunder Client no VS Code.

🛠️ Instalação e Passo a Passo

* Passo 1: Clonar o Repositório

git clone <URL_DO_SEU_REPOSITORIO>
cd projeto-backend


* Passo 2: Instalar as Dependências

npm install


* Passo 3: Configurar as Variáveis de Ambiente

Crie um arquivo chamado .env na raiz do projeto conforme a seção Configuração de Variáveis de Ambiente.


* Passo 4: Criar o Banco de Dados no MySQL

Abra o MySQL Command Line Client ou MySQL Workbench e execute o comando:

CREATE DATABASE projeto_backend;


* Passo 5: Iniciar o Servidor

npm start


O Sequelize conectará ao MySQL e criará as tabelas users, categories e products automaticamente.

⚙️ Configuração de Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto com as seguintes chaves:

PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=sua_senha_aqui
DB_NAME=projeto_backend
JWT_SECRET=sua_chave_secreta_jwt


📋 Tabela de Endpoints da API

Recurso	Método	Endpoint	Proteção JWT	Descrição
Usuários	POST	/v1/user	Não	Cadastra um novo usuário no banco de dados
Usuários	POST	/v1/user/token	Não	Autentica e gera o token de acesso JWT
Usuários	GET	/v1/user/:id	Não	Consulta dados de um usuário pelo ID
Usuários	PUT	/v1/user/:id	Sim	Atualiza dados de um usuário
Usuários	DELETE	/v1/user/:id	Sim	Remove um usuário do sistema
Categorias	GET	/v1/category/search	Não	Lista categorias com paginação
Categorias	GET	/v1/category/:id	Não	Consulta uma categoria por ID
Categorias	POST	/v1/category	Sim	Cadastra uma nova categoria
Categorias	PUT	/v1/category/:id	Sim	Atualiza dados de uma categoria
Categorias	DELETE	/v1/category/:id	Sim	Remove uma categoria pelo ID
Produtos	GET	/v1/product/search	Não	Lista produtos com filtros (match, limit, page)
Produtos	GET	/v1/product/:id	Não	Consulta um produto por ID
Produtos	POST	/v1/product	Sim	Cadastra um novo produto
Produtos	PUT	/v1/product/:id	Sim	Atualiza dados de um produto
Produtos	DELETE	/v1/product/:id	Sim	Remove um produto do sistema
<img width="1071" height="321" alt="image" src="https://github.com/user-attachments/assets/e61631b3-bf7b-4584-ae65-f2e7a3aa25be" />


🧪 Exemplos Práticos de Requisições (JSON e cURL)

1. Cadastro de Usuário (POST /v1/user)

* Body (JSON):

{
  "firstname": "Lucas",
  "surname": "Silva",
  "email": "lucas@email.com",
  "password": "123456",
  "confirmPassword": "123456"
}


* cURL (Terminal):

curl -X POST http://localhost:3000/v1/user \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "Lucas",
    "surname": "Silva",
    "email": "lucas@email.com",
    "password": "123456",
    "confirmPassword": "123456"
  }'


2. Autenticação e Geração de Token (POST /v1/user/token)

* Body (JSON):

{
  "email": "lucas@email.com",
  "password": "123456"
}


* Resposta Esperada (200 OK):

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}


3. Cadastro de Categoria (POST /v1/category) — Requer Token JWT

* Header: Authorization: Bearer <SEU_TOKEN_JWT>
* Body (JSON):

{
  "name": "Calçados",
  "slug": "calcados",
  "use_in_menu": true
}


* cURL (Terminal):

curl -X POST http://localhost:3000/v1/category \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer COLE_O_TOKEN_AQUI" \
  -d '{
    "name": "Calçados",
    "slug": "calcados",
    "use_in_menu": true
  }'


4. Cadastro de Produto (POST /v1/product) — Requer Token JWT

* Header: Authorization: Bearer <SEU_TOKEN_JWT>
* Body (JSON):

{
  "enabled": true,
  "name": "Tênis Esportivo Nitro",
  "slug": "tenis-esportivo-nitro",
  "stock": 45,
  "description": "Tênis leve e ideal para corridas de alta performance.",
  "price": 299.90,
  "price_with_discount": 249.90
}


5. Busca de Produtos com Filtro (GET /v1/product/search)

* URL com Query Parameters: http://localhost:3000/v1/product/search?page=1&limit=12&match=Tênis

🚦 Tabela de Códigos de Status HTTP

Código	Nome	Significado na API
200	OK	Requisição realizada com sucesso (consultas e atualizações)
201	Created	Recurso criado com sucesso no banco de dados
204	No Content	Requisição concluída com sucesso sem corpo de retorno (edição/exclusão)
400	Bad Request	Erro de validação, campos obrigatórios ausentes ou senhas divergentes
401	Unauthorized	Token JWT ausente, inválido ou expirado
404	Not Found	Recurso não localizado pelo ID informado
500	Internal Server Error	Falha inesperada no servidor ou no banco de dados
<img width="678" height="161" alt="image" src="https://github.com/user-attachments/assets/1e37a3a3-e326-441e-bdbf-fadf0890e726" />


📤 Guia Passo a Passo do Git e GitHub

1. Criar o arquivo .gitignore na raiz do projeto:

node_modules/
.env


2. Comandos no Terminal para Publicação:

* Inicializar o repositório local
git init

* Adicionar todos os arquivos
git add .

* Criar o commit inicial
git commit -m "feat: documentacao completa com instrucoes de setup e endpoints"

* Renomear a branch principal para main
git branch -M main

* Conectar ao repositório do GitHub
git remote add origin <URL_DO_SEU_REPOSITORIO>

* Enviar os arquivos para o GitHub
git push -u origin main


✨ Projeto desenvolvido como parte da avaliação prática de desenvolvimento back-end.
