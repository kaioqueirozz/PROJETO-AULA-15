const titulo = document.querySelector("#titulo")
const formulario = document.querySelector("#formulario") 
const nome = document.querySelector("#nome") 
const numero = document.querySelector("#numero") 
const email = document.querySelector("#email")
const button = document.querySelector("#button")



function salvarContato(contato){     
    localStorage.setItem('contato', JSON.stringify(contato))
}

function montarCard(contato){
    const card = document.createElement("div")
    card.setAttribute("id","card")
    document.body.appendChild(card)

    //criar os elementos que vão receber o nome, telefone e e-mail
    

    const card_nome = document.createElement("h1")
    card_nome.setAttribute("class","card_nome")
    card_nome.textContent = "Nome: "
    card.appendChild(card_nome)
    const span_card_nome = document.createElement("span")
    span_card_nome.setAttribute("class","card_nome")
    span_card_nome.textContent = contato.nome
    card_nome.appendChild(span_card_nome)

    
    const card_telefone = document.createElement("p")
    card_telefone.setAttribute("class","card_telefone")
    card_telefone.textContent = "Telefone: "
    card.appendChild(card_telefone)
    const span_card_telefone = document.createElement("span")
    span_card_telefone.setAttribute("class","card_telefone")
    span_card_telefone.textContent = contato.numero
    card_telefone.appendChild(span_card_telefone)


    const card_email = document.createElement("p")
    card_email.setAttribute("class","card_email")
    card_email.textContent = "Email: "
    card.appendChild(card_email)
    const span_card_email = document.createElement("span")
    span_card_email.setAttribute("class","card_email")
    span_card_email.textContent = contato.email
    card_email.appendChild(span_card_email)
    
    //Criar o botão de excluir
    const botao_excluir = document.createElement("button")
    botao_excluir.setAttribute("class","card_button")
    card.appendChild(botao_excluir)
    const botao_excluir_img = document.createElement("img")
    botao_excluir_img.setAttribute("scr","INSERIR ICONE DE LIXEIRA")
    botao_excluir_img.setAttribute("class","card_button_img")
    botao_excluir.appendChild(botao_excluir_img)
    botao_excluir.addEventListener("click", ()=> {

        let contatos_do_local = JSON.parse(localStorage.getItem('contato')) || []   
        for(const i of contatos_do_local){
            if(i.email === span_card_email.textContent){
                const posicao = contatos_do_local.indexOf(i)
                contatos_do_local.splice(posicao, 1)
            }
        }
        localStorage.setItem('contato', JSON.stringify(contatos_do_local))

        card.remove()

    })

    //criar botão de editar        
    const botao_editar = document.createElement("button")
    botao_editar.setAttribute("class","card_button")
    card.appendChild(botao_editar)
    const botao_editar_img = document.createElement("img")
    botao_editar_img.setAttribute("scr","INSERIR ICONE DE EDITAVEL")
    botao_editar_img.setAttribute("class","card_button_img")
    botao_editar.appendChild(botao_editar_img)
    botao_editar.addEventListener("click", ()=> {

        let contatos_salvos = JSON.parse(localStorage.getItem('contato')) || []   
        for(const contato of contatos_salvos){
            if(contato.email === span_card_email.textContent){
                const posicao = contatos_salvos.indexOf(contato) 
                   
                nome.value = contato.nome
                numero.value = contato.numero
                email.value = contato.email
                titulo.textContent = "EDITAR CONTATO"
                button.textContent = "Atualizar Contato"
                
                contatos_salvos.splice(posicao, 1)
            }

            localStorage.setItem('contato', JSON.stringify(contatos_salvos))
            card.remove()
            
        }

    })
}

function cadastrar(e){
    titulo.textContent = "LISTA DE CONTATOS"
    button.textContent = "Cadastrar"
    let contato = JSON.parse(localStorage.getItem('contato')) || []

    e.preventDefault()

    if(nome.value ==="" || numero.value==="" || email.value===""){
        alert("Preencha todos os campos!")
    } else {

        const novo_contato = {
            nome: nome.value,
            numero: numero.value,
            email: email.value
        }
        contato.push(novo_contato)
        salvarContato(contato)

        montarCard(novo_contato)
        
        
        nome.value = ""
        numero.value = ""
        email.value = ""
        nome.focus()
    }
}

function mostrarContatos(){
    let lista_contatos = JSON.parse(localStorage.getItem('contato')) || []
    for( const contato of lista_contatos){
        montarCard(contato)
    }
}

mostrarContatos()

formulario.addEventListener("submit",cadastrar)