document.addEventListener("DOMContentLoaded", () => {
  carregarUsuarios();
  carregarProdutos();
  carregarCompras();
  carregarEstoqueCritico();
  carregarConsolidado();
});

async function carregarUsuarios() {
  const res = await fetch("http://localhost:3000/usuario");
  const dados = await res.json();
  const tbody = document.getElementById("relatorio-usuarios");

  dados.forEach(u => {
    tbody.innerHTML += `
      <tr>
        <td>${u.primeiroNome} ${u.sobrenome}</td>
        <td>${u.idade}</td>
        <td>${u.email}</td>
        <td>${u.cidade}</td>
        <td>${u.estado}</td>
      </tr>`;
  });
}

async function carregarProdutos() {
  const res = await fetch("http://localhost:3000/produto");
  const dados = await res.json();
  const tbody = document.getElementById("relatorio-produtos");

  dados.forEach(p => {
    const valorFinal = (p.price * (1 - p.discountPercentage / 100)).toFixed(2);
    tbody.innerHTML += `
      <tr>
        <td>${p.titulo}</td>
        <td>${p.categoria}</td>
        <td>R$ ${p.preco.toFixed(2)}</td>
        <td>${p.percentualDesconto}%</td>
        <td>R$ ${valorFinal}</td>
      </tr>`;
  });
}

async function carregarCompras() {
  const res = await fetch("http://localhost:3000/compra");
  const dados = await res.json();
  const tbody = document.getElementById("relatorio-compras");

  dados.forEach(c => {
    tbody.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.usuario}</td>
        <td>${c.produto}</td>
        <td>${c.quantidade}</td>
        <td>${new Date(c.data).toLocaleDateString()}</td>
        <td>R$ ${c.precoFinal.toFixed(2)}</td>
      </tr>`;
  });
}

async function carregarEstoqueCritico() {
  const res = await fetch("http://localhost:3000/produto/estoque-critico");
  const dados = await res.json();
  const tbody = document.getElementById("relatorio-estoque");

  if (!dados.length) {
    tbody.innerHTML = `<tr><td colspan="3">Nenhum produto com estoque crítico.</td></tr>`;
    return;
  }

  dados.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.titulo}</td>
        <td>${p.estoque}</td>
        <td>${p.categoria}</td>
      </tr>`;
  });
}

async function carregarConsolidado() {
  const res = await fetch("http://localhost:3000/compras/consolidado");
  const dados = await res.json();
  const tbody = document.getElementById("relatorio-consolidado");

  dados.forEach(c => {
    tbody.innerHTML += `
      <tr>
        <td>${c.usuario}</td>
        <td>${c.produto}</td>
        <td>${c.quantidade}</td>
        <td>${new Date(c.dataCompra).toLocaleDateString()}</td>
        <td>R$ ${c.valorFinal.toFixed(2)}</td>
        <td>${c.pagamento}</td>
        <td>${c.status}</td>
      </tr>`;
  });
}
