const btnListarUS = document.getElementById('btnListarUS')
const res = document.getElementById('res')

btnListarUS.addEventListener('click', () => {
    const nome = document.getElementById('nomeU').value;

    res.innerHTML = ''

    fetch(`http://localhost:3000/usuario/nome/${nome}`)
        .then(resp => resp.json())  
        .then(valores => {
            valores.forEach(val => {
                res.innerHTML += `Nome: ${val.primeiroNome} ${val.sobrenome} <br>`;
                res.innerHTML += `Idade: ${val.idade} anos <br>`;
                res.innerHTML += `Email: ${val.email} <br>`;
                res.innerHTML += `Telefone: ${val.telefone} <br>`;
                res.innerHTML += `Endereço: ${val.endereco}, ${val.cidade} - ${val.estado} <br>`;
                res.innerHTML += `Data de Nascimento: ${val.dataNascimento} <br>`;
                res.innerHTML += `<hr>`;
            });
        })
        .catch((err) => {
            console.error('Erro ao Listar o Usuario', err)
        })
})

const btnListarPD = document.getElementById('btnListarPD')
const resP = document.getElementById('resP')

btnListarPD.addEventListener('click', () => {
    const nome = document.getElementById('nomeP').value;
    fetch(`http://localhost:3000/produto/nome/${nome}`)
        .then(resp => resp.json())
        .then(valores => {
            valores.forEach(val => {
                resP.innerHTML += `Nome do Produto: ${val.titulo} <br>`;
                resP.innerHTML += `Descrição: ${val.descricao} <br>`;
                resP.innerHTML += `Categoria: ${val.categoria} <br>`;
                resP.innerHTML += `Marca: ${val.marca || "Não informado"} <br>`;
                resP.innerHTML += `Estoque: ${val.estoque} unidades <br>`;
                resP.innerHTML += `Desconto: ${val.descontoAplicado ? val.descontoAplicado + "%" : "Sem desconto"} <br>`;
                resP.innerHTML += `imagem: <img src="${val.imagem || "#"}" alt="Imagem do produto" width="100"> <br>`;
                resP.innerHTML += `Preço: R$ ${val.precoUnitario ? val.precoUnitario.toFixed(2) : "Não informado"} <br>`;
                resP.innerHTML += `<hr>`;
            })
        })
        .catch((err) => {
            console.error('Erro ao listar o Produto', err)
        })
})