let res = document.getElementById('res')
let btnListar = document.getElementById('btnListar')

btnListar.addEventListener('click', (e)=>{
    e.preventDefault()


    res.innerHTML = ''

    fetch('http://localhost:3000/usuario')
    
.then(resp => resp.json())
.then(valores => {
    
    valores.forEach(val => {
      
    res.innerHTML += `Nome : ${val.primeiroNome}<br>`
    res.innerHTML += `cpf : ${val.sobrenome}<br>`
    res.innerHTML += `email : ${val.idade}<br>`
    res.innerHTML += `telefone : ${val.email}<br>`
    res.innerHTML += `telefone : ${val.telefone}<br>`
    res.innerHTML += `telefone : ${val.endereco}<br>`
    res.innerHTML += `telefone : ${val.cidade}<br>`
    res.innerHTML += `telefone : ${val.estado}<br>`
    res.innerHTML += `telefone : ${val.dataNascimento}<br>`
    });
  
})
    
})