

//intelissence:ao passar o mouse posso visitar urls relativas 
describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')//cy.visit = caminho relativo da url
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');//cy.title=verifica o titulo/.should=está dizendo o que espera que aconteça
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'test, test, test, test, test, test, test, test, test, test, test, test, test, test, '
        cy.get('#firstName').type('Bruno')//.type = Digitar alguma coisa 
        cy.get('#lastName').type('Campos')
        cy.get('#email').type('brunocampos@exemplo.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.get('#firstName').type('Bruno')//ex:#firstname é a ID
        cy.get('#lastName').type('Campos')
        cy.get('#email').type('brunocampos@exemplo,com')//erro no email
        cy.get('#open-text-area').type('test')
        cy.contains('button', 'Enviar').click()//cy.contains coloca o seletor 'button' eo texto 'Enviar ,serve para comando unicos 

        cy.get('.error').should('be.visible')
    })
    it('campo telefone continua vazio quando preenchido com valor não-númerico', function () {
        //quando indica mais de um comando coloca em linhas quebradas
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')//campo continua vazio ('')


    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
        cy.get('#firstName').type('Bruno')//ex:#firstname é a ID
        cy.get('#lastName').type('Campos')
        cy.get('#email').type('brunocampos@exemplo.com')
        cy.get('#phone-checkbox').check()//usar check para marcar checkbox é mais confiavel
        cy.get('#open-text-area').type('test')
        cy.contains('button', 'Enviar').click()//Submit é a class

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Bruno')
            .should('have.value', 'Bruno')//Tem que mostrar o valor do .type
            .clear()//limpa os dados
            .should('have.value', '')//volta vazio 
        cy.get('#lastName')
            .type('Campos')
            .should('have.value', 'Campos')//Tem que mostrar o valor do .type
            .clear()//limpa os dados
            .should('have.value', '')//volta vazio 
        cy.get('#email')
            .type('brunocampos@exemplo.com')
            .should('have.value', 'brunocampos@exemplo.com')//Tem que mostrar o valor do .type
            .clear()//limpa os dados
            .should('have.value', '')//volta vazio  
        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')//Tem que mostrar o valor do .type
            .clear()//limpa os dados
            .should('have.value', '')//volta vazio 
    })
    it(' exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it(' envia o formuário com sucesso usando um comando customizado', function () {//comando  da página commands.js
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

     //Seleciona um campo em um dropdown 
    it('Seleciona um produto (Youtube) por seu texto',function(){
        cy.get('#product')
        .select('YouTube')//Esse é conteudo que está escrito como no app
        .should('have.value','youtube')// Esse é o valor que está no HTML
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () =>{
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })
    
    it('seleciona um produto (Blog) por seu índice',() =>{
        cy.get('#product')
        .select(1)
        .should('have.value','blog')
    })

    //Seleciona um campo do tipo Radio 
    it('Marca o tipo de atendimento "Feedback"', () =>{
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked') 
    })

    // Define um caso de teste com o título "Marca cada tipo de atendimento"
    it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')// Seleciona todos os elementos input do tipo radio na página
        .each(tipoDeServico => {// Itera sobre cada elemento encontrado
        cy.wrap(tipoDeServico)// cy.wrap() → transforma o elemento DOM em um objeto Cypress.
        .check()// Marca (seleciona) o radio button atual
        .should('be.checked')// Faz a asserção: verifica se o radio button está de fato marcado
            })
    })
   it('Marca ambos checkboxes, depois desmarca o ultimo',() => {   
    cy.get('input[type="checkbox"]')// Seleciona todos os elementos input do tipo checkbox na página
        .check()// Marca (seleciona) todos os checkboxes encontrados
        .last()// Pega o último checkbox da lista de checkboxes selecionados
        .uncheck()// Desmarca (desseleciona) o último checkbox
        .should('be.not.checked')// Faz a asserção: verifica se o último checkbox está de fato desmarcado
             
    }) 
    // Teste que seleciona um arquivo da pasta fixtures
    it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')// Localiza o elemento de upload de arquivo pelo ID
        .selectFile('cypress/fixtures/example.json')// Seleciona o arquivo "example.json" que está na pasta "cypress/fixtures"
        .should(input => { 
            expect(input[0].files[0].name).to.equal('example.json')// Verifica se o arquivo selecionado é o "example.json"
        })
    })
    it('Seleciona um arquivo simulando um drag-and-drop',()=>{
        cy.get('#file-upload')// Localiza o elemento de upload de arquivo pelo ID
        .selectFile('cypress/fixtures/example.json',{action:'drag-drop'})// Seleciona o arquivo "example.json" que está na pasta "cypress/fixtures" e simula um drag-drop
        .should(input => { 
            expect(input[0].files[0].name).to.equal('example.json')// Verifica se o arquivo selecionado é o "example.json"
        })
    })


    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')// Carrega o arquivo "example.json" da pasta fixtures e dá o alias "sampleFile"
        cy.get('#file-upload')// Seleciona o input de upload de arquivo pelo ID
            .selectFile('@sampleFile')// Usa o arquivo com o alias '@sampleFile' para simular o upload
        .should(input => {// Verifica se o arquivo selecionado é o esperado
            expect(input[0].files[0].name).to.equal('example.json')
        })
})
    it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
        cy.contains('a','Política de Privacidade')//→ seleciona a tag <a> cujo conteudo é Política de Privacidade.
            should('have.attr','href','privacy.html')//valida se o atributo href com valor privacy.html
            .and('have.attr','target','_blank')//E valida se o atributo target do elemento é _blank.
    })

    it.only('Acessa a página de privacidade removendo o target e então clicando no link',()=>{
        cy.contains('a','Política de Privacidade')//→ seleciona a tag <a> cujo conteudo é Política de Privacidade.
            .invoke('removeAttr','target')//invoca a função remover o atributo, depois a o que quer remover 
            .click()
        cy.contains('h1','CAC TAT - Política de privacidade').should('be.visible')
    })
    
})