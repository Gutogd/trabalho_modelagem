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
    res.innerHTML += `sobrenome : ${val.sobrenome}<br>`
    res.innerHTML += `idade : ${val.idade}<br>`
    res.innerHTML += `email : ${val.email}<br>`
    res.innerHTML += `telefone : ${val.telefone}<br>`
    res.innerHTML += `endereco : ${val.endereco}<br>`
    res.innerHTML += `cidade : ${val.cidade}<br>`
    res.innerHTML += `estado : ${val.estado}<br>`
    res.innerHTML += `Data de nascimento : ${val.dataNascimento}<br><br><br><br>`
    });
  
})
    
})