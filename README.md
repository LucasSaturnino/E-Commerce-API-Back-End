# 🛒 E-Commerce API | Back-End

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Framework-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-ORM-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

API RESTful desenvolvida em **Node.js**, utilizando **Express.js**, **Sequelize ORM** e **MySQL**, com foco no gerenciamento de usuários, categorias e produtos de um sistema de e-commerce.

O projeto utiliza arquitetura MVC, autenticação por JSON Web Token (JWT) e criptografia de senhas com Bcrypt.

---

## 📑 Sumário

- [Visão Geral](#-visão-geral)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Endpoints da API](#-endpoints-da-api)
- [Exemplos de Requisições](#-exemplos-de-requisições)
- [Códigos de Status HTTP](#-códigos-de-status-http)
- [Considerações Finais](#-considerações-finais)

---

## 🎯 Visão Geral

O projeto consiste no desenvolvimento de uma API para fornecer a estrutura de back-end de uma aplicação de comércio eletrônico.

A aplicação disponibiliza endpoints para operações de cadastro, consulta, atualização e exclusão de dados, além de autenticação de usuários e controle de acesso às rotas protegidas.

## 🚀 Tecnologias Utilizadas

| Tecnologia | Aplicação |
|---|---|
| **Node.js** | Ambiente de execução JavaScript no servidor |
| **Express.js** | Framework para criação e gerenciamento das rotas HTTP |
| **MySQL** | Banco de dados relacional |
| **Sequelize ORM** | Mapeamento objeto-relacional e comunicação com o banco de dados |
| **JWT** | Autenticação e autorização por tokens |
| **Bcrypt** | Hashing seguro de senhas |
| **Dotenv** | Gerenciamento de variáveis de ambiente |

## ⚙️ Funcionalidades

### 👤 Gerenciamento de usuários
- Cadastro de novos usuários.
- Validação de campos obrigatórios.
- Verificação de duplicidade de e-mail.
- Armazenamento de senhas utilizando Bcrypt.
- Consulta, atualização e exclusão de usuários.

### 🔐 Autenticação e segurança
- Autenticação de usuários por e-mail e senha.
- Geração de tokens JWT.
- Proteção de rotas privadas.
- Validação do token por meio de middleware.
- Utilização do padrão Bearer Token.

### 📂 Gerenciamento de categorias
- Cadastro de categorias.
- Consulta de categorias por identificador.
- Listagem com paginação.
- Atualização e exclusão de categorias.
- Controle de exibição no menu por meio do atributo `use_in_menu`.

### 🛍️ Gerenciamento de produtos
- Cadastro de produtos.
- Consulta individual por identificador.
- Listagem com filtros.
- Seleção de atributos por meio do parâmetro `fields`.
- Paginação utilizando `limit` e `page`.
- Atualização e exclusão de produtos.

---

## 📁 Arquitetura do Projeto

A aplicação utiliza o padrão arquitetural **MVC (Model-View-Controller)**, organizando as responsabilidades em diferentes módulos.

```text
E-Commerce-API-Back-End/
│
├── src/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── categoryController.js
│   │   └── productController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Category.js
│   │   └── Product.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### Responsabilidade dos diretórios

| Diretório / Arquivo | Responsabilidade |
|---|---|
| `config/` | Configurações de conexão com o banco de dados |
| `controllers/` | Regras de negócio e processamento das requisições |
| `middleware/` | Validação e proteção das rotas |
| `models/` | Modelos e estrutura das entidades do banco |
| `routes/` | Definição dos endpoints da API |
| `app.js` | Configuração do Express, rotas e middlewares |
| `server.js` | Inicialização do servidor e conexão com o banco |

---

## 💻 Pré-requisitos

Antes de executar o projeto, é necessário possuir:

- [Node.js](https://nodejs.org/) — versão 18 ou superior.
- npm — gerenciador de pacotes do Node.js.
- [MySQL](https://www.mysql.com/) — banco de dados.
- [Git](https://git-scm.com/) — para clonar o repositório.
- [Postman](https://www.postman.com/) ou Insomnia — para testar os endpoints (opcional).

---

## 📥 Instalação e Configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/LucasSaturnino/E-Commerce-API-Back-End.git
```

### 2. Acessar o diretório

```bash
cd E-Commerce-API-Back-End
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Criar o banco de dados

No MySQL Workbench ou em outro cliente MySQL, execute:

```sql
CREATE DATABASE projeto_backend;
```

### 5. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto, seguindo o modelo apresentado na próxima seção.

### 6. Iniciar a aplicação

```bash
npm start
```

Após a inicialização, o Sequelize realizará a conexão com o MySQL e sincronizará os modelos com o banco de dados, conforme a configuração da aplicação.

---

## 🔑 Variáveis de Ambiente

A aplicação utiliza variáveis de ambiente para armazenar configurações de conexão e segurança.

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=sua_senha_aqui
DB_NAME=projeto_backend

JWT_SECRET=sua_chave_secreta_jwt
```

**Importante:** O arquivo `.env` contém informações sensíveis e não deve ser enviado ao GitHub. Utilize o `.env.example` como modelo de configuração.

---

## 🔗 Endpoints da API

A API disponibiliza endpoints para gerenciamento de usuários, categorias e produtos.

**URL base local:**

```text
http://localhost:3000
```

### 👤 Usuários

| Método | Endpoint | JWT | Descrição |
|---|---|:---:|---|
| POST | `/v1/user` | ❌ | Cadastrar usuário |
| POST | `/v1/user/token` | ❌ | Autenticar usuário e gerar token |
| GET | `/v1/user/:id` | ❌ | Consultar usuário |
| PUT | `/v1/user/:id` | ✅ | Atualizar usuário |
| DELETE | `/v1/user/:id` | ✅ | Excluir usuário |

### 📂 Categorias

| Método | Endpoint | JWT | Descrição |
|---|---|:---:|---|
| GET | `/v1/category/search` | ❌ | Listar categorias com paginação |
| GET | `/v1/category/:id` | ❌ | Consultar categoria |
| POST | `/v1/category` | ✅ | Cadastrar categoria |
| PUT | `/v1/category/:id` | ✅ | Atualizar categoria |
| DELETE | `/v1/category/:id` | ✅ | Excluir categoria |

### 🛍️ Produtos

| Método | Endpoint | JWT | Descrição |
|---|---|:---:|---|
| GET | `/v1/product/search` | ❌ | Listar produtos com filtros |
| GET | `/v1/product/:id` | ❌ | Consultar produto |
| POST | `/v1/product` | ✅ | Cadastrar produto |
| PUT | `/v1/product/:id` | ✅ | Atualizar produto |
| DELETE | `/v1/product/:id` | ✅ | Excluir produto |

**Legenda:**

- ✅ Endpoint protegido por autenticação JWT.
- ❌ Endpoint sem exigência de autenticação JWT, conforme a documentação atual.

---

## 🧪 Exemplos de Requisições

Os exemplos abaixo demonstram algumas operações disponíveis na API.

### 1. Cadastro de usuário

**POST** `/v1/user`

Body (JSON):

```json
{
  "firstname": "Lucas",
  "surname": "Silva",
  "email": "lucas@email.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

### 2. Autenticação de usuário

**POST** `/v1/user/token`

Body (JSON):

```json
{
  "email": "lucas@email.com",
  "password": "123456"
}
```

Resposta esperada:

```json
{
  "token": "SEU_TOKEN_JWT"
}
```

### 3. Cadastro de categoria

**POST** `/v1/category`

Requer autenticação JWT.

Header:

```text
Authorization: Bearer SEU_TOKEN_JWT
```

Body (JSON):

```json
{
  "name": "Calçados",
  "slug": "calcados",
  "use_in_menu": true
}
```

Exemplo cURL:

```bash
curl -X POST http://localhost:3000/v1/category \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "name": "Calçados",
    "slug": "calcados",
    "use_in_menu": true
  }'
```

### 4. Cadastro de produto

**POST** `/v1/product`

Requer autenticação JWT.

Body (JSON):

```json
{
  "enabled": true,
  "name": "Tênis Esportivo Nitro",
  "slug": "tenis-esportivo-nitro",
  "stock": 45,
  "description": "Tênis leve e ideal para corridas de alta performance.",
  "price": 299.90,
  "price_with_discount": 249.90
}
```

### 5. Consulta de produtos com filtros

**GET** `/v1/product/search`

Exemplo de URL:

```text
http://localhost:3000/v1/product/search?page=1&limit=12&match=Tenis
```

Parâmetros disponíveis:

| Parâmetro | Descrição |
|---|---|
| `page` | Número da página |
| `limit` | Quantidade de registros por página |
| `match` | Palavra-chave utilizada na busca |

---

## 🚦 Códigos de Status HTTP

Código	Nome	Significado na API
200	OK	Requisição realizada com sucesso (consultas e atualizações)
201	Created	Recurso criado com sucesso no banco de dados
204	No Content	Requisição concluída com sucesso sem corpo de retorno (edição/exclusão)
400	Bad Request	Erro de validação, campos obrigatórios ausentes ou senhas divergentes
401	Unauthorized	Token JWT ausente, inválido ou expirado
404	Not Found	Recurso não localizado pelo ID informado
500	Internal Server Error	Falha inesperada no servidor ou no banco de dados

📤 Guia Passo a Passo do Git e GitHub

1. Criar o arquivo .gitignore na raiz do projeto:

node_modules/
.env


2. Comandos no Terminal para Publicação:

# Inicializar o repositório local
git init

# Adicionar todos os arquivos
git add .

# Criar o commit inicial
git commit -m "feat: documentacao completa com instrucoes de setup e endpoints"

# Renomear a branch principal para main
git branch -M main

# Conectar ao repositório do GitHub
git remote add origin <URL_DO_SEU_REPOSITORIO>

# Enviar os arquivos para o GitHub
git push -u origin main


✨ Projeto desenvolvido como parte da avaliação prática de desenvolvimento back-end.