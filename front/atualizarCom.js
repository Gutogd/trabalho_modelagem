let res = document.getElementById('res');
let btnCadastrar = document.getElementById('btnCadastrar');

btnCadastrar.addEventListener('click', async (e) => {
    e.preventDefault();
    let id = document.getElementById('id').value
    let usuarioId = parseInt(document.getElementById('usuarioId').value);
    let produtoId = parseInt(document.getElementById('produtoId').value);
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let dataCompra = document.getElementById('dataCompra').value;
    let formaPagamento = document.getElementById('formaPagamento').value;
    let status = document.getElementById('status').value;


    const dados = {
        usuarioId: usuarioId,
        produtoId: produtoId,
        quantidade: quantidade,
        dataCompra: dataCompra,
        precoUnitario: 0,
        descontoAplicado: 0,
        precoFinal: 0,
        formaPagamento: formaPagamento,
        status: status
    };

    let responseUser = await fetch(`http://localhost:3000/usuario/id/${usuarioId}`, {
        method: 'GET'
    })
    if (!responseUser.ok) {
        alert('esse usuario com esse id nao existe colega')
        return
    }
    let user = await responseUser.json()



    let responseProd = await fetch(`http://localhost:3000/produto/id/${produtoId}`, {
        method: 'GET'
    })
    if (!responseProd.ok) {
        alert('esse produto nao existe na porra do banco')
        return
    }


    let prod = await responseProd.json()

    console.log("user: ",user)
    console.log("prod: ",prod)

// cabo?
// acho que sim
// vou commitar e ver se funfa 

    dados.precoUnitario = prod.precoUnitario
    dados.descontoAplicado = prod.descontoAplicado
    dados.precoFinal = parseFloat(((prod.precoUnitario - (prod.precoUnitario * (prod.descontoAplicado / 100))) * quantidade).toFixed(2))

    console.log('dados: ', dados)
    console.log("Dados enviados ao servidor:", dados);
    res.innerHTML = '';

    fetch(`http://localhost:3000/compra/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(resp => resp.json())
        .then(valores => {
            console.log(valores);

            res.innerHTML += `Compra cadastrada com sucesso!<br>`;
            res.innerHTML += `ID da Compra: ${valores.id}<br>`;
            res.innerHTML += `Usuário ID: ${valores.usuarioId}<br>`;
            res.innerHTML += `Produto ID: ${valores.produtoId}<br>`;
            res.innerHTML += `Quantidade: ${valores.quantidade}<br>`;
            res.innerHTML += `Data da Compra: ${valores.dataCompra}<br>`;
            res.innerHTML += `Preço Unitário: R$ ${valores.precoUnitario}<br>`;
            res.innerHTML += `Desconto Aplicado: ${valores.descontoAplicado}%<br>`;
            res.innerHTML += `Preço Final: R$ ${valores.precoFinal}<br>`;
            res.innerHTML += `Forma de Pagamento: ${valores.formaPagamento}<br>`;
            res.innerHTML += `Status: ${valores.status}<br>`;
        })
        .catch(err => {
            console.error('erro ao cadastrar dados', err)
        });
});
