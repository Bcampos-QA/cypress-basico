
//Quando quer testar uma página de forma visita ela sem precisar passar por outra 
it('Testa a página da politica de privacidade de forma independente',()=>{
    cy.visit('/privacy.html')

    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')

    cy.contains('p','Talking About Testing').should('be.visible')
})
