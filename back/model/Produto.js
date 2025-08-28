const { DataTypes } = require('sequelize');
const db = require('../db/Conn');

const Produto = db.define('produtos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precoUnitario: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  descontoAplicado: {
    type: DataTypes.FLOAT,
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'produtos',
  timestamps: false
});


// o compra ta dando a mesma coisa, só de atualizar a compra
module.exports = Produto;
