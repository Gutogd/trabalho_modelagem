const { DataTypes } = require('sequelize');
const db = require('../db/Conn'); 

const Produto = db.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  discountPercentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  }
}, {
  tableName: 'produtos',
  timestamps: false
});

module.exports = Produto;