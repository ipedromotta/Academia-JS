function Cadastrar(){
    let nome = document.querySelector('#nome').value
    let idade = document.querySelector('#idade').value
    let peso = document.querySelector('#peso').value
    let altura = document.querySelector('#altura').value

    aluno = {
        nome: nome,
        idade: idade,
        peso: peso,
        altura: altura,
        imc: (peso / (altura*altura)).toFixed(2),
        id: Math.floor(Math.random()*9999)
    }

    if(!nome || !idade || !peso || !altura){
        alert('Preencha todos os campos antes de cadastrar')
        return false
    }

    if (localStorage.getItem('registro') === null){
        let alunos = []
        alunos.push(aluno)
        localStorage.setItem('registro', JSON.stringify(alunos))
    }else{
        alunos = JSON.parse(localStorage.getItem('registro'))
        alunos.push(aluno)
        localStorage.setItem('registro', JSON.stringify(alunos))
    }
    Mostrar()
}

function Mostrar(){
    let alunos = JSON.parse(localStorage.getItem('registro'))
    let tab = document.querySelector('table')
    let most = document.querySelector('#most')

    if(!alunos){
        alert('Não há alunos cadastrados!')
        return false
    }

    tab.innerHTML = '<caption>Alunos cadastrados</caption>'
    tab.innerHTML += '<tr><th>Nome</th><th>Idade</th><th>Peso</th><th>Altura</th><th>IMC</th></tr>'

    for(i = 0; i < alunos.length; i++){
        tab.innerHTML += `<tr><td>${alunos[i].nome}</td><td>${alunos[i].idade}</td><td>${alunos[i].peso}</td><td>${alunos[i].altura}</td><td>${alunos[i].imc}</td><td><button onclick="remover(${alunos[i].id})" id="remover">Remover</button></td></tr>`
    }
    most.value = 'Ocultar'
    most.setAttribute('onclick', 'ocultar()')
}

function ocultar(){
    let tab = document.querySelector('table')
    tab.innerHTML = ''
    most.value = 'Mostrar'
    most.setAttribute('onclick', 'Mostrar()')
}

function remover(ref){
    let alunos = JSON.parse(localStorage.getItem('registro'))
    for(c = 0; c < alunos.length; c++){
        id = alunos[c].id
        if (id == ref){
            alunos.splice(c, 1)
        } 
    }
    localStorage.setItem('registro', JSON.stringify(alunos))
    Mostrar()
}