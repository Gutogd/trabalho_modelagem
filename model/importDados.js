require('dotenv').config();
const fetch = require('node-fetch'); 
const db = require('../db/Conn');
const Usuario = require('../model/Usuarios');
const Produto = require('../model/Produto');

async function importarUsuarios() {
  const response = await fetch('https://dummyjson.com/users');
  const data = await response.json();
  const usuarios = data.users;

  for (const u of usuarios) {
    await Usuario.create({
      firstName: u.firstName,
      lastName: u.lastName,
      age: u.age,
      email: u.email,
      phone: u.phone,
      address: u.address.address,
      city: u.address.city,
      state: u.address.state,
      birthDate: u.birthDate
    });
  }

  console.log('Usuários importados com sucesso!');
}

async function importarProdutos() {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  const produtos = data.products;

  for (const p of produtos) {
    await Produto.create({
      title: p.title,
      description: p.description,
      category: p.category,
      price: p.price,
      discountPercentage: p.discountPercentage,
      stock: p.stock,
      brand: p.brand,
      thumbnail: p.thumbnail
    });
  }

  console.log('Produtos importados com sucesso!');
}

async function main() {
  try {
    await db.sync(); 
    await importarUsuarios();
    await importarProdutos();
    process.exit(0);
  } catch (err) {
    console.error('Erro ao importar dados:', err);
    process.exit(1);
  }
}

main();