let res = document.getElementById('res')
let btnListar = document.getElementById('btnListar')

btnListar.addEventListener('click', (e)=>{
    e.preventDefault()


    res.innerHTML = ''

    fetch('http://localhost:3000/produto')
    
.then(resp => resp.json())
.then(valores => {
    
    valores.forEach(val => {
      
    res.innerHTML += `Produto cadastrado com sucesso<br>`;
        res.innerHTML += `Título: ${val.titulo}<br>`;
        res.innerHTML += `Descrição: ${val.descricao}<br>`;
        res.innerHTML += `Categoria: ${val.categoria}<br>`;
        res.innerHTML += `Preço: R$ ${val.preco}<br>`;
        res.innerHTML += `Desconto: ${val.percentualDesconto}%<br>`;
        res.innerHTML += `Estoque: ${val.estoque}<br>`;
        res.innerHTML += `Marca: ${val.marca}<br>`;
        res.innerHTML += `Imagem: <a href="${val.imagem}" target="_blank">Ver imagem</a><br>`;
    });
  
})
    
})