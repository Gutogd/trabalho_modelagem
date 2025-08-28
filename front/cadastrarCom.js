const btnCadastrar = document.getElementById('btnCadastrar')
const res = document.getElementById('res')

async function cadastrarCom(e) {
    e.preventDefault()
    try {
        const dados = {
            usuarioId: document.getElementById('usuarioId').value,
            produtoId: document.getElementById('produtoId').value,
            quantidade: document.getElementById('quantidade').value,
            dataCompra: document.getElementById('dataCompra').value,
            precoUnitario: 0, 
            descontoAplicado: 0, 
            precoFinal: 0,
            formaPagamento: document.getElementById('formaPagamento').value,
            status: document.getElementById('status').value,  
        }
        console.log(dados)
        const responseProd = await fetch(`http://localhost:3000/produto/id/${dados.produtoId}`, {
            method: 'GET',
        })
        // esse aqui ja nao é o meu código?
        // eu nao sei 
        // é meu pra carai kkkkkkkkk
        // obv q é cara, tu que me mandou msg qnd conseguiu fazer, nao, tlgd, mas achei estranho q teu editar nao ta com o meu mas o cadastrar ta
        if (!responseProd.ok) {
            if (responseProd.status === 404) {
                alert('Produto com esse ID não existe!')
            } else {
                alert(`Erro ao buscar produto: ${responseProd.status}`)
            }
            return
        }

        const responseUser = await fetch(`http://localhost:3000/usuario/id/${dados.usuarioId}`, {
            method: 'GET',
        })
        
        if (!responseUser.ok) {
            if (responseUser.status === 404) {
                alert('Usuário com esse ID não existe!')
            } else {
                alert(`Erro ao buscar usuário: ${responseUser.status}`)
            }
            return
        }

        const produto = await responseProd.json()
        dados.precoUnitario = produto.precoUnitario
        dados.descontoAplicado = produto.descontoAplicado
        dados.precoFinal = (produto.precoUnitario - (produto.precoUnitario * (produto.descontoAplicado / 100))).toFixed(2)

        const response = await fetch('http://localhost:3000/compra', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })

        if (!response.ok) {
            alert(`Erro ao cadastrar compra: ${response.status}`)
            return
        }
        const compras = await response.json()
        res.innerHTML = `
        Compra cadastrada com sucesso!<br>
            <td>${compras.id}</td>
            <td>${compras.usuarioId}</td>
            <td>${compras.produtoId}</td>
            <td>${compras.quantidade}</td>
            <td>R$${compras.dataCompra}</td>
            <td>${compras.precoUnitario}%</td>
            <td>${compras.descontoAplicado}</td>
            <td>${compras.precoFinal}</td>
            <td>${compras.formaPagamento}</td>
            <td>${compras.status}</td>
            `
    } catch (error) {
        console.error(error)
    }
}

btnCadastrar.addEventListener('click', cadastrarCom)