const { where } = require('sequelize')
const Produto = require('../model/Produto')
const { Op } = require('sequelize')


const cadastrarProduto = async (req, res)=>{
    const dados = req.body 
    try {
        const valores = await Produto.create(dados)
        res.status(201).json(valores)
    } catch (err) {
        res.status(505).json({message: 'erro ao cadastrar'})
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


const consultarNome = async (req, res)=>{
    const {nome} = req.body
    try {
        const valores = Produto.findAll({where: 
            {title :
                {[Op.like]: `%${nome}%`
        }}})

    } catch (err) {
        
    }
}


module.exports = {cadastrarProduto, listarProduto, atualizarProduto, apagaProduto}