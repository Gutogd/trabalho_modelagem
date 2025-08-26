const API = 'http://localhost:3000';
const container = document.getElementById("tabRel")

async function reportConsolidado() {
  container.innerHTML = '<p>Carregando relatório consolidado...</p>';
  try {
    // Busca compras, usuários e produtos em paralelo
    const [rCompras, rUsuarios, rProdutos] = await Promise.all([
      fetch(`${API}/compra`),
      fetch(`${API}/usuario`),
      fetch(`${API}/produto`)
    ]);
    if (!rCompras.ok)  throw new Error(`Compras: HTTP ${rCompras.status}`);
    if (!rUsuarios.ok) throw new Error(`Usuários: HTTP ${rUsuarios.status}`);
    if (!rProdutos.ok) throw new Error(`Produtos: HTTP ${rProdutos.status}`);

    const [compras, usuarios, produtos] = await Promise.all([
      rCompras.json(),
      rUsuarios.json(),
      rProdutos.json()
    ]);

    // Cria mapas para lookup rápido
    const mapaUsuarios = Object.fromEntries(
      usuarios.map(u => [u.id, `${u.primeiroNome} ${u.sobrenome}`])
    );
    const mapaProdutos = Object.fromEntries(
      produtos.map(p => [p.id, p.titulo])
    );

    // Monta as linhas da tabela
    const rows = compras.map(c => {
      const nomeUsuario   = mapaUsuarios[c.usuarioId] || '—';
      const nomeProduto   = mapaProdutos[c.produtoId] || '—';
      const dataFmt       = new Date(c.dataCompra).toLocaleString('pt-BR');
      const valorFinalFmt = Number(c.precoFinal)
                             .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      const formaPagto    = c.formaPagamento;
      const status        = c.status;

      return `
        <tr>
          <td>${c.id}</td>
          <td>${nomeUsuario}</td>
          <td>${nomeProduto}</td>
          <td>${c.quantidade}</td>
          <td>${dataFmt}</td>
          <td>${valorFinalFmt}</td>
          <td>${formaPagto}</td>
          <td>${status}</td>
        </tr>`;
    }).join('');

    container.innerHTML = `
      <table class="report-table">
        <thead>
          <tr>
            <th>ID Compra</th>
            <th>Usuário</th>
            <th>Produto</th>
            <th>Qtd.</th>
            <th>Data</th>
            <th>Valor Final</th>
            <th>Pagamento</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  } catch (err) {
    container.innerHTML =
      `<p class="error">Erro ao carregar consolidado: ${err.message}</p>`;
  }
}


reportConsolidado()