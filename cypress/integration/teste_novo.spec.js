

it('Netflix', function(){
        cy.visit('https://www.netflix.com/br/')
    })

    it('Verifica o titulo da Aplicação e entra no site',function(){
        cy.title().should('be.equal','Netflix Brasil - assistir a séries online, assistir a filmes online') //Title é o que aparece em cima
         cy.contains('a', 'Entrar').click()//contains=  coloca apenas o link e depois o que está escrito
    })
  
