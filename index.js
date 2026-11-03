const express = require ('express');
const {MongoClient,ObjectId} = require ('mongodb');

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.NARIN);
const produtos = client.db('loja').collection('produtos');

//Creating HTTP methods
app.post('/produtos', async (req,res) => {
    const novoProduto = await produtos.insertOne(req.body);
    res.status(201).json(novoProduto);
});

app.get('/produtos', async (req,res) => {
    const lista = await produtos.find().toArray();
    res.json(lista);
});

app.get('/produtos/:id', async (req,res) => {
    const produtoEspecifico = await produtos.findOne({_id: new ObjectId(req.params.id)});
    res.json(produtoEspecifico);
});

app.put('/produtos/:id', async (req,res) => {
    const produtoAtualizado = await produtos.updateOne({_id: new ObjectId(req.params.id)}, {$set: req.body});
    res.json(produtoAtualizado);
});

app.delete('/produtos/:id', async (req,res) => {
    const produtoExcluido = await produtos.deleteOne({_id: new ObjectId(req.params.id)});
    res.json(produtoExcluido);
});

client.connect().then(() => {
    console.log("Conectado ao mongodb com sucesso");
    app.listen(3000, () => console.log("API rodando na porta 3000"));
}).catch((erro) => console.log("ERRO", erro.message));