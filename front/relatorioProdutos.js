const tabela = document.getElementById("tabela-produtos")

async function carregarProdutos() {
  try {
    const res = await fetch("http://localhost:3000/produto")
    const produtos = await res.json()

    produtos.forEach(produto => {
      const precoOriginal = produto.preco
      const desconto = produto.percentualDesconto   
      const precoComDesconto = (precoOriginal * (1 - desconto / 100)).toFixed(2)

      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td>${produto.titulo}</td>
        <td>${produto.categoria}</td>
        <td>R$ ${precoOriginal.toFixed(2)}</td>
        <td>${desconto}%</td>
        <td>R$ ${precoComDesconto}</td>
      `
      tabela.appendChild(tr)
    })
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro)
    tabela.innerHTML = `<tr><td colspan="5">Erro ao carregar dados.</td></tr>`
  }
}

carregarProdutos()
