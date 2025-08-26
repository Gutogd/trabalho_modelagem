const tabela = document.getElementById("tabela-usuarios")

async function carregarUsuarios() {
  try {
    const resp = await fetch("http://localhost:3000/usuario")
    const usuarios = await resp.json()
    console.log(usuarios)
    usuarios.forEach(usuario => {
      const tr = document.createElement("tr")

      const nomeCompleto = `${usuario.primeiroNome} ${usuario.sobrenome}`
  
      tr.innerHTML = `
        <td>${nomeCompleto}</td>
        <td>${usuario.idade}</td>
        <td>${usuario.email}</td>
        <td>${usuario.cidade}</td>
        <td>${usuario.estado}</td>
      `

      tabela.appendChild(tr)
    })
  } catch (erro) {
    console.error("Erro ao carregar usuários:", erro)
    tabela.innerHTML = `<tr><td colspan="5">Erro ao carregar dados.</td></tr>`
  }
}

carregarUsuarios()
