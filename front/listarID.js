const btnListarUS = document.getElementById('btnListarUS')
const res = document.getElementById('res')

btnListarUS.addEventListener('click', () => {
    const id = Number(document.getElementById('userID').value)

    res.innerHTML = ''

    fetch(`http://localhost:3000/usuario/${id}`)
        .then(resp => resp.json())
        .then(valores => {
            res.innerHTML += `Nome: ${valores.primeiroNome} ${valores.sobrenome} <br>`;
            res.innerHTML += `Idade: ${valores.idade} anos <br>`;
            res.innerHTML += `Email: ${valores.email} <br>`;
            res.innerHTML += `Telefone: ${valores.telefone} <br>`;
            res.innerHTML += `Endereço: ${valores.endereco}, ${valores.cidade} - ${valores.estado} <br>`;
            res.innerHTML += `Data de Nascimento: ${valores.dataNascimento} <br>`;
            res.innerHTML += `<hr>`;

        })
        .catch((err) => {
            console.error('Erro ao Listar o Usuario', err)
        })
})

const btnListarPD = document.getElementById('btnListarPD')
const resP = document.getElementById('resP')

btnListarPD.addEventListener('click', () => {
    const id = Number(document.getElementById('prodID').value)
    fetch(`http://localhost:3000/produto/${id}`)
        .then(resp => resp.json())
        .then(valores => {
            resP.innerHTML += `Nome do Produto: ${valores.titulo} <br>`;
            resP.innerHTML += `Marca: ${valores.marca || "Não informado"} <br>`;
            resP.innerHTML += `Thumbnail: <img src="${valores.imagem || "#"}" alt="Imagem do produto" width="100"> <br>`;
            resP.innerHTML += `Preço: R$ ${valores.preco ? valores.preco.toFixed(2) : "Não informado"} <br>`;

            resP.innerHTML += `<hr>`;
        })
        .catch((err) => {
            console.error('Erro ao listar o Produto', err)
        })
})