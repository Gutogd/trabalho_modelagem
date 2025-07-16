let res = document.getElementById('res')
let btnApagar = document.getElementById('btnApagar')

btnApagar.addEventListener('click', (e)=>{
    e.preventDefault()
    const id = Number(document.getElementById('id').value)

    res.innerHTML = ''

    fetch(`http://localhost:3000/cliente/${id}`,{
        method: 'DELETE'
    })
    
.then(resp => resp.json())
.then(valores => {


    res.innerHTML += `Nome : ${valores.firstName}<br>`
    res.innerHTML += `cpf : ${valores.lastName}<br>`
    res.innerHTML += `email : ${valores.age}<br>`
    res.innerHTML += `telefone : ${valores.email}<br>`
    res.innerHTML += `telefone : ${valores.phone}<br>`
    res.innerHTML += `telefone : ${valores.address}<br>`
    res.innerHTML += `telefone : ${valores.city}<br>`
    res.innerHTML += `telefone : ${valores.state}<br>`
    res.innerHTML += `telefone : ${valores.birthDate}<br>`
})
    
})