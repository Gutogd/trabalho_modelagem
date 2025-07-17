let res = document.getElementById('res')
let btnAtualizar = document.getElementById('btnAtualizar')

btnAtualizar.addEventListener('click', (e) => {
  e.preventDefault()
  let id = document.getElementById('id').value
  let primeiroNome = document.getElementById('primeiroNome').value;
  let sobrenome = document.getElementById('sobrenome').value;
  let idade = parseInt(document.getElementById('idade').value);
  let email = document.getElementById('email').value;
  let telefone = document.getElementById('telefone').value;
  let endereco = document.getElementById('endereco').value;
  let cidade = document.getElementById('cidade').value;
  let estado = document.getElementById('estado').value;
  let dataNascimento = document.getElementById('dataNascimento').value;


  const dados = {
    primeiroNome: primeiroNome,
    sobrenome: sobrenome,
    idade: idade,
    email: email,
    telefone: telefone,
    endereco: endereco,
    cidade: cidade,
    estado: estado,
    dataNascimento: dataNascimento
  };

  res.innerHTML = ''

  fetch(`http://localhost:3000/usuario/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  }
  )


    .then(resp => resp.json())
    .then(valores => {
      console.log(valores)

      res.innerHTML += `Nome: ${valores.primeiroNome}<br>`;
      res.innerHTML += `Sobrenome: ${valores.sobrenome}<br>`;
      res.innerHTML += `Idade: ${valores.idade}<br>`;
      res.innerHTML += `Email: ${valores.email}<br>`;
      res.innerHTML += `Telefone: ${valores.telefone}<br>`;
      res.innerHTML += `Endereço: ${valores.endereco}<br>`;
      res.innerHTML += `Cidade: ${valores.cidade}<br>`;
      res.innerHTML += `Estado: ${valores.estado}<br>`;
      res.innerHTML += `Nascimento: ${valores.dataNascimento}<br>`;
    })




}
)
