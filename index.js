require('dotenv').config()
const express = require("express")
const app = express()
const cors  = require("cors")

const PORT = 3000
const hostname = 'localhost'

const db = require('./db/conn')
const produtoController = require('./controller/Produto.controller')
const usuarioController = require('./controller/Usuario.controller')
const compraController = require('./controller/Compra.controller')


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/produto', produtoController.cadastrarProduto)
app.get('/produto', produtoController.listarProduto)
app.put('/produto/:id', produtoController.atualizarProduto)
app.delete('/produto/:id', produtoController.apagaProduto)
app.get('/produto/nome', produtoController.consultarNome)
app.get('/produto/:id', produtoController.consultarPorId)
app.get('/produto/estoque-critico', produtoController.listarEstoqueCritico)

app.post('/usuario', usuarioController.cadastrarUsuario)
app.get('/usuario', usuarioController.listarUsuario)
app.put('/usuario/:id', usuarioController.atualizarUsuario)
app.delete('/usuario/:id', usuarioController.apagarUsuario)
app.get('/usuario/nome', usuarioController.consultarNomeU)
app.get('/usuario/:id', usuarioController.consultarPorId)

app.post('/compra', compraController.cadastrarCompra)
app.get('/compra', compraController.listarCompra)
app.put('/compra/:id', compraController.atualizarCompra)
app.delete('/compra/:id', compraController.apagaCompra)

app.get('/', (req, res)=>{
    res.status(200).json({message: 'aplicacao rodando com sucesso'})
    console.log('aplicacao rodando com sucesso')
})


db.sync()
  .then(() => {
    app.listen(PORT,hostname, () => {
      console.log(`Servidor escutando em http://${hostname}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco', err);
  });