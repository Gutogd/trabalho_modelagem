let res = document.getElementById('res')
let btnApagar = document.getElementById('btnApagar')

btnApagar.addEventListener('click', (e)=>{
    e.preventDefault()
    let id = document.getElementById('id').value

    res.innerHTML = ''

    fetch(`http://localhost:3000/usuario/${id}`,{
        method: 'DELETE'
    })
    
.then(resp => resp.json())
.then(valores => {


        res.innerHTML += `dados do Id: ${id} deletados com sucesso!`
})
    
})