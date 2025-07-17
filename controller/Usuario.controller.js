
const Usuario = require('../model/Usuarios')
const { Op } = require('sequelize')


const cadastrarUsuario = async (req, res)=>{
    const dados = req.body 
    try {
        const valores = await Usuario.create(dados)
        res.status(201).json(valores)
    } catch (err) {
        res.status(500).json({ message: 'erro ao cadastrar' });
        console.error('erro ao cadastrar', err)
    }
}


const listarUsuario = async (req, res) => {
    try {
        const valores = await Usuario.findAll()
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

const atualizarUsuario = async (req, res)=>{
    const dados = req.body
    const id = req.params.id

    try {
        const valores = await Usuario.findByPk(id)
        if(valores === null){
            res.status(404).json({message: 'erro ao buscar dados'})
        }else{
            await Usuario.update(dados, {where: {id : id}})
            const valores = await Usuario.findByPk(id)
            res.status(200).json(valores)
        }
    } catch (err) {
        res.status(500).json({message: 'erro ao atualizar'})
        console.error('erro ao atualizar', err)
    }
}


const apagarUsuario = async (req, res)=>{

    const id = req.params.id

    try {
        const valores = await Usuario.findByPk(id)
        if(valores === null){
            res.status(404).json({message: 'erro ao buscar dados'})
        }else{
            await Usuario.destroy({where: {id : id}})
            const valores = await Usuario.findByPk(id)
            res.status(200).json({message: 'dados excluidos com sucesso!'})
        }
    } catch (err) {
        res.status(500).json({message: 'erro ao apagar'})
        console.error('erro ao apagar', err)
    }
}


const consultarNomeU = async (req, res) => {
  const { nome } = req.body;
  try {
    const valores = await Usuario.findAll({
      where: {
        [Op.or]: [
          { primeiroNome: { [Op.like]: `%${nome}%` } },
          { sobrenome: { [Op.like]: `%${nome}%` } }
        ]
      }
    });
    res.status(200).json(valores);  
  } catch (err) {
    console.error('Erro ao consultar nome de usuário:', err);
    res.status(500).json({ message: 'Erro ao consultar nome' });
  }
};





module.exports = {cadastrarUsuario, listarUsuario, atualizarUsuario, apagarUsuario, consultarNomeU}