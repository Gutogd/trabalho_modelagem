let res = document.getElementById('res')
let btnCadastrar = document.getElementById('btnCadastrar')

btnCadastrar.addEventListener('click', (e)=>{
    e.preventDefault()
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let age = parseInt(document.getElementById('age').value);
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;
    let birthDate = document.getElementById('birthDate').value;

    const dados = {
        firstName : firstName,
        lastName : lastName,
        age : age, 
        email : email,
        phone : phone,
        address : address,
        city : city, 
        state : state, 
        birthDate : birthDate
    };

    res.innerHTML = ''

     fetch('http://localhost:3000/usuario', {
        method: 'POST',
         headers : {
            'Content-Type':'application/json'
         }, 
         body: JSON.stringify(dados)
    }
)


.then(resp => resp.json())
.then(valores => {
    console.log(valores)

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




}
)
