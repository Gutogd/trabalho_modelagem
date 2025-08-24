const Compras = require('../model/Compras');
const Usuarios = require('../model/Usuarios');
const Produtos = require('../model/Produto')


Compras.belongsTo(Usuarios, {
    foreignKey: 'usuarioId',
    as: 'usuario',
    onDelete: 'CASCADE'
})

Usuarios.hasMany(Compras, {
    foreignKey: 'usuarioId',
    as: 'compras',
    onDelete: 'CASCADE'
})

Compras.belongsTo(Produtos, {
    foreignKey: 'produtoId',
    as: 'produto',
    onDelete: 'CASCADE'
})

Produtos.hasMany(Compras, {
    foreignKey: 'produtoId',
    as: 'compras',
    onDelete: 'CASCADE'
})


module.exports = {Compras, Usuarios, Produtos}