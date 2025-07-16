let res = document.getElementById('res')
let btnListar = document.getElementById('btnListar')

btnListar.addEventListener('click', (e)=>{
    e.preventDefault()


    res.innerHTML = ''

    fetch('http://localhost:3000/usuario')
    
.then(resp => resp.json())
.then(valores => {
    
    valores.forEach(val => {
      
    res.innerHTML += `Nome : ${val.firstName}<br>`
    res.innerHTML += `cpf : ${val.lastName}<br>`
    res.innerHTML += `email : ${val.age}<br>`
    res.innerHTML += `telefone : ${val.email}<br>`
    res.innerHTML += `telefone : ${val.phone}<br>`
    res.innerHTML += `telefone : ${val.address}<br>`
    res.innerHTML += `telefone : ${val.city}<br>`
    res.innerHTML += `telefone : ${val.state}<br>`
    res.innerHTML += `telefone : ${val.birthDate}<br>`
    });
  
})
    
})