const Usuario = require('./Usuario');
const Produto = require('./Produto');
const Compras = require('./Compras');


Usuario.hasMany(Compras, {
  foreignKey: 'usuarioId',
});
Compras.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
});


Produto.hasMany(Compras, {
  foreignKey: 'produtoId',
});
Compras.belongsTo(Produto, {
  foreignKey: 'produtoId',
});
