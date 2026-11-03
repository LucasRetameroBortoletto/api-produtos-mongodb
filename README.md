# API de Produtos (MongoDB)

API REST simples para cadastro de produtos, feita com **Node.js**, **Express 5** e **MongoDB** (banco não relacional).

Os dados ficam no banco `loja`, na coleção `produtos`.

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) 5
- [Driver oficial do MongoDB](https://www.mongodb.com/docs/drivers/node/) 7
- [MongoDB Atlas](https://www.mongodb.com/atlas) (banco de dados)
- [Render](https://render.com/) (hospedagem)

## Deploy

A API está publicada no Render:

**https://api-produtos-mongodb.onrender.com/produtos**

> O plano gratuito do Render desliga o serviço após um período sem uso. A primeira requisição depois disso pode levar cerca de 50 segundos.

## Requisitos

- Node.js 18 ou superior (20.6+ para usar o arquivo `.env`)
- Uma instância do MongoDB (local ou MongoDB Atlas)

## Instalação

```bash
npm install
```

## Configuração

A string de conexão do MongoDB é lida da variável de ambiente `NARIN`.

### Opção 1: arquivo `.env`

Crie um arquivo `.env` na raiz do projeto:

```
NARIN=mongodb+srv://usuario:senha@cluster.mongodb.net/
```

O `.env` está no `.gitignore` e não é enviado ao GitHub. O código não usa `dotenv`, então rode com a flag `--env-file` do Node (veja [Executando](#executando)).

### Opção 2: variável no terminal

PowerShell:

```powershell
$env:NARIN = "mongodb://localhost:27017"
```

Bash:

```bash
export NARIN="mongodb://localhost:27017"
```

## Executando

Com o arquivo `.env`:

```bash
node --env-file=.env index.js
```

Com a variável já definida no terminal:

```bash
node index.js
```

Se tudo der certo, aparece no console:

```
Conectado ao mongodb com sucesso
API rodando na porta 3000
```

## Rotas

Base URL: `https://api-produtos-mongodb.onrender.com` (produção) ou `http://localhost:3000` (local)

Os exemplos abaixo usam a URL local; para testar em produção, troque pela URL do Render.

| Método | Rota             | Descrição                          |
|--------|------------------|------------------------------------|
| POST   | `/produtos`      | Cria um produto                    |
| GET    | `/produtos`      | Lista todos os produtos            |
| GET    | `/produtos/:id`  | Busca um produto pelo `_id`        |
| PUT    | `/produtos/:id`  | Atualiza campos de um produto      |
| DELETE | `/produtos/:id`  | Remove um produto                  |

O `:id` é o `_id` do documento no MongoDB (um ObjectId de 24 caracteres hexadecimais).

### Exemplos

Os exemplos com `curl` funcionam no Bash, no Git Bash e no terminal do Linux/macOS. No Windows, veja a seção [PowerShell](#powershell) abaixo, ou use o Postman/Insomnia.

Criar um produto:

```bash
curl -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d '{"nome": "Caneta", "preco": 2.5, "estoque": 100}'
```

Resposta (`201`):

```json
{ "acknowledged": true, "insertedId": "6745f1c2a1b2c3d4e5f60789" }
```

Listar produtos:

```bash
curl http://localhost:3000/produtos
```

Buscar por id:

```bash
curl http://localhost:3000/produtos/6745f1c2a1b2c3d4e5f60789
```

Atualizar (apenas os campos enviados são alterados, via `$set`):

```bash
curl -X PUT http://localhost:3000/produtos/6745f1c2a1b2c3d4e5f60789 -H "Content-Type: application/json" -d '{"preco": 3.0}'
```

Excluir:

```bash
curl -X DELETE http://localhost:3000/produtos/6745f1c2a1b2c3d4e5f60789
```

### PowerShell

```powershell
$url = "http://localhost:3000/produtos"

# Criar
Invoke-RestMethod -Method Post -Uri $url -ContentType "application/json" -Body '{"nome": "Caneta", "preco": 2.5, "estoque": 100}'

# Listar
Invoke-RestMethod -Uri $url

# Buscar por id
Invoke-RestMethod -Uri "$url/6745f1c2a1b2c3d4e5f60789"

# Atualizar
Invoke-RestMethod -Method Put -Uri "$url/6745f1c2a1b2c3d4e5f60789" -ContentType "application/json" -Body '{"preco": 3.0}'

# Excluir
Invoke-RestMethod -Method Delete -Uri "$url/6745f1c2a1b2c3d4e5f60789"
```

## Observações

- O corpo do produto é livre: qualquer JSON enviado no POST é salvo como documento.
- PUT e DELETE retornam o resultado bruto do MongoDB (`matchedCount`, `modifiedCount`, `deletedCount`).
- Buscar um id inexistente retorna `null` com status 200.
- Um id em formato inválido (ex.: `abc`) gera erro, pois as rotas ainda não têm tratamento de erros.

## Autor

**Lucas Retamero Bortoletto** ([@LucasRetameroBortoletto](https://github.com/LucasRetameroBortoletto))

Atividade da disciplina de Banco de Dados (BCD).
