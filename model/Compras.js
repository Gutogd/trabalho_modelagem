// models/Compra.js
const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Compra = db.define('Compra', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dataCompra: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  precoUnitario: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  descontoAplicado: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  precoFinal: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  formaPagamento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'compras',
  timestamps: false
});

module.exports = Compra;
