const tabela = document.getElementById("tabela-usuarios");

async function carregarCompras() {
  try {
    const res = await fetch("http://localhost:3000/compra"); 
    const compras = await res.json();
    console.log(compras)
    compras.forEach(compra => {
      const tr = document.createElement("tr");
      const resPro =  fetch(`http://localhost:3000/produto/id/${compra.produtoId}`,{
          method: 'GET'
      })
      const produto = resPro.json()
      const nomeUsuario = `${compra.Usuario?.primeiroNome || 'N/A'}`;
      const nomeProduto = produto.titulo || 'Produto não encontrado';
console.log(produto)
      tr.innerHTML = `
        <td>${nomeUsuario}</td>
        <td>${nomeProduto}</td>
        <td>${compra.quantidade}</td>
        <td>${new Date(compra.dataCompra).toLocaleDateString()}</td>
        <td>R$ ${compra.precoFinal.toFixed(2)}</td>
      `;

      tabela.appendChild(tr);
    });
  } catch (erro) {
    console.error("Erro ao carregar compras:", erro);
    tabela.innerHTML = `<tr><td colspan="5">Erro ao carregar dados.</td></tr>`;
  }
}

carregarCompras();
