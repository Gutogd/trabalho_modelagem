let res = document.getElementById('res');
let btnCadastrar = document.getElementById('btnCadastrar');

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    let titulo = document.getElementById('titulo').value;
    let descricao = document.getElementById('descricao').value;
    let categoria = document.getElementById('categoria').value;
    let preco = parseFloat(document.getElementById('preco').value);
    let percentualDesconto = parseFloat(document.getElementById('percentualDesconto').value);
    let estoque = parseInt(document.getElementById('estoque').value);
    let marca = document.getElementById('marca').value;
    let imagem = document.getElementById('imagem').value;

    const dados = {
        titulo : titulo,
        descricao : descricao,
        categoria : categoria,
        preco : preco,
        percentualDesconto : percentualDesconto,
        estoque : estoque,
        marca : marca,
        imagem : imagem
    };

    res.innerHTML = '';

    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(resp => resp.json())
        
    .then(valores => {
        console.log(valores);

        res.innerHTML += `Produto cadastrado com sucesso<br>`;
        res.innerHTML += `Título: ${valores.titulo}<br>`;
        res.innerHTML += `Descrição: ${valores.descricao}<br>`;
        res.innerHTML += `Categoria: ${valores.categoria}<br>`;
        res.innerHTML += `Preço: R$ ${valores.preco}<br>`;
        res.innerHTML += `Desconto: ${valores.percentualDesconto}%<br>`;
        res.innerHTML += `Estoque: ${valores.estoque}<br>`;
        res.innerHTML += `Marca: ${valores.marca}<br>`;
        res.innerHTML += `Imagem: <a href="${valores.imagem}" target="_blank">Ver imagem</a><br>`;
    })
    
});
