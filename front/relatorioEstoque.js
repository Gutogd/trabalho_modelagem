const tabela = document.getElementById("tabela-estoque");

async function carregarEstoqueCritico() {
  try {
    const res = await fetch("http://localhost:3000/produto/estoque-critico");
    const produtos = await res.json();

    if (!produtos.length) {
      tabela.innerHTML = `<tr><td colspan="3">Nenhum produto com estoque crítico.</td></tr>`;
      return;
    }

    produtos.forEach(produto => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${produto.titulo}</td>
        <td>${produto.estoque}</td>
        <td>${produto.categoria}</td>
      `;
      tabela.appendChild(tr);
    });
  } catch (erro) {
    console.error("Erro ao carregar estoque crítico:", erro);
    tabela.innerHTML = `<tr><td colspan="3">Erro ao carregar dados.</td></tr>`;
  }
}

carregarEstoqueCritico();
