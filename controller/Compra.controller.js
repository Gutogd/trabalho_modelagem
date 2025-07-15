const { where } = require('sequelize')
const Compra = require('../model/Compras')
const { Op } = require('sequelize')
const Produto = require('../controller/Produto.controller')


const cadastrarCompra = async (req, res)=>{
    const dados = req.body 
    const {idProd, stock} = req.body
    try {
        const produto = await Produto.findByPk(idProd)
        if(produto){
            produto.stock -= stock
          await produto.save()
        }
        const valores = await Compra.create(dados)
        res.status(201).json(valores)
    } catch (err) {
        res.status(505).json({message: 'erro ao cadastrar'})
        console.error('erro ao cadastrar', err)
    }
}


const listarCompra = async (req, res) => {
    try {
        const valores = await Compra.findAll()
        if(valores){
            res.status(200).json(valores)
        }else{
            res.status(404).json({message: 'erro ao buscar dados'})
            console.log('erro ao buscar dados')
        }
    } catch (err) {
        res.status(505).json({message: 'erro ao listar'})
        console.error('erro ao listar', err)
    }
}

const atualizarCompra = async (req, res)=>{
    const dados = req.body
    const id = req.params.id

    try {
        const valores = await Compra.findByPk(id)
        if(valores === null){
            res.status(404).json({message: 'erro ao buscar dados'})
        }else{
            await Compra.update(dados, {where: {id : id}})
            const valores = await Compra.findByPk(id)
            res.status(200).json(valores)
        }
    } catch (err) {
        res.status(505).json({message: 'erro ao atualizar'})
        console.error('erro ao atualizar', err)
    }
}


const apagaCompra = async (req, res)=>{

    const id = req.params.id

    try {
        const valores = await Compra.findByPk(id)
        if(valores === null){
            res.status(404).json({message: 'erro ao buscar dados'})
        }else{
            await Compra.destroy({where: {id : id}})
            const valores = await Compra.findByPk(id)
            res.status(200).json({message: 'dados excluidos com sucesso!'})
        }
    } catch (err) {
        res.status(505).json({message: 'erro ao apagar'})
        console.error('erro ao apagar', err)
    }
}


module.exports = {cadastrarCompra, listarCompra, atualizarCompra, apagaCompra}