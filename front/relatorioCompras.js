
const API = 'http://localhost:3000';
const container = document.getElementById("tabCom")

async function reportCompras() {
  container.innerHTML = '<p>Carregando relatório de compras...</p>';
  try {
    // Pega compras, usuários e produtos em paralelo
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

    // Monta mapas id → nome/título  
    const mapaUsuarios  = Object.fromEntries(
      usuarios.map(u => [u.id, `${u.primeiroNome} ${u.sobrenome}`])
    );
    const mapaProdutos  = Object.fromEntries(
      produtos.map(p => [p.id, p.titulo])
    );

    // Monta as linhas da tabela
    const rows = compras.map(c => {
      const dataFmt = new Date(c.dataCompra)
        .toLocaleString('pt-BR');
      const precoFinalFmt = Number(c.precoFinal)
        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      return `
        <tr>
          <td>${c.id}</td>
          <td>${mapaUsuarios[c.usuarioId]  || '—'}</td>
          <td>${mapaProdutos[c.produtoId]  || '—'}</td>
          <td>${c.quantidade}</td>
          <td>${dataFmt}</td>
          <td>${precoFinalFmt}</td>
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
            <th>Preço Final</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  } catch (err) {
    container.innerHTML =
      `<p class="error">Erro ao carregar compras: ${err.message}</p>`;
  }
}

reportCompras()
