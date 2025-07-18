const tabela = document.getElementById("tabela-usuarios");

async function carregarCompras() {
  try {
    const res = await fetch("http://localhost:3000/compra"); 
    const compras = await res.json();

    compras.forEach(compra => {
      const tr = document.createElement("tr");

      const nomeUsuario = `${compra.Usuario?.primeiroNome || 'N/A'} ${compra.Usuario?.sobrenome || ''}`;
      const nomeProduto = compra.Produto?.titulo || 'Produto não encontrado';

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
