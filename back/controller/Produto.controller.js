const Produto = require('../model/Produto')
const { Op } = require('sequelize')


const cadastrarProduto = async (req, res)=>{
    const dados = req.body 
    try {
        const valores = await Produto.create(dados)
        res.status(201).json(valores)
    } catch (err) {
        res.status(500).json({ message: 'erro ao cadastrar' });
        console.error('erro ao cadastrar', err)
    }
}


const listarProduto = async (req, res) => {
    try {
        const valores = await Produto.findAll()
        if(valores){
            res.status(200).json(valores)
        }else{
            res.status(404).json({message: 'erro ao buscar dados'})
            console.log('erro ao buscar dados')
        }
    } catch (err) {
        res.status(500).json({message: 'erro ao listar'})
        console.error('erro ao listar', err)
    }
}

const atualizarProduto = async (req, res)=>{
    const dados = req.body
    const id = req.params.id

    try {
        const valores = await Produto.findByPk(id)
        if(valores === null){
            res.status(404).json({message: 'erro ao buscar dados'})
        }else{
            await Produto.update(dados, {where: {id : id}})
            const valores = await Produto.findByPk(id)
            res.status(200).json(valores)
        }
    } catch (err) {
        res.status(500).json({message: 'erro ao atualizar'})
        console.error('erro ao atualizar', err)
    }
}


const apagaProduto = async (req, res)=>{

    const id = req.params.id

    try {
        const valores = await Produto.findByPk(id)
        if(valores === null){
            res.status(404).json({message: 'erro ao buscar dados'})
        }else{
            await Produto.destroy({where: {id : id}})
            const valores = await Produto.findByPk(id)
            res.status(200).json({message: 'dados excluidos com sucesso!'})
        }
    } catch (err) {
        res.status(500).json({message: 'erro ao apagar'})
        console.error('erro ao apagar', err)
    }
}


const consultarNomeP = async (req, res) => {
    const nome = req.params.nome
    try {
        const valores = await Produto.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${nome}%`
                }
            }
        })
        if (!valores || valores.length === 0) {
            res.status(404).json({ message: 'Nenhum produto encontrado' })
        } else {
            res.status(200).json(valores)
        }
    } catch (err) {
        console.error('Erro ao consultar nome:', err)
        res.status(500).json({ message: 'Erro ao buscar produtos' })
    }
}


const consultarPorId = async (req, res) => {
    const id = req.params.id
    try {
        const produto = await Produto.findByPk(id)
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        } else {
            return res.status(200).json(produto)
        }
    } catch (err) {
        console.error('Erro ao consultar por ID:', err)
        res.status(500).json({ message: 'Erro ao buscar produto' })
    }
}


const listarEstoqueCritico = async (req, res) => {
    try {
        const produtosCriticos = await Produto.findAll({
            where: {
                estoque: { [Op.lt]: 10 }
            }
        })
        res.json(produtosCriticos)
    } catch (error) {
        console.error("Erro ao buscar produtos com estoque crítico:", error)
        res.status(500).json({ erro: "Erro ao buscar produtos com estoque crítico" })
    }
}

module.exports = {
    cadastrarProduto,
    listarProduto,
    atualizarProduto,
    apagaProduto,
    consultarNomeP,
    consultarPorId,
    listarEstoqueCritico
}
