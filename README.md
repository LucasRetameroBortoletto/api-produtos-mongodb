# API de Produtos (MongoDB)

API REST simples para cadastro de produtos, feita com **Node.js**, **Express 5** e **MongoDB** (banco não relacional).

Os dados ficam no banco `loja`, na coleção `produtos`.

## Requisitos

- Node.js 18 ou superior
- Uma instância do MongoDB (local ou MongoDB Atlas)

## Instalação

```bash
npm install
```

## Configuração

A string de conexão do MongoDB é lida da variável de ambiente `NARIN`.

PowerShell:

```powershell
$env:NARIN = "mongodb://localhost:27017"
```

Bash:

```bash
export NARIN="mongodb://localhost:27017"
```

## Executando

```bash
node index.js
```

Se tudo der certo, aparece no console:

```
Conectado ao mongodb com sucesso
API rodando na porta 3000
```

## Rotas

Base URL: `http://localhost:3000`

| Método | Rota             | Descrição                          |
|--------|------------------|------------------------------------|
| POST   | `/produtos`      | Cria um produto                    |
| GET    | `/produtos`      | Lista todos os produtos            |
| GET    | `/produtos/:id`  | Busca um produto pelo `_id`        |
| PUT    | `/produtos/:id`  | Atualiza campos de um produto      |
| DELETE | `/produtos/:id`  | Remove um produto                  |

O `:id` é o `_id` do documento no MongoDB (um ObjectId de 24 caracteres hexadecimais).

### Exemplos

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

## Observações

- O corpo do produto é livre: qualquer JSON enviado no POST é salvo como documento.
- PUT e DELETE retornam o resultado bruto do MongoDB (`matchedCount`, `modifiedCount`, `deletedCount`).
- Buscar um id inexistente retorna `null` com status 200.
- Um id em formato inválido (ex.: `abc`) gera erro, pois as rotas ainda não têm tratamento de erros.
