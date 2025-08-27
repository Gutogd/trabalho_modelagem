let res = document.getElementById('res');
let btnListar = document.getElementById('btnListar');

btnListar.addEventListener('click', (e) => {
    e.preventDefault();

    res.innerHTML = '';

    fetch('http://localhost:3000/compra')
        .then(resp => resp.json())
        .then(valores => {
            valores.forEach(val => {
                res.innerHTML += `<hr>`;
                res.innerHTML += `ID da Compra: ${val.id}<br>`;
                res.innerHTML += `Usuário ID: ${val.usuarioId}<br>`;
                res.innerHTML += `Produto ID: ${val.produtoId}<br>`;
                res.innerHTML += `Quantidade: ${val.quantidade}<br>`;
                res.innerHTML += `Data da Compra: ${val.dataCompra}<br>`;
                res.innerHTML += `Preço Unitário: R$ ${val.precoUnitario.toFixed(2)}<br>`;
                res.innerHTML += `Desconto Aplicado: ${val.descontoAplicado}%<br>`;
                res.innerHTML += `Preço Final: R$ ${val.precoFinal.toFixed(2)}<br>`;
                res.innerHTML += `Forma de Pagamento: ${val.formaPagamento}<br>`;
                res.innerHTML += `Status: ${val.status}<br><br><br><br>`;
            });
        })
        .catch(err => {
            console.error('Erro ao listar compras:', err);
            res.innerHTML = 'Erro ao carregar lista de compras.';
        });
});
