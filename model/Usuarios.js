const { DataTypes } = require('sequelize');
const db = require('../db/Conn')

const Usuario = db.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }, 
  phone: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;