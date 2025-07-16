const mensagem = document.getElementById('mensagem');
const botao = document.getElementById('importar-tudo');

botao.addEventListener('click', async () => {
  mensagem.textContent = 'Importando... aguarde.';

  try {
    // -------- IMPORTAR USUÁRIOS --------
    const respUsuarios = await fetch('https://dummyjson.com/users');
    const dadosUsuarios = await respUsuarios.json();

    for (const user of dadosUsuarios.users) {
      const bodyUsuario = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        phone: user.phone,
        address: user.address.address,
        city: user.address.city,
        state: user.address.state,
        birthDate: user.birthDate
      };

      await fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyUsuario)
      });
    }

    // -------- IMPORTAR PRODUTOS --------
    const respProdutos = await fetch('https://dummyjson.com/products');
    const dadosProdutos = await respProdutos.json();

    for (const produto of dadosProdutos.products) {
      const bodyProduto = {
        id: produto.id,
        title: produto.title,
        description: produto.description,
        category: produto.category,
        price: produto.price,
        discountPercentage: produto.discountPercentage,
        stock: produto.stock,
        brand: produto.brand,
        thumbnail: produto.thumbnail
      };

      await fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyProduto)
      });
    }

    mensagem.textContent = 'Importação de usuários e produtos concluída com sucesso!';
  } catch (err) {
    console.error(err);
    mensagem.textContent = 'Erro ao importar dados.';
  }
});
