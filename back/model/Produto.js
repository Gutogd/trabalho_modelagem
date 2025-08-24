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
  },
  imagem: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  }
}, {
  tableName: 'produtos',
  timestamps: false
});

module.exports = Produto;
