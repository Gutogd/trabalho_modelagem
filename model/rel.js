const Compras = require('../model/Compras');
const Usuarios = require('../model/Usuarios');
const Produtos = require('../model/Produto')


Compras.belongsTo(Usuarios, {
    foreignKey: 'idUsuario',
    as: 'usuario',
    onDelete: 'CASCADE'
})


Usuarios.hasMany(Compras, {
    foreignKey: 'idUsuario',
    as: 'compras',
    onDelete: 'CASCADE'
})


Compras.belongsTo(Produtos, {
    foreignKey: 'idProduto',
    as: 'produto',
    onDelete: 'CASCADE'
})

Produtos.hasMany(Compras, {
    foreignKey: 'idProduto',
    as: 'compras',
    onDelete: 'CASCADE'
})


module.exports = {Compras, Usuarios, Produtos}