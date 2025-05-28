

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

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Bruno')//ex:#firstname é a ID
        cy.get('#lastName').type('Campos')
        cy.get('#email').type('brunocampos@exemplo.com')
        cy.get('#phone-checkbox').click()//se marcar que o meio de contato é por telefone e clicar
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

    it('Seleciona um produto (Youtube) por seu texto',function(){
        cy.get('#product')
        .select('YouTube')//Esse é conteudo que está escrito como no app
        .should('have.value','youtube')// Esse é o valor que está no HTML
    })

    it.only('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })
    
    it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product')
        .select(1)
        .should('have.value','blog')
    })
})
