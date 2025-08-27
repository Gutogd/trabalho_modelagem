const tabela = document.getElementById("tabela-gerencial")

async function carregarRelatorioGerencial() {
  try {
    const [rCompras, rUsuarios, rProdutos] = await Promise.all([
      fetch("http://localhost:3000/compra"),
      fetch("http://localhost:3000/usuario"),
      fetch("http://localhost:3000/produto")
    ])

    const [compras, usuarios, produtos] = await Promise.all([
      rCompras.json(),
      rUsuarios.json(),
      rProdutos.json()
    ])



    compras.forEach(compra => {
      const tr = document.createElement("tr")

      // procura usuário e produto relacionados
      const usuario = usuarios.find(u => u.id === compra.usuarioId)
      const produto = produtos.find(p => p.id === compra.produtoId)

      const nomeUsuario = usuario ? `${usuario.primeiroNome} ${usuario.sobrenome}` : "—"
      const nomeProduto = produto ? produto.titulo : "—"
      const dataFmt = new Date(compra.dataCompra).toLocaleString("pt-BR")
      const valorFmt = Number(compra.precoFinal).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

      tr.innerHTML = `
        <td>${compra.id}</td>
        <td>${nomeUsuario}</td>
        <td>${nomeProduto}</td>
        <td>${compra.quantidade}</td>
        <td>${dataFmt}</td>
        <td>${valorFmt}</td>
        <td>${compra.formaPagamento}</td>
        <td>${compra.status}</td>
      `
      tabela.appendChild(tr)
    })
  } catch (erro) {
    console.error("Erro ao carregar relatório gerencial:", erro)
    tabela.innerHTML = `<tr><td colspan="8">Erro ao carregar dados.</td></tr>`
  }
}

carregarRelatorioGerencial()
